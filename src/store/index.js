// contentful にアクセスするための設定
import client from '@/plugins/contentful'
// エントリに画像登録がない場合のデフォルト画像
import defaultEyeCatch from '@/assets/img/default-eyecatch.jpg'
// lodash
import _ from 'lodash'

export const state = () => ({
  posts: [],
  areas: [],
  categories: []
})

export const getters = {
  /**
   * 全エントリを getters として複製
   */
  posts: state => state.posts,
  /**
   * エリア一覧を getters として複製
   */
  areas: state => state.areas,
  /**
   * カテゴリ一覧を getters として複製
   */
  categories: state => state.categories,
  /**
   * エリアに一致するスポットを取得
   */
  relatedAreaPosts: (state, getters) => (area) => {
    // return getters.posts.filter((post) => {
    //   return post.fields.area.sys.id === area.sys.id // slug で判定してもいいが id の方が唯一で検索しやすい
    // })
    // 上の ES6 の記述は lodash だと下記のようになる
    return _.filter(getters.posts, (post) => {
      return post.fields.area.sys.id === area.sys.id
    })
  },
  /**
   * デフォルトアイキャッチの設定
   */
  // 通常、getter は文字列や配列、オブジェクトの形式で使われるが、
  // このように foo: () => (arg) => {} の形式だと、メソッドとして定義できる
  setEyeCatch: () => (post) => {
    // エントリに画像登録（fields.image）がない場合に、デフォルトの代替画像を返す
    // !! は二重否定なので Boolean に変換し true を返すもの
    // つまり下記の場合は post.fields.image および post.fields.image.fields がともに存在すれば、という条件になっている
    // 一見、普通の真偽式で !! は不要に見えるが、必ず各オブジェクトの返り値を Boolean にするための処理、ということらしい
    if (!!post.fields.image && !!post.fields.image.fields) {
      return {
        url: `https:${post.fields.image.fields.file.url}`,
        title: post.fields.image.fields.title
      }
    } else {
      // フィールドが存在しない場合はデフォルトのアイキャッチ画像を返す
      // 画像の URL を直接指定するとうまく動かないらしく、import した画像をセットしている
      return {
        url: defaultEyeCatch,
        title: ''
      }
    }
  },
  /**
   * 下書きフラグのチェック
   */
  isDraft: () => (post) => {
    if (post.fields.draft) {
      return true
    }
  }
}

export const mutations = {
  SET_POSTS (state, payload) {
    state.posts = payload
  },
  SET_AREAS (state, payload) {
    state.areas = payload
  },
  SET_CATEGORIES (state, payload) {
    state.categories = payload
  }
}

export const actions = {
  // contentful にアクセスして全エントリを取得
  // actions で設定して、これを middleware で呼び出す？
  async fetchPosts ({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID, // コンテンツモデル `spot` の全エントリを取得
        order: '-sys.createdAt' // コンテンツ作成の昇順（頭に - をつけると降順となる）
      })
      .then((res) => {
        commit('SET_POSTS', res.items)
      })
      .catch(console.error)
  },

  // contentful にアクセスしてエリア一覧を取得（エリアを管理しているコンテンツモデルにアクセスする）
  async fetchAreas ({ commit }) {
    await client
      .getEntries({
        content_type: 'spotArea', // CONTENT TYPE ID
        order: '-sys.createdAt'
      })
      .then((res) => {
        commit('SET_AREAS', res.items)
      })
      .catch(console.error)
  },

  // カテゴリ一覧を取得（カテゴリを管理しているコンテンツモデルにアクセスする）
  async fetchCategories ({ commit }) {
    await client
      .getEntries({
        content_type: 'spotCategories',
        order: '-sys.createdAt'
      })
      .then((res) => {
        commit('SET_CATEGORIES', res.items)
      })
      .catch(console.error)
  }
}
