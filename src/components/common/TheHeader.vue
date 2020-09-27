<template lang="pug">
header.the-header(:class="styleType")
  h1.the-header__title
    nuxt-link(to="/")
      | THE KYOTO STAR SPOT

  //- drawer-button
  drawer-backdrop

</template>

<script>
export default {
  props: {
    styleType: {
      type: String,
      default: ''
    },
  },
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

    @include mq($until: tablet) {
      font-size: 1.6rem;
      letter-spacing: 0.1em;
    }

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

  // スポット詳細透過用
  &.-alpha {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: transparent;
    z-index: 500;

    .the-header__title {
      opacity: 0.7;
      text-shadow: 0px 0px 5px rgba(#000, 0.5);
    }
  }
}
</style>
