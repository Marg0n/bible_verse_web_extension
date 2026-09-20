import { useState, useEffect } from "react";
import { baseUrl } from "../helper/BaseUrl";
import type { VerseData } from "../types/bible.types";

export const useVerseSearch = (searchQuery: string) => {
  const [searchResults, setSearchResults] = useState<VerseData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    //? If query is empty, clear results immediately
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setSearchLoading(true);
      setSearchError(null);
      try {
        const response = await fetch(
          `${baseUrl}/bible/search?q=${encodeURIComponent(searchQuery)}&lang=both`,
        );
        const json = await response.json();

        if (json.success) {
          setSearchResults(json.data);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setSearchError("Failed to fetch search results");
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    //? Optional: a tiny debounce can be placed here or kept in your Popup component
    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  console.log(searchResults, searchLoading, searchError )

  return { searchResults, searchLoading, searchError, setSearchResults };
};
