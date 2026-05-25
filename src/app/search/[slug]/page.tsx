"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { PerfumeDetail } from "@/components/perfume/perfume-detail";
import { PageWrapper } from "@/components/page-wrapper";
import { perfumeStore } from "@/lib/perfume-store";
import { getPerfumeBySlug } from "@/lib/api/perfume";

export default function PerfumeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const cached = perfumeStore.get(slug);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["perfume", slug],
    queryFn: () => getPerfumeBySlug(slug),
    enabled: !cached,
    retry: false,
  });

  const perfume = cached ?? data;

  return (
    <PageWrapper>
      <div style={{ padding: "36px 56px 120px" }}>
        <Header />

        {isLoading && !perfume ? (
          <div style={{
            display: "grid", gridTemplateColumns: "1.05fr 1fr",
            gap: 96, maxWidth: 1440, margin: "0 auto",
          }}>
            <div style={{
              aspectRatio: "461 / 615", borderRadius: 14,
              background: "rgba(62,69,79,.06)",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <div style={{ paddingTop: 40 }}>
              <div style={{ height: 14, width: "40%", background: "rgba(62,69,79,.06)", borderRadius: 6, marginBottom: 20 }} />
              <div style={{ height: 64, width: "80%", background: "rgba(62,69,79,.06)", borderRadius: 8, marginBottom: 16 }} />
              <div style={{ height: 16, width: "30%", background: "rgba(62,69,79,.06)", borderRadius: 6 }} />
            </div>
          </div>
        ) : isError && !perfume ? (
          <div style={{ textAlign: "center", padding: "120px 0", color: "var(--mute)" }}>
            <p style={{ fontSize: 32, marginBottom: 16 }}>😅</p>
            <p style={{ fontSize: 15, marginBottom: 24 }}>향수 정보를 불러올 수 없습니다.</p>
            <button
              onClick={() => router.back()}
              style={{
                background: "none", border: "1px solid var(--ink)",
                borderRadius: 999, padding: "12px 24px",
                fontSize: 13, cursor: "pointer", letterSpacing: "0.04em",
              }}
            >
              ← 뒤로 가기
            </button>
          </div>
        ) : perfume ? (
          <>
            <div style={{ maxWidth: 1440, margin: "-24px auto 40px" }}>
              <button
                onClick={() => router.back()}
                style={{
                  background: "none", border: "none", padding: 0,
                  fontSize: 13, color: "var(--mute)", cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                ← 검색 결과로
              </button>
            </div>
            <PerfumeDetail perfume={perfume} />
          </>
        ) : null}
      </div>
    </PageWrapper>
  );
}
