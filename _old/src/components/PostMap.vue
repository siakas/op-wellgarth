<template lang="pug">
div.post-gmap
  iframe(
    :src="`https://maps.google.co.jp/maps?output=embed&q=${lat},${lon}&z=${zoom}`",
    frameborder='0'
  )
</template>

<script>
export default {
  props: {
    lat: {
      type: Number,
      default: null
    },
    lon: {
      type: Number,
      default: null
    },
  },
  data () {
    return {
      zoom: 18
    }
  },
}
</script>

<style lang="scss" scoped>
.post-gmap {
  margin: 16px 0 0;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 66%;

  @include mq($until: tablet) {
    display: none;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
