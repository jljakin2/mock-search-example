"use client";

import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import SearchResults from "@/components/SearchResults";
import MapDisplay from "@/components/MapDisplay";
import type { Location } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);

  const handleSelectLocation = (location: Location) => {
    if (!selectedLocations.some((loc) => loc.id === location.id)) {
      setSelectedLocations((prev) => [location, ...prev]);
    }
  };

  const handleRemoveLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.filter((location) => location.id !== locationId)
    );
  };

  const selectedCount = selectedLocations.length;

  return (
    <main className="flex h-full">
      <div className="w-96 h-full p-5 flex flex-col bg-white shadow-md z-10 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-5 text-secondary">
          Location Finder
        </h1>

        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchResults={setSearchResults}
          setIsLoading={setIsLoading}
          setError={setError}
        />

        {selectedCount > 0 && (
          <div className="mt-4 mb-2 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">
              {selectedCount} location{selectedCount !== 1 ? "s" : ""} selected
            </div>
            <button
              onClick={() => setSelectedLocations([])}
              className="text-xs py-1 px-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="mt-4">
          <SearchResults
            results={searchResults}
            isLoading={isLoading}
            error={error}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      </div>

      <div className="flex-1 h-full relative">
        <MapDisplay
          selectedLocations={selectedLocations}
          onRemoveLocation={handleRemoveLocation}
        />
      </div>
    </main>
  );
}
