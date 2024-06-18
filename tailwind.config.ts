import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px', // 40rem
      md: '768px', // 48rem
      lg: '896px', // 56rem
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Open Sans'],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
