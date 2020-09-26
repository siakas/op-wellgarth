// contentful にアクセスするための設定
import client from '@/plugins/contentful'
// エントリに画像登録がない場合のデフォルト画像
import defaultEyeCatch from '@/assets/img/default-eyecatch.jpg'
// lodash
import _ from 'lodash'

export const state = () => ({
  posts: [],
  areas: [],
  tags: [],
})

export const getters = {
  posts: state => state.posts,
  areas: state => state.areas,
  tags: state => state.tags,

  /**
   * エリアに一致するスポットを取得するメソッド
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
   * タグに関連するスポット一覧を取得するメソッド
   * 配列内のオブジェクトの中にさらに配列を持つ場合の特定をしている（今回はタグ情報を配列で持っている）
   */
  relatedTagPosts: (state, getters) => (currentTag) => {
    return _.filter(getters.posts, (post) => {
      return post.fields.tags.find((tag) => {
        return tag.sys.id === currentTag.sys.id
      })
    })
  },

  /**
   * レーティングに一致するスポット一覧を収集するメソッド
   */
  relatedRatingPosts: (state, getters) => (star) => {
    return _.filter(getters.posts, (post) => {
      return post.fields.rating === star
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
   * 下書きフラグをチェックするメソッド
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

  // includes で取得した関連モデル（reference）を、areas と tags に振り分ける
  SET_REFERENCE (state, payload) {
    state.areas = []
    state.tags = []
    state.areas = _.filter(payload, (i) => {
      return i.sys.contentType.sys.id === 'spotArea'
    })
    state.tags = _.filter(payload, (i) => {
      return i.sys.contentType.sys.id === 'spotTags'
    })
  }
}

export const actions = {
  // contentful にアクセスして全エントリを取得
  // actions で設定して、これを middleware で呼び出す？
  async fetchPosts ({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID, // コンテンツモデル `spot` の全エントリを取得
        order: '-sys.createdAt', // コンテンツ作成の昇順（頭に - をつけると降順となる）
        include: 1 // エントリの関連情報を取得（関連先の階層を指定。デフォルトは 1 だが明示的に指定。area や tag にさらに関連するモデル（孫モデル）を取得したければ 2 を指定する）
      })
      .then((res) => {
        commit('SET_REFERENCE', res.includes.Entry) // 関連モデルがすべてまとめて格納される
        commit('SET_POSTS', res.items)
      })
      .catch(console.error)
  },
}
