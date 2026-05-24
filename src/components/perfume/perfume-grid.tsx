"use client";

import { PerfumeCard } from "./perfume-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ApiPerfume } from "@/types";

interface PerfumeGridProps {
  perfumes: ApiPerfume[];
  isLoading?: boolean;
  onCardClick?: (perfume: ApiPerfume) => void;
}

export function PerfumeGrid({ perfumes, isLoading, onCardClick }: PerfumeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (perfumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-muted-foreground text-sm">검색 결과가 없습니다.</p>
        <p className="text-muted-foreground text-xs mt-1">다른 감성 표현으로 다시 검색해보세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {perfumes.map((perfume, idx) => (
        <PerfumeCard
          key={perfume.id ?? `${perfume.brand}-${perfume.name}-${idx}`}
          perfume={perfume}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
