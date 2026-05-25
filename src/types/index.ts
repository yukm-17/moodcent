export interface ApiPerfume {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  gender: string | null;
  description_ko: string | null;
  image_url: string | null;
  accords: string[];
  notes_top: string[];
  notes_middle: string[];
  notes_base: string[];
  moods: string[];
  seasons: string[];
  longevity: string | null;
  sillage: string | null;
  rating: number | null;
  rating_count: number;
  source: string | null;
  source_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
  perfumes: ApiPerfume[];
}

export interface SuggestedKeyword {
  label: string;
  description: string;
}
