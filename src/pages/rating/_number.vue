<template lang="pug">
div
  template(v-if="star === 3")
    hdg-index(title="★★★")
  template(v-else-if="star === 2")
    hdg-index(title="★★")
  template(v-else-if="star === 1")
    hdg-index(title="★")
  template(v-else="star === 0")
    hdg-index(title="未訪問")

  article-index(:posts="staredPosts")
</template>

<script>
export default {
  asyncData ({ store, params, error }) {
    return {
      star: Number(params.number) // パラメタを数値に変換
    }
  },
  computed: {
    staredPosts () {
      return this.$store.getters.relatedRatingPosts(this.star)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
