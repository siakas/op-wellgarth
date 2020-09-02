export default async ({ store }) => {
  // middleware はすべてのページを表示する前に実行されるため、
  // state に記事がない時にだけリクエストを投げるように条件分岐をいれている
  if (!store.state.posts.length) {
    await store.dispatch('fetchPosts')
  }
}
