const contentful = require('contentful')

// 開発時には下書きのデータも表示するよう、開発環境と本番環境で config に渡す値を変える
// アクセストークンは開発時には PREVIEW を、本番環境には CDA を渡している
// host では下書きコンテンツを読み取るベース URL を指定している（下書きを読み取るにはベース URL を記述のものに置き替える必要がある）
const config =
  process.env.NODE_ENV === 'development'
    ? {
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_PREVIEW_ACCESS_TOKEN,
        host: 'preview.contentful.com',
      }
    : {
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
      }

const client = contentful.createClient(config)

export default client
