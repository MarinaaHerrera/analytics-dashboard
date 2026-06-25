"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface VideoMetrics {
  views: number;
  engagementRate: number;
  hookRetention: number;
  avgWatchTime: string;
  trend: "up" | "down" | "neutral";
}

interface InsightCard {
  label: string;
  value: string;
  delta?: string;
  deltaDir?: "up" | "down";
  sub?: string;
}

// ─── Mock data (replace with real API calls) ──────────────────────────────────
const MOCK_METRICS: VideoMetrics = {
  views: 284_300,
  engagementRate: 8.4,
  hookRetention: 72,
  avgWatchTime: "0:38",
  trend: "up",
};

function buildCards(m: VideoMetrics): InsightCard[] {
  return [
    {
      label: "Total Views",
      value: m.views.toLocaleString(),
      delta: "+12.4%",
      deltaDir: "up",
      sub: "vs. last 28 days",
    },
    {
      label: "Engagement Rate",
      value: `${m.engagementRate}%`,
      delta: "+0.6 pp",
      deltaDir: "up",
      sub: "likes · comments · shares",
    },
    {
      label: "Hook Retention",
      value: `${m.hookRetention}%`,
      delta: "−3%",
      deltaDir: "down",
      sub: "watched past 3 s",
    },
    {
      label: "Avg Watch Time",
      value: m.avgWatchTime,
      sub: "per viewer session",
    },
  ];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ card }: { card: InsightCard }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl border border-zinc-100 p-6 cursor-pointer
                 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]
                 transition-shadow duration-200"
      onClick={() => setOpen(!open)}
    >
      {/* Label */}
      <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
        {card.label}
      </p>

      {/* Primary value */}
      <p className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 font-display">
        {card.value}
      </p>

      {/* Delta badge */}
      {card.delta && (
        <span
          className={`mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full
            ${
              card.deltaDir === "up"
                ? "bg-lime-50 text-lime-700"
                : "bg-red-50 text-red-600"
            }`}
        >
          {card.deltaDir === "up" ? "↑" : "↓"} {card.delta}
        </span>
      )}

      {/* Sub label */}
      {card.sub && (
        <p className="mt-1.5 text-xs text-zinc-400">{card.sub}</p>
      )}

      {/* Progressive disclosure drawer */}
      {open && (
        <div className="mt-4 pt-4 border-t border-zinc-100">
          <p className="text-xs text-zinc-500 leading-relaxed">
            Drill-down chart coming soon. Connect your TikTok account to see
            day-by-day breakdown for this metric.
          </p>
        </div>
      )}

      {/* Expand hint */}
      <span className="absolute top-5 right-5 text-zinc-300 text-xs group-hover:text-zinc-500 transition-colors">
        {open ? "↑" : "↓"}
      </span>
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  onSubmit,
  loading,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <input
          type="url"
          placeholder="Paste a TikTok or Reel URL to analyse…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          className="w-full h-11 pl-4 pr-4 rounded-xl border border-zinc-200 bg-white
                     text-sm text-zinc-800 placeholder:text-zinc-400
                     focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400
                     transition"
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        className="h-11 px-5 rounded-xl text-sm font-medium
                   bg-zinc-900 text-white hover:bg-zinc-700
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
      >
        {loading ? "Analysing…" : "Analyse"}
      </button>
    </div>
  );
}

// Tiny sparkline — replace with Recharts when you're ready
function SparkLine({ upward }: { upward: boolean }) {
  const points = upward
    ? "0,40 20,38 40,30 60,28 80,20 100,14 120,10"
    : "0,10 20,14 40,20 60,28 80,30 100,38 120,40";

  return (
    <svg viewBox="0 0 120 50" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={upward ? "#84cc16" : "#ef4444"}
            stopOpacity="0.18"
          />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,50 ${points} 120,50`}
        fill="url(#lg)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={upward ? "#84cc16" : "#ef4444"}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysed, setAnalysed] = useState(false);

  const metrics = MOCK_METRICS;
  const cards = buildCards(metrics);

  function handleAnalyse() {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalysed(true);
    }, 1400);
  }

  return (
    // Root: off-white bg, full-height, Inter + display font via CSS vars
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            Creator Growth Engine
          </span>
          <span className="text-xs text-zinc-400 font-medium px-2.5 py-0.5 bg-lime-50 text-lime-700 rounded-full">
            Beta
          </span>
        </div>
      </nav>

      {/* ── Main ────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-14 space-y-14">

        {/* Hero copy */}
        <section className="space-y-3 max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 leading-snug font-display">
            What's killing your views?
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Paste any TikTok or Reel URL. We'll surface the exact moment viewers
            drop off and tell you how to fix it.
          </p>
        </section>

        {/* Search */}
        <section>
          <SearchBar
            value={url}
            onChange={setUrl}
            onSubmit={handleAnalyse}
            loading={loading}
          />
        </section>

        {/* KPI grid — visible after analysis OR always for demo */}
        {(analysed || true) && (
          <section className="space-y-4">
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
              Performance overview
            </p>

            {/* 4-column KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((c) => (
                <KpiCard key={c.label} card={c} />
              ))}
            </div>
          </section>
        )}

        {/* Trend chart band */}
        {(analysed || true) && (
          <section className="bg-white rounded-2xl border border-zinc-100 p-6
                              shadow-[0_1px_4px_rgba(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
                Views · Last 28 days
              </p>
              <span className="text-xs text-lime-700 bg-lime-50 px-2 py-0.5 rounded-full font-medium">
                ↑ Trending up
              </span>
            </div>
            <SparkLine upward={metrics.trend === "up"} />
            <p className="text-xs text-zinc-400">
              Connect your TikTok account for real-time data. Showing sample
              trend.
            </p>
          </section>
        )}

        {/* Auto-Fix suggestions — progressive disclosure */}
        {(analysed || true) && (
          <section className="space-y-3">
            <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
              Auto-fix suggestions
            </p>

            {[
              {
                id: "hook",
                severity: "high",
                title: "Weak hook — first 2 s",
                detail:
                  "72% of viewers exit before the 3-second mark. Open with a visual payoff or a direct question to reduce early drop-off.",
              },
              {
                id: "cta",
                severity: "medium",
                title: "No mid-video CTA",
                detail:
                  "Engagement spikes when a comment prompt is placed at the 40–60% watch-time window. Add a \"comment your answer\" card.",
              },
              {
                id: "caption",
                severity: "low",
                title: "Caption is under 100 chars",
                detail:
                  "Longer captions (150–220 chars) correlate with +18% saves on this content category.",
              },
            ].map((fix) => (
              <AutoFixRow key={fix.id} fix={fix} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

// ─── AutoFix row with progressive disclosure ──────────────────────────────────
function AutoFixRow({
  fix,
}: {
  fix: { id: string; severity: string; title: string; detail: string };
}) {
  const [open, setOpen] = useState(false);

  const dot: Record<string, string> = {
    high: "bg-red-400",
    medium: "bg-amber-400",
    low: "bg-lime-400",
  };

  return (
    <div
      className="bg-white rounded-2xl border border-zinc-100 px-5 py-4 cursor-pointer
                 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]
                 transition-shadow duration-200"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot[fix.severity]}`} />
        <p className="text-sm font-medium text-zinc-800 flex-1">{fix.title}</p>
        <span className="text-zinc-300 text-xs">{open ? "↑" : "↓"}</span>
      </div>

      {open && (
        <p className="mt-3 ml-5 text-xs text-zinc-500 leading-relaxed">
          {fix.detail}
        </p>
      )}
    </div>
  );
}
