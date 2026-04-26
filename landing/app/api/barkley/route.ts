// app/api/barkley/route.ts
// Live Barkley persona endpoint. POST { question: string } → streamed text.
//
// Requires env: ANTHROPIC_API_KEY (set on Vercel: `vercel env add ANTHROPIC_API_KEY production`)
//
// Cost guardrails:
//   - 800 token output cap
//   - In-memory rate limit (10 req / IP / hour, resets on instance recycle)
//   - Question length limit: 500 chars
//   - Model: claude-sonnet-4-5 (balance of quality and demo cost)
//
// Safety:
//   - Crisis-keyword detection → returns crisis-line referral, does NOT call API
//   - Disclaimer in response headers

import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { BARKLEY_SYSTEM_PROMPT } from '../../_persona';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_QUESTION_CHARS = 500;
const MAX_OUTPUT_TOKENS = 800;
const RATE_LIMIT_PER_HOUR = 10;
const HOUR_MS = 60 * 60 * 1000;

const buckets = new Map<string, { count: number; resetAt: number }>();

const CRISIS_PATTERNS = [
  /suicide|kill myself|end my life|want to die|자살|죽고\s?싶/i,
  /self-?harm|cut myself|자해/i,
  /overdose|약\s?다\s?먹/i,
];

const CRISIS_RESPONSE = `I hear you. What you're describing is beyond what this skill can help with — and it should be.

Please contact a crisis line right now:
• United States: 988 (Suicide & Crisis Lifeline) — call or text
• United Kingdom: 116 123 (Samaritans)
• 한국: 1393 (자살예방상담전화), 1577-0199 (정신건강위기상담)
• International: https://findahelpline.com

You are not alone. The right help for this moment is a human, not a synthesized persona.`;

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + HOUR_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_PER_HOUR) return false;
  bucket.count += 1;
  return true;
}

function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: Request): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'Server not configured. Maintainer must set ANTHROPIC_API_KEY.',
      }),
      { status: 503, headers: { 'content-type': 'application/json' } },
    );
  }

  let body: { question?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const question = body.question;
  if (!question || typeof question !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Missing or invalid "question" field' }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  if (question.length > MAX_QUESTION_CHARS) {
    return new Response(
      JSON.stringify({
        error: `Question too long (${question.length} > ${MAX_QUESTION_CHARS})`,
      }),
      { status: 400, headers: { 'content-type': 'application/json' } },
    );
  }

  if (CRISIS_PATTERNS.some((re) => re.test(question))) {
    return new Response(CRISIS_RESPONSE, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-disclaimer': 'crisis-referral',
      },
    });
  }

  const ip = getClientIp(req);
  if (!rateLimitOk(ip)) {
    return new Response(
      JSON.stringify({
        error:
          'Rate limit reached (10 questions per hour). Try again later, or self-host: github.com/VoidLight00/brain-of-barkley',
      }),
      { status: 429, headers: { 'content-type': 'application/json' } },
    );
  }

  try {
    const result = streamText({
      model: anthropic('claude-sonnet-4-5'),
      system: BARKLEY_SYSTEM_PROMPT,
      prompt: `barkley ${question}`,
      temperature: 0.4,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });

    return result.toTextStreamResponse({
      headers: {
        'x-disclaimer': 'unofficial-ai-persona',
        'cache-control': 'no-store',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export function GET(): Response {
  return new Response(
    JSON.stringify({
      name: 'brain-of-barkley/api',
      method: 'POST',
      schema: { question: 'string (max 500 chars)' },
      response: 'text/plain stream',
      ratelimit: `${RATE_LIMIT_PER_HOUR} req / IP / hour`,
      disclaimer: 'unofficial-ai-persona — not Dr. Barkley, not clinical care',
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );
}
