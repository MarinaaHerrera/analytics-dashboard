// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { fetchTikTokMetadata } from '../../../lib/connectors/tiktok';

export const runtime = 'nodejs';     // not edge — scrapers can run long
export const maxDuration = 60;       // Vercel function timeout (seconds)

function isTikTokUrl(u: string): boolean {
  try {
    const h = new URL(u).hostname.replace(/^www\./, '');
    return h === 'tiktok.com' || h.endsWith('.tiktok.com');
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url || !isTikTokUrl(url)) {
    return NextResponse.json(
      { error: 'Provide a valid TikTok post URL in { "url": ... }' },
      { status: 400 },
    );
  }

  try {
    const post = await fetchTikTokMetadata(url);
    return NextResponse.json({ post }, { status: 200 });
  } catch (err) {
    console.error('[/api/analyze]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Ingestion failed' },
      { status: 502 },
    );
  }
}
