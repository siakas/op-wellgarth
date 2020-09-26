<template lang="pug">
article
  div.post-eyecatch
    //- アイキャッチ取得メソッドを利用
    span(
      :style="{ backgroundImage: `url(${setEyeCatch(post).url})` }"
    )

  header.post-header
    h1.post-header__title
      | {{ post.fields.title }}

  div.post-body
    div(v-html="$md.render(post.fields.description)")

    div.post-back
      nuxt-link(to="/") トップページに戻る

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
import { mapGetters } from 'vuex'

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

  computed: {
    ...mapGetters([
      'setEyeCatch',
      // 'isDraft'
    ])
  },
}
</script>

<style lang="scss" scoped>
.post-eyecatch {
  margin: 0 auto;
  max-width: 800px;

  > span {
    display: block;
    padding-top: 66%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    position: relative;

    @include mq($until: tablet) {
      padding-top: 78%;
    }

    &::before {
      content: '';
      display: block;
      background: #000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(#fff, 0) 55%, palette('bg') 100%);
    }
  }
}

.post-header {
  max-width: calc(640px + 16px *2);
  margin: 24px auto;
  padding: 0 16px;

  &__title {
    text-align: center;
    font-size: 2.4rem;
    font-weight: bold;
    line-height: 1.4;

    @include mq($until: tablet) {
      font-size: 2rem;
      text-align-last: left;
    }
  }
}

.post-body {
  max-width: calc(640px + 16px *2);
  margin: 24px auto 80px;
  padding: 0 16px;

  @include mq($until: tablet) {
    font-size: 1.5rem;
    margin: 24px auto 40px;
  }

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

.post-back {
  margin: 4em 0 0;

  a {
    display: block;
    background: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    text-decoration: none;
    padding: 16px 24px;
    max-width: 240px;
    margin: 0 auto;
    text-align: center;
    border-radius: 30px;
    transition: opacity 0.3s $ease-out-quint;

    &:hover,
    &:active,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>
