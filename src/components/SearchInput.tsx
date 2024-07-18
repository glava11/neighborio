import { useRef, useState } from 'react';

import logger from '@/lib/logger';

import { Country } from '@/app/interfaces';

interface SearchInputProps {
  onSelectedCountry: (country: Country) => void;
}

const API_SEARCH_URL = '/api/search?q=';
export default function SearchInput({ onSelectedCountry }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openSearch = (): void => {
    if (dropdownRef.current) {
      dropdownRef.current.hidden = false;
      dropdownRef.current.classList.remove('hidden');
    }
  };

  const resetSearch = (): void => {
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
    } else if (event.target.value.replace(/\s/g, '').length < 2) {
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
          const res = await fetch(
            `${API_SEARCH_URL}${event.target.value.trim()}`
          );
          if (res.ok) {
            const data = await res.json();
            setCountries(data);
          }
          setIsLoading(false);
        } catch (error) {
          logger(error, '[CLIENT log] error ');
        }
      }, 500)
    );
  };

  const handleSelectedCountry = (country: Country): void => {
    // sets setSelectedCountry(country); in HomePage
    onSelectedCountry(country);
    resetSearch();
  };

  return (
    <form
      action=''
      className='block px-4 py-10 w-full max-w-lg md:max-w-xl'
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
      }}
    >
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-lime-200'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-lime-200'
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
          type='text'
          id='default-search'
          className='block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-lime-500 focus:border-lime-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-lime-200 dark:focus:ring-lime-500 dark:focus:border-lime-500'
          placeholder='Search for countries ...'
          required
          onChange={handleSearchOnChange}
          onFocus={openSearch}
          onAbort={resetSearch}
          defaultValue={searchQuery}
        />
        <div
          className='dropdown hidden absolute z-10 mt-2 w-full origin-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-lime-200'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-1}
          ref={dropdownRef}
        >
          <div className='py-1' role='none'>
            {isLoading && (
              <p className='block px-4 py-2 text-lg text-gray-700 dark:text-lime-200'>
                loading...
              </p>
            )}

            {!isLoading && !countries && (
              <p className='block px-4 py-2 text-lg text-gray-700 dark:text-lime-200'>
                search for countries
              </p>
            )}

            {!isLoading && countries && countries.length === 0 && (
              <p className='block px-4 py-2 text-lg text-gray-700 dark:text-lime-200'>
                No results found
              </p>
            )}

            {!isLoading &&
              countries &&
              countries.length > 0 &&
              countries.map((country, index) => (
                <a
                  href='#'
                  className='block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-lime-200 dark:hover:bg-gray-600 dark:hover:text-lime-300'
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
  );
}
