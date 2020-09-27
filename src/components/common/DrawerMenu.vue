<template lang="pug">
div
  transition(name="slide")
    aside.drawer-menu(
      v-if="isActive",
      :aria-hidden="String(!isActive)"
    )
      ul
        li メニュー
        li メニュー
        li メニュー
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
.drawer-menu {
  position: absolute;
  width: 80%;
  height: 100%;
  z-index: 1500;
  top: 0;
  left: 0;
  background: #000;
}
</style>
