"use client";
import { useState } from "react";

interface Metrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Metrics | null>(null);

  async function handleAnalyse() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      const m = json.post.metrics;
      setData({
        views: m.views,
        likes: m.likes,
        comments: m.comments,
        shares: m.shares,
        saves: m.saves,
        engagementRate: json.post.engagementRate,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-zinc-50/80 backdrop-blur border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            Creator Growth Engine
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 bg-lime-50 text-lime-700 rounded-full">
            Beta
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-14 space-y-14">

        {/* Hero */}
        <section className="space-y-3 max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 leading-snug">
            What's killing your views?
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Paste any TikTok URL. We'll pull the real numbers and tell you how to fix it.
          </p>
        </section>

        {/* Search */}
        <section className="flex items-center gap-3">
          <input
            type="url"
            placeholder="Paste a TikTok URL…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyse()}
            className="flex-1 h-11 px-4 rounded-xl border border-zinc-200 bg-white text-sm
                       text-zinc-800 placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400"
          />
          <button
            onClick={handleAnalyse}
            disabled={loading || !url.trim()}
            className="h-11 px-5 rounded-xl text-sm font-medium bg-zinc-900 text-white
                       hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analysing…" : "Analyse"}
          </button>
        </section>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Results — only show after real data comes back */}
        {data && (
          <>
            <section className="space-y-4">
              <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
                Performance overview
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Views", value: data.views.toLocaleString() },
                  { label: "Engagement Rate", value: `${data.engagementRate}%` },
                  { label: "Likes", value: data.likes.toLocaleString() },
                  { label: "Comments", value: data.comments.toLocaleString() },
                  { label: "Shares", value: data.shares.toLocaleString() },
                  { label: "Saves", value: data.saves.toLocaleString() },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-white rounded-2xl border border-zinc-100 p-6
                               shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                  >
                    <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Auto-fix suggestions */}
            <section className="space-y-3">
              <p className="text-xs font-medium tracking-widest uppercase text-zinc-400">
                Auto-fix suggestions
              </p>
              {[
                data.engagementRate < 5 && {
                  severity: "high",
                  title: "Low engagement rate",
                  detail: "Under 5% engagement usually means the hook isn't landing. Try opening with a bold statement or question in the first 2 seconds.",
                },
                data.saves < data.likes * 0.1 && {
                  severity: "medium",
                  title: "Low save rate",
                  detail: "Saves signal that viewers want to come back. Add a 'save this for later' prompt or make the content more reference-worthy.",
                },
                data.comments < 50 && {
                  severity: "low",
                  title: "Few comments",
                  detail: "Ask a direct question in your caption or on screen to drive comments. The algorithm rewards conversation.",
                },
              ]
                .filter(Boolean)
                .map((fix: any) => (
                  <div
                    key={fix.title}
                    className="bg-white rounded-2xl border border-zinc-100 px-5 py-4
                               shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        fix.severity === "high" ? "bg-red-400" :
                        fix.severity === "medium" ? "bg-amber-400" : "bg-lime-400"
                      }`} />
                      <p className="text-sm font-medium text-zinc-800">{fix.title}</p>
                    </div>
                    <p className="mt-2 ml-5 text-xs text-zinc-500 leading-relaxed">{fix.detail}</p>
                  </div>
                ))}
            </section>
          </>
        )}

        {/* Empty state — before any search */}
        {!data && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-sm">Paste a TikTok URL above to see real data</p>
          </div>
        )}

      </main>
    </div>
  );
}
