import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "darkGrey",
          background: "white",
          width: "100%", //SVGの内部コンテンツがImageResponse全体を埋めるように指定
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1600, // 生成されるSVG画像全体のサイズを指定
      height: 800,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    }
  );
}
