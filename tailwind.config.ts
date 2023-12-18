import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      aspectRatio: {
        gold: '1.618 / 1',
        goldReverse: '1 / 1.618',
        silver: '1.4 / 1',
        silverReverse: '1 / 1.4',
      },
      colors: {
        accent: colors.pink,
        danger: colors.red,
        error: colors.rose,
        info: colors.cyan,
        primary: colors.indigo,
        secondary: colors.stone,
        stone: {
          150: '#EEEDec',
        },
        success: colors.emerald,
        warning: colors.amber,
      },
      fontFamily: {
        body: [
          'var(--font-inter)',
          'Hiragino Sans',
          'Hiragino Kaku Gothic Pro',
          'sans-serif',
        ],
      },
      fontSize: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      lineHeight: {
        inherit: 'inherit',
        relaxed: '1.8',
      },
      maxWidth: {
        '7xl': '75rem',
      },
    },
  },
}
export default config
