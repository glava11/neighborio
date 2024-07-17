'use client';

import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import useSwr from 'swr';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

const API_URL = '/api/search?q=';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const search = useSearchParams();
  const searchQuery = search.get('q');
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, isLoading, error } = useSwr(
    `${API_URL}${encodedSearchQuery}`,
    fetcher
  );

  if (!data) {
    return null;
  }

  console.log('[CLIENT log] data: ', data);

  return (
    <main>
      <Head>
        <title>neighborio</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <Logo className='w-10' />
            <h1>neighborio</h1>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1 className='mt-4'>Find your closest countries</h1>
          {/* <p className='mt-2 text-sm text-gray-800'>
            Find your closest countries{' '}
          </p> */}

          <form action='' className='mt-6 max-w-md mx-auto'>
            {/* <input type='search' name='search' id='' /> */}
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
              />

              <div
                className='dropdown absolute z-10 mt-2 w-full origin-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
                tabIndex={-1}
              >
                <div className='py-1' role='none'>
                  {isLoading ? (
                    <p className='block px-4 py-2 text-lg text-gray-700'>
                      loading...
                    </p>
                  ) : (
                    <>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                        tabIndex={-1}
                        id='menu-item-0'
                      >
                        Account settings
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                        tabIndex={-1}
                        id='menu-item-1'
                      >
                        Support
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        role='menuitem'
                        tabIndex={-1}
                        id='menu-item-2'
                      >
                        License
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>

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
            <UnderlineLink href='https://neighbor.io'>neighborio</UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
