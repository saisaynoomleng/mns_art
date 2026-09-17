import { RenderAction } from '@/components/RenderAction';
import { sanityFetch } from '@/sanity/live';
import { ALL_PRICING_QUERY } from '@/sanity/query';
import { ArrowButton, Bounded, CarePlanCard, SectionTitle } from '@mnsart/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Inclusive = {
  title: string;
  _key: string;
};

const getData = async () => {
  const { data } = await sanityFetch({
    query: ALL_PRICING_QUERY,
    perspective: 'published',
    stega: false,
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return {
    title: data?.seo?.title ?? 'Pricing Page',
    description: data?.seo?.description ?? 'MNS Pricings data',
  };
}

const PricingPage = async () => {
  const { pricing } = await getData();

  if (!pricing) return notFound();

  return (
    <Bounded padding="none" spacing="sm">
      <SectionTitle label="Plans That Grow With Your Site" />

      <div className="grid gap-y-4 md:grid-cols-2 gap-x-4">
        {pricing.map((p) => (
          <CarePlanCard
            key={p._id}
            name={p.name ?? ''}
            excerpt={p.excerpt ?? ''}
            pricePerMonth={p.pricePerMonth ?? 0}
            action={{ label: 'Check Detail', href: `/pricing/${p.slug}` }}
            renderAction={({ label, href }) => RenderAction({ label, href })}
            isPremium={p.isPremium ?? false}
            inclusives={p.inclusives as Inclusive[]}
            exclusives={p.exclusives as string[]}
            className="max-w-150"
          />
        ))}
      </div>
    </Bounded>
  );
};

export default PricingPage;
