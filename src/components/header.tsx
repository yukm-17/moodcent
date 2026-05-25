"use client";

import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <header style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      maxWidth: 1440, margin: "0 auto 56px",
    }}>
      <div onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
        <div style={{
          fontWeight: 700, fontSize: 22,
          lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          Moodcent
        </div>
      </div>
      <div style={{
        fontSize: 13, fontWeight: 300, color: "var(--mute)",
        letterSpacing: "0.02em", paddingTop: 6,
      }}>
        감성으로 찾는 향수
      </div>
    </header>
  );
}
