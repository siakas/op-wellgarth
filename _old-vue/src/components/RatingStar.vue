<template lang="pug">
div.rating
  template(v-if="star === 3")
    i.rating__star.-gold
    i.rating__star.-gold
    i.rating__star.-gold
  template(v-else-if="star === 2")
    i.rating__star.-gold
    i.rating__star.-gold
    i.rating__star
  template(v-else-if="star === 1")
    i.rating__star.-gold
    i.rating__star
    i.rating__star
  template(v-else="star === 0")
    i.rating__star
    i.rating__star
    i.rating__star
</template>

<script>
export default {
  props: {
    star: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.rating {
  &__star {
    font-style: normal;
    color: #ddd;
    margin: 0 0.05em;
    &::before {
      content: '★';
    }

    &.-gold {
      color: #e2cb1d;
    }
  }
}
</style>
