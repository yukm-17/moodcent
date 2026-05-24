"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/search/search-bar";
import { SuggestedKeywords } from "@/components/search/suggested-keywords";
import { PerfumeGrid } from "@/components/perfume/perfume-grid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { searchPerfumes } from "@/lib/api/search";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchPerfumes(query),
    enabled: query.trim().length > 0,
    retry: false,
  });

  function handleSearch(value: string) {
    setQuery(value);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setQuery("")}
            className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity"
          >
            moodcent
          </button>
          <span className="text-xs text-muted-foreground hidden sm:block">
            감성으로 찾는 향수
          </span>
        </div>
      </header>

      <main className="flex-1">
        {!query ? (
          <section className="max-w-2xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center gap-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">어떤 향이 끌리세요?</h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                "비 오는 날 향수", "살냄새 나는 향수"처럼
                <br />
                느낌 그대로 검색해보세요.
              </p>
            </div>
            <div className="w-full space-y-4">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              <SuggestedKeywords onSelect={handleSearch} />
            </div>
          </section>
        ) : (
          <section className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-6 space-y-4">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} initialValue={query} />

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-normal">{query}</Badge>
                </div>
                {!isLoading && data && (
                  <span className="text-xs text-muted-foreground">{data.total}개의 향수</span>
                )}
              </div>

              <Separator />
            </div>

            {isError ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-4xl mb-4">😅</p>
                <p className="text-muted-foreground text-sm">
                  {error instanceof Error ? error.message : "검색 중 오류가 발생했습니다."}
                </p>
              </div>
            ) : (
              <PerfumeGrid perfumes={data?.perfumes ?? []} isLoading={isLoading} />
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-border/40 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <span className="text-sm font-medium">moodcent</span>
          <span className="text-xs text-muted-foreground">한국 감성 향수 검색</span>
        </div>
      </footer>
    </div>
  );
}
