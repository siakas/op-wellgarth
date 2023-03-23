import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next'
import type { Area, Category, Spot } from '@/types/microcms'
import { Box, Image, Text } from '@chakra-ui/react'
import { chain } from 'lodash-es'
import { getAllSpots, getContents, getSpotById, getSpotsByFilter } from '@/libs'
import { sanitizeHtml } from '@/libs/sanitizeHtml'
import { formatLineBreaks } from '@/utils'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideSearch from '@/components/layout/AsideSearch'
import BaseLayout from '@/components/layout/BaseLayout'
import Main from '@/components/layout/Main'
import PageMeta from '@/components/layout/PageMeta'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import HeadingBgGray from '@/components/ui/HeadingBgGray'
import SpotBody from '@/components/ui/SpotBody'
import SpotMeta from '@/components/ui/SpotMeta'
import SpotPageTitle from '@/components/ui/SpotPageTitle'
import SpotRelated from '@/components/ui/SpotRelated'

type SpotPageProps = {
  spot: Spot
  areas: Area[]
  categories: Category[]
  sanitizedHtml: string
  relatedSpots: Spot[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents: spots } = await getAllSpots()
  const paths = spots.map((spot) => {
    return {
      params: {
        spotId: spot.id,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spotId: any = context.params?.spotId

  // スポット情報を取得
  const spot = await getSpotById(spotId)
  const sanitizedHtml = sanitizeHtml(spot.content ?? '')

  // 関連スポット情報を取得
  const { spots: sameAreaSpots } = await getSpotsByFilter(
    50,
    1,
    `area[equals]${spot.area.id}`
  )
  const { spots: sameCategorySpots } = await getSpotsByFilter(
    50,
    1,
    `categories[contains]${spot.categories[0].id}`
  )

  // 同エリアスポットと同カテゴリスポットを結合し、シャッフルして 6 件を抽出（現在のスポットは除外）
  const relatedSpots = chain(sameAreaSpots.contents) // 同エリアスポット一覧に対して
    .concat(sameCategorySpots.contents) // 同カテゴリスポット一覧を結合
    .uniqBy('id') // 同一 id のスポットを除去
    .filter((obj) => obj.id !== spot.id) // 現在のスポットは除外
    .shuffle() // 順番をシャッフル
    .take(6) // 先頭 6 件を取得
    .value()

  // 共通のエリア情報、カテゴリ情報を取得
  const { areas, categories } = await getContents()

  return {
    props: {
      spot,
      areas,
      categories,
      sanitizedHtml,
      relatedSpots,
    },
    revalidate: 60,
  }
}

const SpotPage: NextPage<SpotPageProps> = ({
  spot,
  areas,
  categories,
  sanitizedHtml,
  relatedSpots,
}) => {
  return (
    <>
      <BaseLayout>
        <PageMeta pageTitle={spot.title} pageImg={spot.eyecatch?.url} />

        <Main>
          {/* MV */}
          <Box mb={6}>
            <Image
              src={
                spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'
              }
              alt=""
              objectFit="cover"
              borderRadius={5}
              w="100%"
              display="block"
              sx={{ aspectRatio: '1 / 0.525' }}
            />
          </Box>

          <BreadcrumbNav area={spot.area} />

          {/* スポットタイトル */}
          <SpotPageTitle title={spot.title} />

          {/* メタ情報 */}
          <SpotMeta area={spot.area} categories={spot.categories} />

          {/* 記事本文 */}
          <SpotBody sanitizedHtml={sanitizedHtml} />

          {/* 店舗情報 */}
          {spot.time && (
            <>
              <HeadingBgGray mt={10} mb={4}>
                営業時間
              </HeadingBgGray>
              <Text
                dangerouslySetInnerHTML={{
                  __html: formatLineBreaks(spot.time),
                }}
              />
            </>
          )}
          {spot.holiday && (
            <>
              <HeadingBgGray mt={10} mb={4}>
                定休日
              </HeadingBgGray>
              <Text>{spot.holiday}</Text>
            </>
          )}

          {spot.tel && (
            <>
              <HeadingBgGray mt={10} mb={4}>
                電話番号
              </HeadingBgGray>
            </>
          )}

          {spot.latLng && (
            <>
              <HeadingBgGray mt={10} mb={4}>
                地図
              </HeadingBgGray>
            </>
          )}

          {relatedSpots.length !== 0 && (
            <>
              <HeadingBgGray mt={20} mb={4}>
                関連スポット
              </HeadingBgGray>
              <SpotRelated spots={relatedSpots} />
            </>
          )}
        </Main>

        <Aside>
          <AsideSearch />
          <AsideArea areas={areas} />
          <AsideCategory categories={categories} />
        </Aside>
      </BaseLayout>
    </>
  )
}

export default SpotPage
