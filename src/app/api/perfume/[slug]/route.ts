import { NextRequest, NextResponse } from "next/server";
import type { ApiPerfume } from "@/types";

const PERFUM_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9000";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let data: ApiPerfume;
  try {
    const res = await fetch(`${PERFUM_API_BASE}/search/${encodeURIComponent(slug)}`);
    if (res.status === 404) {
      return NextResponse.json({ error: "향수를 찾을 수 없습니다." }, { status: 404 });
    }
    if (!res.ok) throw new Error(`PerfumAPI ${res.status}`);
    data = await res.json();
  } catch (e) {
    console.error("PerfumAPI 향수 조회 실패:", e);
    return NextResponse.json(
      { error: "향수 API 연결에 실패했습니다." },
      { status: 503 },
    );
  }

  if (process.env.NODE_ENV === "production" && data.image_url?.includes("fimgs")) {
    data.image_url = null;
  }

  return NextResponse.json(data);
}
