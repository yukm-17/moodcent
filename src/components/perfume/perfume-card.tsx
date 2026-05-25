"use client";

import Image from "next/image";
import type { ApiPerfume } from "@/types";

interface PerfumeCardProps {
  perfume: ApiPerfume;
  index?: number;
  onClick?: (perfume: ApiPerfume) => void;
}

// Gradient blobs for cards without images
const BLOBS = [
  ["#f7d5e3","#d8a3c0","#b07aa1"],
  ["#e9d8b9","#c6a36f","#7e5530"],
  ["#cdd9e3","#8aa3b7","#506b7d"],
  ["#dec2a0","#a07852","#52382a"],
  ["#e9eef0","#bccad0","#7d8d96"],
  ["#f1ddae","#d1a25a","#7e5a25"],
  ["#fbd9d4","#e9a5a0","#b46a73"],
  ["#dde6d2","#a7be9d","#5d7757"],
  ["#f5e6c8","#dcb98a","#8d6a3b"],
  ["#e7ecc0","#bdc775","#6d7a3b"],
  ["#d8c9de","#a98fc1","#5f3f7e"],
  ["#ead7c0","#caa583","#6f4c2f"],
];

export function PerfumeCard({ perfume, index = 0, onClick }: PerfumeCardProps) {
  const blob = BLOBS[index % BLOBS.length];
  const notes = [...perfume.notes_top, ...perfume.notes_middle].slice(0, 3).join(" · ");

  return (
    <article
      onClick={() => onClick?.(perfume)}
      style={{
        cursor: "pointer",
        background: "#fff",
        borderRadius: 16,
        padding: "18px 18px 24px",
        transition: "transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s cubic-bezier(.2,.7,.2,1)",
        boxShadow: "0 1px 0 rgba(62,69,79,.04)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 26px 50px -24px rgba(62,69,79,.22), 0 10px 22px -12px rgba(62,69,79,.12), 0 0 0 1px rgba(62,69,79,.04)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "0 1px 0 rgba(62,69,79,.04)";
      }}
    >
      {/* Image area */}
      <div style={{
        aspectRatio: "293 / 265",
        borderRadius: 10,
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
      }}>
        <span style={{
          position: "absolute", top: 14, left: 14,
          fontSize: 12, fontWeight: 500, color: "var(--mute)",
          letterSpacing: "0.06em",
        }}>
          {perfume.source_id ? `Nº ${perfume.source_id.slice(-2)}` : ""}
        </span>
        <span style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 11, fontWeight: 500, color: "var(--mute)",
          letterSpacing: "0.16em",
        }}>
          EDP
        </span>

        {perfume.image_url ? (
          <Image
            src={perfume.image_url}
            alt={`${perfume.brand ?? ""} ${perfume.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div style={{
            width: "64%",
            aspectRatio: "0.78",
            borderRadius: "999px 999px 260px 260px / 420px 420px 260px 260px",
            background: `radial-gradient(circle at 36% 30%, ${blob[0]} 0%, ${blob[1]} 55%, ${blob[2]} 100%)`,
          }} />
        )}
      </div>

      {/* Meta */}
      <div style={{ padding: "18px 4px 0" }}>
        {perfume.brand && (
          <div style={{
            fontSize: 12, color: "var(--mute)",
            letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: 8,
          }}>
            {perfume.brand}
          </div>
        )}
        <div style={{
          fontWeight: 600, fontSize: 20,
          lineHeight: 1.2, letterSpacing: "-0.025em",
        }}>
          {perfume.name}
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          marginTop: 12, fontSize: 12, color: "var(--mute)", letterSpacing: "0.06em",
        }}>
          <span>{notes}</span>
          <span>→</span>
        </div>
      </div>
    </article>
  );
}
