import { Suspense } from "react";
import { SearchResults } from "./_components/search-results";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
