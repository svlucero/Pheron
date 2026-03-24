import { NextResponse } from "next/server";

const GITHUB_REPO = "svlucero/AgentCenter";

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
    { headers, next: { revalidate: 300 } } // cache 5 min
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch release", status: res.status },
      { status: res.status }
    );
  }

  const data = await res.json();

  const arm64 = data.assets?.find(
    (a: { name: string; browser_download_url: string }) =>
      a.name.includes("aarch64") && a.name.endsWith(".dmg")
  );
  const x64 = data.assets?.find(
    (a: { name: string; browser_download_url: string }) =>
      (a.name.includes("x64") || a.name.includes("x86_64")) &&
      a.name.endsWith(".dmg")
  );

  return NextResponse.json({
    version: data.tag_name,
    arm64: arm64?.browser_download_url ?? null,
    x64: x64?.browser_download_url ?? null,
  });
}
