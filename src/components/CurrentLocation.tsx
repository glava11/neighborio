import Image from 'next/image';

import { Location } from '@/app/interfaces';

type CurrentLocationProps = {
  location: Location;
};

export default function CurrentLocation({ location }: CurrentLocationProps) {
  return (
    <div className='block px-4 py-10 text-gray-700 dark:text-lime-200 max-w-lg md:max-w-xl'>
      <span className='flex items-center justify-center gap-x-2'>
        <h1 className='mt-4'>Hi {location?.countryName}</h1>
        {/* flag icons by https://www.npmjs.com/package/country-flag-icons */}
        <Image
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${location?.countryCode}.svg`}
          alt={`${location?.countryName} flag`}
          width={64}
          height={32}
        />
        <h1 className='mt-4'> !</h1>
      </span>
      <h1 className='mt-4 text-gray-700 dark:text-lime-200'>
        Find your closest countries
      </h1>
    </div>
  );
}
