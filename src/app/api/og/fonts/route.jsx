import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  console.log("endpoint", endpoint);
  endpoint.searchParams.set("family", "Edu VIC WA NT Beginner");

  // APIキーの取得: https://developers.google.com/fonts/docs/developer_api?hl=ja
  endpoint.searchParams.set("key", process.env.GOOGLE_FONTS_API_KEY);

  const fontInfo = await fetch(endpoint).then((res) => res.json());

  // console.log(fontInfo);  // weightに何があるか確認して、下で指定する必要がある

  const fontResponse = await fetch(fontInfo.items[0].files["500"]);
  const fontData = await fontResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full font-bold h-full bg-indigo-50 text-[80px] text-indigo-800 rounded-3xl border-2 border-indigo-800">
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 720,
      background: "transparent",
      emoji: "twimoji",
      fonts: [
        {
          name: "Edu VIC WA NT Beginner",
          data: fontData,
        },
      ],
    }
  );
}
