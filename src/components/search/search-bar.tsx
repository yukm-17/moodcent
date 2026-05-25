"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialValue?: string;
  size?: "lg" | "sm";
}

const PLACEHOLDERS = [
  "살갗에 남는 향, 한 줄로 적어보세요  ·  e.g. 비오는 날 도서관",
  "여름 저녁, 퇴근 후 지하철 안의 그 향수",
  "포근하고 달달한데 너무 무겁지 않은 향",
  "호텔 로비 같은 고급스러운 느낌",
  "비 오는 날 책장 사이의 잔향",
];

export function SearchBar({ onSearch, isLoading, initialValue = "", size = "lg" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (size !== "lg") return;
    const id = setInterval(() => {
      setPlaceholderIndex((p) => (p + 1) % PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [size]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  const h      = size === "lg" ? 64 : 54;
  const btnSz  = size === "lg" ? 50 : 40;
  const btnOff = size === "lg" ? 7 : 7;
  const pl     = size === "lg" ? 28 : 24;
  const pr     = size === "lg" ? 72 : 60;
  const fs     = size === "lg" ? 16 : 15;

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", width: "100%" }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={size === "lg" ? PLACEHOLDERS[placeholderIndex] : undefined}
        style={{
          width: "100%",
          height: h,
          border: "1px solid var(--ink)",
          borderRadius: 999,
          background: "transparent",
          padding: `0 ${pr}px 0 ${pl}px`,
          font: `400 ${fs}px var(--sans)`,
          color: "var(--ink)",
          outline: "none",
          letterSpacing: "-0.01em",
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        aria-label="search"
        style={{
          position: "absolute",
          right: btnOff,
          top: btnOff,
          width: btnSz,
          height: btnSz,
          border: "none",
          borderRadius: "50%",
          background: "var(--ink)",
          color: "var(--paper)",
          fontSize: 18,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          opacity: isLoading || !value.trim() ? 0.4 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {isLoading ? "…" : "→"}
      </button>
    </form>
  );
}
