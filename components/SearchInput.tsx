"use client";

import { useEffect, useCallback } from "react";
import { searchLocations } from "@/lib/api";
import { useDebounce } from "@uidotdev/usehooks";
import type { Location } from "@/types";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Location[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  setSearchResults,
  setIsLoading,
  setError,
}: SearchInputProps) {
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Handle the actual search API call
  const performSearch = useCallback(
    async (query: string) => {
      // Don't search if query is empty
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchLocations(query);
        setSearchResults(results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred during search"
        );
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchResults, setIsLoading, setError]
  );

  // Trigger the search when the debounced query changes
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // No need to manually call search here, the useEffect will handle it
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}
