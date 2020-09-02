<template lang="pug">
div
  nav-breadcrumb(
    name="カテゴリ一覧"
    dir="category"
  )

  h1
    | {{ category.fields.name }}

  ul
    li(v-for="post in categoryPosts" :key="post.sys.id")
      | {{ post.fields.title }}
      br
      | {{ post.fields.area.fields.name }}
      hr(style="display:block")
</template>

<script>
import client from '@/plugins/contentful'

export default {
  async asyncData ({ env, store, params, payload, error }) {
    // payload から渡るデータがあればそれを category に渡し、
    // payload がない場合は、URL パラメタの slug をもとに Vuex から取得する
    const category =
      payload ||
      (await store.getters.categories.find((category) => {
        return category.fields.slug === params.slug
      }))

    // category のデータを格納をチェックしてリターン
    if (category) {
      // area のように getters に関連ポストを収集するメソッドを準備して、それを利用してもいいのだが、
      // ここでは別パターンの手法として、ブログ記事にならって直接 API を叩くことにする
      // https://blog.cloud-acct.com/posts/blog-tagposts/
      // ただ、やはりこれだと静的化後はともかく、開発時はつどつどで API を叩くため処理が遅くなってしまう
      const categoryPosts = await client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID, // メインブログを指定
        'fields.categories.sys.id': category.sys.id // カテゴリ ID が一致する記事を取得
      })
        .then(res => res.items)
        .catch(console.error)

      return { category, categoryPosts } // オブジェクトを category: {...} の形で返却
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
