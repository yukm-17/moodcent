import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moodcent — 감성으로 찾는 향수",
  description: "한국어 감성 표현으로 나만의 향수를 찾아보세요. 비 오는 날 향수, 살냄새 향수, 호텔향 등 감성 키워드로 검색하세요.",
  keywords: ["향수", "퍼퓸", "감성 향수", "한국 향수 추천", "향수 추천"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
