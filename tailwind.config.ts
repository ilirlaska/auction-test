import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    extend: {
      textDecoration: ['focus-visible'],
    },
  },
  theme: {
    extend: {
      boxShadow: {
        card: '0 20px 60px 0 rgba(0,0,0,.15)',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      height: {
        '60': '60px',
      },
      colors: {
        primary: '#1E566E',
        'primary-tone': '#000000',
        'primary-5': '#236682',
        'primary-10': '#297596',
        'primary-20': '#3495be',
        'primary-contrast': '#ffffff',
        'primary-contrast-10': '#e6e6e6',
        'primary-contrast-15': '#d9d9d9',
        'primary-contrast-20': '#ccc',
        'primary-contrast-50': '#808080',
        secondary: '#FFB236',
        'secondary-tone': '#ffffff',
        'secondary-10': '#ff9e03',
        'secondary-20': '#cf8000',
        'secondary-contrast': '#000000',
        'secondary-contrast-10': '#1a1a1a',
        'secondary-contrast-15': '#262626',
        'secondary-contrast-20': '#333',
        tertiary: '#FDFBF9',
        'tertiary-tone': '#ffffff',
        'tertiary-tone-25': '#bfbfbf',
        'tertiary-5': '#f7eee6',
        'tertiary-10': '#f0e1d3',
        'tertiary-15': '#ead5c0',
        'tertiary-20': '#e4c8ac',
        'tertiary-30': '#d7ae86',
        'tertiary-40': '#ca9560',
        'tertiary-contrast': '#000000',
        'tertiary-contrast-10': '#1a1a1a',
        'tertiary-contrast-15': '#262626',
        'tertiary-contrast-20': '#333',
        'tertiary-contrast-80': '#ccc',
        'tertiary-contrast-90': '#e6e6e6',
        'tertiary-shadow': 'rgba(0,0,0,0.2)',
      },
    },
    fontSize: {
      'title-xl': '28px',
      title: '24px',
      subtitle: '18px',
      header: '17px',
      body: '15px',
      label: '12px',
    },
  },
  plugins: [],
}

export default config
