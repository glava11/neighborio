export interface Country {
  name: string;
  latlng: number[];
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
