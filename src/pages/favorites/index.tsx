import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import type { Area, Category, Spot } from '@/types/microcms'
import { useRecoilValue } from 'recoil'
import { getContents } from '@/libs'
import { favoritesState } from '@/state/favoritesState'
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

type FavoritePageProps = {
  areas: Area[]
  categories: Category[]
  pickupSpots: Spot[]
  latestSpots: Spot[]
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { areas, categories, pickupSpots, latestSpots } = await getContents()

  return {
    props: {
      areas,
      categories,
      pickupSpots,
      latestSpots,
    },
  }
}

const FavoritePage: NextPage<FavoritePageProps> = ({
  areas,
  categories,
  pickupSpots,
  latestSpots,
}) => {
  // ToDo: 表示に問題はないがリロードするとエラーが表示されるので修正が必要
  const favorites = useRecoilValue(favoritesState)

  return (
    <>
      <BaseLayout>
        <PageMeta pageTitle="ユーザーのお気に入りスポット一覧" />

        <Main>
          <BreadcrumbNav />
          <SpotsList spots={favorites} />
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

export default FavoritePage
