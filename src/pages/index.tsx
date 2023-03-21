import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import type { Area, Category, Spot } from '@/types/microcms'
import { getContents } from '@/libs'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import Pager from '@/components/ui/Pager'
import SpotsList from '@/components/ui/SpotsList'

type HomeProps = {
  currentPage: number
  spots: Spot[]
  pager: number[]
  areas: Area[]
  categories: Category[]
  pickupSpots: Spot[]
  latestSpots: Spot[]
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const pageId = context.params?.id
  const page: number = pageId !== undefined ? parseInt(pageId as string, 10) : 1

  const { spots, pager, areas, categories, pickupSpots, latestSpots } =
    await getContents()

  return {
    props: {
      currentPage: page,
      spots,
      pager,
      areas,
      categories,
      pickupSpots,
      latestSpots,
    },
    revalidate: 60,
  }
}

const Home: NextPage<HomeProps> = ({
  currentPage,
  spots,
  pager,
  areas,
  categories,
  pickupSpots,
  latestSpots,
}) => {
  return (
    <>
      <Main>
        <BreadcrumbNav />
        <SpotsList spots={spots} />

        <Pager currentPage={currentPage} pager={pager} />
      </Main>

      <Aside>
        <AsideSearch />
        <AsideLatestSpot latestSpots={latestSpots} />
        <AsideArea areas={areas} />
        <AsideCategory categories={categories} />
        <AsidePickup pickupSpots={pickupSpots} />
      </Aside>
    </>
  )
}

export default Home
