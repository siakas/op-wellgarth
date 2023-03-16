import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import NextLink from 'next/link'
import { Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import type { Area, Category, Spot } from '@/types/microcms'
import { getAllSpots, getAreas, getCategories } from '@/libs'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'

type HomeProps = {
  spots: Spot[]
  areas: Area[]
  categories: Category[]
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const spots = await getAllSpots()
  const areas = await getAreas()
  const categories = await getCategories()

  return {
    props: {
      spots: spots.contents,
      areas: areas.contents,
      categories: categories.contents,
    },
  }
}

const Home: NextPage<HomeProps> = ({ spots, areas, categories }) => {
  return (
    <>
      <Main>
        <BreadcrumbNav />

        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          {spots.map((spot) => (
            <GridItem key={spot.id}>
              <Link as={NextLink} href={`/${spot.id}`} display="block">
                <Image
                  src={
                    spot.eyecatch
                      ? spot.eyecatch.url
                      : 'https://placehold.jp/400x400.png'
                  }
                  alt=""
                  objectFit="cover"
                  borderRadius={5}
                  w="100%"
                  display="block"
                  sx={{ aspectRatio: '1.618 / 1' }}
                />
                <Text
                  pt={2}
                  fontWeight="bold"
                  color="blackAlpha.800"
                  fontSize="lg"
                >
                  {spot.title}
                </Text>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Main>

      <Aside>
        <AsideSearch />
        <AsideArea areas={areas} />
        <AsideCategory categories={categories} />
        <AsidePickup />
        <AsideLatestSpot />
      </Aside>
    </>
  )
}

export default Home
