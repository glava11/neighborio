import Image from 'next/image';

import UnderlineLink from '@/components/links/UnderlineLink';

import { Country } from '@/app/interfaces';

type SelectedCountryProps = {
  country: Country;
};

export default function SelectedCountry({ country }: SelectedCountryProps) {
  return (
    <>
      <span className='flex items-center justify-center gap-x-2'>
        <Image
          src={country.flag}
          alt={`${country.name} flag`}
          width={64}
          height={32}
        />
        <p>
          {country.name} is{' '}
          <b>
            {new Intl.NumberFormat().format(Math.round(country.distance || 0))}{' '}
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
              Math.round(country.population || 0)
            )}{' '}
            people
          </b>
          , their capital is <b>{country.capital}</b> and top level domain is{' '}
          <b>{country.topLevelDomain}</b>
        </p>
      </span>
      <span className='flex items-center justify-center gap-x-2'>
        <p>
          learn more about <b>{country.name}</b> at{' '}
          <UnderlineLink href={`https://en.wikipedia.org/wiki/${country.name}`}>
            wikipedia
          </UnderlineLink>
        </p>
      </span>
    </>
  );
}
