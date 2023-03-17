import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import type { Area, Category, Spot } from '@/types/microcms'
import {
  getAllSpots,
  getAreas,
  getCategories,
  getLatestSpots,
  getPickupSpots,
} from '@/libs'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import SpotsList from '@/components/ui/SpotsList'

type HomeProps = {
  spots: Spot[]
  areas: Area[]
  categories: Category[]
  pickupSpots: Spot[]
  latestSpots: Spot[]
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const spots = await getAllSpots()
  const areas = await getAreas()
  const categories = await getCategories()
  const pickupSpots = await getPickupSpots()
  const latestSpots = await getLatestSpots()

  return {
    props: {
      spots: spots.contents,
      areas: areas.contents,
      categories: categories.contents,
      pickupSpots: pickupSpots.contents,
      latestSpots: latestSpots.contents,
    },
    revalidate: 60,
  }
}

const Home: NextPage<HomeProps> = ({
  spots,
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
