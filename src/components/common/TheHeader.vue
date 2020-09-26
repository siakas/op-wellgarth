<template lang="pug">
header.the-header
  h1.the-header__title
    nuxt-link(to="/")
      | THE KYOTO STAR SPOT
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.the-header {
  background: palette('prim');
  color: #fff;
  display: flex;
  justify-content: center;
  height: 72px;

  &__title {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: normal;
    font-size: 2.4rem;
    align-self: center;
    line-height: 1.2;
    letter-spacing: 0.2em;

    a {
      color: inherit;
      text-decoration: none;
      transition: opacity 0.3s $ease-out-quint;

      &:hover,
      &:active,
      &:focus {
        opacity: 0.65;
      }
    }
  }
}
</style>
