export const SITE_URL = process.env.SITE_URL;
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

export const MIN_YEAR = 1950;
export const MAX_YEAR = new Date().getFullYear();
export const POSSIBLE_YEARS = Array.from(
  { length: (MAX_YEAR - MIN_YEAR) + 1 },
  (_value, index) => MIN_YEAR + index
).reverse();

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]
