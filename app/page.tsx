"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Inter:wght@400;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Bagel Fat One', cursive; }
        .btn-bounce:active { transform: translate(3px, 3px); box-shadow: none !important; }
      `}</style>

    <div style={{ background: "#FFF176", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #000", background: "#fff" }}>
        <span className="display" style={{ fontSize: "28px", color: "#000", letterSpacing: "-0.01em" }}>
          Pop<span style={{ color: "#f72585" }}>Off</span>
        </span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", background: "#FFF176", border: "2px solid #000", borderRadius: "999px", padding: "3px 12px" }}>Beta</span>
          <button className="btn-bounce" onClick={() => router.push("/analyze")}
            style={{ height: "38px", padding: "0 20px", borderRadius: "999px", border: "2px solid #000", background: "#f72585", color: "#fff", fontSize: "13px", fontWeight: 800, cursor: "pointer", boxShadow: "3px 3px 0 #000" }}>
            Open App →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: "60px 32px 0", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>

          {/* Left: text */}
          <div>
            {/* Eyebrow label */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "2px solid #000", borderRadius: "999px", padding: "6px 16px", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f72585", display: "inline-block" }} />
              <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>AI creator tool</span>
            </div>

            <h1 className="display" style={{ fontSize: "clamp(56px, 8vw, 88px)", lineHeight: 1, color: "#000", marginBottom: "8px" }}>
              Make your
            </h1>
            <h1 className="display" style={{ fontSize: "clamp(56px, 8vw, 88px)", lineHeight: 1, color: "#fff", WebkitTextStroke: "3px #000", marginBottom: "8px" }}>
              videos
            </h1>
            {/* Pink block behind PopOff */}
            <div style={{ display: "inline-block", background: "#f72585", border: "3px solid #000", borderRadius: "16px", padding: "4px 20px", marginBottom: "28px" }}>
              <h1 className="display" style={{ fontSize: "clamp(56px, 8vw, 88px)", lineHeight: 1, color: "#FFF176" }}>
                PopOff.
              </h1>
            </div>

            <p style={{ fontSize: "17px", color: "#000", lineHeight: 1.6, maxWidth: "420px", marginBottom: "32px", fontWeight: 500 }}>
              Upload your draft video before you post. AI watches it, scores it, and tells you exactly what to fix to go viral.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="btn-bounce" onClick={() => router.push("/analyze")}
                style={{ height: "52px", padding: "0 32px", borderRadius: "999px", border: "3px solid #000", background: "#000", color: "#FFF176", fontSize: "15px", fontWeight: 800, cursor: "pointer", boxShadow: "5px 5px 0 #f72585" }}>
                Try it free →
              </button>
              <button className="btn-bounce" onClick={() => router.push("/analyze")}
                style={{ height: "52px", padding: "0 32px", borderRadius: "999px", border: "3px solid #000", background: "#fff", color: "#000", fontSize: "15px", fontWeight: 800, cursor: "pointer", boxShadow: "5px 5px 0 #000" }}>
                See how it works
              </button>
            </div>
          </div>

          {/* Right: color block collage */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingTop: "16px" }}>
            {[
              { bg: "#f72585", text: "Hook Score", sub: "First 3 seconds", emoji: "⚡" },
              { bg: "#84cc16", text: "Viral Rate", sub: "Predicted reach", emoji: "📈" },
              { bg: "#3b82f6", text: "Audio Check", sub: "Trending sounds", emoji: "🎵" },
              { bg: "#FFF176", text: "AI Fixes", sub: "Specific actions", emoji: "🛠️", border: true },
            ].map((card) => (
              <div key={card.text} style={{ background: card.bg, border: `3px solid #000`, borderRadius: "20px", padding: "24px 20px", boxShadow: "4px 4px 0 #000" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{card.emoji}</div>
                <div className="display" style={{ fontSize: "22px", color: "#000", lineHeight: 1.1, marginBottom: "4px" }}>{card.text}</div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#000", opacity: 0.6 }}>{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAVY DIVIDER ── */}
      <div style={{ marginTop: "60px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" style={{ width: "100%", display: "block" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f72585" stroke="#000" strokeWidth="2" />
        </svg>
      </div>

      {/* ── 3 TOOLS ── */}
      <section style={{ background: "#f72585", padding: "60px 32px", borderBottom: "3px solid #000" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="display" style={{ fontSize: "52px", color: "#fff", textAlign: "center", marginBottom: "8px", WebkitTextStroke: "2px #000" }}>
            Three ways to grow.
          </h2>
          <p style={{ textAlign: "center", color: "#fff", fontWeight: 700, marginBottom: "40px", fontSize: "16px" }}>Pick your move ↓</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {[
              { num: "01", bg: "#FFF176", title: "Score Before You Post", desc: "Upload your draft. AI watches it, finds weak spots, and tells you exactly what to fix before you hit publish.", cta: "Upload video →", emoji: "🎬" },
              { num: "02", bg: "#fff", title: "Analyse a Posted Video", desc: "Paste any TikTok link. Get your real engagement data, PopOff Score, and fixes based on what the algorithm rewards.", cta: "Paste link →", emoji: "🔗" },
              { num: "03", bg: "#84cc16", title: "Full Profile Audit", desc: "Drop your TikTok handle. Get a full breakdown of what's holding your account back and a growth plan to hit your next milestone.", cta: "Audit profile →", emoji: "👤" },
            ].map((card) => (
              <div key={card.num} onClick={() => router.push("/analyze")}
                style={{ background: card.bg, border: "3px solid #000", borderRadius: "20px", padding: "28px 24px", boxShadow: "5px 5px 0 #000", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ fontSize: "36px" }}>{card.emoji}</span>
                  <span className="display" style={{ fontSize: "48px", color: "#000", opacity: 0.1, lineHeight: 1 }}>{card.num}</span>
                </div>
                <h3 className="display" style={{ fontSize: "26px", color: "#000", marginBottom: "10px", lineHeight: 1.1 }}>{card.title}</h3>
                <p style={{ fontSize: "14px", color: "#000", opacity: 0.7, lineHeight: 1.6, marginBottom: "20px" }}>{card.desc}</p>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "#000", borderBottom: "2px solid #000" }}>{card.cta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#fff", padding: "60px 32px", borderBottom: "3px solid #000" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 className="display" style={{ fontSize: "48px", color: "#000", textAlign: "center", marginBottom: "48px" }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { num: "1", title: "Upload or paste", desc: "Drop in a draft video file or paste a live TikTok URL.", bg: "#FFF176" },
              { num: "2", title: "AI scans everything", desc: "Hook, pacing, audio, caption, CTA placement — 30+ signals.", bg: "#f72585", light: true },
              { num: "3", title: "Get your PopOff Score", desc: "One number out of 100. Instantly know if it's ready to post.", bg: "#84cc16" },
              { num: "4", title: "Fix it & post", desc: "Specific actions, not vague advice. Make the changes, post with confidence.", bg: "#3b82f6", light: true },
            ].map((step) => (
              <div key={step.num} style={{ background: step.bg, border: "3px solid #000", borderRadius: "20px", padding: "28px", boxShadow: "4px 4px 0 #000" }}>
                <div className="display" style={{ fontSize: "48px", color: step.light ? "#fff" : "#000", opacity: 0.2, lineHeight: 1, marginBottom: "8px" }}>{step.num}</div>
                <h3 className="display" style={{ fontSize: "24px", color: step.light ? "#fff" : "#000", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: step.light ? "#fff" : "#000", opacity: 0.75, lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: "#FFF176", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#000", marginBottom: "8px", lineHeight: 1 }}>
          Stop guessing.
        </h2>
        <h2 className="display" style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#f72585", WebkitTextStroke: "2px #000", marginBottom: "32px", lineHeight: 1 }}>
          Start popping off.
        </h2>
        <button className="btn-bounce" onClick={() => router.push("/analyze")}
          style={{ height: "56px", padding: "0 44px", borderRadius: "999px", border: "3px solid #000", background: "#f72585", color: "#fff", fontSize: "16px", fontWeight: 800, cursor: "pointer", boxShadow: "5px 5px 0 #000" }}>
          Try PopOff free →
        </button>
        <p style={{ marginTop: "16px", fontSize: "13px", color: "#000", opacity: 0.5, fontWeight: 600 }}>Free to use · No account needed</p>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#000", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="display" style={{ fontSize: "20px", color: "#fff" }}>Pop<span style={{ color: "#f72585" }}>Off</span></span>
        <span style={{ fontSize: "12px", color: "#fff", opacity: 0.4 }}>© 2026 PopOff. Built for creators.</span>
      </footer>

    </div>
    </>
  );
}
