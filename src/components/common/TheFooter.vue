<template lang="pug">
footer.the-footer
  p.the-footer__copyright
    small © 2020 zimin
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.the-footer {
  padding: 2em 0;

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
}
</style>
