'use client';

import Head from 'next/head';
import * as React from 'react';
import { useEffect, useState } from 'react';
import '@/lib/env';

import { getLocation } from '@/lib/utils';

import CurrentLocation from '@/components/CurrentLocation';
import HomeFooter from '@/components/HomeFooter';
import HomeHeader from '@/components/HomeHeader';
import SearchInput from '@/components/SearchInput';
import SelectedCountry from '@/components/SelectedCountry';

import { Country, Location } from '@/app/interfaces';

export default function HomePage() {
  // const search = useSearchParams();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  let currentCountryName = '';
  let currentCountryCode = '';

  const checkCurrentLocation = async (): Promise<void> => {
    const { country, countryCode } = await getLocation();
    currentCountryName = country && country.length > 0 ? country : 'Austria';
    currentCountryCode =
      countryCode && countryCode.length > 0 ? countryCode : 'AT';

    setCurrentLocation({
      countryName: currentCountryName,
      countryCode: currentCountryCode,
    });
  };

  const handleSelectedCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    checkCurrentLocation();
  }, []);

  return (
    <main>
      <Head>
        <title>neighborio</title>
      </Head>
      <section className='bg-lime-100 dark:bg-stone-900'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <HomeHeader />

          {currentLocation && <CurrentLocation location={currentLocation} />}

          <SearchInput onSelectedCountry={handleSelectedCountry} />

          <div className='block px-4 py-10 text-xl text-center text-gray-700 dark:text-lime-200 leading-10 max-w-lg md:max-w-xl min-h-80'>
            {selectedCountry && <SelectedCountry country={selectedCountry} />}
          </div>

          <HomeFooter />
        </div>
      </section>
    </main>
  );
}
