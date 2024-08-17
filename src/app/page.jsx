import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-24 w-fit mx-auto">
      <Link href="/satori">satori practice</Link>
      <Link href="/image-response">ImageResponse practice</Link>
    </main>
  );
}
