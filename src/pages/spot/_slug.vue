<template lang="pug">
div
  h1
    | {{ currentPost.fields.title }}

  template(v-if="isDraft(currentPost)")
    p
      | 下書き記事です！！！！！！！！！！！！

  div
    img(
      :src='setEyeCatch(currentPost).url',
      :alt='setEyeCatch(currentPost).title'
    )

  div(v-html="$md.render(currentPost.fields.description)")

  p
    nuxt-link(to="/") トップへ
</template>

<script>
import client from '@/plugins/contentful'
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ env, params, payload }) {
    // payload から渡るデータがあれば、それを currentPost に渡す
    if (payload) {
      return {
        currentPost: payload
      }
    } else {
      let currentPost = []
      await client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID, // コンテンツモデル `spot` の全エントリを取得
        'fields.slug': params.slug
      }).then(res => (currentPost = res.items[0])).catch(console.error)
      return { currentPost }
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
