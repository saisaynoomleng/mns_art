import { env } from '@/lib/env/client';
import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from './MainNav';
import { sanityFetch } from '@/sanity/live';
import { NAV_LINKS_QUERY } from '@/sanity/query';

export const Header = async (): Promise<React.JSX.Element> => {
  const { data: navLinks } = await sanityFetch({
    query: NAV_LINKS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return (
    <header className="flex items-center justify-between mx-4 md:mx-8 max-w-7xl lg:mx-auto bg-brand-primary-400/5 my-2 md:mt-4 px-4 py-2 overflow-hidden">
      <div>
        <Link href="/">
          <Image
            src={env.NEXT_PUBLIC_NO_TEXT_LOGO_URL}
            alt=""
            width={100}
            height={100}
            priority
            className="min-w-full object-cover"
          />
        </Link>
      </div>

      <MainNav navLinks={navLinks} />
    </header>
  );
};
