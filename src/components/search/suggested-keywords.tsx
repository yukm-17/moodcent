"use client";

import { Badge } from "@/components/ui/badge";
import { SUGGESTED_KEYWORDS } from "@/lib/constants";

interface SuggestedKeywordsProps {
  onSelect: (keyword: string) => void;
}

export function SuggestedKeywords({ onSelect }: SuggestedKeywordsProps) {
  return (
    <div className="w-full">
      <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wide uppercase">
        이런 향수를 찾고 계신가요?
      </p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_KEYWORDS.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-muted/30 hover:bg-muted hover:border-border text-sm text-foreground/70 hover:text-foreground transition-all cursor-pointer"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
