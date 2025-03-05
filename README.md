# Location Search & Map Integration Challenge

## Overview

The goal is to build a feature where users can search a location, click the location, then be taken to that location on a map.

## Feature Requirements

Core Features to Implement

- Complete the search functionality for locations where the user simply has to type in a keyword then see the results.
- The user should be able to type in a keyword and see the result without submitting the form manually.
- Display search results below the search component. Handle all edge cases.
- If a user selects a location from the search results, they should be taken to the location on the map.
- If multiple locations are selected, the bounding box of the map should include all locations.
- When the user selects the option to "clear all", all selected locations should be removed from the map.

API Information

- A mock location API is available at /mock-api/locations.json.
- The service in api.js is partially implemented to fetch from this endpoint.
- Results include various location types with differing amounts of data.

Evaluation Criteria

- Code quality and organization
- Component design and state management
- Error handling and edge cases
- Mapbox integration and interaction
- General React best practices
