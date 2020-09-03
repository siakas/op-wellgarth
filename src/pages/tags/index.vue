<template lang="pug">
div
  nav-breadcrumb(
    name="タグ一覧"
    dir="tags"
  )

  ul
    li(v-for="tag in tags" :key="tag.sys.id")
      nuxt-link(:to="`/tags/${tag.fields.slug}`")
        | {{ tag.fields.name }}
      | （{{ postCount(tag) }}）
      hr(style="display:block")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'tags'
    ]),

    // 記事件数の算出メソッド
    postCount () {
      return (tag) => {
        return this.$store.getters.relatedTagPosts(tag).length
      }
    }
  },
}
</script>
