import type { Metadata } from 'next';
import './globals.css';
import { SanityLive } from '@/sanity/live';
import { albert_sans, shadows, unbounded } from '@/lib/fonts';
import { Toaster } from '@mnsart/ui';

export const metadata: Metadata = {
  title: {
    template: '%s | MNS Art',
    default: 'MNS Art',
  },
  description:
    'MNSArt is a creative agency based in Ohio offering UI/UX design, web development, and custom digital projects for clients in the US and Myanmar.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${shadows.variable} ${unbounded.variable} ${albert_sans.variable}  min-h-full antialiased`}
    >
      <body>
        {children}

        <Toaster richColors closeButton position="bottom-center" />
        <SanityLive />
      </body>
    </html>
  );
}
