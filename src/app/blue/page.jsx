"use client";

import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef(null);
  const [text, setText] = useState("🏄 Looks Good To Me! 🤟");
  const url = `/api/og/fonts?text=${encodeURIComponent(text)}`;
  const copyText = `![LGTM-image](https://satori-practice.vercel.app${url})`;

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.setSelectionRange(text.length, text.length);
  }, []);

  function copy() {
    navigator.clipboard.writeText(copyText);
    alert("Copied!");
  }

  async function save() {
    const blob = await fetch(url).then((res) => res.blob());
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "LGTM-image.png";
    a.click();
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-12 text-gray-700 bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setText(inputRef.current.value);
        }}
      >
        <label className="block mb-1">👇 input & enter</label>
        <input
          type="text"
          ref={inputRef}
          defaultValue={text}
          className="w-[300px] p-2 border border-gray-300 rounded"
        />
      </form>
      <Image src={url} alt="LGTM-image" width={600} height={360} />
      <div className="flex gap-2 justify-center items-center">
        <input
          type="text"
          value={copyText}
          readOnly
          className="w-[300px] p-2 border border-gray-300 rounded"
        />
        <button className="hover:opacity-50 rounded-lg p-1" onClick={copy}>
          <Copy />
        </button>
        <button className="hover:opacity-50 rounded-lg p-1" onClick={save}>
          <Download />
        </button>
      </div>
    </main>
  );
}
