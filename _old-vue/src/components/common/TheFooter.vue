<template lang="pug">
footer.the-footer(:class="styleType")
  p.the-footer__copyright
    small © 2020 siakas
</template>

<script>
export default {
  props: {
    styleType: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.the-footer {
  padding: 3em 0 4em;

  @include mq($until: tablet) {
    padding: 1.6em 0 2.4em;
  }

  &__copyright {
    font-size: 1.4rem;
    line-height: 1;
    text-align: center;

    small {
      font-size: inherit;
      font-weight: normal;
      font-style: normal;
    }
  }

  // スポット詳細用
  &.-brown {
    background: palette('prim');
    color: #fff;
  }
}
</style>
