'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { Button, Separator } from '@mnsart/ui';
import clsx from 'clsx';
import { NAV_LINKS_QUERY_RESULT } from '@/sanity/types';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { authClient } from '@/lib/authClient';
import Image from 'next/image';

type MainNavProps = {
  className?: string;
  navLinks: NAV_LINKS_QUERY_RESULT;
};

export const MainNav = ({ className, navLinks }: MainNavProps) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  if (!navLinks) return notFound();

  const { navLinks: links } = navLinks;
  const isSignedIn = !!session?.session;

  const userImg =
    session?.user?.image ??
    `https://placehold.co/50?text=${session?.user?.name?.charAt(0)}`;

  return (
    <div className={twMerge(clsx('', className))}>
      <div className="flex gap-x-2 items-center">
        {isSignedIn ? (
          <button className="rounded-full">
            <Link href="/user" className="relative z-20">
              <Image
                src={userImg}
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          </button>
        ) : (
          <Button asChild>
            <Link href="/sign-in" className="relative z-20">
              Sign In
            </Link>
          </Button>
        )}
        <Separator orientation="vertical" className="max-md:hidden" />
        {navOpen ? (
          <Button
            onClick={() => setNavOpen(false)}
            aria-label="close main menu"
            className="relative z-100"
          >
            <span className="flex items-center gap-x-1">
              close menu{' '}
              <IoMdCloseCircle
                aria-hidden
                className="text-brand-error-600 animate-pulse"
              />
            </span>
          </Button>
        ) : (
          <Button
            onClick={() => setNavOpen(true)}
            aria-label="open main menu"
            className="relative z-100"
          >
            <span className="flex gap-x-1 items-center">
              <GoDotFill
                className="text-brand-success-600 animate-pulse"
                aria-hidden
              />
              Open Menu
            </span>
          </Button>
        )}
      </div>

      <nav
        className={clsx(
          'flex flex-col gap-y-1 justify-center items-center fixed inset-0 bg-brand-primary-400/10 backdrop-blur-2xl z-50 transition-transform duration-400',
          navOpen ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        {links?.map((l) => (
          <Button
            key={l._key}
            asChild
            onClick={() => setNavOpen(false)}
            className="px-4 py-2 md:px-6 md:py-4 lowercase"
            size="lg"
          >
            <Link href={l.href as string} className="relative z-20 text-fs-500">
              {l.label}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
};
