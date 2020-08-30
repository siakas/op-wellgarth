import contentfulClient from '@/plugins/contentful'

export const state = () => ({
  posts: [],
  categories: [],
})

// export const getters = {
//   getterValue: (state) => {
//     return state.value
//   }
// }

// export const mutations = {
//   setValue (state, payload) {
//     state.value = payload
//   }
// }

export const actions = {
  async fetchPosts ({ commit }) {
    await contentfulClient
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID, // コンテンツモデル `spot` の全エントリを取得
        order: '-sys.createdAt', // 作成日の降順
      })
  }

  // getActionValue ({ commit }, payload) {
  //   commit('setValue', payload)
  // },
  // async getEntries ({ commit }) {
  //   const res = await this.axios.get('/path/to/api')
  //   commit('setEntries', res)
  // }
}
