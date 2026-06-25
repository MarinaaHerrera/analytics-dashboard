// lib/connectors/tiktok.ts
import type { PostMetric } from '@/lib/schema';

// ---- raw shape returned by Apify's clockworks/tiktok-scraper ----
interface ApifyTikTokItem {
  id: string;
  webVideoUrl: string;
  text: string;
  createTimeISO: string;
  playCount: number;
  diggCount: number;     // likes
  commentCount: number;
  shareCount: number;
  collectCount: number;  // saves
  videoMeta?: { duration?: number };
  musicMeta?: { musicOriginal?: boolean };
}

function engagementRate(m: {
  likes: number; comments: number; shares: number; saves: number; views: number;
}): number {
  if (!m.views) return 0;
  const interactions = m.likes + m.comments + m.shares + m.saves;
  return Math.round((interactions / m.views) * 1000) / 10; // 1 dp, percent
}

// ---- normalize raw -> PostMetric (the dashboard's structure) ----
export function mapTikTok(raw: ApifyTikTokItem): PostMetric {
  const metrics = {
    views: raw.playCount ?? 0,
    likes: raw.diggCount ?? 0,
    comments: raw.commentCount ?? 0,
    shares: raw.shareCount ?? 0,
    saves: raw.collectCount ?? 0,
    reach: raw.playCount ?? 0,        // TikTok exposes views, not reach — proxy with views
  };
  const duration = raw.videoMeta?.duration ?? 0;

  return {
    id: raw.id,
    platform: 'tiktok',
    url: raw.webVideoUrl,
    publishedAt: raw.createTimeISO,
    format: duration > 60 ? 'long_video' : 'short_video',
    topic: null,
    caption: raw.text ?? '',
    metrics,
    engagementRate: engagementRate(metrics),
    // musicOriginal === false means a reused/trending sound
    trendingAudio: raw.musicMeta?.musicOriginal === false,
  };
}

// ---- call the scraper and return one normalized PostMetric ----
export async function fetchTikTokMetadata(url: string): Promise<PostMetric> {
  const token = process.env.APIFY_TOKEN;
  const actor = process.env.APIFY_TIKTOK_ACTOR ?? 'clockworks~tiktok-scraper';
  if (!token) throw new Error('Missing APIFY_TOKEN');

  // run-sync-get-dataset-items: runs the actor and returns results in one request
  const endpoint =
    `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${token}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      postURLs: [url],
      resultsPerPage: 1,
      shouldDownloadVideos: false,
      shouldDownloadCovers: false,
    }),
    // scrapers are slow; opt out of Next's fetch cache
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Scraper error ${res.status}: ${await res.text()}`);
  }

  const items = (await res.json()) as ApifyTikTokItem[];
  if (!items?.length) throw new Error('No data returned for that URL');

  return mapTikTok(items[0]);
}
