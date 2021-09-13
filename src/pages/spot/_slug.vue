<template lang="pug">
article
  post-eyecatch(:post="post")

  post-header(:title="post.fields.title")

  post-meta(:post="post")

  div.post-body
    div(v-html="$md.render(post.fields.description)")

    hdg-lv-2 定休日

    p {{ post.fields.close }}

    hdg-lv-2 営業時間

    p(v-html="$md.renderInline(post.fields.time)")

    hdg-lv-2 電話番号

    post-tel(:tel="post.fields.tel")

    hdg-lv-2 アクセス

    post-map(
      :lat="post.fields.location.lat",
      :lon="post.fields.location.lon"
    )

    post-map-mobile(:url="post.fields.googleMap")

    //- サイン
    p.post-sign
      | Text by:
      |
      a(href='mailto:sansyo@gmail.com') siakas

  back-top

//- div
//-   nav-breadcrumb(
//-     :name="post.fields.area.fields.name"
//-     :slug="post.fields.area.fields.slug"
//-     dir="area"
//-   )

//-   h1
//-     | {{ post.fields.title }}

//-   template(v-if="isDraft(post)")
//-     p
//-       | 下書き記事です！！！！！！！！！！！！

//-   div
//-     img(
//-       :src='setEyeCatch(post).url',
//-       :alt='setEyeCatch(post).title'
//-     )

//-   div(v-html="$md.render(post.fields.description)")

//-   p
//-     nuxt-link(to="/") トップへ
</template>

<script>
export default {
  async asyncData ({ store, params, payload, error }) {
    // payload から渡るデータがあれば（静的出力時）、それを post に渡し、
    // payload がない場合（開発時）は、URL パラメタの slug をもとに Vuex から取得するようにする
    const post =
      payload ||
      (await store.getters.posts.find((post) => {
        return post.fields.slug === params.slug
      }))

    // post へのデータの格納をチェックしてリターン
    if (post) {
      return { post } // オブジェクトを post: {...} の形で返却
    } else {
      return error({ statusCode: 400 })
    }
  },
}
</script>

<style lang="scss" scoped>
.post-body {
  max-width: calc(640px + 16px *2);
  margin: 24px auto;
  padding: 0 16px;

  @include mq($until: tablet) {
    margin: 24px auto 40px;
  }

  // マークダウン部分が展開される要素
  > div:not([class]) {
    /deep/ p {
      margin: 1.2em 0;
    }

    /deep/ ul {
      list-style: disc;
      margin: 1.2em 0 1.2em 1.6em;

      > li {
        list-style: inherit;
      }
    }
  }

  .hdg-lv2 {
    & + p:not([class]) {
      margin-top: 8px;
    }
  }
}

.post-sign {
  margin: 3em 0;
  text-align: center;
  font-size: 1.4rem;
  color: palette('text', 'gray');
  font-weight: bold;
  font-family: "Source Sans Pro", sans-serif;
}
</style>
