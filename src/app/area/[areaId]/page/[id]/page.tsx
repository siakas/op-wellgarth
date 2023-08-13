import { flatMap, groupBy, times } from 'lodash-es'
import Link from 'next/link'
import { getAllSpots, getSpotsByFilter } from '@/libs/getContents'

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

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-10">
      {spots.contents.map((spot) => (
        <div key={spot.id}>
          <Link href={`/${spot.id}`} className="group">
            <img
              src={
                spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'
              }
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
            />
            <p className="pt-3 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              {spot.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
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
