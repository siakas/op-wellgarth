<template lang="pug">
div
  article-index(:posts="posts")

  //- div.article-index
  //-   article.article-index__item.article-item(v-for="post in posts", :key="post.sys.id")
  //-     a.article-item__link(href='#')
  //-       div.article-item__data
  //-         h2.article-item__hdg
  //-           | スポット名
  //-         div.article-item__info
  //-           ul.article-item__area
  //-             li 北白川
  //-           ul.article-item__tags
  //-             li 居酒屋
  //-             li ラーメン
  //-         p.article-item__rating
  //-           | ★★★
  //-       div.article-item__thumb
  //-         span(style="background-image:url(/img/noimage.png)")

  //- h1
  //-   | トップです
  //- ul
  //-   li(v-for="post in posts" :key="post.sys.id")
  //-     nuxt-link(:to="`/spot/${post.fields.slug}`")
  //-       | {{ post.fields.title }}
  //-     p
  //-       | エリア：
  //-       nuxt-link(:to="`/area/${post.fields.area.fields.slug}`") {{ post.fields.area.fields.name }}

  //-     template(v-if="isDraft(post)")
  //-       p 下書きです！！！！

  //-     div(v-html="$md.render(post.fields.description)")

  //-     //- カテゴリ一覧を出力（カテゴリは複数付与可能の設定なので、配列として格納されている）
  //-     ul
  //-       li(
  //-         v-for="tag in post.fields.tags"
  //-         :key="tag.sys.id"
  //-       )
  //-         nuxt-link(:to="`/tags/${tag.fields.slug}`")
  //-           | {{ tag.fields.name }} {{ tag.fields.slug }}

  //-     //- レーティングを出力
  //-     p
  //-       nuxt-link(:to="`/rating/${post.fields.rating}`")
  //-         | 星{{ post.fields.rating }}つ

  //-     hr(style="display:block")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'posts',
    ])
  },
}
</script>

<style lang="scss" scoped>
// .article-index {
//   display: flex;
//   flex-wrap: wrap;

//   &__item {
//     width: calc(100% / 5);
//   }
// }

// .article-item {
//   &__link {
//     display: flex;
//     flex-direction: column;
//     color: inherit;
//     text-decoration: none;
//     transition: opacity 0.3s $ease-out-quint;

//     &:hover,
//     &:active,
//     &:focus {
//       opacity: 0.6;
//     }
//   }

//   &__data {
//     order: 2;
//     padding: 16px;
//     line-height: 1.4;
//   }

//   &__hdg {
//     font-size: 1.8rem;
//   }

//   &__info {
//     margin: 4px 0 0;
//     font-size: 1.3rem;
//     display: flex;
//   }

//   &__area {
//     display: flex;

//     &::after {
//       content: '／';
//       margin: 0 0.24em;
//     }
//   }

//   &__tags {
//     display: flex;

//     > li {
//       &:not(:last-child) {
//         &::after {
//           content: ',';
//           margin-right: 0.48em;
//         }
//       }
//     }
//   }

//   &__rating {
//     margin: 8px 0 0;
//     text-align: right;
//     font-size: 1.3rem;
//     color: #e2cb1d;
//   }

//   &__thumb {
//     order: 1;
//     overflow: hidden;

//     > span {
//       display: block;
//       padding-top: 66%;
//       background-repeat: no-repeat;
//       background-position: 50% 50%;
//       background-size: cover;
//     }
//   }
// }
</style>
