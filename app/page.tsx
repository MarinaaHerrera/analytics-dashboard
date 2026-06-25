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

function viralScore(m: Metrics): number {
  // Weighted score out of 100 based on TikTok algorithm signals
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

function getInsights(m: Metrics): Array<{ severity: "high" | "medium" | "low"; title: string; detail: string; fix: string }> {
  const insights = [];
  const saveRate = (m.saves / Math.max(m.views, 1)) * 100;
  const commentRate = (m.comments / Math.max(m.views, 1)) * 100;
  const shareRate = (m.shares / Math.max(m.views, 1)) * 100;

  if (m.engagementRate < 3) {
    insights.push({
      severity: "high" as const,
      title: "Engagement critically low",
      detail: `Your ${m.engagementRate}% engagement is below TikTok's 3% baseline. The algorithm is likely suppressing distribution.`,
      fix: "Rewrite your hook. The first 2 seconds must create pattern interruption — start mid-action, use a bold text overlay, or open with a surprising statement.",
    });
  } else if (m.engagementRate < 6) {
    insights.push({
      severity: "medium" as const,
      title: "Engagement below average",
      detail: `${m.engagementRate}% is under the 6% benchmark for growing accounts. You're getting views but not converting them into interaction.`,
      fix: "Add a direct CTA at the 40–60% mark: 'Comment your answer below' or 'Save this if you needed it.' Mid-video CTAs outperform end-card CTAs 3x.",
    });
  }

  if (saveRate < 1) {
    insights.push({
      severity: "high" as const,
      title: "Save rate under 1% — algorithm penalty",
      detail: `Only ${saveRate.toFixed(2)}% of viewers saved this. Saves are TikTok's strongest signal for pushing content to new audiences.`,
      fix: "Make your content a 'reference resource.' Lists, tutorials, and 'screenshot-worthy' text slides drive saves. Add '💾 Save this for later' on screen.",
    });
  }

  if (commentRate < 0.5) {
    insights.push({
      severity: "medium" as const,
      title: "Low comment rate",
      detail: `${commentRate.toFixed(2)}% comment rate. TikTok's algorithm weighs comments heavily because they signal emotional response.`,
      fix: "End with a polarizing question or incomplete thought. 'I can't believe people still do X...' or 'Which one are you: A or B?' — controversy drives comments.",
    });
  }

  if (shareRate < 0.5) {
    insights.push({
      severity: "low" as const,
      title: "Share rate could be higher",
      detail: `${shareRate.toFixed(2)}% share rate. Shares push your content outside your existing audience — they're how accounts break out.`,
      fix: "Create 'for you to send to someone' content. Relatable moments, inside jokes for a niche, or something that makes people think 'this is literally my friend.'",
    });
  }

  if (insights.length === 0) {
    insights.push({
      severity: "low" as const,
      title: "Strong performance — optimize for scale",
      detail: "This video is performing above benchmarks. Focus on replicating the format, hook style, and posting time.",
      fix: "Post a follow-up within 24 hours using the same hook format. TikTok rewards account momentum — capitalize while the algorithm is favouring you.",
    });
  }

  return insights;
}

const ALGO_BENCHMARKS = [
  { label: "Engagement Rate", good: "6–15%", great: "15%+", signal: "Overall interaction health" },
  { label: "Save Rate", good: "1–3%", great: "3%+", signal: "Content value / rewatch intent" },
  { label: "Comment Rate", good: "0.5–2%", great: "2%+", signal: "Emotional resonance" },
  { label: "Share Rate", good: "0.5–1.5%", great: "1.5%+", signal: "Audience expansion" },
  { label: "Views to Followers", good: "10–30%", great: "30%+", signal: "New audience reach" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Metrics | null>(null);
  const [showAlgo, setShowAlgo] = useState(false);

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

  const score = data ? viralScore(data) : null;
  const scoreInfo = score !== null ? scoreLabel(score) : null;
  const insights = data ? getInsights(data) : [];

  return (
    <div style={{ background: "#0f0f11", minHeight: "100vh", fontFamily: "Inter, sans-serif", color: "#e4e4e7" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1c1c24", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0f0f11", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7c3aed" }} />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>Creator Growth Engine</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "999px", background: "#7c3aed22", color: "#a78bfa", border: "1px solid #7c3aed44" }}>Beta</span>
        </div>
      </nav>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* Hero */}
        <section>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7c3aed", marginBottom: "12px" }}>TikTok Analytics</div>
          <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", margin: 0 }}>
            What's killing<br />
            <span style={{ background: "linear-gradient(90deg, #7c3aed, #f72585)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your views?</span>
          </h1>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "#71717a", lineHeight: 1.6 }}>
            Paste any TikTok URL. Real data, real algorithm insights, real fixes.
          </p>
        </section>

        {/* Search */}
        <section style={{ display: "flex", gap: "10px" }}>
          <input
            type="url"
            placeholder="https://www.tiktok.com/@username/video/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyse()}
            style={{
              flex: 1, height: "44px", padding: "0 16px", borderRadius: "10px",
              border: "1px solid #27272a", background: "#18181b", color: "#fff",
              fontSize: "14px", outline: "none",
            }}
          />
          <button
            onClick={handleAnalyse}
            disabled={loading || !url.trim()}
            style={{
              height: "44px", padding: "0 20px", borderRadius: "10px", border: "none",
              background: loading ? "#3f3f46" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
              color: "#fff", fontSize: "14px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              opacity: !url.trim() ? 0.4 : 1,
            }}
          >
            {loading ? "Analysing…" : "Analyse →"}
          </button>
        </section>

        {/* Error */}
        {error && (
          <div style={{ background: "#f7258511", border: "1px solid #f7258533", borderRadius: "10px", padding: "14px 18px" }}>
            <p style={{ fontSize: "13px", color: "#f72585", margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Results */}
        {data && score !== null && scoreInfo && (
          <>
            {/* Viral Score Banner */}
            <section style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "14px", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525b", marginBottom: "8px" }}>Viral Score</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span style={{ fontSize: "56px", fontWeight: 800, color: scoreInfo.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{score}</span>
                  <span style={{ fontSize: "20px", color: "#52525b", fontWeight: 500 }}>/100</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", background: scoreInfo.color + "22", color: scoreInfo.color, border: `1px solid ${scoreInfo.color}44` }}>{scoreInfo.label}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#52525b", marginTop: "8px" }}>Weighted across engagement, saves, comments & shares vs. TikTok benchmarks</p>
              </div>
              {/* Score bar */}
              <div style={{ width: "160px", flexShrink: 0 }}>
                <div style={{ height: "8px", background: "#27272a", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${score}%`, background: `linear-gradient(90deg, #7c3aed, ${scoreInfo.color})`, borderRadius: "999px", transition: "width 1s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                  <span style={{ fontSize: "10px", color: "#52525b" }}>0</span>
                  <span style={{ fontSize: "10px", color: "#52525b" }}>100</span>
                </div>
              </div>
            </section>

            {/* KPI Grid */}
            <section>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525b", marginBottom: "14px" }}>Performance overview</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "Total Views", value: data.views.toLocaleString(), accent: "#7c3aed" },
                  { label: "Engagement Rate", value: `${data.engagementRate}%`, accent: data.engagementRate >= 6 ? "#84cc16" : "#f72585" },
                  { label: "Likes", value: data.likes.toLocaleString(), accent: "#f72585" },
                  { label: "Comments", value: data.comments.toLocaleString(), accent: "#f59e0b" },
                  { label: "Shares", value: data.shares.toLocaleString(), accent: "#06b6d4" },
                  { label: "Saves", value: data.saves.toLocaleString(), accent: "#84cc16" },
                ].map((card) => (
                  <div key={card.label} style={{
                    background: "#18181b", border: "1px solid #27272a", borderRadius: "12px",
                    padding: "20px", borderLeft: `3px solid ${card.accent}`,
                  }}>
                    <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#52525b" }}>{card.label}</div>
                    <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginTop: "6px", lineHeight: 1 }}>{card.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Rate Breakdown */}
            <section style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "14px", padding: "24px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525b", marginBottom: "18px" }}>Rate breakdown vs. benchmarks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { label: "Save Rate", value: (data.saves / Math.max(data.views, 1) * 100), benchmark: 1, good: 3, unit: "%" },
                  { label: "Comment Rate", value: (data.comments / Math.max(data.views, 1) * 100), benchmark: 0.5, good: 2, unit: "%" },
                  { label: "Share Rate", value: (data.shares / Math.max(data.views, 1) * 100), benchmark: 0.5, good: 1.5, unit: "%" },
                ].map((row) => {
                  const pct = Math.min((row.value / row.good) * 100, 100);
                  const color = row.value >= row.good ? "#84cc16" : row.value >= row.benchmark ? "#f59e0b" : "#f72585";
                  return (
                    <div key={row.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "13px", color: "#a1a1aa" }}>{row.label}</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color }}>{row.value.toFixed(2)}{row.unit}</span>
                      </div>
                      <div style={{ height: "6px", background: "#27272a", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "999px" }} />
                      </div>
                      <div style={{ fontSize: "10px", color: "#52525b", marginTop: "4px" }}>Benchmark: {row.benchmark}{row.unit} good · {row.good}{row.unit} great</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Auto-Fix Insights */}
            <section>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525b", marginBottom: "14px" }}>AI-powered fixes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {insights.map((ins) => {
                  const colors = { high: "#f72585", medium: "#f59e0b", low: "#84cc16" };
                  const c = colors[ins.severity];
                  return (
                    <div key={ins.title} style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "12px", padding: "18px 20px", borderLeft: `3px solid ${c}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", padding: "2px 8px", borderRadius: "4px", background: c + "22", color: c }}>{ins.severity}</span>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>{ins.title}</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#71717a", margin: "0 0 10px 0", lineHeight: 1.5 }}>{ins.detail}</p>
                      <div style={{ background: "#0f0f11", borderRadius: "8px", padding: "10px 14px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#7c3aed", marginRight: "8px" }}>Fix →</span>
                        <span style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.5 }}>{ins.fix}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TikTok Algorithm Panel */}
            <section style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "14px", overflow: "hidden" }}>
              <button
                onClick={() => setShowAlgo(!showAlgo)}
                style={{ width: "100%", padding: "18px 24px", background: "none", border: "none", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>⚡</span>
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>TikTok Algorithm Intelligence</span>
                </div>
                <span style={{ fontSize: "12px", color: "#52525b" }}>{showAlgo ? "Hide ↑" : "Show ↓"}</span>
              </button>
              {showAlgo && (
                <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ height: "1px", background: "#27272a" }} />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#7c3aed", marginBottom: "12px" }}>HOW TIKTOK DECIDES WHO SEES YOUR VIDEO</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { step: "1", title: "Initial test batch (~200–500 people)", desc: "TikTok shows your video to a small test audience. If engagement is strong, it moves to the next tier." },
                        { step: "2", title: "Engagement signals in first hour", desc: "Saves and shares matter most here. A 3%+ engagement rate triggers wider distribution automatically." },
                        { step: "3", title: "Watch time & completion rate", desc: "Videos where 60%+ of viewers watch to the end get pushed to the next distribution tier." },
                        { step: "4", title: "Comment velocity", desc: "Comments within the first 30 minutes are the strongest signal. The algorithm treats them as proof of emotional resonance." },
                        { step: "5", title: "Re-shares & external traffic", desc: "When people share outside TikTok (text, Instagram DMs), it signals to the algorithm that content has cross-platform appeal." },
                      ].map((item) => (
                        <div key={item.step} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "#7c3aed22", border: "1px solid #7c3aed44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#7c3aed", flexShrink: 0 }}>{item.step}</div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: "#e4e4e7", marginBottom: "2px" }}>{item.title}</div>
                            <div style={{ fontSize: "12px", color: "#71717a", lineHeight: 1.5 }}>{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#84cc16", marginBottom: "12px" }}>BENCHMARK REFERENCE TABLE</div>
                    <div style={{ border: "1px solid #27272a", borderRadius: "10px", overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr", padding: "10px 16px", background: "#0f0f11", borderBottom: "1px solid #27272a" }}>
                        {["Metric", "Good", "Great", "Algorithm Signal"].map((h) => (
                          <span key={h} style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#52525b" }}>{h}</span>
                        ))}
                      </div>
                      {ALGO_BENCHMARKS.map((row, i) => (
                        <div key={row.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr", padding: "12px 16px", borderBottom: i < ALGO_BENCHMARKS.length - 1 ? "1px solid #1c1c24" : "none" }}>
                          <span style={{ fontSize: "13px", color: "#a1a1aa" }}>{row.label}</span>
                          <span style={{ fontSize: "13px", color: "#f59e0b", fontWeight: 600 }}>{row.good}</span>
                          <span style={{ fontSize: "13px", color: "#84cc16", fontWeight: 600 }}>{row.great}</span>
                          <span style={{ fontSize: "12px", color: "#52525b" }}>{row.signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {/* Empty state */}
        {!data && !loading && !error && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚡</div>
            <p style={{ color: "#3f3f46", fontSize: "14px" }}>Paste a TikTok URL above to get your viral score</p>
          </div>
        )}

      </main>
    </div>
  );
}
