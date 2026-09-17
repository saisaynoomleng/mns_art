import { env } from '@/lib/env/client';
import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { FOOTER_QUERY } from '@/sanity/query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';

const Footer = async (): Promise<React.JSX.Element | null> => {
  const { data: footer } = await sanityFetch({
    query: FOOTER_QUERY,
    perspective: 'published',
    stega: false,
  });

  if (!footer) return null;

  return (
    <footer
      className={clsx(
        'bg-brand-primary-100 text-background px-6 md:px-8 lg:px-10 py-6 grid md:grid-cols-2 gap-x-4 md:gap-x-6 max-md:gap-y-6',
      )}
    >
      <div className="flex flex-col gap-y-4">
        <div>
          <Link href="/" className="w-fit">
            <Image
              src={urlFor(env.NEXT_PUBLIC_LOGO_URL).format('webp').url()}
              priority
              alt="MNS Art Logo"
              width={200}
              height={200}
              className="max-w-full object-cover"
            />
          </Link>
          <p className="font-semibold">{footer.text}</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <Link href={env.NEXT_PUBLIC_FACEBOOK_URL}>
              <FaFacebookSquare className="hover:text-primary" size={30} />
            </Link>

            <Link href={env.NEXT_PUBLIC_GITHUB_URL}>
              <FaGithubSquare className="hover:text-primary" size={30} />
            </Link>
          </div>

          <address className="font-semibold text-fs-300 text-black/50">
            <p>{footer.street}</p>
            <p>
              <span>{footer.city}, </span>
              <span>{footer.state}, </span>
              <span>{footer.zip}</span>
            </p>
            <p>{footer.country}</p>
          </address>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:justify-between gap-y-6 md:gap-x-6">
        {footer.columns?.map((column) => (
          <div key={column._key} className="flex flex-col gap-y-3">
            <p className="font-semibold">{column.title}</p>
            <ul>
              {column.links?.map((l) => (
                <li key={l._key}>
                  <Link
                    href={l.href as string}
                    className="hover:underline hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="col-span-full place-self-end flex gap-x-1 text-fs-300 font-semibold text-black/50">
        <p>&copy;{new Date().getFullYear()} mnsart.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
