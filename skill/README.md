# Brain of Russell Barkley — Claude Code Skill

An AI-synthesized persona of Dr. Russell Barkley for ADHD-related
consultation. Forked from the [genius8267/naval](https://github.com/genius8267/naval)
architecture, with persona, brain files, and evaluation rewritten for
ADHD clinical reasoning.

**Unofficial. Not affiliated with Dr. Russell Barkley or his institutions.
Not a substitute for clinical care.**

## What this is

A Claude Code skill that, when triggered, causes Claude to respond in the
clinical voice and framework of Dr. Russell Barkley — the world's leading
researcher on ADHD. The skill loads a hand-written "brain" of seven
markdown files (~25,000 words total) covering:

- The master persona (`00-brain-of-barkley.md`)
- Executive function theory (`01-executive-function.md`)
- Four-front treatment approach (`02-treatment.md`)
- Adult ADHD (`03-adults.md`)
- Shame reframe and emotional dysregulation (`04-shame-reframe.md`)
- Environmental design and externalization (`05-environment-design.md`)
- Myth rebuttal (`06-myths.md`)

Plus eight regression-test Q&A pairs in `brain/_evals/canonical.md` for
voice integrity checks.

## Modes

| Trigger | Purpose |
|---|---|
| `barkley <질문>` | Full consultation with reframe, intervention, bottom line |
| `barkley --quick <질문>` | Short form — reframe + intervention + bottom line |
| `barkley --myth <주장>` | Dismantle an ADHD myth with evidence |
| `barkley --env <상황>` | Environmental design for a specific context |
| `barkley --shame` | Structured self-blame reset |
| `barkley --debate <질문>` | Barkley vs Hallowell perspectives side-by-side |
| `barkley --pushback <slug>` | Defend a prior verdict against user pushback |
| `barkley --eval` | Run the eight canonical regression tests |

Korean triggers also recognized: "바클리한테 물어봐", "빠르게", "환경 설계",
"자책 멈춤", "미신 깨줘", "두 관점", "반박".

## Install

```bash
./install.sh
```

Or manually: copy this directory to `~/.claude/skills/barkley/`. Claude Code
will detect the skill on next session start.

Consultations are saved to `~/.barkley/consultations/YYYY-MM-DD-<slug>.md`.

## Design intent

The goal is not to produce a chatbot that parrots Barkley quotes. The goal
is to produce an agent that reasons the way Barkley reasons — using
executive function as the unifying frame, rejecting willpower-based
solutions, advocating for evidence-based treatment including medication
without shame, externalizing rather than strengthening, and naming shame
as a secondary wound to be addressed alongside the primary condition.

The brain files enforce this reasoning pattern by grounding responses in
concrete frameworks rather than generic LLM tone.

## Voice regression

Run `barkley --eval` periodically to check that answers still hit the
voice criteria. The eight canonical Q&A pairs cover:

1. "Am I just lazy?"
2. "Should my kid be on medication?"
3. "I know what to do but I can't do it."
4. "ADHD is just a productivity excuse, right?"
5. "How do I keep a routine?"
6. "Why do I rage at small things?"
7. "Is ADHD a gift?"
8. "I'm 40 and just got diagnosed."

Each is scored against a rubric of 5 criteria. The overall voice checklist
in `canonical.md` requires 8+ of 10 markers per response.

## Source and lineage

Structure forked from [genius8267/naval](https://github.com/genius8267/naval),
which is an AI-synthesized persona of Naval Ravikant for wealth and
happiness decisions. Brain rewritten from scratch for ADHD clinical
content, drawing on Russell Barkley's publicly available work including
*Taking Charge of ADHD*, *Taking Charge of Adult ADHD*, *ADHD in Adults*,
and his public lecture series (the 30 Essential Ideas YouTube playlist).

## Disclaimer

This is an unofficial persona. No endorsement by Dr. Barkley or his
institutions is implied. All content is synthesized from publicly available
sources and is presented for educational and decision-support purposes.

This skill does not diagnose, prescribe, or replace clinical care. For
evaluation, medication decisions, or crisis situations, consult a licensed
clinician experienced in ADHD — ideally a psychiatrist, neuropsychologist,
or psychologist with a specialty in adult or pediatric ADHD depending on
who needs the evaluation.

## License

Personal use only. The persona is AI-synthesized and the architecture is
open — the brain content is a derivative creative synthesis for private
consultation use. If you publish a fork, credit the upstream naval
architecture and make clear in your README that the Barkley persona is
unofficial.
