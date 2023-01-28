<template lang="pug">
div
  nav.breadcrumb
    ol
      li
        nuxt-link(to="/") トップ
      li
        nuxt-link(:to="`/${dir}/${slug}`") {{ name }}
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    dir: {
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 0 45px;
  ol {
    display: flex;
    li:not(:last-child) {
      &::after {
        content: '>';
        margin: 0 0.8em;
      }
    }
  }
}
</style>
