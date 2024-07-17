export interface Country {
  name: string;
  latlng: string;
  flag: string;
  distance?: number;
  population?: number;
  topLevelDomain?: string;
  capital?: string;
}

export interface Location {
  countryName: string;
  countryCode: string;
}
