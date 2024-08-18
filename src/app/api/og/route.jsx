import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
  // 以下はJSの構文: https://developer.mozilla.org/ja/docs/Web/API/URL/searchParams
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  // フォント指定の方法: https://vercel.com/guides/using-custom-font
  // 現状、バリアブルフォントは使用できなさそう: https://github.com/vercel/satori/issues/162
  // edge runtimeではfetchとimport.meta構文でassetsにアクセスする: https://vercel.com/docs/functions/og-image-generation#runtime-support
  const fontData = await fetch(
    new URL("../../../../assets/Micro5Charted-Regular.ttf", import.meta.url)
    // { cache: "no-cache" }  // warningが発生する場合、この行を有効にしたら直るかも?: https://trpfrog.net/blog/google-fonts-on-satori#%E6%B3%A8%E6%84%8F%E7%82%B9
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{ fontFamily: "Micro5Charted-Regular" }}
        tw="flex items-center justify-center w-full h-full bg-fuchsia-50 text-[80px] text-green-800 rounded-3xl"
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
      background: "transparent", // 効いてる...?
      emoji: "noto",
      fonts: [
        {
          name: "Micro5Charted-Regular",
          data: fontData,
        },
      ],
    }
  );
}
