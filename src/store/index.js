// エントリに画像登録がない場合のデフォルト画像
import defaultEyeCatch from '@/assets/img/default-eyecatch.jpg'

// export const state = () => ({
//   key: 'value'
// })

export const getters = {
  // getterValue: state => {
  //   return state.value
  // }

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
  }
}

// export const mutations = {
//   setValue (state, payload) {
//     state.value = payload
//   }
// }

// export const actions = {
//   getActionValue ({ commit }, payload) {
//     commit('setValue', payload)
//   },
//   async getEntries ({ commit }) {
//     const res = await this.axios.get('/path/to/api')
//     commit('setEntries', res)
//   }
// }
