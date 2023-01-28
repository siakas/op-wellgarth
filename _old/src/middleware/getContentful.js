export default async ({ store }) => {
  // middleware はすべてのページを表示する前に実行されるため、
  // state に記事がない時にだけリクエストを投げるように条件分岐をいれている
  // 以下のひとつの action でエントリ一覧、エリア、タグのすべてのデータを取得するように変更したので、一度のリクエストにおさまっている
  if (!store.state.posts.length) {
    await store.dispatch('fetchPosts')
  }
}
