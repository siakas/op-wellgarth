<template lang="pug">
div
  nav-breadcrumb(
    name="タグ一覧"
    dir="tags"
  )

  h1
    | {{ tag.fields.name }}

  ul
    li(v-for="post in tagPosts" :key="post.sys.id")
      | {{ post.fields.title }}
      br
      | {{ post.fields.area.fields.name }}
      hr(style="display:block")
</template>

<script>
import client from '@/plugins/contentful'

export default {
  async asyncData ({ env, store, params, payload, error }) {
    // payload から渡るデータがあればそれを tag に渡し、
    // payload がない場合は、URL パラメタの slug をもとに Vuex から取得する
    const tag =
      payload ||
      (await store.getters.tags.find((tag) => {
        return tag.fields.slug === params.slug
      }))

    // tag のデータを格納をチェックしてリターン
    if (tag) {
      // area のように getters に関連ポストを収集するメソッドを準備して、それを利用してもいいのだが、
      // ここでは別パターンの手法として、ブログ記事にならって直接 API を叩くことにする
      // https://blog.cloud-acct.com/posts/blog-tagposts/
      // ただ、やはりこれだと静的化後はともかく、開発時はつどつどで API を叩くため処理が遅くなってしまう
      const tagPosts = await client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID, // メインブログを指定
        'fields.tags.sys.id': tag.sys.id // カテゴリ ID が一致する記事を取得
      })
        .then(res => res.items)
        .catch(console.error)

      return { tag, tagPosts } // オブジェクトを tag: {...} の形で返却
    } else {
      return error({ statusCode: 400 })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
