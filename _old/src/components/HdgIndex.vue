<template lang="pug">
div
  h2.hdg-index
    | 「{{ title }}」のスポット一覧
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
.hdg-index {
  background: #fff;
  text-align: center;
  font-size: 1.8rem;
  line-height: 1.4;
  padding: 20px;
  color: palette('text', 'gray');

  @include mq($until: tablet) {
    font-size: 1.4rem;
    padding: 16px;
  }
}
</style>
