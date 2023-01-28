<template lang="pug">
div.site-top
  article-index(:posts="posts")

  //- h1
  //-   | トップです
  //- ul
  //-   li(v-for="post in posts" :key="post.sys.id")
  //-     nuxt-link(:to="`/spot/${post.fields.slug}`")
  //-       | {{ post.fields.title }}
  //-     p
  //-       | エリア：
  //-       nuxt-link(:to="`/area/${post.fields.area.fields.slug}`") {{ post.fields.area.fields.name }}

  //-     template(v-if="isDraft(post)")
  //-       p 下書きです！！！！

  //-     div(v-html="$md.render(post.fields.description)")

  //-     //- カテゴリ一覧を出力（カテゴリは複数付与可能の設定なので、配列として格納されている）
  //-     ul
  //-       li(
  //-         v-for="tag in post.fields.tags"
  //-         :key="tag.sys.id"
  //-       )
  //-         nuxt-link(:to="`/tags/${tag.fields.slug}`")
  //-           | {{ tag.fields.name }} {{ tag.fields.slug }}

  //-     //- レーティングを出力
  //-     p
  //-       nuxt-link(:to="`/rating/${post.fields.rating}`")
  //-         | 星{{ post.fields.rating }}つ

  //-     hr(style="display:block")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'posts',
    ])
  },
}
</script>

<style lang="scss" scoped>
.site-top {
  /deep/ .article-index {
    @include mq($until: tablet) {
      padding-top: 0;
    }
  }
}
</style>
