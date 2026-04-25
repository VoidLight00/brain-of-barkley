export default function Home() {
  return (
    <main>
      <header>
        <span className="tag">Unofficial · AI-Synthesized Persona</span>
        <h1>Brain of Russell Barkley</h1>
        <p className="subtitle">
          ADHD 임상 음성을 그대로 호출하는 Claude Code &amp; OpenClaw 스킬.
          17,000 단어의 전문 브레인으로 구성됐고, 일반 GPT 톤이 아닌 Barkley
          박사의 직설적 임상 프레임으로 응답합니다.
        </p>
      </header>

      <section>
        <blockquote>
          ADHD is not a problem of knowing what to do. It is a problem of
          doing what you know.
        </blockquote>
        <p>
          이 한 문장이 스킬 전체의 출발점입니다. ADHD를 주의력 장애가 아닌{' '}
          <strong>자기조절·실행기능 장애</strong>로 재정의하고, 의지력 기반
          해결책을 거부하며, 외부 스캐폴딩과 근거 기반 치료를 옹호합니다.
          수치심을 2차 상처로 다루고, 약물치료를 이념이 아닌 증거로 평가합니다.
        </p>
      </section>

      <section>
        <h2>설치</h2>
        <div className="cards">
          <div className="card">
            <h3>Claude Code</h3>
            <p className="desc">사용자 레벨 스킬로 설치</p>
            <pre>
              <code>{`git clone https://github.com/voidlight/brain-of-barkley.git
cd brain-of-barkley
./install-claude-code.sh`}</code>
            </pre>
          </div>
          <div className="card">
            <h3>OpenClaw</h3>
            <p className="desc">텔레그램·CLI 프런트로 호출</p>
            <pre>
              <code>{`git clone https://github.com/voidlight/brain-of-barkley.git
cd brain-of-barkley
./install-openclaw.sh`}</code>
            </pre>
          </div>
        </div>
        <p>
          두 런타임 모두 동일한 SKILL.md 스키마를 소비하므로 같은 브레인을
          공유합니다. 상담 로그는{' '}
          <code>~/.barkley/consultations/</code>에 자동 저장됩니다.
        </p>
      </section>

      <section>
        <h2>호출</h2>
        <pre>
          <code>{`barkley <질문>
바클리한테 물어봐 <질문>`}</code>
        </pre>
      </section>

      <section>
        <h2>모드</h2>
        <div className="modes">
          <div className="mode">
            <code>barkley &lt;질문&gt;</code>
            <span className="desc">
              풀 컨설테이션 — 재정의·근원·개입·주의·결론 5축
            </span>
          </div>
          <div className="mode">
            <code>--quick</code>
            <span className="desc">짧게 — 재정의 + 개입 + 결론만</span>
          </div>
          <div className="mode">
            <code>--myth &lt;주장&gt;</code>
            <span className="desc">ADHD 미신을 증거로 해체</span>
          </div>
          <div className="mode">
            <code>--env &lt;상황&gt;</code>
            <span className="desc">환경 설계 — 외재화 5원칙으로 처방</span>
          </div>
          <div className="mode">
            <code>--shame</code>
            <span className="desc">자책 리셋 스크립트</span>
          </div>
          <div className="mode">
            <code>--debate</code>
            <span className="desc">Barkley vs Hallowell 두 관점</span>
          </div>
          <div className="mode">
            <code>--pushback &lt;slug&gt;</code>
            <span className="desc">이전 판단을 새 증거로 방어</span>
          </div>
          <div className="mode">
            <code>--eval</code>
            <span className="desc">8개 음성 회귀 테스트 실행</span>
          </div>
        </div>
      </section>

      <section>
        <h2>브레인 구성</h2>
        <ul>
          <li>
            <code>00-brain-of-barkley.md</code> — 마스터 페르소나 (~3,000 단어)
          </li>
          <li>
            <code>01-executive-function.md</code> — 7개 실행기능 모델, 발달
            순서
          </li>
          <li>
            <code>02-treatment.md</code> — 4-front 접근, 약물치료의 진실
          </li>
          <li>
            <code>03-adults.md</code> — 성인 ADHD, 동반질환, 늦은 진단
          </li>
          <li>
            <code>04-shame-reframe.md</code> — 수치심 진술 번역 스크립트
          </li>
          <li>
            <code>05-environment-design.md</code> — 외재화 5원칙
          </li>
          <li>
            <code>06-myths.md</code> — 15개 미신 체계적 반박
          </li>
          <li>
            <code>_evals/canonical.md</code> — 8개 회귀 테스트 Q&amp;A
          </li>
        </ul>
        <p>
          총 ~17,000 단어. 매 응답을 Barkley의 출판된 프레임에 grounding하여
          일반 LLM 톤으로의 회귀를 막습니다.
        </p>
      </section>

      <section>
        <h2>설계 의도</h2>
        <p>
          Naval-스타일 페르소나 스킬{' '}
          <a
            href="https://github.com/genius8267/naval"
            target="_blank"
            rel="noopener"
          >
            genius8267/naval
          </a>
          의 아키텍처를 포크하고, 인물만 Russell Barkley로 교체했습니다. 목표는
          Barkley 인용을 흉내내는 챗봇이 아니라 <strong>Barkley처럼 추론하는
          에이전트</strong> — 실행기능을 중심 프레임으로 사용하고, 의지력
          기반 해결책을 구조적으로 거부하며, 약물치료를 수치 없이 옹호하고,
          외재화를 강화 대신 처방하는 사고 패턴을 강제합니다.
        </p>
      </section>

      <section>
        <h2>음성 회귀 검증</h2>
        <p>
          <code>scripts/eval.py</code>는 8개 정규 Q&amp;A를 Anthropic API에
          던지고 응답이 Barkley 음성 기준 10개 마커 중 8개 이상을 만족하는지
          자동 채점합니다. 브레인 파일이 드리프트하면 점수가 떨어져 즉시
          감지됩니다.
        </p>
        <pre>
          <code>{`pip install anthropic
export ANTHROPIC_API_KEY=sk-ant-...
python3 scripts/eval.py`}</code>
        </pre>
        <p>
          채점 기준: 실행기능 프레임 사용 · 의지력 프레임 거부 · 약물 옹호 ·
          gift framing 거부 · 수치심 다루기 · 외재화 권장 · 구체적 다음 단계 ·
          Barkley signature phrase · 직설 톤 · 임상가 referral. 8+/10 합격.
        </p>
      </section>

      <section>
        <h2>출처 grounding</h2>
        <p>
          페르소나는 Barkley 박사의 공개 *30 Essential Ideas* YouTube
          시리즈에서 직접 인용한 실제 발화로 grounding됐습니다. 브레인 파일에
          인용구가 등장할 때 <code>(30EI 5A)</code> 같은 episode 코드로
          출처를 명시합니다. 합성문이 아닌 실제 Barkley 텍스트로 voice를
          봉인하기 위함입니다.
        </p>
        <ul>
          <li>
            <a
              href="https://youtu.be/BzhbAK1pdPM"
              target="_blank"
              rel="noopener"
            >
              30EI 1A
            </a>{' '}
            — Intro: Chronic Developmental Disability
          </li>
          <li>
            <a
              href="https://youtu.be/wg6cfsnmqyg"
              target="_blank"
              rel="noopener"
            >
              30EI 1B
            </a>{' '}
            — Inhibition, Impulsivity, and Emotion
          </li>
          <li>
            <a
              href="https://youtu.be/Illf_Hsy570"
              target="_blank"
              rel="noopener"
            >
              30EI 3A
            </a>{' '}
            — The Five Executive Functions (the actual model)
          </li>
          <li>
            <a
              href="https://youtu.be/wmV8HQUuPEk"
              target="_blank"
              rel="noopener"
            >
              30EI 5A
            </a>{' '}
            — ADHD is Time Blindness
          </li>
          <li>
            <a
              href="https://youtu.be/yGOlNzaW7KA"
              target="_blank"
              rel="noopener"
            >
              30EI 5B
            </a>{' '}
            — ADHD is a Disorder of Self-Regulation
          </li>
          <li>
            <a
              href="https://youtu.be/Jj4UfRD-PIw"
              target="_blank"
              rel="noopener"
            >
              30EI 9B
            </a>{' '}
            — ADHD Medication Myths
          </li>
        </ul>
      </section>

      <section>
        <h2>샘플 응답</h2>
        <p>
          페르소나가 어떻게 답변하는지 미리 보세요. 실제{' '}
          <code>barkley</code> 호출 시 사용자 맥락에 맞춰 길이·뉘앙스가
          달라집니다.
        </p>

        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ color: 'var(--accent)' }}>
            Q. "I can't focus on anything important. Am I just lazy?"
          </h3>
          <p style={{ marginTop: 12 }}>
            <strong>Reframe</strong> — You haven't correctly named the problem.
            What you're calling "can't focus on important things" is the ADHD
            signature: the brain activates for interest, novelty, urgency, and
            challenge — not for abstract importance. That's not laziness.
            Laziness requires intact self-motivation to be chosen against. You
            don't have intact self-motivation to choose against.
          </p>
          <p>
            <strong>Root cause</strong> — Self-motivation deficit (the "mind's
            heart"). Importance is an abstract future-weighted value. The ADHD
            brain underweights the future.
          </p>
          <p>
            <strong>Intervention</strong> — Make the important thing immediate,
            concrete, externally accountable. Sub-task it down to 15 minutes.
            Put a person on the other end. Manufacture interest, urgency, or
            challenge.
          </p>
          <p>
            <strong>Bottom line</strong> — You are not lazy. You have an
            interest-based nervous system trying to run on an importance-based
            schedule. Change the schedule.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ color: 'var(--accent)' }}>
            Q. "ADHD is just a productivity excuse, right?"
          </h3>
          <p style={{ marginTop: 12 }}>
            No. And I won't be polite about this.
          </p>
          <p>
            ADHD has been studied for over a century. Heritability is roughly
            74–80% — on par with height. Stimulant effect sizes match or exceed
            most psychiatric medications in existence. Untreated ADHD shows
            measurable harm: 2–4× higher motor vehicle accident rate, higher
            divorce rate, lower income, higher substance use, shorter lifespan
            on the high-severity end.
          </p>
          <p>
            "Productivity excuse" is a rhetorical frame that rests on the
            assumption that self-regulation is a moral property rather than a
            neurological function. That assumption is false. Self-regulation is
            executed by specific brain systems that can be damaged, delayed, or
            weakened — same as memory, coordination, or language.
          </p>
          <p>
            <strong>Bottom line</strong> — ADHD is real, documented, treatable,
            and impairing. The "excuse" framing is misinformation. Don't let it
            delay evaluation or treatment.
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--accent)' }}>
            Q. "I'm 40 and just got diagnosed. Is it too late?"
          </h3>
          <p style={{ marginTop: 12 }}>
            No. You're right on time — "on time" being whenever you got there.
          </p>
          <p>
            Forty years of running on unmedicated, unscaffolded executive
            function in a world optimized for intact executive function has
            accumulated wear. You're feeling the wear. You may also be grieving
            the years when you didn't know. That grief is appropriate.
          </p>
          <p>
            Late-life diagnosis changes three things: you stop attributing
            impairment to character flaw; you become eligible for evidence-based
            treatment; and you can name what you've been dealing with so
            partners and employers can respond accurately instead of to a wrong
            model.
          </p>
          <p>
            <strong>Bottom line</strong> — You are not too late. You're 40 and
            now you know what you're working with. That's not a ceiling. That's
            a starting line.
          </p>
        </div>
      </section>

      <div className="disclaimer">
        <strong>면책.</strong> 이 스킬은 Barkley 박사 또는 그의 기관과
        무관한 비공식 AI 합성 페르소나입니다. 임상 진단·처방·치료를 대체하지
        않습니다. 평가·약물·위기 상황은 면허 있는 임상가와 상의하세요.
        모든 콘텐츠는 공개된 저서·강의·논문에서 합성된 교육·의사결정 보조
        목적입니다.
      </div>

      <footer>
        <p>
          Architecture forked from{' '}
          <a
            href="https://github.com/genius8267/naval"
            target="_blank"
            rel="noopener"
          >
            genius8267/naval
          </a>
          . Brain content synthesized from Russell Barkley's publicly
          available work — <em>Taking Charge of ADHD</em>,{' '}
          <em>Taking Charge of Adult ADHD</em>, <em>ADHD in Adults</em>,
          public lectures, the 30 Essential Ideas series.
        </p>
        <p style={{ marginTop: 12 }}>
          Source:{' '}
          <a
            href="https://github.com/voidlight/brain-of-barkley"
            target="_blank"
            rel="noopener"
          >
            github.com/voidlight/brain-of-barkley
          </a>
        </p>
      </footer>
    </main>
  );
}
