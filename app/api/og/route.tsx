/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const imageData = await fetch(
      new URL("/public/images/og.png", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#1C1C1C",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={1200}
            height={630}
            src={imageData as unknown as string}
            alt="Next Generation Logo"
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log("Error generating OG image:", e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
