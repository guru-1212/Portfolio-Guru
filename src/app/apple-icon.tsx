import { ImageResponse } from "next/og";

// iPhone / iPad home-screen icon (Safari doesn't use the SVG favicon here).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05050a",
          backgroundImage: "radial-gradient(circle at 25% 20%, rgba(139,147,255,0.45), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            backgroundImage: "linear-gradient(135deg, #8b93ff, #22d3ee 55%, #e879f9)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          GT
        </div>
      </div>
    ),
    size,
  );
}
