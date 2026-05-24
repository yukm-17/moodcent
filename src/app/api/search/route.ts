import { NextRequest, NextResponse } from "next/server";
import type { SearchResult, ApiPerfume } from "@/types";

const PERFUM_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9000";

interface SearchResponse {
  count: number;
  perfumes: ApiPerfume[];
}

export async function POST(req: NextRequest) {
  const { query } = await req.json().catch(() => ({}));

  if (!query?.trim()) {
    return NextResponse.json({ error: "검색어를 입력해주세요." }, { status: 400 });
  }

  let data: SearchResponse;
  try {
    const res = await fetch(`${PERFUM_API_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
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

  const result: SearchResult = {
    keyword: query,
    perfumes: data.perfumes,
    total: data.count,
  };

  return NextResponse.json(result);
}
