export interface Database {
  public: {
    Tables: {
      perfumes: {
        Row: {
          id: string;
          slug: string;
          name: string;
          brand: string;
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
        };
        Insert: Omit<
          Database["public"]["Tables"]["perfumes"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["perfumes"]["Insert"]>;
      };
      search_dictionary: {
        Row: {
          id: string;
          keyword_ko: string;
          mapped_accords: string[];
          mapped_moods: string[];
          mapped_notes: string[];
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["search_dictionary"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["search_dictionary"]["Insert"]>;
      };
      search_logs: {
        Row: {
          id: string;
          keyword: string;
          mapped_tags: string[];
          clicked_perfume_id: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["search_logs"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["search_logs"]["Insert"]>;
      };
    };
  };
}
