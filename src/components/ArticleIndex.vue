<template lang="pug">
div.article-index
  article.article-index__item.article-item(v-for="post in posts", :key="post.sys.id")
    nuxt-link.article-item__link(:to="`/spot/${post.fields.slug}`")
      div.article-item__data
        h2.article-item__hdg
          | {{ post.fields.title }}
        div.article-item__info
          ul.article-item__area
            li {{ post.fields.area.fields.name }}
          ul.article-item__tags
            li(v-for="tag in post.fields.tags", :key="tag.sys.id")
              | {{ tag.fields.name }}
        div.article-item__rating
          rating-star(:star="post.fields.rating")
      div.article-item__thumb
        //- アイキャッチ取得メソッドを利用
        span(
          :style="{ backgroundImage: `url(${setEyeCatch(post).url})` }"
        )
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    posts: {
      type: Array,
      default: null
    },
  },
  computed: {
    ...mapGetters([
      'setEyeCatch'
    ])
  },
}
</script>

<style lang="scss" scoped>
.article-index {
  display: flex;
  flex-wrap: wrap;

  @include mq($until: tablet) {
    display: block;
    padding: 16px 16px 1px;
    background: palette('prim');
  }

  &__item {
    width: calc(100% / 5);

    @include mq($until: tablet) {
      width: 100%;
    }
  }
}

.article-item {
  @include mq($until: tablet) {
    background: palette('bg');
    margin: 0 0 16px;
  }

  &__link {
    display: flex;
    flex-direction: column;
    color: inherit;
    text-decoration: none;
    transition: opacity 0.3s $ease-out-quint;

    &:hover,
    &:active,
    &:focus {
      opacity: 0.6;
    }
  }

  &__data {
    order: 2;
    padding: 16px;
    line-height: 1.4;

    @include mq($until: tablet) {
      padding: 12px;
    }
  }

  &__hdg {
    font-size: 1.8rem;

    @include mq($until: tablet) {
      font-size: 1.6rem;
    }
  }

  &__info {
    margin: 4px 0 0;
    font-size: 1.3rem;
    display: flex;
  }

  &__area {
    display: flex;

    &::after {
      content: '／';
      margin: 0 0.24em;
    }
  }

  &__tags {
    display: flex;

    > li {
      &:not(:last-child) {
        &::after {
          content: ',';
          margin-right: 0.48em;
        }
      }
    }
  }

  &__rating {
    margin: 8px 0 0;
    text-align: right;
    font-size: 1.3rem;
  }

  &__thumb {
    order: 1;
    overflow: hidden;

    > span {
      display: block;
      padding-top: 66%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
    }
  }
}
</style>
