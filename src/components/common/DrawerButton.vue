<template lang="pug">
button.button-hamburger(
  @click="toggleDrawer",
  :class="{ '-active': isActive }",
  :aria-expanded="String(isActive)"
)
  span.bar
  span.bar
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('drawer', [
      'isActive'
    ])
  },
  methods: {
    ...mapActions('drawer', [
      'toggleDrawer'
    ])
  },
}
</script>

<style lang="scss" scoped>
.button-hamburger {
  width: 37px;
  height: 37px;
  padding: 5px;
  position: absolute;
  top: 18px;
  right: 10px;
  cursor: pointer;
  z-index: 2000;

  > .bar {
    display: block;
    height: 2px;
    background: #fff;
    margin: 6px 0;
    transition: all 0.2s $ease-out-quint;
  }

  &[aria-expanded="true"] {
    > .bar {
      &:nth-child(1) {
        transform: rotate(45deg) translate3d(3px, 3px, 0);
      }
      &:nth-child(2) {
        transform: rotate(-45deg) translate3d(3px, -3px, 0);
      }
    }
  }
}
</style>
