<template lang="pug">
div
  transition(name="fade")
    div.drawer-backdrop(
      v-show="isActive",
      @click="toggleDrawer",
      :aria-hidden="String(!isActive)"
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('drawer', ['isActive']),
  },
  methods: {
    ...mapActions('drawer', ['toggleDrawer']),
  },
}
</script>

<style lang="scss" scoped>
.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1000;
  opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s $ease-out-quint;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
