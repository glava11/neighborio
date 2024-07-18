/* eslint-disable no-console */
// the distance between two points on the Earth's surface using the Haversine formula.
export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's Radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// get appx location based on IP of requester
export async function getLocation() {
  // API: https://ip-api.com/json
  // API response data structure:
  // {"status":"success","country":"Austria","countryCode":"AT","region":"9","regionName":"Vienna","city":"Vienna","zip":"1160","lat":48.2155,"lon":16.3075,"timezone":"Europe/Vienna","isp":"Liberty Global Operations B.V","org":"","as":"AS8412 T-Mobile Austria GmbH","query":"84.115.208.181"}
  let locationLat = 48.2155;
  let locationLon = 16.3075;

  await fetch('http://ip-api.com/json')
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        locationLat = data.lat;
        locationLon = data.lon;
      } else {
        console.log(
          '[API log] Error: Unable to fetch data from the location API'
        );
      }
    })
    .catch((error) => {
      console.error('[API log] Error fetching location data:', error);
    });

  return [locationLat, locationLon];
}
