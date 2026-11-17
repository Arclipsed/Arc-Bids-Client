import { ImageResponse } from "next/og";

export const alt = "ArcBids — Real-Time B2B Wholesale Auctions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 80% 20%, rgba(63, 242, 224, 0.18), transparent 45%), linear-gradient(135deg, #05070c 0%, #09131d 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              border: "2px solid rgba(63, 242, 224, 0.45)",
              background: "#0b1420",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#e4fffb",
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: "34px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            ArcBids
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#e4fffb",
              maxWidth: "900px",
            }}
          >
            Real-time B2B wholesale auctions, built for speed.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#a1a1aa",
              maxWidth: "820px",
            }}
          >
            Invite-only or public rooms, anti-snipe protection, and instant live bidding.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "20px",
            color: "#3ff2e0",
          }}
        >
          <span>arcbids.com</span>
          <span>Live B2B Wholesale Platform</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
