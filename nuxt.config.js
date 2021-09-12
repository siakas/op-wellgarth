const client = require('./src/plugins/contentful').default

// サイトタイトル
const siteTitle = 'ベドラック・ナムノイズ'

export default {
  mode: 'universal',
  target: 'static',
  srcDir: 'src/',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    titleTemplate: '%s | ' + siteTitle,
    title: siteTitle || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex,nofollow' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:site_name', name: 'og:site_name', content: siteTitle || '' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: 'https://www.kyoto-starspot.net/' },
      { hid: 'og:title', name: 'og:title', content: siteTitle || '' },
      { hid: 'og:description', name: 'og:description', content: process.env.npm_package_description || '' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap'
      },
      { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    {
      src: '@@/node_modules/normalize.css/normalize.css',
      lang: 'css'
    },
    '@/assets/scss/base.scss'
  ],
  styleResources: {
    scss: [
      '@/assets/scss/function/_palette.scss',
      '@/assets/scss/foundation/_color.scss',
      '@/assets/scss/foundation/_easing.scss',
      '@/assets/scss/foundation/_mq.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/contentful'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit',
  ],

  router: {
    middleware: [
      'getContentful'
    ]
  },

  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PREVIEW_ACCESS_TOKEN: process.env.CTF_PREVIEW_ACCESS_TOKEN
  },

  markdownit: {
    injected: true, // $md を利用して markdown を html にレンダリングする
    breaks: true, // 改行コードを <br> に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URL に似たテキストをリンクに自動変換する
    typography: true // 言語に依存しないきれいな置換＋引用符を有効にします。
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  /*
   ** Generate configuration
   */
  generate: {
    // generate 時に動的ルーティングも出力するように、ページの配列を routes に渡す
    routes () {
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID
        }),
        // エリア一覧の配列も渡すようにする
        client.getEntries({
          content_type: 'spotArea'
        }),
        // タグ一覧の配列も渡すようにする
        client.getEntries({
          content_type: 'spotTags'
        })
      ]).then(([posts, areas, tags]) => {
        return [
          ...posts.items.map((post) => {
            return {
              route: `/spot/${post.fields.slug}`,
              payload: post
            }
          }),
          ...areas.items.map((area) => {
            return {
              route: `/area/${area.fields.slug}`,
              payload: area
            }
          }),
          ...tags.items.map((tag) => {
            return {
              route: `/tags/${tag.fields.slug}`,
              payload: tag
            }
          }),
        ]
      })
    }
  },
}
