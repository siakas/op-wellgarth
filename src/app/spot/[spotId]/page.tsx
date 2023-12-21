import { Heading } from '@/components/elements/Heading'
import { SpotImage } from '@/components/page/spot/SpotImage'
import { SpotMeta } from '@/components/page/spot/SpotMeta'
import { SpotPageTitle } from '@/components/page/spot/SpotPageTitle'
import { getSpotById } from '@/lib/getContents'
import { formatLineBreaks } from '@/utils/formatLineBreaks'

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
      <SpotImage spot={spot} />

      {/* パンくずナビ */}

      {/* ページタイトル */}
      <SpotPageTitle spot={spot} />

      {/* メタ情報 */}
      <SpotMeta {...spot} />

      {/* 記事本文 */}

      {/* 店舗情報 */}
      <div className="prose max-w-none">
        {spot.time && (
          <>
            <div className="mb-4 mt-10">
              <Heading.Basic>営業時間</Heading.Basic>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: formatLineBreaks(spot.time) }}
            ></p>
          </>
        )}
        {spot.holiday && (
          <>
            <div className="mb-4 mt-10">
              <Heading.Basic>定休日</Heading.Basic>
            </div>
            <p>{spot.holiday}</p>
          </>
        )}
        {spot.tel && (
          <>
            <div className="mb-4 mt-10">
              <Heading.Basic>電話番号</Heading.Basic>
            </div>
            <p>{spot.tel}</p>
          </>
        )}
      </div>

      {/* 関連スポット */}
    </>
  )
}

export default SpotPage
