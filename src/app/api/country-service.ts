import { CountryWithDistance } from './interfaces';
import * as countriesJson from './search/countries.json';
import { haversine } from './utils';

export function findClosestCountries(
  searchQuery: string,
  currentLat: number,
  currentLon: number
): CountryWithDistance[] {
  // Filter countries based on the search query
  const filteredCountries = countriesJson
    .filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 3);

  // Calculate distance for each filtered country and store it with the country data
  const countriesWithDistance = filteredCountries.map((country) => {
    const [countryLat, countryLon] = country.latlng;
    const distance = haversine(currentLat, currentLon, countryLat, countryLon);
    return { ...country, distance };
  });

  // Sort the countries by distance
  const sortedCountries = countriesWithDistance.sort(
    (a, b) => a.distance - b.distance
  );

  // Return the top 3 closest countries
  return sortedCountries;
}
