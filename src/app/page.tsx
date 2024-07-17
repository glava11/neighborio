'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import '@/lib/env';

import { getLocation } from '@/lib/utils';

import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';

import { siteConfig } from '@/constant/config';

type Country = {
  name: string;
  latlng: string;
  flag: string;
  distance?: number;
  population?: number;
  topLevelDomain?: string;
  capital?: string;
};

type Location = {
  countryName: string;
  countryCode: string;
};

const API_SEARCH_URL = '/api/search?q=';

export default function HomePage() {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const openSearch = (): void => {
    setSearchOpen(true);
    if (dropdownRef.current) {
      dropdownRef.current.hidden = false;
      dropdownRef.current.classList.remove('hidden');
    }
  };

  const resetSearch = (): void => {
    setSearchOpen(false);
    setSearchQuery('');
    setCountries(null);
    if (dropdownRef.current) {
      dropdownRef.current.hidden = true;
      dropdownRef.current.classList.add('hidden');
    }
  };

  const handleSearchOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!event.target.value) {
      resetSearch();
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    setIsLoading(true);
    openSearch();
    setTimer(
      setTimeout(async () => {
        try {
          const res = await fetch(`${API_SEARCH_URL}${event.target.value}`);
          if (res.ok) {
            const data = await res.json();
            setCountries(data);
            console.log('[CLIENT log] data: ', data);
          }
          setIsLoading(false);
        } catch (error) {
          console.log('[CLIENT log] error: ', error);
        }
      }, 500)
    );
  };

  useEffect(() => {
    console.log(
      '[CLIENT log] useEffect -> currentCountryName: ',
      currentCountryName
    );
    checkCurrentLocation().then(() => {
      console.log(
        '[CLIENT log] useEffect -> then -> currentCountryName: ',
        currentCountryName
      );
    });
  }, []);

  const handleSelectedCountry = (country: Country): void => {
    setSelectedCountry(country);
    resetSearch();
  };

  return (
    <main>
      <Head>
        <title>neighborio</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <h1>neighborio</h1>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          {currentLocation && (
            <div className='block px-4 py-10 text-gray-700 max-w-lg md:max-w-xl'>
              <span className='flex items-center justify-center gap-x-2'>
                <h1 className='mt-4'>Hi {currentLocation?.countryName}</h1>
                {/* as suggested by https://www.npmjs.com/package/country-flag-icons */}
                <Image
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${currentLocation?.countryCode}.svg`}
                  alt={`${currentLocation?.countryName} flag`}
                  width={64}
                  height={32}
                />
                <h1 className='mt-4'> !</h1>
              </span>
              <h1 className='mt-4 text-gray-700'>
                Find your closest countries
              </h1>
            </div>
          )}

          <form
            action=''
            className='block px-4 py-10 w-full max-w-lg md:max-w-xl'
          >
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search your neighbors...'
                required
                onChange={handleSearchOnChange}
                onFocus={openSearch}
                onAbort={resetSearch}
                defaultValue={searchQuery}
              />
              <div
                className='dropdown hidden absolute z-10 mt-2 w-full origin-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
                tabIndex={-1}
                ref={dropdownRef}
              >
                <div className='py-1' role='none'>
                  {isLoading && (
                    <p className='block px-4 py-2 text-lg text-gray-700'>
                      loading...
                    </p>
                  )}

                  {!isLoading && !countries && (
                    <p className='block px-4 py-2 text-lg text-gray-700'>
                      search for countries
                    </p>
                  )}

                  {!isLoading && countries && countries.length === 0 && (
                    <p className='block px-4 py-2 text-lg text-gray-700'>
                      No results found
                    </p>
                  )}

                  {!isLoading &&
                    countries &&
                    countries.length > 0 &&
                    countries.map((country, index) => (
                      <a
                        href='#'
                        className='block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                        tabIndex={-1}
                        id={`menu-item-${index}`}
                        key={country.name}
                        onClick={() => handleSelectedCountry(country)}
                      >
                        {country.name}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </form>

          {selectedCountry && (
            <div className='block px-4 py-10 text-xl text-center text-gray-700 leading-10 max-w-lg md:max-w-xl'>
              <span className='flex items-center justify-center gap-x-2'>
                <Image
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  width={64}
                  height={32}
                />
                <p>
                  {selectedCountry.name} is{' '}
                  <b>
                    {new Intl.NumberFormat().format(
                      Math.round(selectedCountry.distance || 0)
                    )}{' '}
                    km{' '}
                  </b>
                  away from you!
                </p>
              </span>
              <span className='flex items-center justify-center gap-x-2'>
                <p>
                  There is around{' '}
                  <b>
                    {new Intl.NumberFormat().format(
                      Math.round(selectedCountry.population || 0)
                    )}{' '}
                    people
                  </b>
                  , their capital is <b>{selectedCountry.capital}</b> and top
                  level domain is <b>{selectedCountry.topLevelDomain}</b>
                </p>
              </span>
              <span className='flex items-center justify-center gap-x-2'>
                <p>
                  learn more about <b>{selectedCountry.name}</b> at{' '}
                  <UnderlineLink
                    href={`https://en.wikipedia.org/wiki/${selectedCountry.name}`}
                  >
                    wikipedia
                  </UnderlineLink>
                </p>
              </span>
            </div>
          )}

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all components
          </ButtonLink>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()}{' '}
            <UnderlineLink href={siteConfig.url}>
              {siteConfig.title}
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
