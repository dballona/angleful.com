export const SITE_URL = process.env.SITE_URL;
export const CONTACT_EMAIL = 'hi@angleful.com';

export const MIN_YEAR = 1950;
export const MAX_YEAR = new Date().getFullYear();
export const POSSIBLE_YEARS = Array.from(
  { length: (MAX_YEAR - MIN_YEAR) + 1 },
  (_value, index) => MIN_YEAR + index
).reverse();

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

export const ABBR_MONTH_NAMES = [
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

export type Color = 'green' | 'yellow' | 'red' | 'purple' | 'sky';
