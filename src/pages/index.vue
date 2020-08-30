<template lang="pug">
.container
  h1
    | contentful のデータを取得して表示確認
  div.entries(v-for="post in posts" :key="post.sys.id")
    p
      | ID：{{ post.sys.id }}
    p
      | 更新日：{{ post.sys.updatedAt }}
    p
      | タイトル：{{ post.fields.title }}
    p
      | スラッグ：
      nuxt-link(:to="`/spot/${post.fields.slug}`")
        | {{ post.fields.slug }}
    div(v-html="$md.render(post.fields.description)")
</template>

<script>
import contentfulClient from '@/plugins/contentful'

export default {
  asyncData({ env }) {
    return contentfulClient
      .getEntries({
        content_type: 'spot' // コンテンツモデル `spot` の全エントリを取得
      })
      .then((entries) => {
        return {
          posts: entries.items
        }
      })
  }
}
</script>

<style lang="scss">
body {
  padding: 3em;
}

.entries {
  margin: 2em 0 0;

  hr {
    margin: 2em 0;
  }
}
</style>
