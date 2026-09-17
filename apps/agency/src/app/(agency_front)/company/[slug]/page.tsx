import { SanityPortableText } from '@/components/SanityPortableText';
import { sanityFetch } from '@/sanity/live';
import { ALL_COMPANY_PAGES, COMPANY_PAGE_QUERY } from '@/sanity/query';
import { Bounded, SectionTitle } from '@mnsart/ui';
import type { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import React from 'react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getPageData = async ({ params }: PageProps) => {
  const { data } = await sanityFetch({
    query: COMPANY_PAGE_QUERY,
    perspective: 'published',
    stega: false,
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getPageData({ params });

  return {
    title: data?.seoTitle ?? 'MNS Art Company',
    description: data?.seoDescription ?? "MNS Art's company terms, polices.",
  };
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_COMPANY_PAGES,
    perspective: 'published',
    stega: false,
  });

  return data.map((d) => ({
    slug: d.slug,
  }));
}

const CompanyPage = async ({
  params,
}: PageProps): Promise<React.JSX.Element> => {
  const data = await getPageData({ params });

  if (!data) return notFound();

  return (
    <Bounded className="prose prose-sm md:prose-lg min-w-full">
      {data.body && (
        <PortableText value={data.body} components={SanityPortableText} />
      )}
    </Bounded>
  );
};

export default CompanyPage;
