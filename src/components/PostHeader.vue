<template lang="pug">
header.post-header
  h1.post-header__title
    | {{ title }}
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
.post-header {
  max-width: calc(640px + 16px *2);
  margin: 24px auto;
  padding: 0 16px;

  &__title {
    text-align: center;
    font-size: 2.4rem;
    font-weight: bold;
    line-height: 1.4;

    @include mq($until: tablet) {
      font-size: 2rem;
      text-align-last: left;
    }
  }
}
</style>
