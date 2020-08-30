<template lang="pug">
div
  h1
    | トップです

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
