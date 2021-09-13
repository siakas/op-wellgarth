<template lang="pug">
div
  hdg-index(:title="tag.fields.name")
  article-index(:posts="tagPosts")
</template>

<script>
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
      // const tagPosts = await client.getEntries({
      //   content_type: env.CTF_BLOG_POST_TYPE_ID, // メインブログを指定
      //   'fields.tags.sys.id': tag.sys.id // カテゴリ ID が一致する記事を取得
      // })
      //   .then(res => res.items)
      //   .catch(console.error)

      // 上記の tag をもとに API を叩く処理はやめて、
      // エリアのように getters で定義したメソッドを使ってエントリ一覧からタグが一致するエントリを収集する方法にする
      // エリアでは computed を使っていたが……
      const tagPosts = store.getters.relatedTagPosts(tag)

      return { tag, tagPosts } // オブジェクトを tag: {...} の形で返却
    } else {
      return error({ statusCode: 400 })
    }
  },
  head () {
    return {
      title: `${this.tag.fields.name}のスポット一覧`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
