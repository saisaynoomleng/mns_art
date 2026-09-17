import { urlFor } from '@/sanity/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const SanityPortableText: PortableTextComponents = {
  types: {
    imageWithAlt: (props) =>
      props.value ? (
        <Image
          src={urlFor(props.value).width(600).height(400).format('webp').url()}
          alt={props.value?.alt ?? ''}
          width={600}
          height={400}
          className="mx-auto max-w-150"
        />
      ) : null,
  },

  list: {},

  listItem: {
    bullet: ({ children }) => (
      <li className="marker:text-brand-accent-400 text-foreground">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="marker:text-brand-accent-400 text-foreground">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <span className="font-semibold text-secondary">{children}</span>
    ),

    em: ({ children }) => (
      <span className="italic text-foreground">{children}</span>
    ),

    underline: ({ children }) => (
      <span className="underline underline-offset-2 text-foreground">
        {children}
      </span>
    ),

    links: ({ value, children }) => (
      <Link
        href={value?.href}
        className="text-foreground underline"
        target="_blank"
        rel="noreferrer nofollow"
      >
        {children}
      </Link>
    ),
  },

  block: {
    normal: ({ children }) => <p className="text-foreground">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-primary text-fs-500">{children}</h1>
    ),
    h2: ({ children }) => (
      <p className="text-primary text-fs-500">{children}</p>
    ),
    h3: ({ children }) => (
      <p className="text-primary text-fs-500">{children}</p>
    ),
    h4: ({ children }) => (
      <p className="text-primary text-fs-500">{children}</p>
    ),
    h5: ({ children }) => (
      <p className="text-primary text-fs-500">{children}</p>
    ),
    h6: ({ children }) => (
      <p className="text-primary text-fs-500">{children}</p>
    ),
  },
};
