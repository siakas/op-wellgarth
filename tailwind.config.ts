import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '7xl': '75rem',
      },
      fontFamily: {
        body: [
          'var(--font-openSans)',
          'Hiragino Sans',
          'ヒラギノ角ゴシック',
          'sans-serif',
        ],
      },
      lineHeight: {
        relaxed: '1.8',
      },
      colors: {
        stone: {
          150: '#EEEDec',
        },
      },
      aspectRatio: {
        gold: '1.618 / 1',
        goldReverse: '1 / 1.618',
        silver: '1.4 / 1',
        silverReverse: '1 / 1.4',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
