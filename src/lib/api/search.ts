import type { SearchResult } from "@/types";

export async function searchPerfumes(
  query: string,
  limit = 20,
  offset = 0,
): Promise<SearchResult> {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit, offset }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "검색에 실패했습니다.");
  }
  return res.json();
}
