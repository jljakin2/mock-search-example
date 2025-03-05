"use client";

import type { Location } from "@/types";

export default function SearchResults({ results }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {results.map((location) => (
        <div
          key={location.id}
          className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150 last:border-b-0"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">{location.name}</h3>
            <span className="inline-block text-xs py-1 px-2 rounded">
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
