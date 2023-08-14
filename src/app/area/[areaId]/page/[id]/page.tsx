import { flatMap, groupBy, times } from 'lodash-es'
import {
  getAllSpots,
  getLinkedAreas,
  getSpotsByFilter,
} from '@/libs/getContents'
import SpotList from '@/components/SpotList'

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

  // エリアでフィルタリングしたスポット一覧を取得（とりあえず limit を 100 件として全件表示）
  const { spots, pager } = await getSpotsByFilter(100, page, spotFilter)

  // エリア一覧から現在のエリアを取得
  const { contents: areas } = await getLinkedAreas()
  const selectedArea = areaId
    ? areas.find((area) => area.id === areaId)
    : undefined

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold">
        「{selectedArea?.name}」周辺のスポット一覧
      </h1>
      <SpotList spots={spots.contents} />
    </>
  )
}

// Next.js App Router ではビルド時の静的ルートは generateStaticParams() で返却する
export const generateStaticParams = async () => {
  const { contents: spots } = await getAllSpots()

  const groupedByArea = groupBy(spots, 'area.id')
  const params = flatMap(groupedByArea, (areaSpots, areaId) => {
    const pages = Math.ceil(areaSpots.length / 10)
    return times(pages, (page) => ({
      id: (page + 1).toString(),
      areaId,
    }))
  })

  // console.log(params)

  return params
}

export default AreaPage
