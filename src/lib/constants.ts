export const SITE_URL = 'https://angleful.com';
export const CONTACT_EMAIL = 'hi@angleful.com';

import { Open_Sans, Noto_Serif } from 'next/font/google';

export const sansFont = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const serifFont = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
});

export type Color = 'green' | 'yellow' | 'red' | 'purple' | 'sky';
