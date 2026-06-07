"use client";

import Image from "next/image";
import type { ApiPerfume } from "@/types";

interface PerfumeDetailProps {
  perfume: ApiPerfume;
}

function Pill({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <span style={{
      padding: "11px 22px",
      borderRadius: 999,
      background: dark ? "var(--purple)" : "rgba(62,69,79,.07)",
      color: dark ? "#fff" : "var(--ink)",
      fontSize: 15,
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16,
        fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase",
        color: "var(--mute)", marginBottom: 18,
      }}>
        {title}
        <span style={{ flex: 1, height: 1, background: "var(--line)", display: "block" }} />
      </div>
      {children}
    </div>
  );
}

export function PerfumeDetail({ perfume }: PerfumeDetailProps) {
  const topNotes    = perfume.notes_top.join(", ")    || "—";
  const middleNotes = perfume.notes_middle.join(", ") || "—";
  const baseNotes   = perfume.notes_base.join(", ")   || "—";

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
      gap: 96,
      alignItems: "start",
      maxWidth: 1440,
      margin: "0 auto",
    }}>
      {/* Left: image */}
      <div style={{
        aspectRatio: "461 / 615",
        borderRadius: 14,
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 1px 0 rgba(62,69,79,.04), inset 0 0 0 1px rgba(62,69,79,.04)",
      }}>
        <span style={{
          position: "absolute", top: 22, right: 22,
          fontSize: 13, fontWeight: 500,
          color: "rgba(62,69,79,.65)", letterSpacing: "0.18em", textTransform: "uppercase",
        }}>
          EAU DE PARFUM
        </span>

        {perfume.image_url ? (
          <Image
            src={perfume.image_url}
            alt={`${perfume.brand ?? ""} ${perfume.name}`}
            fill
            className="object-contain"
            sizes="50vw"
            style={{ padding: 32 }}
          />
        ) : (
          <div style={{
            width: "56%",
            aspectRatio: "0.72",
            borderRadius: "999px 999px 260px 260px / 480px 480px 260px 260px",
            background: "radial-gradient(circle at 36% 30%, #f7d5e3 0%, #d8a3c0 55%, #b07aa1 100%)",
            boxShadow: "0 50px 90px -40px rgba(108,63,145,.30)",
          }} />
        )}

        <div style={{
          position: "absolute", bottom: 18, left: 22, right: 22,
          display: "flex", justifyContent: "space-between",
          fontSize: 10, color: "rgba(62,69,79,.6)",
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          <span>{perfume.name}</span>
          <span>{perfume.gender ?? ""}</span>
        </div>
      </div>

      {/* Right: info */}
      <div>
        {perfume.brand && (
          <div style={{
            fontSize: 12, letterSpacing: "0.32em",
            textTransform: "uppercase", color: "var(--mute)", marginBottom: 16,
          }}>
            {perfume.brand}
          </div>
        )}

        <h1 style={{
          fontWeight: 700,
          fontSize: "clamp(48px, 5.4vw, 76px)",
          lineHeight: 1.0, letterSpacing: "-0.04em",
          marginBottom: 16,
        }}>
          {perfume.name}
        </h1>

        {perfume.rating && (
          <div style={{ fontSize: 16, color: "var(--mute)", marginBottom: 36 }}>
            ★ {perfume.rating.toFixed(1)}
            <span style={{ fontSize: 13, marginLeft: 8 }}>
              ({perfume.rating_count.toLocaleString()}명)
            </span>
          </div>
        )}

        {/* Notes */}
        <Section title="Notes">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[["TOP", topNotes], ["MIDDLE", middleNotes], ["BASE", baseNotes]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
                  {label}
                </div>
                <div style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.5 }}>{val}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Accords */}
        {perfume.accords.length > 0 && (
          <Section title="Accords">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {perfume.accords.map((a) => (
                <Pill key={a} label={a} />
              ))}
            </div>
          </Section>
        )}

        {/* Moods */}
        {perfume.moods.length > 0 && (
          <Section title="Moods">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {perfume.moods.map((m) => (
                <Pill key={m} label={m} />
              ))}
            </div>
          </Section>
        )}

      </div>
    </div>
  );
}
