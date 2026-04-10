/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          900: 'var(--purple-900)',
          800: 'var(--purple-800)',
          700: 'var(--purple-700)',
          600: 'var(--purple-600)',
          500: 'var(--purple-500)',
          400: 'var(--purple-400)',
          300: 'var(--purple-300)',
          200: 'var(--purple-200)',
          100: 'var(--purple-100)',
        },
        blue: {
          600: 'var(--blue-600)',
          500: 'var(--blue-500)',
          400: 'var(--blue-400)',
          300: 'var(--blue-300)',
          100: 'var(--blue-100)',
        },
        gray: {
          950: 'var(--gray-950)',
          900: 'var(--gray-900)',
          800: 'var(--gray-800)',
          700: 'var(--gray-700)',
          600: 'var(--gray-600)',
          500: 'var(--gray-500)',
          400: 'var(--gray-400)',
          300: 'var(--gray-300)',
          200: 'var(--gray-200)',
          100: 'var(--gray-100)',
        },
        green:  'var(--green)',
        red:    'var(--red)',
        amber:  'var(--amber)',
      },
      fontFamily: {
        head: 'var(--font-head)',
        body: 'var(--font-body)',
      },
      borderRadius: {
        sm:  'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg:  'var(--radius-lg)',
      },
      width: {
        sidebar: 'var(--sidebar-w)',
      },
      height: {
        topbar: 'var(--topbar-h)',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [],
};
