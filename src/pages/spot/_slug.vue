<template lang="pug">
div
  h1
    | {{ post.fields.title }}

  template(v-if="isDraft(post)")
    p
      | 下書き記事です！！！！！！！！！！！！

  div
    img(
      :src='setEyeCatch(post).url',
      :alt='setEyeCatch(post).title'
    )

  div(v-html="$md.render(post.fields.description)")

  p
    nuxt-link(to="/") トップへ
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ store, params, payload, error }) {
    // payload から渡るデータがあれば（静的出力時）、それを post に渡し、
    // payload がない場合（開発時）は、URL パラメタの slug をもとに Vuex から取得するようにする
    const post =
      payload ||
      (await store.getters.posts.find((post) => {
        return post.fields.slug === params.slug
      }))

    // post へのデータの格納をチェックしてリターン
    if (post) {
      return { post } // オブジェクトを post: {...} の形で返却
    } else {
      return error({ statusCode: 400 })
    }
  },

  computed: {
    ...mapGetters([
      'setEyeCatch',
      'isDraft'
    ])
  },
}
</script>
