<template lang="pug">
div.post-eyecatch
  //- アイキャッチ取得メソッドを利用
  span(
    :style="{ backgroundImage: `url(${setEyeCatch(post).url})` }"
  )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
  },
}
</script>

<style lang="scss" scoped>
.post-eyecatch {
  margin: 0 auto;
  max-width: 800px;

  > span {
    display: block;
    padding-top: 66%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    position: relative;

    @include mq($until: tablet) {
      padding-top: 78%;
    }

    &::before {
      content: '';
      display: block;
      background: #000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(#fff, 0) 55%,
        palette('bg') 100%
      );
    }
  }
}
</style>
