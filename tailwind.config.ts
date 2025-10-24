import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          extraLight: '#f7fff2',
          light: '#ebfce1',
          darkLight: '#cbeab9',
          regular: '#8ec571',
          darkRegular: '#6fb14c',
          darkerRegular: '#67a148',
          lightMedium: '#488577',
          medium: '#37655b',
          darkMedium: '#285047',
          dark: '#001c1e',
          extraDark: '#001314',
          accent: '#f0184a',
          darkAccent: '#ca013e',
          accent2: '#fcf451',
          neutral: '#76948e',
        },
      },
      spacing: {
        'container-width': '70rem',
        'projects-container-width': '92rem',
        'general-container-height': 'calc(100svh - 4.7rem)',
        'small-container-width': '43rem'
      },
      boxShadow: {
        'brand-xl': '0 20px 25px -5px rgb(0 28 30 / 0.1), 0 8px 10px -6px rgb(0 28 30 / 0.1)',
      },
      keyframes: {
        openDownwards: {
          '0%': {
            transform: 'translateY(-0.4rem)',
            opacity: '0%'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '100%'
          },
        },
        pointUpwards: {
          '0%': {
            transform: 'translateY(0rem)',
            opacity: '100%',
          },
          '100%': {
            transform: 'translateY(-1rem)',
            opacity: '0%',
          }
        }
      },
      animation: {
        openDropdownList: 'openDownwards 0.2s ease-out 1 forwards',
        goUpwards: 'pointUpwards 1s ease-in-out infinite',
      }
    },
    screens: {
      'screen-2xl': { 'max': '1390px' },
      'screen-xl': { 'max': '1290px' },
      'screen-lg': { 'max': '1236px' },
      'screen-slg': { 'max': '1170px' },
      'screen-md': { 'max': '1024px' },
      'screen-smd': { 'max': '960px' },
      'screen-s': { 'max': '880px' },
      'screen-ss': { 'max': '716px' },
      'screen-xs': { 'max': '600px' },
      'screen-2xs': { 'max': '520px' },
      'screen-3xs': { 'max': '420px' },
      'screen-4xs': { 'max': '390px' },
    },
  },
  plugins: [],
};
export default config;
