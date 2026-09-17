import { Bounded, Button, SectionTitle, Separator } from '@mnsart/ui';
import type { PageProps } from '@/lib/types';
import { sanityFetch } from '@/sanity/live';
import { ALL_PRICING_QUERY, PRICING_DETAIL_QUERY } from '@/sanity/query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatPriceInUSD } from '@mnsart/utils';
import Link from 'next/link';
import BackToPrevPage from '@/components/BackToPrevPage';

const getData = async ({ params }: PageProps) => {
  const { data } = await sanityFetch({
    query: PRICING_DETAIL_QUERY,
    perspective: 'published',
    stega: false,
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const data = await getData({ params });

  return {
    title: data?.seoTitle ?? 'MNS Pricing Detail Page',
    description: data?.seoDescription ?? 'MNS Pricing Details',
  };
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_PRICING_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data?.pricing.map((d) => ({
    slug: d.slug,
  }));
}

const PricingDetailPage = async ({ params }: PageProps) => {
  const data = await getData({ params });

  if (!data) return notFound();

  return (
    <Bounded padding="none" spacing="sm">
      <BackToPrevPage label="back to all pricing" href="/pricing" />

      <SectionTitle as="h2" label={data.name as string} />

      <div className="flex justify-between items-center border px-2 py-1 border-brand-accent-400/10 brand-box-shadow">
        <p className="text-fs-500">
          <span>Price/Month: </span>
          <span className="text-primary font-heading">
            {formatPriceInUSD(data.pricePerMonth as number)}
          </span>
        </p>

        <Button asChild>
          <Link href="/pricing/get-plan/" className="relative z-20">
            Get this plan
          </Link>
        </Button>
      </div>

      <h3 className="text-fs-500 text-primary font-semibold underline underline-offset-4">
        What&apos;s included
      </h3>

      <div className="flex flex-col gap-y-2">
        {data.inclusives?.map((i) => (
          <div key={i._key}>
            <p className="font-semibold text-secondary">{i.title}</p>
            <p>{i.body}</p>
          </div>
        ))}
      </div>

      <Separator />

      <h3 className="text-fs-500 text-primary font-semibold underline underline-offset-4">
        What&apos;s not included
      </h3>

      <div className="flex flex-col gap-y-2">
        {data.inclusives?.map((i) => (
          <div key={i._key}>
            <p className="font-semibold text-secondary">{i.title}</p>
            <p>{i.body}</p>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default PricingDetailPage;
