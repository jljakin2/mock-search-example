export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Location {
  id: string;
  name: string;
  address?: string;
  city?: string;
  type: "restaurant" | "hotel" | "attraction" | "business" | string;
  coordinates: Coordinates;
  description?: string;
}

export type SearchResultsState = "idle" | "loading" | "error" | "success";
