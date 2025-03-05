"use client";

import { useEffect, useCallback } from "react";
import { searchLocations } from "@/lib/api";
import { useDebounce } from "@uidotdev/usehooks";
import type { Location } from "@/types";

export default function SearchInput() {
  const performSearch = useCallback(async (query: string) => {
    const results = await searchLocations(query);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
}
