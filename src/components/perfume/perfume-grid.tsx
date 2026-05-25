"use client";

import { useEffect, useRef } from "react";
import { PerfumeCard } from "./perfume-card";
import type { ApiPerfume } from "@/types";

interface PerfumeGridProps {
  perfumes: ApiPerfume[];
  isLoading?: boolean;
  onCardClick?: (perfume: ApiPerfume) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export function PerfumeGrid({ perfumes, isLoading, onCardClick, onLoadMore, hasMore, isLoadingMore }: PerfumeGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !onLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && hasMore && !isLoadingMore) onLoadMore(); },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoadingMore]);
  if (isLoading) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "44px 28px",
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ borderRadius: 16, background: "#fff", overflow: "hidden" }}>
            <div style={{
              aspectRatio: "293/265",
              background: "rgba(62,69,79,.06)",
              animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <div style={{ padding: "18px 18px 24px" }}>
              <div style={{ height: 12, width: "60%", background: "rgba(62,69,79,.06)", borderRadius: 6, marginBottom: 10 }} />
              <div style={{ height: 20, width: "80%", background: "rgba(62,69,79,.06)", borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (perfumes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "var(--mute)" }}>
        <p style={{ fontSize: 32, marginBottom: 16 }}>🔍</p>
        <p style={{ fontSize: 15 }}>검색 결과가 없습니다.</p>
        <p style={{ fontSize: 13, marginTop: 6 }}>다른 감성 표현으로 다시 검색해보세요.</p>
      </div>
    );
  }

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "44px 28px",
      }}>
        {perfumes.map((perfume, i) => (
          <PerfumeCard
            key={perfume.id}
            perfume={perfume}
            index={i}
            onClick={onCardClick}
          />
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />

      {isLoadingMore && (
        <div style={{
          textAlign: "center", padding: "40px 0",
          fontSize: 12, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "var(--mute)",
        }}>
          Loading...
        </div>
      )}
    </>
  );
}
