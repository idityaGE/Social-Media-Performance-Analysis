import Link from "next/link";

export default async function Home() {

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Link href="/chat">Chat Page</Link>
        <br />
        <Link href="/insight">Insight Page</Link>
      </div>
    </>
  );
}
