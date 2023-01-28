<template lang="pug">
div.back-top
  nuxt-link(to="/") トップページに戻る
</template>

<style lang="scss" scoped>
.back-top {
  margin: 3.2em 0 0;

  a {
    display: block;
    background: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    text-decoration: none;
    padding: 16px 24px;
    max-width: 240px;
    margin: 0 auto;
    text-align: center;
    border-radius: 30px;
    transition: opacity 0.3s $ease-out-quint;

    &:hover,
    &:active,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>
