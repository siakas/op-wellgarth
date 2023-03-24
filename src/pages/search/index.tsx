import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import type { Area, Category, Spot } from '@/types/microcms'
import { SearchIcon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSearchByQuery } from '@/hooks/useSearchByQuery'
import {
  getLatestSpots,
  getLinkedAreas,
  getLinkedCategories,
  getPickupSpots,
  getSpotsByQuery,
} from '@/libs'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import BaseLayout from '@/components/layout/BaseLayout'
import Main from '@/components/layout/Main'
import PageMeta from '@/components/layout/PageMeta'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import SpotsList from '@/components/ui/SpotsList'

type SearchPageProps = {
  spots: Spot[]
  areas: Area[]
  categories: Category[]
  pickupSpots: Spot[]
  latestSpots: Spot[]
  query: string
}

// 通常の SSG では getStaticProps を使うが、
// 検索はサーバ再サイドで API 取得の処理を実行するため、
// getServerSideProps を使う
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const query = context.query.q ?? '' // URL のクエリパラメータから `q` の値を取得
  const spots = await getSpotsByQuery(query as string)
  const areas = await getLinkedAreas()
  const categories = await getLinkedCategories()
  const pickupSpots = await getPickupSpots()
  const latestSpots = await getLatestSpots()

  return {
    props: {
      spots: spots.contents,
      areas: areas.contents,
      categories: categories.contents,
      pickupSpots: pickupSpots.contents,
      latestSpots: latestSpots.contents,
      query,
    },
  }
}

const SearchPage: NextPage<SearchPageProps> = ({
  spots,
  areas,
  categories,
  pickupSpots,
  latestSpots,
  query,
}) => {
  const { searchValue, setSearchValue, onEnterKeyEvent } =
    useSearchByQuery(query)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <>
      <BaseLayout>
        <PageMeta pageTitle={`「${query}」の検索結果`} />

        <Main>
          <BreadcrumbNav />

          <Box my={10}>
            <InputGroup mt="5px">
              <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<SearchIcon color="gray.500" />}
              />
              <Input
                type="text"
                borderColor="blackAlpha.300"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
                onKeyDown={async (e) => {
                  setIsLoading(true) // ToDo: これでは期待通りのローディング表示にならないので改修が必要
                  await onEnterKeyEvent(e)
                  setIsLoading(false) // ToDo: これでは期待通りのローディング表示にならないので改修が必要
                }}
              />
            </InputGroup>
          </Box>

          {/* 記事が 0 件の表示 */}
          {spots.length === 0 && (
            <Box>
              <Text>
                キーワードに該当する記事がありません。
                <br />
                申し訳ありませんが、キーワードを変えて検索してください。
              </Text>
            </Box>
          )}

          {/* ToDo: これでは期待通りのローディング表示にならないので改修が必要 */}
          {isLoading ? (
            <>
              <Box
                display="Flex"
                justifyContent="center"
                alignItems="center"
                height="100px"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Box>
            </>
          ) : (
            <SpotsList spots={spots} />
          )}
        </Main>

        <Aside>
          <AsideSearch />
          <AsideLatestSpot latestSpots={latestSpots} />
          <AsideArea areas={areas} />
          <AsideCategory categories={categories} />
          <AsidePickup pickupSpots={pickupSpots} />
        </Aside>
      </BaseLayout>
    </>
  )
}

export default SearchPage
