"use client";

import { useRouter } from "next/navigation";
import { WaveBackground } from "@/components/wave-background";
import { SearchBar } from "@/components/search/search-bar";
import { SuggestedKeywords } from "@/components/search/suggested-keywords";
import { Header } from "@/components/header";
import { PageWrapper } from "@/components/page-wrapper";

export default function HomePage() {
  const router = useRouter();

  function handleSearch(q: string) {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <PageWrapper>
      <div style={{ minHeight: "100vh", position: "relative", padding: "36px 56px 120px" }}>
        <WaveBackground wordmarkId="hero-wordmark" />

        <Header />

        <div style={{
          textAlign: "center",
          maxWidth: 1180,
          margin: "0 auto",
          paddingTop: 8,
          position: "relative",
          zIndex: 3,
        }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.36em",
            textTransform: "uppercase", color: "var(--mute)",
            marginBottom: 28,
          }}>
            VOL. 02 — SUMMER MEMOIRS · 2026
          </div>

          <h1
            id="hero-wordmark"
            style={{
              fontWeight: 700,
              fontSize: "clamp(120px, 16vw, 240px)",
              lineHeight: 0.86,
              letterSpacing: "-0.045em",
              marginBottom: 24,
              color: "var(--ink)",
            }}
          >
            Moodcent<span style={{ fontWeight: 300 }}>.</span>
          </h1>

          <div style={{
            fontSize: "clamp(20px, 1.5vw, 24px)",
            fontWeight: 300, letterSpacing: "-0.005em",
            marginBottom: 44,
          }}>
            향을 기억하는 나만의 방법
          </div>

          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <SearchBar onSearch={handleSearch} size="lg" />
          </div>

          <SuggestedKeywords onSelect={handleSearch} />
        </div>

        <div style={{
          position: "fixed", bottom: 22, left: 56, right: 56,
          display: "flex", justifyContent: "space-between",
          fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--mute)", pointerEvents: "none", zIndex: 2,
        }}>
          <span>Moodcent · 2026</span>
          <span>한국 감성 향수 검색</span>
        </div>
      </div>
    </PageWrapper>
  );
}
