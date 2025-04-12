export const siteConfig = {
  apiKey: process.env.MICROCMS_APIKEY ?? '',
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_BASEURL ?? '')
      : 'http://localhost:3000',
  defaultLimit: process.env.NEXT_PUBLIC_DEFAULT_LIMIT ?? 10,
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? '',
  siteMeta: {
    description: '京都の好きなスポットを個人の備忘録としてまとめています',
    img: '',
    title: 'Kyoto Finder',
  },
}
