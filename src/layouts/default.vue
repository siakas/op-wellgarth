<template lang="pug">
div.l-page
  //- スポット詳細ではヘッダのスタイルを変更する
  template(v-if="page.name === 'spot-slug'")
    the-header(:style-type="'-alpha'")
  template(v-else)
    the-header

  main
    nuxt

  //- スポット詳細ではフッタのスタイルを変更する
  template(v-if="page.name === 'spot-slug'")
    the-footer(:style-type="'-brown'")
  template(v-else)
    the-footer
</template>

<script>
export default {
  computed: {
    page () {
      return {
        id: this.$route.path.replace(/^\/(.*?)\/?$/g, '$1'),
        name: this.$route.name
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.l-page {
  position: relative;
}
</style>
