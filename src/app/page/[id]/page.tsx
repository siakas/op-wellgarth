import { Pager } from '@/components/model/Pager'
import { SpotList } from '@/components/model/SpotList'
import { getSpotsByFilter } from '@/lib/getContents'

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const pageId = params.id
  const page: number = pageId ? parseInt(pageId as string, 10) : 1

  // ページ番号ごとのスポット一覧を取得
  const { pager, spots } = await getSpotsByFilter(10, page)

  return (
    <>
      <SpotList spots={spots.contents} />
      <Pager currentPage={page} pager={pager} />
    </>
  )
}

export default Page
