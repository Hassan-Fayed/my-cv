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
          darkLight: '#d0e5c3',
          regular: '#8ec571',
          lightMedium: '#488577',
          medium: '#37655b',
          dark: '#001c1e',
          extraDark: '#001314',
        },
      },
      spacing: {
        'container-width': '70rem',
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
        }
      },
      animation: {
        openDropdownList: 'openDownwards 0.2s ease-out 1 forwards',
      }
    },
  },
  plugins: [],
};
export default config;
