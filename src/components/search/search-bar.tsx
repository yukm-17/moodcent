"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialValue?: string;
}

const PLACEHOLDER_TEXTS = [
  "비 오는 날 조용한 남자 향수",
  "살냄새 나는 향수",
  "도서관 남자 향",
  "여름밤 시트러스인데 너무 가볍지 않은 향",
  "호텔 로비 느낌",
];

export function SearchBar({ onSearch, isLoading, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={PLACEHOLDER_TEXTS[placeholderIndex]}
            className="pl-11 pr-4 h-12 text-base rounded-xl border-border/60 bg-background/80 focus-visible:ring-1 transition-all"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="h-12 px-6 rounded-xl font-medium shrink-0"
        >
          {isLoading ? "검색중..." : "검색"}
        </Button>
      </div>
    </form>
  );
}
