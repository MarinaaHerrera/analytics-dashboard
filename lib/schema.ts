// lib/schema.ts
export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'facebook';

export type Format =
  | 'short_video' | 'long_video' | 'reel'
  | 'carousel' | 'image' | 'story';

export interface PostMetric {
  id: string;
  platform: Platform;
  url: string;
  publishedAt: string;          // ISO 8601
  format: Format;
  topic: string | null;         // null here — enriched later by the LLM step
  caption: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    reach: number;
  };
  engagementRate: number;       // percent, e.g. 11.2
  trendingAudio: boolean;
}
