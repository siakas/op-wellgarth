<template lang="pug">
p.post-map-mobile
  a(
    :href="url",
    target='_blank',
    rel='noopener noreferrer'
  )
    | 地図を開く
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.post-map-mobile {
  @include mq($from: tablet) {
    display: none;
  }

  a {
    display: block;
    background: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    color: palette('link');
    text-decoration: none;
    padding: 16px 24px;
    max-width: 240px;
    margin: 16px auto 0;
    text-align: center;
    border-radius: 30px;
    transition: opacity 0.3s $ease-out-quint;
  }
}
</style>
