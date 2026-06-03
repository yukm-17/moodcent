# Moodcent

한국어 감성 표현으로 향수를 찾는 서비스. "비 오는 날 도서관", "살냄새 나는 포근한 향" 같은 문장으로 검색하면 분위기에 맞는 향수를 추천해준다.

---

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 히어로 랜딩 — 웨이브 애니메이션 + 검색창 |
| `/search?q=...` | 검색 결과 그리드 (무한 스크롤) |
| `/search/[slug]` | 향수 상세 — 노트, 어코드, 무드 |

## 플로우

```
검색어 입력
    ↓
POST /api/search  →  PerfumAPI (Render.com)
    ↓
4열 카드 그리드  →  스크롤 시 다음 페이지 자동 로드 (offset 기반)
    ↓
카드 클릭  →  /search/[slug]
              ├─ 캐시 있으면 즉시 렌더
              └─ 없으면 GET /api/perfume/[slug]  →  PerfumAPI
```

## 기술 스택

| 영역 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4, CSS 커스텀 프로퍼티 |
| 서버 상태 | TanStack Query v5 (`useInfiniteQuery`) |
| 애니메이션 | Framer Motion v12 |
| 백엔드 API | PerfumAPI (FastAPI, Render.com 배포) |
| DB | Supabase (검색 사전) |

## 환경변수

```bash
NEXT_PUBLIC_API_URL=https://your-service.onrender.com

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 로컬 실행

```bash
npm install
npm run dev
```
