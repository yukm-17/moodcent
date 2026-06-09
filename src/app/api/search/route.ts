import { NextRequest, NextResponse } from "next/server";
import type { SearchResult } from "@/types";

const PERFUM_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9000";

export async function POST(req: NextRequest) {
  const { query, limit = 20, offset = 0 } = await req.json().catch(() => ({}));

  if (!query?.trim()) {
    return NextResponse.json({ error: "검색어를 입력해주세요." }, { status: 400 });
  }

  let data: SearchResult;
  try {
    const res = await fetch(`${PERFUM_API_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, limit, offset }),
    });
    if (!res.ok) throw new Error(`PerfumAPI ${res.status}`);
    data = await res.json();
  } catch (e) {
    console.error("PerfumAPI 호출 실패:", e);
    return NextResponse.json(
      { error: "향수 API 연결에 실패했습니다. 로컬 서버(9000)가 실행 중인지 확인하세요." },
      { status: 503 }
    );
  }

  if (process.env.NODE_ENV === "production") {
    data.perfumes = data.perfumes.map((p) =>
      p.image_url?.includes("fimgs") ? { ...p, image_url: null } : p
    );
  }

  return NextResponse.json(data);
}
