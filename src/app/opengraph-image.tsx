import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

// Social share card (LinkedIn, WhatsApp, X, Slack…) — generated at build time as a 1200×630 PNG.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  // Synchronous read on purpose: with Cache Components, sync I/O finishes during prerender,
  // so the image is generated once at build time instead of on every request.
  const photo = readFileSync(join(process.cwd(), "public", "profile.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const host = profile.siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "70px 80px",
          background: "#05050a",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(139,147,255,0.35), transparent 45%), radial-gradient(circle at 92% 85%, rgba(34,211,238,0.25), transparent 45%)",
          color: "#eeeef5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 50 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#9c9cb4",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#22c55e" }} />
            {profile.location}
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 26, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 700,
              marginTop: 14,
              backgroundImage: "linear-gradient(90deg, #8b93ff, #22d3ee 55%, #e879f9)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.role}
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#b4b4c8", marginTop: 26, lineHeight: 1.4 }}>
            Angular · TypeScript · RxJS · NgRx · Signals — enterprise airline booking platforms & a live SaaS.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8b93ff", marginTop: 34 }}>{host}</div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 6,
            borderRadius: 48,
            backgroundImage: "linear-gradient(135deg, #8b93ff, #22d3ee, #e879f9)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
          <img src={photoSrc} width={340} height={340} alt="" style={{ borderRadius: 42, objectFit: "cover" }} />
        </div>
      </div>
    ),
    size,
  );
}
