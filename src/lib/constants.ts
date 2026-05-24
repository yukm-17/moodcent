import type { SuggestedKeyword } from "@/types";

export const SUGGESTED_KEYWORDS: SuggestedKeyword[] = [
  { label: "비 오는 날 향수", description: "차분하고 촉촉한 느낌" },
  { label: "살냄새 나는 향수", description: "따뜻하고 포근한 스킨 센트" },
  { label: "호텔 로비 향", description: "고급스럽고 우아한 앰버 계열" },
  { label: "도서관 남자 향", description: "조용하고 지적인 우디 계열" },
  { label: "여름 출근용", description: "가볍고 상쾌한 시트러스" },
  { label: "포근한 겨울 향수", description: "달콤하고 따뜻한 바닐라 계열" },
  { label: "조용한 존재감", description: "은은하지만 잊히지 않는 향" },
  { label: "지하철에서 부담 없는 향", description: "가볍고 깔끔한 무스크" },
];

export const EMOTION_TAG_MAP: Record<string, string[]> = {
  살냄새: ["skin scent", "soft musk"],
  비누향: ["clean", "aldehydic", "musk"],
  호텔향: ["woody amber", "luxury", "warm spicy"],
  여름밤: ["citrus", "aquatic", "light musk"],
  포근한: ["amber", "vanilla", "warm"],
  "차가운 도시남자": ["metallic", "woody", "cold spicy"],
  도서관향: ["woody", "paper", "earthy"],
  달달한: ["vanilla", "gourmand", "sweet"],
  시원한: ["aquatic", "citrus", "green"],
  고급스러운: ["oud", "rose", "amber", "luxury"],
};
