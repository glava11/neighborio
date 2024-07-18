/* eslint-disable no-console */
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLocation() {
  // API: https://ip-api.com/json
  // API response data structure:
  // AT: {"status":"success","country":"Austria","countryCode":"AT","region":"9","regionName":"Vienna","city":"Vienna","zip":"1160","lat":48.2155,"lon":16.3075,"timezone":"Europe/Vienna","isp":"Liberty Global Operations B.V","org":"","as":"AS8412 T-Mobile Austria GmbH","query":"84.115.208.181"}
  let countryName = 'Austria';
  let countryCode = 'AT';
  let locationLat = 48.2155;
  let locationLon = 16.3075;

  await fetch('http://ip-api.com/json')
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        locationLat = data.lat;
        locationLon = data.lon;
        countryName = data.country;
        countryCode = data.countryCode;
      } else {
        console.log(
          '[CLIENT log] Error: Unable to fetch data from the location API'
        );
      }
    })
    .catch((error) => {
      console.error('[CLIENT log] Error fetching location data:', error);
    });

  return {
    country: countryName,
    countryCode,
    location: [locationLat, locationLon],
  };
}
