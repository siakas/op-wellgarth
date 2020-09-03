<template lang="pug">
div
  nav-breadcrumb(
    :name="area.fields.name"
    :slug="area.fields.slug"
    dir="area"
  )

  h1
    | {{ area.fields.name }}

  ul
    li(v-for="post in areaPosts" :key="post.sys.id")
      | {{ post.fields.title }}
      br
      | {{ post.fields.area.fields.name }}
      hr(style="display:block")
</template>

<script>
export default {
  async asyncData ({ store, params, payload, error }) {
    // payload から渡るデータがあれば（静的出力時）、それを area に渡し、
    // payload がない場合（開発時）は、URL パラメタの slug をもとに Vuex から取得するようにする
    const area =
      payload ||
      (await store.getters.areas.find((area) => {
        return area.fields.slug === params.slug
      }))

    // post へのデータの格納をチェックしてリターン
    if (area) {
      return { area } // オブジェクトを area: {...} の形で返却
    } else {
      return error({ statusCode: 400 })
    }
  },
  computed: {
    // getters に記述したメソッドを使って、area の id と一致するスポット一覧を取得
    areaPosts () {
      return this.$store.getters.relatedAreaPosts(this.area)
    }
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin: 0 0 45px;
  ol {
    display: flex;
    li:not(:last-child) {
      &::after {
        content: '>';
        margin: 0 0.8em;
      }
    }
  }
}
</style>
