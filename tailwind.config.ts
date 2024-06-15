import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '900px',
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['var(--font-open-sans)'],
      serif: ['var(--font-noto-serif)'],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
