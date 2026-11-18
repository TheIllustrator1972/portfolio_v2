import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Nilesh Kamble · Frontend + AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/Geist-Regular.woff")),
    readFile(join(process.cwd(), "src/fonts/Geist-SemiBold.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0A0A0A",
          padding: 64,
        }}
      >
        <div
          style={{
            width: 48,
            height: 4,
            background: "#818CF8",
            marginBottom: 28,
          }}
        />
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 64,
            fontWeight: 600,
            fontFamily: "Geist",
            letterSpacing: -1.5,
          }}
        >
          Nilesh Kamble
        </div>
        <div
          style={{
            color: "#A1A1AA",
            fontSize: 32,
            fontWeight: 400,
            fontFamily: "Geist",
            marginTop: 16,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          Frontend engineer building AI-powered product experiences.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
