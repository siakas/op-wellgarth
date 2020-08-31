<template lang="pug">
div
  h1
    | {{ currentPost.fields.title }}

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
  async asyncData ({ env, params }) {
    let currentPost = []
    await client.getEntries({
      content_type: env.CTF_BLOG_POST_TYPE_ID, // コンテンツモデル `spot` の全エントリを取得
      'fields.slug': params.slug
    }).then(res => (currentPost = res.items[0])).catch(console.error)
    return { currentPost }
  },

  computed: {
    ...mapGetters([
      'setEyeCatch'
    ])
  },
}
</script>
