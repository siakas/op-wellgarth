export const state = () => ({
  isActive: false,
})

export const getters = {
  isActive: (state) => state.isActive,
}

export const mutations = {
  TOGGLE_DRAWER(state) {
    state.isActive = !state.isActive
  },
}

export const actions = {
  toggleDrawer({ commit }) {
    commit('TOGGLE_DRAWER')
  },
}
