import { SpotList } from '@/components/model/SpotList'
import { getSpotsByQuery } from '@/lib/getContents'

type Props = {
  searchParams: {
    q: string
  }
}

const SearchPage = async ({ searchParams }: Props) => {
  const query = searchParams.q

  // 検索クエリからスポット一覧を取得
  const { contents: spots } = await getSpotsByQuery(query)

  return (
    <>
      {spots.length ? (
        <SpotList spots={spots} />
      ) : (
        <p>
          キーワードに該当する記事がありません。
          <br />
          申し訳ありませんが、キーワードを変えて検索してください。
        </p>
      )}
    </>
  )
}

export default SearchPage
