import { ImageResponse } from "next/og";

export const alt = "Dynasty Labz — Minneapolis Web Design & AI Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(900px circle at 80% 0%, rgba(47,136,255,0.28), transparent 55%), radial-gradient(700px circle at 0% 100%, rgba(47,136,255,0.22), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 48 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              fontWeight: 900,
              fontStyle: "italic",
              color: "#fff",
              background: "linear-gradient(135deg, #2f88ff, #7cb2ff)",
            }}
          >
            D
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 38, fontWeight: 900, letterSpacing: -1, color: "#fff", textTransform: "uppercase" }}>
            <span>Dynasty</span>
            <span style={{ color: "#60a5fa" }}>Labz</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 900, letterSpacing: -3, lineHeight: 1.02, color: "#f8fafc" }}>
          <span>Never lose another job</span>
          <span
            style={{
              background: "linear-gradient(120deg, #93c5fd, #2f88ff 45%, #7cb2ff)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            to a missed call.
          </span>
        </div>

        <div style={{ marginTop: 44, fontSize: 30, fontWeight: 500, color: "#94a3b8", maxWidth: 940 }}>
          Websites &amp; AI lead systems for Twin Cities contractors. Sites from $350, live in 24 hours.
        </div>
      </div>
    ),
    { ...size }
  );
}
