"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { Location } from "@/types";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapDisplay() {
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
    }
  }, []);

  return <div ref={mapContainer} className="h-full w-full" />;
}
