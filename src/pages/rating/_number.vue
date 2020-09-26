<template lang="pug">
div
  //- nav-breadcrumb(
  //-   name="タグ一覧"
  //-   dir="tags"
  //- )

  h1
    | 星{{ star }}つのスポット

  ul
    li(v-for="post in posts" :key="post.sys.id")
      | {{ post.fields.title }}
      br
      | {{ post.fields.area.fields.name }}
      hr(style="display:block")

  p
    nuxt-link(to="/") トップへ
</template>

<script>
export default {
  asyncData ({ store, params, error }) {
    return {
      star: Number(params.number) // パラメタを数値に変換
    }
  },
  computed: {
    posts () {
      return this.$store.getters.relatedRatingPosts(this.star)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
