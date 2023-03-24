export const siteConfig = {
  siteMeta: {
    title: 'Kyoto Finder',
    description: '京都の好きなスポットを個人の備忘録としてまとめています',
    img: '',
  },
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASEURL ?? ''
      : 'http://localhost:3000',
  apiKey: process.env.MICROCMS_APIKEY ?? '',
  serviceId: process.env.SERVICE_ID ?? '',
  defaultLimit: process.env.NEXT_PUBLIC_DEFAULT_LIMIT ?? 10,
}
