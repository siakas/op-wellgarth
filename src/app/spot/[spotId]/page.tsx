import { getAllSpots, getSpotById } from '@/libs/getContents'
import { formatLineBreaks, sanitizeHtml } from '@/utils'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import HeadingBgGray from '@/components/HeadingBgGray'
import SpotBody from '@/components/SpotBody'
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
  const sanitizedHtml = sanitizeHtml(spot.content ?? '')

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

      {/* 記事本文 */}
      <SpotBody sanitizedHtml={sanitizedHtml} />

      {/* 店舗情報 */}
      <div className="prose max-w-none">
        {spot.time && (
          <>
            <div className="mb-4 mt-10">
              <HeadingBgGray>営業時間</HeadingBgGray>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: formatLineBreaks(spot.time) }}
            ></p>
          </>
        )}
        {spot.holiday && (
          <>
            <div className="mb-4 mt-10">
              <HeadingBgGray>定休日</HeadingBgGray>
            </div>
            <p>{spot.holiday}</p>
          </>
        )}
        {spot.tel && (
          <>
            <div className="mb-4 mt-10">
              <HeadingBgGray>電話番号</HeadingBgGray>
            </div>
            <p>{spot.tel}</p>
          </>
        )}
      </div>

      {/* 関連スポット */}
      <div className="mb-4 mt-10">
        <HeadingBgGray>関連スポット</HeadingBgGray>
      </div>
      <p>※同一エリアかつ同一カテゴリで、自分以外のスポットの一覧を表示したい</p>
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
