'use client';

import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react';

const SUGGESTED = [
  "I can't focus on anything important. Am I just lazy?",
  'I know what to do but I cannot do it. What is wrong with me?',
  'ADHD is just a productivity excuse, right?',
  "I'm 40 and just got diagnosed. Is it too late?",
];

type Status = 'idle' | 'streaming' | 'done' | 'error';

export function BarkleyChat() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const submit = async (q: string) => {
    if (!q.trim() || status === 'streaming') return;
    setQuestion(q);
    setResponse('');
    setError(null);
    setStatus('streaming');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/barkley', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errBody = await res.text();
        let msg = errBody;
        try {
          msg = (JSON.parse(errBody) as { error?: string }).error ?? errBody;
        } catch {
          /* ignore */
        }
        setError(msg || `HTTP ${res.status}`);
        setStatus('error');
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setError('No response body');
        setStatus('error');
        return;
      }
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setResponse((prev) => prev + chunk);
      }
      setStatus('done');
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError((err as Error).message);
      setStatus('error');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit(question);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void submit(question);
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setStatus('idle');
  };

  return (
    <div className="chat">
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="질문을 입력하세요. 예: I can't start tasks. What's wrong with me?"
          maxLength={500}
          rows={3}
          disabled={status === 'streaming'}
        />
        <div className="chat-actions">
          <span className="chat-counter">{question.length} / 500</span>
          {status === 'streaming' ? (
            <button type="button" onClick={stop} className="chat-button chat-stop">
              중지
            </button>
          ) : (
            <button
              type="submit"
              className="chat-button"
              disabled={!question.trim()}
            >
              물어보기 (⌘+Enter)
            </button>
          )}
        </div>
      </form>

      {status === 'idle' && !response && (
        <div className="chat-suggested">
          <p className="chat-suggested-label">샘플 질문:</p>
          <ul>
            {SUGGESTED.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => void submit(s)}
                  className="chat-suggested-item"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(response || status === 'streaming') && (
        <div className="chat-response">
          <div className="chat-response-meta">
            <span className="chat-tag">Barkley · claude-sonnet-4-5</span>
            {status === 'streaming' && <span className="chat-cursor">▌</span>}
          </div>
          <div className="chat-response-body">{response}</div>
        </div>
      )}

      {error && (
        <div className="chat-error">
          <strong>오류:</strong> {error}
        </div>
      )}

      <p className="chat-footnote">
        ⚠️ 비공식 AI 합성 페르소나. 실제 Barkley 박사 또는 임상 진료를 대체하지
        않습니다. 위기 상황(자살·자해 의사)은 즉시 한국 1393 / 미국 988로
        연락하세요.
      </p>
    </div>
  );
}
