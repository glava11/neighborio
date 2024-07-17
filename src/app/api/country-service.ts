import * as countriesJson from './countries.json';
import { CountryWithDistance } from './interfaces';
import { haversine } from './utils';

export function findClosestCountries(
  searchQuery: string,
  currentLat: number,
  currentLon: number
): CountryWithDistance[] {
  // Filter countries based on the search query
  // sort alphabetically, slice top 3,
  // calculate distances and sort by them
  const filteredCountries = countriesJson
    .filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 3)
    .map((country) => {
      const [countryLat, countryLon] = country.latlng;
      const distance = haversine(
        currentLat,
        currentLon,
        countryLat,
        countryLon
      );
      return { ...country, distance };
    })
    .sort((a, b) => a.distance - b.distance);

  return filteredCountries;
}
