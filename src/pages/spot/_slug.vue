<template lang="pug">
div.container
  h1
    | {{ post.fields.title }}

  p
    nuxt-link(to="/") トップへ
</template>

<script>
import contentfulClient from '@/plugins/contentful'

export default {
  asyncData({ env, params }) {
    return contentfulClient
      .getEntries({
        content_type: 'spot' // コンテンツモデル `spot` の全エントリを取得
      })
      .then((entries) => {
        return {
          posts: entries.items,
          slug: params.slug
        }
      })
  },
  computed: {
    post() {
      return this.posts.find(post => post.fields.slug === this.slug)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
