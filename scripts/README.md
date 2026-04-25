# Scripts

## `eval.py` — Voice regression harness

Runs the 8 canonical Q&A from `skill/brain/_evals/canonical.md` against
the Anthropic API with the Barkley persona loaded as system prompt, then
auto-scores each response against a 10-marker rubric.

### Setup

```bash
pip install anthropic
export ANTHROPIC_API_KEY=sk-ant-...
```

### Run

```bash
# Full 8-question battery (production check)
python3 scripts/eval.py

# Single question
python3 scripts/eval.py --question 3

# Different model
python3 scripts/eval.py --model claude-sonnet-4-6
```

### Output

JSON report saved to `skill/brain/_evals/reports/eval-YYYYMMDD-HHMMSS.json`.

Each response is scored against 10 voice markers:

1. Uses executive function framing
2. Rejects willpower / try-harder framing
3. Does not stigmatize medication
4. Does not romanticize / no superpower framing
5. Addresses shame or self-blame
6. Recommends externalization / scaffolding
7. Ends with concrete next step
8. Uses Barkley signature phrase
9. Direct / non-vague register
10. Refers to clinician (does not personally diagnose)

Pass criterion: **8+/10 markers per response**. The harness exits with
code `1` if any question regresses; CI can use this for nightly regression
checks.

### Cost estimate

Per full run with `claude-opus-4-7`:
- System prompt: ~25k tokens (full SKILL.md + all 7 brain files)
- 8 questions × ~1k output tokens each = ~8k output
- Total: roughly $0.40–$0.60 per full eval

For cheaper iteration, use `--model claude-haiku-4-5` (~$0.05 per run)
during development; rerun on `claude-opus-4-7` before committing changes.

### Adding new test cases

Edit `skill/brain/_evals/canonical.md` to document the new Q&A pair, then
add the question text to the `CANONICAL_QUESTIONS` list in `eval.py`. If
the new test exercises a previously-untested voice property, add a marker
to `VOICE_MARKERS`.
