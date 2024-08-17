import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  // フォント指定について: https://vercel.com/guides/using-custom-font
  const fontData = await fetch(
    new URL("../../../../assets/typewr__.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{ fontFamily: "Typewriter" }}
        tw="flex items-center justify-center w-full h-full bg-fuchsia-50 text-[80px] text-fuchsia-800 rounded-3xl"
      >
        {text}
      </div>
    ),
    {
      width: 1200, // 生成されるSVG画像全体のサイズを指定
      height: 720,
      // キャッシュはrevalidateもしくはheadersで指定する
      // revalidate: 0,
      // headers: {
      //   "Cache-Control": "no-store, max-age=0",
      // },
      emoji: "noto",
      fonts: [
        {
          name: "Typewriter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
