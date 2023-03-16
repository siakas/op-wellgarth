import NextLink from 'next/link'
import { Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'

const Home = () => {
  return (
    <>
      <Main>
        <BreadcrumbNav />

        <Grid templateColumns="repeat(2, 1fr)" gap={10}>
          <GridItem>
            <Link as={NextLink} href="#" display="block">
              <Image
                src="https://placehold.jp/400x400.png"
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
                テキストテキストテキストテキストテキストテキストテキストテキストテキスト
              </Text>
            </Link>
          </GridItem>
          <GridItem>
            <Link as={NextLink} href="#" display="block">
              <Image
                src="https://placehold.jp/400x400.png"
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
                テキストテキストテキストテキストテキストテキストテキストテキストテキスト
              </Text>
            </Link>
          </GridItem>
          <GridItem>
            <Link as={NextLink} href="#" display="block">
              <Image
                src="https://placehold.jp/400x400.png"
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
                テキストテキストテキストテキストテキストテキストテキストテキストテキスト
              </Text>
            </Link>
          </GridItem>
          <GridItem>
            <Link as={NextLink} href="#" display="block">
              <Image
                src="https://placehold.jp/400x400.png"
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
                テキストテキストテキストテキストテキストテキストテキストテキストテキスト
              </Text>
            </Link>
          </GridItem>
        </Grid>
      </Main>

      <Aside>
        <AsideSearch />
        <AsideArea />
        <AsideCategory />
        <AsidePickup />
        <AsideLatestSpot />
      </Aside>
    </>
  )
}

export default Home
