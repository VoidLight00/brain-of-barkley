import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brain of Russell Barkley — Claude Code & OpenClaw Skill',
  description:
    'AI-synthesized clinical persona of Dr. Russell Barkley. Direct, evidence-based ADHD consultation in Claude Code or OpenClaw. Unofficial.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
