import type { ApiPerfume } from "@/types";

export async function getPerfumeBySlug(slug: string): Promise<ApiPerfume> {
  const res = await fetch(`/api/perfume/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "향수 정보를 불러올 수 없습니다.");
  }
  return res.json();
}
