import { getAllSpots, getSpotById } from '@/libs/getContents'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import SpotMeta from '@/components/SpotMeta'
import SpotPageTitle from '@/components/SpotPageTitle'

type Props = {
  params: {
    spotId: string
  }
}

const SpotPage = async ({ params }: Props) => {
  const spotId = params.spotId

  // スポット情報を取得
  const spot = await getSpotById(spotId)

  return (
    <>
      {/* メインビジュアル */}
      <div className="mb-6">
        <img
          src={spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'}
          alt=""
          className="block aspect-[1/0.525] w-full rounded object-cover"
        />
      </div>

      {/* パンくずナビ */}
      <BreadcrumbNav area={spot.area} />

      {/* ページタイトル */}
      <SpotPageTitle title={spot.title} />

      {/* メタ情報 */}
      <SpotMeta
        area={spot.area}
        categories={spot.categories}
        updateAt={spot.updatedAt}
      />
    </>
  )
}

export const generateStaticParams = async () => {
  const { contents: spots } = await getAllSpots()

  return spots.map((spot) => {
    return {
      spotId: spot.id,
    }
  })
}

export default SpotPage
