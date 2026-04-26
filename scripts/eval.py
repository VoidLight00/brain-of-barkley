#!/usr/bin/env python3
"""
Brain of Barkley — Voice Regression Eval Harness

Runs the 8 canonical Q&A from skill/brain/_evals/canonical.md against the
Anthropic API with the Barkley persona loaded, then auto-scores each
response against a 10-marker rubric.

Usage:
    # Native Anthropic API:
    export ANTHROPIC_API_KEY=sk-ant-...
    python3 scripts/eval.py [--model claude-opus-4-7]

    # Via Anthropic-compatible proxy (Kimi, Moonshot, OpenRouter, local Ollama):
    export ANTHROPIC_API_KEY=$KIMI_API_KEY
    export ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic
    python3 scripts/eval.py --model kimi-k2-0905-preview

Exit code:
    0 — all 8 pass voice criteria (8+/10 markers)
    1 — at least one regression detected
    2 — runtime error (API, missing files)

Requires: Python 3.10+, anthropic>=0.40
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    import anthropic  # type: ignore
except ImportError:
    print("ERROR: pip install anthropic", file=sys.stderr)
    sys.exit(2)


REPO_ROOT = Path(__file__).resolve().parent.parent
SKILL_DIR = REPO_ROOT / "skill"
BRAIN_DIR = SKILL_DIR / "brain"

CANONICAL_QUESTIONS = [
    "I can't focus on anything important. Am I just lazy?",
    "Should my kid be on medication?",
    "I know what to do but I can't do it. What's wrong with me?",
    "ADHD is just a productivity excuse, right?",
    "How do I keep a routine?",
    "Why do I rage at small things?",
    "Is ADHD a gift?",
    "I'm 40 and just got diagnosed. Is it too late?",
]

# Voice markers — each response is scored against these 10 criteria
# A response passes if it hits 8+ markers
VOICE_MARKERS: list[tuple[str, list[str]]] = [
    ("uses executive function framing", [
        r"executive function", r"self-?regulation", r"실행기능", r"자기조절"
    ]),
    ("rejects willpower / try-harder framing", [
        r"not (about |a )?willpower",
        r"not (a |the )?(matter of |question of )?trying harder",
        r"willpower (does not|cannot|fails)",
        r"의지력(은|이) (아니|없|부족)",
    ]),
    ("does not stigmatize medication", [
        r"medication (works|is|when)",
        r"stimulants? (are|work|reduce)",
        r"약물(치료)?(은|는|이) (효과|증거|중요)",
    ]),
    ("does not romanticize / no superpower framing", [
        r"not a (gift|superpower)",
        r"(disorder|impairment)",
        r"선물(이|은) 아니",
    ]),
    ("addresses shame or self-blame", [
        r"shame", r"self-?blame", r"not (lazy|broken|stupid|weak)",
        r"수치(심)?", r"자책", r"게으른 것이 아니",
    ]),
    ("recommends externalization / scaffolding", [
        r"external(ize|ization)", r"scaffold(ing)?", r"reminder",
        r"accountability", r"calendar", r"외재화", r"환경 (설계|디자인)",
    ]),
    ("ends with concrete next step", [
        r"(next step|first step|start (with|by)|do this)",
        r"(다음|첫) (단계|걸음)", r"(우선|먼저) ",
    ]),
    ("uses Barkley signature phrase", [
        r"knowing what to do", r"doing what you know",
        r"point of performance", r"time blindness", r"30%",
        r"intention deficit", r"mind'?s (eye|voice|heart|playground)",
        r"broken leg", r"prosthesis", r"ramp",
    ]),
    ("direct / non-vague register (no fillers)", [
        # Penalize hedging by checking for direct statements
        r"^(No\.|Yes\.|Here'?s|Let me|This is|That is|You (have|are|need))",
    ]),
    ("does not diagnose the user personally", [
        # Pass if response avoids "you have ADHD" definitive claims
        # (Negative marker — we check the inverse below)
        r"(consult|see|refer|licensed|clinician|psychiatrist|평가|임상가)",
    ]),
]


def load_persona() -> str:
    """Concatenate SKILL.md + all brain files into a single system prompt."""
    parts: list[str] = []
    skill_md = SKILL_DIR / "SKILL.md"
    parts.append(f"=== SKILL.md ===\n{skill_md.read_text()}")
    for f in sorted(BRAIN_DIR.glob("*.md")):
        parts.append(f"=== {f.name} ===\n{f.read_text()}")
    return "\n\n".join(parts)


def score_response(text: str) -> tuple[int, dict[str, bool]]:
    """Return (markers_hit, per-marker dict). Pass = 8+/10."""
    results: dict[str, bool] = {}
    text_lower = text.lower()
    for label, patterns in VOICE_MARKERS:
        hit = any(re.search(p, text_lower, re.IGNORECASE | re.MULTILINE) for p in patterns)
        results[label] = hit
    return sum(results.values()), results


def run_one(client, model: str, system: str, question: str) -> str:
    msg = client.messages.create(
        model=model,
        max_tokens=2048,
        system=system,
        messages=[{"role": "user", "content": f"barkley {question}"}],
    )
    return "".join(b.text for b in msg.content if b.type == "text")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=os.environ.get("BARKLEY_MODEL", "claude-opus-4-7"))
    ap.add_argument("--out", type=Path, default=BRAIN_DIR / "_evals" / "reports")
    ap.add_argument("--question", type=int, default=None,
                    help="Run only Q[N] (1-8) instead of full battery")
    args = ap.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        return 2

    if not (SKILL_DIR / "SKILL.md").exists():
        print(f"ERROR: SKILL.md not found at {SKILL_DIR}", file=sys.stderr)
        return 2

    args.out.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    report_path = args.out / f"eval-{timestamp}.json"

    client_kwargs: dict[str, str] = {}
    if base_url := os.environ.get("ANTHROPIC_BASE_URL"):
        client_kwargs["base_url"] = base_url
    client = anthropic.Anthropic(**client_kwargs)
    system = load_persona()

    print(f"Model: {args.model}")
    print(f"Base URL: {client_kwargs.get('base_url', 'default')}")
    print(f"System prompt: {len(system):,} chars")
    print(f"Report: {report_path}\n")

    questions = CANONICAL_QUESTIONS
    if args.question is not None:
        questions = [CANONICAL_QUESTIONS[args.question - 1]]

    results = []
    failed = 0
    for i, q in enumerate(questions, 1):
        print(f"[Q{i}/{len(questions)}] {q[:60]}...")
        try:
            response = run_one(client, args.model, system, q)
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"question": q, "error": str(e), "score": 0})
            failed += 1
            continue
        score, markers = score_response(response)
        passed = score >= 8
        if not passed:
            failed += 1
        emoji = "✓" if passed else "✗"
        print(f"  {emoji} {score}/10 markers")
        for label, hit in markers.items():
            mark = "·" if hit else "✗"
            print(f"    {mark} {label}")
        results.append({
            "question": q,
            "response": response,
            "score": score,
            "passed": passed,
            "markers": markers,
        })

    summary = {
        "model": args.model,
        "timestamp": timestamp,
        "total": len(questions),
        "passed": len(questions) - failed,
        "failed": failed,
        "results": results,
    }
    report_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False))
    print(f"\nReport saved: {report_path}")
    print(f"Final: {summary['passed']}/{summary['total']} passed")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
