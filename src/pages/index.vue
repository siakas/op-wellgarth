<template lang="pug">
div
  h1
    | トップです
  ul
    li(v-for="post in posts" :key="post.sys.id")
      nuxt-link(:to="`/spot/${post.fields.slug}`")
        | {{ post.fields.title }}
      p
        | エリア：
        nuxt-link(:to="`/area/${post.fields.area.fields.slug}`") {{ post.fields.area.fields.name }}

      template(v-if="isDraft(post)")
        p 下書きです！！！！

      div(v-html="$md.render(post.fields.description)")

      //- カテゴリ一覧を出力（カテゴリは複数付与可能の設定なので、配列として格納されている）
      ul
        li(
          v-for="category in post.fields.categories"
          :key="category.sys.id"
        )
          | {{ category.fields.name }} {{ category.fields.slug }}

      hr(style="display:block")

  //- div
  //-   | {{ posts }}

//- .container
//-   h1
//-     | contentful のデータを取得して表示確認
//-   div.entries(v-for="post in posts" :key="post.sys.id")
//-     p
//-       | ID：{{ post.sys.id }}
//-     p
//-       | 更新日：{{ post.sys.updatedAt }}
//-     p
//-       | タイトル：{{ post.fields.title }}
//-     p
//-       | スラッグ：
//-       nuxt-link(:to="`/spot/${post.fields.slug}`")
//-         | {{ post.fields.slug }}
//-     div(v-html="$md.render(post.fields.description)")
//-     p
//-       | エリア：{{ post.fields.area.fields.name }}（{{ post.fields.area.fields.slug }}）
//-     div
//-       | カテゴリ：
//-       ul
//-         li(
//-           v-for="(category, index) in post.fields.categories"
//-           :key="category.fields.slug"
//-         )
//-           | {{ category.fields.name }}（{{ category.fields.slug }}）
//-     p
//-       | Google Map：
//-       a(:href="post.fields.googleMap", target='_blank', rel='noopener noreferrer')
//-         | {{ post.fields.googleMap }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'posts',
      'isDraft',
    ])
  },
}
</script>
