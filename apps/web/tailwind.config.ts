import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f8f8fc',
        ink: '#201e31',
        heading: '#1e1b35',
        brand: '#674ad1',
        'brand-hover': '#5639bf',
        bright: '#7657e1',
        deep: '#4b37a8',
        teal: '#29aea2',
        muted: '#68677a',
        quiet: '#555368',
        placeholder: '#a2a1af',
        eyebrow: '#7457d9',
        danger: '#b91c1c',
        'danger-surface': '#fef2f2',
        'danger-border': '#fca5a5',
        line: '#e7e7ef',
        input: '#d9d8e4',
      },
    },
  },
  plugins: [],
} satisfies Config;
