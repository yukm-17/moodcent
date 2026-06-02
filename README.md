# Moodcent

감정과 감각으로 향수를 찾는 한국어 향수 검색 엔진입니다. "비 오는 날 맡고 싶은 향수", "살냄새 나는 향수"처럼 감성적인 표현으로 향수를 검색할 수 있습니다.

---

## 개요

Moodcent는 기존 향수 검색의 한계(성분명, 브랜드명 위주)를 넘어, 사용자가 느끼는 감정과 감각을 그대로 입력하면 어울리는 향수를 추천해주는 서비스입니다.

**핵심 기능:**

- 한국어 감성 표현으로 향수 검색 (예: 호텔향, 도서관향, 포근한 향)
- 감정 키워드 → 향료 태그 자동 변환
- 무한 스크롤 검색 결과 그리드
- 향수 상세 페이지 (향 피라미드, 어코드, 무드, 평점)
- 추천 키워드 칩으로 빠른 탐색

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript 5 |
| UI 라이브러리 | React 19 |
| 스타일링 | Tailwind CSS 4, Shadcn UI (base-nova) |
| 애니메이션 | Framer Motion 12 |
| 서버 상태 관리 | TanStack React Query 5 |
| 데이터베이스 | Supabase (PostgreSQL) |
| 아이콘 | Lucide React |

---

## 앱 작동 플로우

### 1. 홈 화면

```
사용자 접속
  └─> / (홈 페이지)
        ├─ 웨이브 SVG 배경 애니메이션 렌더링
        ├─ SearchBar: 감성 키워드 플레이스홀더 순환 표시
        │    ("살냄새 나는 향수", "호텔 로비 향기" 등)
        └─ SuggestedKeywords: 추천 감성 키워드 칩 표시
```

### 2. 검색 흐름

```
사용자 검색어 입력 (예: "비오는날")
  └─> 라우터 이동: /search?q=비오는날
        └─> SearchResults 컴포넌트 마운트
              └─> React Query: POST /api/search { query, limit, offset }
                    └─> Next.js API Route → 백엔드 API 전달
                          └─> 결과 반환 (perfumes 배열)
                                └─> PerfumeGrid: 4열 그리드 렌더링
                                      └─> IntersectionObserver: 무한 스크롤
                                            └─> 스크롤 끝 도달 시 다음 페이지 자동 로드
```

### 3. 감정 분석 (Emotion Analyzer)

```
검색어 입력
  └─> emotion-analyzer.ts
        └─> EMOTION_TAG_MAP에서 한국어 키워드 매칭
              ├─ "살냄새" → { accords: ["skin scent", "soft musk"] }
              ├─ "호텔향" → { accords: ["woody amber", "luxury", "warm spicy"] }
              ├─ "비오는날" → { accords: ["earthy", "woody", "green"] }
              └─ (15개 감성 키워드 지원)
        └─> 매핑된 태그를 백엔드 검색 파라미터로 전달
```

### 4. 향수 상세 페이지

```
검색 결과 카드 클릭
  └─> perfumeStore에 해당 향수 데이터 캐싱 (클라이언트 메모리)
  └─> 라우터 이동: /search/[slug]
        └─> React Query: GET /api/perfume/[slug]
              ├─ perfumeStore 캐시 우선 조회 (네트워크 요청 최소화)
              └─ 캐시 없으면 → 백엔드 API 호출
                    └─> PerfumeDetail 렌더링
                          ├─ 향 피라미드 (탑 / 미들 / 베이스 노트)
                          ├─ 어코드 배지
                          ├─ 무드 & 시즌 태그
                          ├─ 지속력 / 확산력 / 평점
                          └─ CTA: "MY SHELF에 저장", "샘플 요청"
```

### 5. 데이터 캐싱 전략

```
React Query 설정
  ├─ staleTime: 5분 (동일 쿼리 재요청 방지)
  ├─ gcTime: 10분 (캐시 메모리 유지)
  └─ 검색: 페이지네이션별 쿼리 키 관리

perfumeStore (클라이언트 인메모리)
  └─ 카드 클릭 시 데이터 저장 → 상세 페이지 즉시 렌더링
```

---

## 데이터베이스 구조

### `perfumes`
향수 기본 정보 테이블

| 컬럼 | 설명 |
|---|---|
| `slug` | URL용 고유 식별자 |
| `name`, `brand`, `gender` | 기본 정보 |
| `description_ko` | 한국어 설명 |
| `accords[]`, `notes_top[]`, `notes_middle[]`, `notes_base[]` | 향료 정보 |
| `moods[]`, `seasons[]` | 감성 태그 |
| `longevity`, `sillage`, `rating`, `rating_count` | 평가 지표 |

### `search_dictionary`
한국어 감성 키워드 → 향료 태그 매핑 테이블

| 컬럼 | 설명 |
|---|---|
| `keyword_ko` | 한국어 검색 키워드 |
| `mapped_accords[]` | 매핑된 어코드 |
| `mapped_moods[]` | 매핑된 무드 |
| `mapped_notes[]` | 매핑된 노트 |

### `search_logs`
검색 이력 및 분석 테이블

---

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                  # 홈 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   ├── globals.css               # 디자인 토큰 & 글로벌 스타일
│   ├── search/
│   │   ├── page.tsx              # 검색 결과 페이지
│   │   ├── [slug]/page.tsx       # 향수 상세 페이지
│   │   └── _components/
│   │       └── search-results.tsx
│   └── api/
│       ├── search/route.ts       # 검색 API 엔드포인트
│       └── perfume/[slug]/route.ts
├── components/
│   ├── perfume/                  # 향수 카드, 그리드, 상세
│   ├── search/                   # 검색바, 추천 키워드
│   ├── wave-background.tsx       # 히어로 웨이브 배경
│   └── ui/                       # Shadcn UI 공통 컴포넌트
├── lib/
│   ├── api/                      # 검색/향수 API 클라이언트
│   ├── supabase/                 # Supabase 클라이언트 & 타입
│   ├── emotion-analyzer.ts       # 감성 키워드 분석기
│   ├── constants.ts              # 추천 키워드, 감정 태그 맵
│   └── perfume-store.ts          # 클라이언트 캐시
├── providers/
│   └── query-provider.tsx        # React Query 설정
└── types/
    └── index.ts                  # TypeScript 인터페이스
```

---

## 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=         # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase 익명 키
SUPABASE_SERVICE_ROLE_KEY=        # Supabase 서비스 롤 키 (서버 전용)
NEXT_PUBLIC_API_URL=              # 백엔드 API URL (기본값: http://localhost:9000)
```

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```
