import localFont from 'next/font/local';

export const shadows = localFont({
  src: './fonts/shadows/ShadowsIntoLight-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-shadows',
});

export const unbounded = localFont({
  src: [
    {
      path: './fonts/unbounded/Unbounded-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/unbounded/Unbounded-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-unbounded',
});

export const albert_sans = localFont({
  src: [
    {
      path: './fonts/albert_sans/AlbertSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/albert_sans/AlbertSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-albert-sans',
});
