<template>
  <div class="container">
    <div v-for="post in posts" :key="post.sys.id">
      <p>{{ post.sys.id }}</p>
      <p>{{ post.sys.updatedAt }}</p>
      <p>{{ post.fields.title }}</p>
      <p>{{ post.fields.slug }}</p>
      <div>
        {{ post.fields.description }}
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

</style>
