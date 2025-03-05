"use client";

import type { Location } from "@/types";

interface SearchResultsProps {
  results: Location[];
  isLoading: boolean;
  error: string | null;
  onSelectLocation: (location: Location) => void;
}

export default function SearchResults({
  results,
  isLoading,
  error,
  onSelectLocation,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No results found</p>
      </div>
    );
  }

  // Get type badge color based on location type
  const getTypeBadgeClass = (type: string): string => {
    switch (type) {
      case "restaurant":
        return "bg-red-100 text-red-600";
      case "hotel":
        return "bg-blue-100 text-blue-600";
      case "attraction":
        return "bg-green-100 text-green-600";
      case "business":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {results.map((location) => (
        <div
          key={location.id}
          className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150 last:border-b-0"
          onClick={() => onSelectLocation(location)}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">{location.name}</h3>
            <span
              className={`inline-block text-xs py-1 px-2 rounded ${getTypeBadgeClass(
                location.type
              )}`}
            >
              {location.type}
            </span>
          </div>

          {location.address && (
            <p className="text-sm text-gray-500 mt-1">{location.address}</p>
          )}

          {location.city && (
            <p className="text-sm text-gray-500">{location.city}</p>
          )}

          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {location.coordinates.latitude.toFixed(4)},
              {location.coordinates.longitude.toFixed(4)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectLocation(location);
              }}
              className="text-xs py-1 px-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Add to Map
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
