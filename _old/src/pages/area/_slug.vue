<template lang="pug">
div
  hdg-index(:title="area.fields.name")
  article-index(:posts="areaPosts")
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
  head () {
    return {
      title: `${this.area.fields.name}エリアのスポット一覧`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
