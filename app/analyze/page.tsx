"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Metrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
}

function viralScore(m: Metrics): number {
  const engScore = Math.min(m.engagementRate / 15 * 40, 40);
  const saveScore = Math.min((m.saves / Math.max(m.views, 1)) * 100 / 0.05 * 25, 25);
  const commentScore = Math.min((m.comments / Math.max(m.views, 1)) * 100 / 0.02 * 20, 20);
  const shareScore = Math.min((m.shares / Math.max(m.views, 1)) * 100 / 0.03 * 15, 15);
  return Math.round(engScore + saveScore + commentScore + shareScore);
}

function scoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Viral", color: "#84cc16" };
  if (score >= 60) return { label: "Strong", color: "#7c3aed" };
  if (score >= 40) return { label: "Average", color: "#f59e0b" };
  if (score >= 20) return { label: "Weak", color: "#f72585" };
  return { label: "Critical", color: "#ef4444" };
}

function getInsights(m: Metrics) {
  const insights = [];
  const saveRate = (m.saves / Math.max(m.views, 1)) * 100;
  const commentRate = (m.comments / Math.max(m.views, 1)) * 100;
  const shareRate = (m.shares / Math.max(m.views, 1)) * 100;

  if (m.engagementRate < 3) {
    insights.push({ severity: "high", title: "Engagement critically low", detail: `Your ${m.engagementRate}% engagement is below TikTok's 3% baseline.`, fix: "Rewrite your hook. The first 2 seconds must create pattern interruption — start mid-action or open with a surprising statement." });
  } else if (m.engagementRate < 6) {
    insights.push({ severity: "medium", title: "Engagement below average", detail: `${m.engagementRate}% is under the 6% benchmark for growing accounts.`, fix: "Add a direct CTA at the 40–60% mark: 'Comment your answer below' or 'Save this if you needed it.'" });
  }
  if (saveRate < 1) {
    insights.push({ severity: "high", title: "Save rate under 1%", detail: `Only ${saveRate.toFixed(2)}% of viewers saved this. Saves are TikTok's strongest signal.`, fix: "Make your content a reference resource. Add '💾 Save this for later' on screen." });
  }
  if (commentRate < 0.5) {
    insights.push({ severity: "medium", title: "Low comment rate", detail: `${commentRate.toFixed(2)}% comment rate. TikTok weighs comments heavily.`, fix: "End with a polarizing question. 'Which one are you: A or B?' drives comments." });
  }
  if (shareRate < 0.5) {
    insights.push({ severity: "low", title: "Share rate could be higher", detail: `${shareRate.toFixed(2)}% share rate. Shares push content outside your existing audience.`, fix: "Create 'send this to someone' content — relatable moments or niche inside jokes." });
  }
  if (insights.length === 0) {
    insights.push({ severity: "low", title: "Strong performance — optimize for scale", detail: "This video is performing above benchmarks.", fix: "Post a follow-up within 24 hours using the same hook format." });
  }
  return insights;
}

