"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#fff", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #000" }}>
        <span style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.04em", color: "#000" }}>
          Pop<span style={{ color: "#f72585" }}>Off</span>
          <span style={{ fontSize: "10px", fontWeight: 700, background: "#f72585", color: "#fff", borderRadius: "4px", padding: "2px 6px", marginLeft: "8px", verticalAlign: "middle" }}>BETA</span>
        </span>
        <button
          onClick={() => router.push("/analyze")}
          style={{ height: "36px", padding: "0 18px", borderRadius: "999px", border: "2px solid #000", background: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
        >
          Open App →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "#f72585", padding: "80px 32px", textAlign: "center", borderBottom: "3px solid #000", position: "relative", overflow: "hidden" }}>
        {/* decorative blobs */}
        <div style={{ position: "absolute", top: "-40px", left: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "#84cc16", opacity: 0.4 }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-30px", width: "250px", height: "250px", borderRadius: "50%", background: "#ffe600", opacity: 0.5 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: "#ffe600", border: "2px solid #000", borderRadius: "999px", padding: "4px 16px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "24px" }}>
            ⚡ AI-powered creator tool
          </div>
          <h1 style={{ fontSize: "clamp(52px, 10vw, 96px)", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.04em", margin: "0 0 24px 0", textShadow: "4px 4px 0px #000" }}>
            Make your<br />
            videos<br />
            <span style={{ color: "#ffe600", WebkitTextStroke: "2px #000" }}>PopOff.</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#fff", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.5, fontWeight: 500 }}>
            Upload your video before you post. Our AI tells you exactly what will flop, what will fly, and how to fix it.
          </p>
          <button
            onClick={() => router.push("/analyze")}
            style={{ height: "54px", padding: "0 36px", borderRadius: "999px", border: "3px solid #000", background: "#ffe600", fontSize: "16px", fontWeight: 800, cursor: "pointer", boxShadow: "4px 4px 0px #000", transition: "transform 0.1s" }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px,2px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0,0)")}
          >
            Try it free →
          </button>
        </div>
      </section>

      {/* ── 3 TOOLS ── */}
      <section style={{ padding: "80px 32px", background: "#fff", borderBottom: "3px solid #000" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "-0.03em", color: "#000", margin: 0 }}>
            Three ways to grow.
          </h2>
          <p style={{ color: "#71717a", marginTop: "8px", fontSize: "16px" }}>Pick your move.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>

          {/* Card 1 */}
          <div style={{ background: "#84cc16", border: "3px solid #000", borderRadius: "20px", padding: "32px", boxShadow: "6px 6px 0px #000", cursor: "pointer" }}
            onClick={() => router.push("/analyze")}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🎬</div>
            <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", color: "#000", opacity: 0.6 }}>Tool 01</div>
            <h3 style={{ fontSize: "26px", fontWeight: 900, letterSpacing: "-0.03em", color: "#000", margin: "0 0 12px 0" }}>Score Before You Post</h3>
            <p style={{ fontSize: "14px", color: "#000", opacity: 0.7, lineHeight: 1.6, margin: "0 0 20px 0" }}>
              Upload your draft video. Our AI watches it, scores it against viral benchmarks, and tells you exactly what to fix before you hit publish.
            </p>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#000" }}>Upload video →</span>
          </div>

          {/* Card 2 */}
          <div style={{ background: "#f72585", border: "3px solid #000", borderRadius: "20px", padding: "32px", boxShadow: "6px 6px 0px #000", cursor: "pointer" }}
            onClick={() => router.push("/analyze")}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔗</div>
            <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", color: "#fff", opacity: 0.7 }}>Tool 02</div>
            <h3 style={{ fontSize: "26px", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 12px 0" }}>Analyse a Posted Video</h3>
            <p style={{ fontSize: "14px", color: "#fff", opacity: 0.85, lineHeight: 1.6, margin: "0 0 20px 0" }}>
              Paste any TikTok link. See real engagement data, your viral score, and AI-powered fixes based on what the algorithm actually rewards.
            </p>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#fff" }}>Paste link →</span>
          </div>

          {/* Card 3 */}
          <div style={{ background: "#ffe600", border: "3px solid #000", borderRadius: "20px", padding: "32px", boxShadow: "6px 6px 0px #000", cursor: "pointer" }}
            onClick={() => router.push("/analyze")}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>👤</div>
            <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", color: "#000", opacity: 0.6 }}>Tool 03</div>
            <h3 style={{ fontSize: "26px", fontWeight: 900, letterSpacing: "-0.03em", color: "#000", margin: "0 0 12px 0" }}>Full Profile Audit</h3>
            <p style={{ fontSize: "14px", color: "#000", opacity: 0.7, lineHeight: 1.6, margin: "0 0 20px 0" }}>
              Drop your TikTok profile link. Get a full breakdown of what's holding your account back and a growth plan to hit your next milestone.
            </p>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#000" }}>Audit profile →</span>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#0f0f11", padding: "80px 32px", borderBottom: "3px solid #000" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "40px", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 48px 0" }}>
            How it works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            {[
              { num: "01", title: "Upload or paste your video", desc: "Drop in a draft file or paste a TikTok link. Works with videos up to 5 minutes.", color: "#84cc16" },
              { num: "02", title: "AI scans 30+ viral factors", desc: "Hook strength, pacing, audio choice, caption length, CTA placement — everything the algorithm weighs.", color: "#f72585" },
              { num: "03", title: "Get your PopOff Score", desc: "A single score out of 100 tells you instantly if this video is ready to post.", color: "#ffe600" },
              { num: "04", title: "Fix it before it flops", desc: "Specific, actionable suggestions. Not 'improve your hook' — 'open with this type of visual in the first 1.5 seconds.'", color: "#a78bfa" },
            ].map((step) => (
              <div key={step.num} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: step.color, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: "#000", flexShrink: 0 }}>
                  {step.num}
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>{step.title}</div>
                  <div style={{ fontSize: "14px", color: "#71717a", lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: "#ffe600", padding: "80px 32px", textAlign: "center", borderBottom: "3px solid #000" }}>
        <h2 style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.04em", color: "#000", margin: "0 0 16px 0", textShadow: "3px 3px 0px #f72585" }}>
          Stop guessing.<br />Start popping off.
        </h2>
        <p style={{ fontSize: "16px", color: "#000", opacity: 0.6, marginBottom: "32px" }}>Free to use. No account needed.</p>
        <button
          onClick={() => router.push("/analyze")}
          style={{ height: "54px", padding: "0 40px", borderRadius: "999px", border: "3px solid #000", background: "#000", color: "#ffe600", fontSize: "16px", fontWeight: 800, cursor: "pointer", boxShadow: "4px 4px 0px #f72585" }}
        >
          Try PopOff free →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #000" }}>
        <span style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "-0.03em" }}>
          Pop<span style={{ color: "#f72585" }}>Off</span>
        </span>
        <span style={{ fontSize: "12px", color: "#71717a" }}>© 2026 PopOff. Built for creators.</span>
      </footer>

    </div>
  );
}
