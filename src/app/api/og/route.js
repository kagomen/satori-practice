import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full bg-fuchsia-50 text-[100px] text-fuchsia-800 font-bold">
        {text}
      </div>
    ),
    {
      width: 1200, // 生成されるSVG画像全体のサイズを指定
      height: 720,
      revalidate: 0,
      // headers: {
      //   "Cache-Control": "no-store, max-age=0",
      // },
    }
  );
}
