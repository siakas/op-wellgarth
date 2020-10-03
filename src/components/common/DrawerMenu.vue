<template lang="pug">
div
  transition(name="slide")
    //- aside.drawer-menu(
    //-   v-show="isActive",
    //-   :aria-hidden="String(!isActive)"
    //- )
    aside.drawer-menu(
      :aria-hidden="String(!isActive)"
    )
      ul.drawer-nav
        li
          button.toggle(
            @click="makeActiveTab('area')",
            :class="{ '-active': activeTab === 'area' }"
          )
            | エリア
          div.inner(v-show="activeTab === 'area'")
            ul.innernav
              li(v-for="area in areas", :key="area.sys.id")
                nuxt-link(:to="`/area/${area.fields.slug}`")
                  | {{ area.fields.name }}
                  | （{{ countPostArea(area) }}）
        li
          button.toggle(
            @click="makeActiveTab('tag')",
            :class="{ '-active': activeTab === 'tag' }"
          )
            | タグ
          div.inner(v-show="activeTab === 'tag'")
            ul.innernav
              li(v-for="tag in tags", :key="tag.sys.id")
                nuxt-link(:to="`/tags/${tag.fields.slug}`")
                  | {{ tag.fields.name }}
                  | （{{ countPostTag(tag) }}）
        //- li
        //-   button.toggle(
        //-     @click="makeActiveTab('stared')",
        //-     :class="{ '-active': activeTab === 'stared' }"
        //-   )
        //-     | お気に入り
        //-   div.inner(v-show="activeTab === 'stared'")
        //-     ul.innernav
        //-       li
        //-         a(href='#') ★★★（4）
        //-       li
        //-         a(href='#') ★★（4）
        //-       li
        //-         a(href='#') ★（4）
        //-       li
        //-         a(href='#') 未訪問（4）
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      activeTab: ''
    }
  },
  computed: {
    ...mapGetters('drawer', [
      'isActive'
    ]),
    ...mapGetters([
      'areas',
      'tags'
    ]),
    // エリア記事の件数
    countPostArea () {
      return (area) => {
        return this.$store.getters.relatedAreaPosts(area).length
      }
    },
    // エリア記事の件数
    countPostTag () {
      return (tag) => {
        return this.$store.getters.relatedTagPosts(tag).length
      }
    }
  },
  methods: {
    ...mapActions('drawer', [
      'toggleDrawer'
    ]),
    makeActiveTab (tab) {
      // 現在の activeTab と同じ値であれば空を、
      // そうでなければ新しいタブの値を与える
      this.activeTab = this.activeTab === tab ? '' : tab
    }
  },
}
</script>

<style lang="scss" scoped>
.drawer-menu {
  position: absolute;
  width: 80%;
  height: 100%;
  min-height: calc(100vh - 16px); // padding ぶんを除去
  z-index: 1500;
  top: 0;
  left: 0;
  background: #000;
  padding: 16px 0 0;
}

.drawer-nav {
  a,
  button {
    color: #fff;
    text-decoration: none;
    transition: background 0.3s $ease-out-quint;

    &:hover,
    &:active,
    &:focus {
      background: #f26964;
    }
  }

  .toggle {
    display: block;
    width: 100%;
    padding: 8px 8px 8px 16px;
    text-align: left;
    position: relative;

    &.-active {
      &::before {
        transform: translateY(-50%) rotate(45deg);
      }
      &::after {
        transform: translateY(-50%) rotate(45deg);
      }
    }

    &::before,
    &::after {
      content: '';
      display: block;
      background: #fff;
      position: absolute;
      transition: transform 0.3s $ease-out-quint;
    }

    &::before {
      top: 50%;
      right: 22px;
      width: 2px;
      height: 16px;
      transform: translateY(-50%);
    }

    &::after {
      top: 50%;
      right: 15px;
      width: 16px;
      height: 2px;
      transform: translateY(-50%);
    }
  }

  .inner {
    a {
      display: block;
      padding: 8px 8px 8px 32px;
      font-size: 1.4rem;
    }
  }
}
</style>
