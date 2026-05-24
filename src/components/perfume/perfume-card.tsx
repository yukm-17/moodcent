"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ApiPerfume } from "@/types";

interface PerfumeCardProps {
  perfume: ApiPerfume;
  onClick?: (perfume: ApiPerfume) => void;
}

export function PerfumeCard({ perfume, onClick }: PerfumeCardProps) {
  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-border/50"
      onClick={() => onClick?.(perfume)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        {perfume.image_url ? (
          <Image
            src={perfume.image_url}
            alt={`${perfume.brand ?? ""} ${perfume.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-20">🌸</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {perfume.gender && (
            <Badge variant="secondary" className="text-xs font-normal bg-background/80 backdrop-blur-sm">
              {perfume.gender}
            </Badge>
          )}
        </div>
        {perfume.rating && (
          <div className="absolute bottom-2 left-2">
            <span className="text-xs bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 font-medium">
              ★ {perfume.rating.toFixed(1)}
              {perfume.rating_count > 0 && (
                <span className="text-muted-foreground ml-1">({perfume.rating_count.toLocaleString()})</span>
              )}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-3 space-y-2">
        {perfume.brand && (
          <p className="text-xs text-muted-foreground truncate">{perfume.brand}</p>
        )}
        <h3 className="font-medium text-sm leading-tight line-clamp-2">{perfume.name}</h3>

        {perfume.accords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {perfume.accords.slice(0, 4).map((accord) => (
              <span key={accord} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                {accord}
              </span>
            ))}
          </div>
        )}

        {perfume.moods.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {perfume.moods.slice(0, 3).map((mood) => (
              <span key={mood} className="text-[10px] px-1.5 py-0.5 rounded-full border border-border/50 text-muted-foreground">
                {mood}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
