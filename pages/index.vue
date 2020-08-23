<template>
  <div class="container">
    <h1>contentful のデータを取得して表示確認</h1>
    <div v-for="post in posts" :key="post.sys.id" class="entries">
      <p>ID：{{ post.sys.id }}</p>
      <p>更新日：{{ post.sys.updatedAt }}</p>
      <p>タイトル：{{ post.fields.title }}</p>
      <p>スラッグ：{{ post.fields.slug }}</p>
      <div>
        概要：{{ post.fields.description }}
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import contentfulClient from '@/plugins/contentful'

export default {
  asyncData({ env }) {
    return contentfulClient
      .getEntries({
        content_type: 'spot' // コンテンツモデル `spot` の全エントリを取得
      })
      .then((entries) => {
        return {
          posts: entries.items
        }
      })
  }
}
</script>

<style>
body {
  padding: 3em;
}

.entries {
  margin: 2em 0 0;
}

hr {
  margin: 2em 0;
}
</style>
