"use client";

const CHIPS = [
  "살냄새",
  "여름 출근용",
  "호텔 로비 향",
  "비오는 날 도서관",
  "첫 데이트의 떨림",
  "늦가을 산책",
  "새벽 1시의 잠옷",
];

interface SuggestedKeywordsProps {
  onSelect: (keyword: string) => void;
}

export function SuggestedKeywords({ onSelect }: SuggestedKeywordsProps) {
  return (
    <div style={{ marginTop: 40 }}>
      <p style={{
        fontSize: 11,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: "var(--mute)",
        marginBottom: 18,
        textAlign: "center",
      }}>
        People Also Searched
      </p>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",
        maxWidth: 760,
        margin: "0 auto",
      }}>
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => onSelect(chip)}
            style={{
              padding: "9px 20px",
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "transparent",
              font: `400 14px var(--sans)`,
              color: "var(--ink)",
              letterSpacing: "-0.005em",
              transition: "transform 0.18s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
