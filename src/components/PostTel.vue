<template lang="pug">
p.post-tel
  a(:href="'tel:' + tel | trim")
    | {{ tel }}
</template>

<script>
export default {
  filters: {
    trim (value) {
      if (!value) {
        return ''
      } else {
        value = value.split(/-/).join('')
      }
      return value
    }
  },
  props: {
    tel: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
.post-tel {
  a {
    color: inherit;
    text-decoration: none;

    @include mq($from: tablet) {
      pointer-events: none;
    }

    @include mq($until: tablet) {
      display: block;
      background: #fff;
      font-size: 1.4rem;
      font-weight: bold;
      color: palette('link');
      padding: 16px 24px;
      max-width: 240px;
      margin: 16px auto 0;
      text-align: center;
      border-radius: 30px;
      transition: opacity 0.3s $ease-out-quint;
    }
  }
}
</style>
