# Brain of Russell Barkley

AI-synthesized clinical persona of Dr. Russell Barkley — the world's leading
ADHD researcher — packaged as a portable skill for **Claude Code** and
**OpenClaw**. Architecture forked from
[genius8267/naval](https://github.com/genius8267/naval); brain rewritten
from scratch for ADHD clinical reasoning.

> **Unofficial.** Not affiliated with Dr. Russell Barkley or his
> institutions. Not a substitute for clinical care.

---

## What this is

When triggered, the skill makes Claude respond in Barkley's clinical voice
and reasoning frame:

- ADHD as a **self-regulation and executive function disorder**, not an
  attention disorder
- Rejection of willpower-based solutions; advocacy for **external
  scaffolding**
- Evidence-based stance on **medication** without ideology
- Direct address of the **shame** that compounds untreated ADHD
- The **30% Rule**, time blindness, working memory externalization, four
  fronts of treatment

The skill loads a 17,000-word brain composed of seven hand-written markdown
files that ground every response in Barkley's published frameworks — so
the agent does not collapse into generic LLM tone.

---

## Install

### Option A — Claude Code (user-level skill)

```bash
git clone https://github.com/voidlight/brain-of-barkley.git
cd brain-of-barkley
./install-claude-code.sh
```

Installs to `~/.claude/skills/barkley/`. Reload Claude Code or start a new
session. Trigger with:

```
barkley <질문>
바클리한테 물어봐 <질문>
```

### Option B — OpenClaw (Telegram-fronted Claude CLI agent)

```bash
git clone https://github.com/voidlight/brain-of-barkley.git
cd brain-of-barkley
./install-openclaw.sh
```

Installs to `~/.openclaw/skills/barkley/`. Trigger from any OpenClaw front
end (Telegram bot, direct CLI):

```
/barkley <질문>
바클리한테 물어봐 <질문>
```

### Option C — Manual

Copy the `skill/` directory to either `~/.claude/skills/barkley/` or
`~/.openclaw/skills/barkley/`. Both runtimes consume the same SKILL.md
schema.

Consultation logs save to `~/.barkley/consultations/YYYY-MM-DD-<slug>.md`
on first use.

---

## Modes

| Trigger | Purpose |
|---|---|
| `barkley <질문>` | Full consultation — reframe, root cause, intervention, watch-outs, bottom line |
| `barkley --quick <질문>` | Reframe + intervention + bottom line, no save |
| `barkley --myth <주장>` | Dismantle an ADHD myth with evidence |
| `barkley --env <상황>` | Environmental design for a specific context |
| `barkley --shame` | Structured self-blame reset |
| `barkley --debate <질문>` | Barkley vs Hallowell perspectives side by side |
| `barkley --pushback <slug>` | Defend a prior verdict against user pushback |
| `barkley --eval` | Run the eight canonical voice regression tests |

Korean triggers also recognized: 바클리한테 물어봐 · 빠르게 · 환경 설계 ·
자책 멈춤 · 미신 깨줘 · 두 관점 · 반박.

---

## Structure

```
skill/
├── SKILL.md                # Activation rules, modes, prime axioms, anti-patterns
├── README.md               # In-skill notes
├── install.sh              # Convenience installer (mirrors install-claude-code.sh)
└── brain/
    ├── 00-brain-of-barkley.md     # Master persona (~3000 words)
    ├── 01-executive-function.md   # Seven EF model, developmental sequence
    ├── 02-treatment.md            # Four-front approach, medication truth-telling
    ├── 03-adults.md               # Adult ADHD, comorbidity, late diagnosis
    ├── 04-shame-reframe.md        # Translation scripts for shame statements
    ├── 05-environment-design.md   # Five externalization principles
    ├── 06-myths.md                # Fifteen myths systematically rebutted
    └── _evals/
        ├── canonical.md           # Eight voice regression Q&A pairs
        └── reports/               # Eval run outputs
```

---

## Voice regression

Run `barkley --eval` periodically to confirm answers still hit Barkley's
register. Eight canonical questions exercise the full skill surface:

1. "I can't focus on anything important. Am I just lazy?"
2. "Should my kid be on medication?"
3. "I know what to do but I can't do it. What's wrong with me?"
4. "ADHD is just a productivity excuse, right?"
5. "How do I keep a routine?"
6. "Why do I rage at small things?"
7. "Is ADHD a gift?"
8. "I'm 40 and just got diagnosed. Is it too late?"

Each is scored against five voice criteria. The overall checklist requires
8+ of 10 markers per response.

---

## Disclaimer

This is an **unofficial** AI-synthesized persona. No endorsement by Dr.
Barkley or his institutions is implied. All content is synthesized from
publicly available work — *Taking Charge of ADHD*, *Taking Charge of Adult
ADHD*, *ADHD in Adults*, public lectures, the 30 Essential Ideas series.

The skill **does not diagnose, prescribe, or replace clinical care**. For
evaluation, medication, or crisis situations, consult a licensed clinician
experienced in ADHD.

---

## License & lineage

Personal-use license on the persona content. The harness architecture is
forked from [genius8267/naval](https://github.com/genius8267/naval); credit
the upstream when you fork.

If you publish a derivative (different person's brain on the same
architecture), make the unofficial nature explicit in your README and
include an equivalent disclaimer.