export default function AnalyzePage() {
  const router = useRouter();
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
      setData({ views: m.views, likes: m.likes, comments: m.comments, shares: m.shares, saves: m.saves, engagementRate: json.post.engagementRate });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const score = data ? viralScore(data) : null;
  const scoreInfo = score !== null ? scoreLabel(score) : null;
  const insights = data ? getInsights(data) : [];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#fff", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #000" }}>
        <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", fontWeight: 900, letterSpacing: "-0.04em" }}>
          Pop<span style={{ color: "#f72585" }}>Off</span>
        </button>
        <span style={{ fontSize: "13px", fontWeight: 700, background: "#84cc16", border: "2px solid #000", borderRadius: "999px", padding: "3px 12px" }}>Analyse a Video</span>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Header */}
        <section>
          <h1 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 8px 0" }}>Analyse a posted video</h1>
          <p style={{ fontSize: "15px", color: "#71717a", margin: 0 }}>Paste any TikTok URL. Get real data + your PopOff Score.</p>
        </section>

        {/* Search */}
        <section style={{ display: "flex", gap: "10px" }}>
          <input
            type="url"
            placeholder="https://www.tiktok.com/@username/video/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyse()}
            style={{ flex: 1, height: "48px", padding: "0 16px", borderRadius: "12px", border: "2px solid #000", fontSize: "14px", outline: "none" }}
          />
          <button
            onClick={handleAnalyse}
            disabled={loading || !url.trim()}
            style={{ height: "48px", padding: "0 24px", borderRadius: "12px", border: "2px solid #000", background: loading ? "#e4e4e7" : "#f72585", color: loading ? "#000" : "#fff", fontSize: "14px", fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", boxShadow: "3px 3px 0px #000" }}
          >
            {loading ? "Analysing…" : "Analyse →"}
          </button>
        </section>

        {/* Error */}
        {error && (
          <div style={{ background: "#fff0f5", border: "2px solid #f72585", borderRadius: "12px", padding: "14px 18px" }}>
            <p style={{ fontSize: "13px", color: "#f72585", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {data && score !== null && scoreInfo && (
          <>
            {/* Viral Score */}
            <section style={{ background: "#ffe600", border: "3px solid #000", borderRadius: "16px", padding: "28px", boxShadow: "5px 5px 0px #000" }}>
              <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>PopOff Score</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "12px" }}>
                <span style={{ fontSize: "64px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: "22px", color: "#71717a", fontWeight: 600 }}>/100</span>
                <span style={{ fontSize: "14px", fontWeight: 800, padding: "4px 14px", borderRadius: "999px", border: "2px solid #000", background: "#fff" }}>{scoreInfo.label}</span>
              </div>
              <div style={{ height: "10px", background: "#fff", borderRadius: "999px", border: "2px solid #000", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${score}%`, background: "#f72585", borderRadius: "999px" }} />
              </div>
            </section>

            {/* KPI Grid */}
            <section>
              <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px", color: "#71717a" }}>Performance overview</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "Views", value: data.views.toLocaleString(), bg: "#f0fdf4" },
                  { label: "Engagement", value: `${data.engagementRate}%`, bg: data.engagementRate >= 6 ? "#f0fdf4" : "#fff0f5" },
                  { label: "Likes", value: data.likes.toLocaleString(), bg: "#fff0f5" },
                  { label: "Comments", value: data.comments.toLocaleString(), bg: "#fefce8" },
                  { label: "Shares", value: data.shares.toLocaleString(), bg: "#f0f9ff" },
                  { label: "Saves", value: data.saves.toLocaleString(), bg: "#f0fdf4" },
                ].map((card) => (
                  <div key={card.label} style={{ background: card.bg, border: "2px solid #000", borderRadius: "12px", padding: "18px", boxShadow: "3px 3px 0px #000" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#71717a" }}>{card.label}</div>
                    <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.03em", marginTop: "4px" }}>{card.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fixes */}
            <section>
              <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px", color: "#71717a" }}>AI-powered fixes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {insights.map((ins: any) => {
                  const colors: any = { high: "#f72585", medium: "#f59e0b", low: "#84cc16" };
                  const c = colors[ins.severity];
                  return (
                    <div key={ins.title} style={{ background: "#fff", border: "2px solid #000", borderRadius: "12px", padding: "18px 20px", boxShadow: "3px 3px 0px #000", borderLeft: `6px solid ${c}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", padding: "2px 8px", borderRadius: "4px", background: c, color: ins.severity === "medium" ? "#000" : "#fff" }}>{ins.severity}</span>
                        <span style={{ fontSize: "15px", fontWeight: 800 }}>{ins.title}</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 10px 0", lineHeight: 1.5 }}>{ins.detail}</p>
                      <div style={{ background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: "8px", padding: "10px 14px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#f72585", marginRight: "8px" }}>Fix →</span>
                        <span style={{ fontSize: "13px", color: "#52525b" }}>{ins.fix}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {!data && !loading && !error && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#d4d4d8" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔗</div>
            <p style={{ fontSize: "14px" }}>Paste a TikTok URL above to get started</p>
          </div>
        )}

      </main>
    </div>
  );
}
