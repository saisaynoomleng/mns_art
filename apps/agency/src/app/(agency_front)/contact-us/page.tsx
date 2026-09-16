import { handleContactForm } from '@/actions/handleContactForm';
import { sanityFetch } from '@/sanity/live';
import { CONTACT_US_PAGE_SEO_QUERY } from '@/sanity/query';
import { Bounded, ContactForm } from '@mnsart/ui';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: CONTACT_US_PAGE_SEO_QUERY,
    perspective: 'published',
    stega: false,
  });

  return {
    title: seo?.title ?? 'Contact',
    description: seo?.description ?? '',
  };
}

const ContactUsPage = () => {
  return (
    <Bounded as="main">
      <div className="max-w-7xl mx-auto">
        <ContactForm action={handleContactForm} />
      </div>
    </Bounded>
  );
};

export default ContactUsPage;
