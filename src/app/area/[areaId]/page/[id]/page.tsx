import { Pager } from '@/components/model/Pager'
import { SpotList } from '@/components/model/SpotList'
import { getActiveAreas, getSpotsByFilter } from '@/lib/getContents'

type Props = {
  params: {
    areaId: string
    id: string
  }
}

const AreaPage = async ({ params }: Props) => {
  const pageId = params.id
  const page: number = pageId ? parseInt(pageId as string, 10) : 1
  const areaId = params.areaId

  // スポット取得用のフィルタを定義
  const spotFilter = areaId ? `area[equals]${areaId}` : undefined

  // エリアでフィルタリングしたスポット一覧を取得
  const { pager, spots } = await getSpotsByFilter(10, page, spotFilter)

  // エリア一覧から現在のエリアを取得
  const { contents: areas } = await getActiveAreas()
  const selectedArea = areaId
    ? areas.find((area) => area.id === areaId)
    : undefined

  return (
    <>
      <h1 className="mb-5 text-2xl font-medium">
        「{selectedArea?.name}」周辺のスポット一覧
      </h1>
      <SpotList spots={spots.contents} />
      <Pager currentPage={page} pager={pager} selectedArea={selectedArea} />
    </>
  )
}

export default AreaPage
