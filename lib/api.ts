import { Location } from "@/types";
import { simulateNetworks } from "./simulateNetworkDelay";

export const searchLocations = async (query: string): Promise<Location[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch("/mock-api/locations.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Location[] = await response.json();

    const filteredResults = data.filter((location) => {
      const name = location.name.toLowerCase();
      const address = location.address ? location.address.toLowerCase() : "";
      const city = location.city ? location.city.toLowerCase() : "";
      const q = query.toLowerCase();

      return name.includes(q) || address.includes(q) || city.includes(q);
    });

    // IGNORE ME: Simulating network delays
    await simulateNetworks();

    return filteredResults;
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};
