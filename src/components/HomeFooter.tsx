import UnderlineLink from '@/components/links/UnderlineLink';

import { siteConfig } from '@/constant/config';

export default function HomeFooter() {
  return (
    <footer className='absolute bottom-2 text-gray-700 dark:text-lime-200'>
      © {new Date().getFullYear()}{' '}
      <UnderlineLink href={siteConfig.url}>{siteConfig.title}</UnderlineLink>
      {' | '}
      <UnderlineLink href='/components'>components</UnderlineLink>
    </footer>
  );
}
