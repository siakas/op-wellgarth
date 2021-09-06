<template lang="pug">
div.post-meta
  div.area
    h2 エリア：
    p
      nuxt-link(:to="`/area/${post.fields.area.fields.slug}`")
        | {{ post.fields.area.fields.name }}
  div.tags
    h2 タグ：
    ul
      li(v-for="tag in post.fields.tags", :key="tag.sys.id")
        nuxt-link(:to="`/tags/${tag.fields.slug}`")
          | {{ tag.fields.name }}
  div.rating
    h2 お気に入り：
    div
      nuxt-link(:to="`/rating/${post.fields.rating}`")
        rating-star(:star="post.fields.rating")
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: null
    },
  },
}
</script>

<style lang="scss" scoped>
.post-meta {
  max-width: calc(640px + 16px *2);
  margin: 24px auto;
  padding: 0 16px;
  display: flex;
  align-items: flex-start;
  font-size: 1.3rem;

  @include mq($until: tablet) {
    display: block;
  }

  h2 {
    font-weight: bold;
    color: palette('text', 'gray');
    font-size: inherit;
  }

  ul {
    display: flex;
    li {
      &:not(:last-child) {
        &::after {
          content: '／';
        }
      }
    }
  }

  .area,
  .tags,
  .rating {
    display: flex;
    margin: 0 1.5em 0 0;

    h2 {
      white-space: nowrap;
    }
  }

  .area {
    flex-shrink: 0;

    p {
      white-space: nowrap;
    }

    a {
      font-weight: bold;
    }
  }

  .tags {
    @include mq($until: tablet) {
      margin-top: 0.4em;
    }

    ul {
      flex-wrap: wrap;

      li {
        margin-bottom: 0.2em;
      }
    }

    a {
      font-weight: bold;
    }
  }

  .rating {
    flex-shrink: 0;
    align-items: center;

    @include mq($until: tablet) {
      margin-top: 0.4em;
    }

    a {
      text-decoration: none;

      .rating {
        @include mq($until: tablet) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
