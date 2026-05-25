import type { ApiPerfume } from "@/types";

const store = new Map<string, ApiPerfume>();

export const perfumeStore = {
  set(slug: string, perfume: ApiPerfume) { store.set(slug, perfume); },
  get(slug: string): ApiPerfume | undefined { return store.get(slug); },
};
