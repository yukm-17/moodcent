import { EMOTION_TAG_MAP } from "./constants";

export interface AnalyzedQuery {
  tags: string[];
  matchedKeywords: string[];
  rawKeyword: string;
}

/**
 * 한국어 감성 표현을 내부 향수 태그로 변환.
 * DB search_dictionary 우선, 없으면 로컬 맵 fallback.
 */
export function analyzeKoreanEmotion(input: string): AnalyzedQuery {
  const normalized = input.trim().replace(/\s+/g, "");
  const tags = new Set<string>();
  const matchedKeywords: string[] = [];

  for (const [keyword, keywordTags] of Object.entries(EMOTION_TAG_MAP)) {
    const normalizedKeyword = keyword.replace(/\s+/g, "");
    if (normalized.includes(normalizedKeyword) || input.includes(keyword)) {
      keywordTags.forEach((t) => tags.add(t));
      matchedKeywords.push(keyword);
    }
  }

  return {
    tags: Array.from(tags),
    matchedKeywords,
    rawKeyword: input,
  };
}

/**
 * DB의 search_dictionary 결과와 로컬 분석 결과를 병합.
 */
export function mergeTags(localTags: string[], dbTags: string[][]): string[] {
  const merged = new Set<string>(localTags);
  for (const tagArr of dbTags) {
    tagArr.forEach((t) => merged.add(t));
  }
  return Array.from(merged);
}
