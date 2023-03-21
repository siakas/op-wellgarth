import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next'
import type { Area, Category, Spot } from '@/types/microcms'
import { Box, Image, Text } from '@chakra-ui/react'
import { chain, isString } from 'lodash-es'
import { getAllSpots, getContents, getSpotById, getSpotsByFilter } from '@/libs'
import { sanitizeHtml } from '@/libs/sanitizeHtml'
import { formatLineBreaks } from '@/utils'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideSearch from '@/components/layout/AsideSearch'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import HeadingBgGray from '@/components/ui/HeadingBgGray'
import SpotBody from '@/components/ui/SpotBody'
import SpotPageTitle from '@/components/ui/SpotPageTitle'
import SpotRelated from '@/components/ui/SpotRelated'

type SpotPageProps = {
  spot: Spot
  areas: Area[]
  categories: Category[]
  sanitizedHtml: string
  shuffledSameAreaSpots: Spot[]
  shuffledSameCategorySpots: Spot[]
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
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const spotId = context.params?.spotId
  const notFound = !isString(spotId)

  if (notFound) {
    return {
      notFound,
      revalidate: 60,
    }
  }

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
  // 同エリア、同カテゴリのスポットから、シャッフルして 3 件を抽出 (現在のスポットは除外)
  const shuffledSameAreaSpots = chain(sameAreaSpots.contents)
    .shuffle()
    .filter((obj) => obj.id !== spot.id)
    .take(3)
    .value()
  const shuffledSameCategorySpots = chain(sameCategorySpots.contents)
    .shuffle()
    .filter((obj) => obj.id !== spot.id)
    .take(3)
    .value()

  // 共通のエリア情報、カテゴリ情報を取得
  const { areas, categories } = await getContents()

  return {
    props: {
      spot,
      areas,
      categories,
      sanitizedHtml,
      shuffledSameAreaSpots,
      shuffledSameCategorySpots,
    },
    revalidate: 60,
  }
}

const SpotPage: NextPage<SpotPageProps> = ({
  spot,
  areas,
  categories,
  sanitizedHtml,
  shuffledSameAreaSpots,
  shuffledSameCategorySpots,
}) => {
  return (
    <>
      <Main>
        {/* MV */}
        <Box mb={6}>
          <Image
            src={spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'}
            alt=""
            objectFit="cover"
            borderRadius={5}
            w="100%"
            display="block"
            sx={{ aspectRatio: '1 / 0.525' }}
          />
        </Box>

        <BreadcrumbNav />

        {/* スポットタイトル */}
        <SpotPageTitle title={spot.title} />

        {/* メタ情報 */}

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

        {shuffledSameAreaSpots.length !== 0 && (
          <>
            <HeadingBgGray mt={20} mb={4}>
              近くのスポット
            </HeadingBgGray>
            <SpotRelated spots={shuffledSameAreaSpots} />
          </>
        )}

        {shuffledSameCategorySpots.length !== 0 && (
          <>
            <HeadingBgGray mt={10} mb={4}>
              同じカテゴリのスポット
            </HeadingBgGray>
            <SpotRelated spots={shuffledSameCategorySpots} />
          </>
        )}
      </Main>

      <Aside>
        <AsideSearch />
        <AsideArea areas={areas} />
        <AsideCategory categories={categories} />
      </Aside>
    </>
  )
}

export default SpotPage
