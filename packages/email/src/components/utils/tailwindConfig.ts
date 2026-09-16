import { TailwindConfig } from 'react-email';
import { colors } from './colors';

export default {
  theme: {
    extend: {
      colors,
    },
    fontFamily: {
      heading: ['Unbounded', 'sans-serif'],
      body: ['Albert Sans', 'sans-serif'],
      cursive: ['Shadows Into Light', 'cursive'],
    },
  },
} satisfies TailwindConfig;
