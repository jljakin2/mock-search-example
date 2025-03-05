"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { Location } from "@/types";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapDisplayProps {
  selectedLocations: Location[];
  onRemoveLocation: (id: string) => void;
}

export default function MapDisplay({
  selectedLocations,
  onRemoveLocation,
}: MapDisplayProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-100, 40],
        zoom: 3.5,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Remove markers that are no longer selected
    Object.keys(markers.current).forEach((id) => {
      if (!selectedLocations.find((loc) => loc.id === id)) {
        markers.current[id].remove();
        delete markers.current[id];
      }
    });

    // Add new markers
    selectedLocations.forEach((location) => {
      if (!markers.current[location.id]) {
        // Create marker element
        const el = document.createElement("div");
        el.className =
          "w-6 h-6 rounded-full border-2 border-white cursor-pointer shadow-md";
        el.style.backgroundColor = "#3498db";

        // Create and add marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([
            location.coordinates.longitude,
            location.coordinates.latitude,
          ])
          .addTo(map.current!);

        markers.current[location.id] = marker;
      }
    });

    // If we have locations, fit the map to show all of them
    if (selectedLocations.length > 0) {
      if (selectedLocations.length === 1) {
        // If there's only one location, center on it with zoom
        const location = selectedLocations[0];
        map.current.flyTo({
          center: [
            location.coordinates.longitude,
            location.coordinates.latitude,
          ],
          zoom: 14,
          essential: true,
        });
      } else {
        // If there are multiple locations, fit bounds to include all markers
        const bounds = new mapboxgl.LngLatBounds();

        selectedLocations.forEach((location) => {
          bounds.extend([
            location.coordinates.longitude,
            location.coordinates.latitude,
          ]);
        });

        map.current.fitBounds(bounds, {
          padding: 50, // Add some padding around the bounds
          maxZoom: 15, // Don't zoom in too far
          duration: 1000, // Animation duration in milliseconds
        });
      }
    }
  }, [selectedLocations, onRemoveLocation]);

  return <div ref={mapContainer} className="h-full w-full" />;
}
