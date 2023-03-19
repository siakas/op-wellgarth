import type { FC } from 'react'
import type { Spot } from '@/types/microcms'
import { Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type SpotsListProps = {
  spots: Spot[]
}

const SpotsList: FC<SpotsListProps> = ({ spots }) => {
  return (
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
            <Text pt={2} fontWeight="bold" color="blackAlpha.800" fontSize="lg">
              {spot.title}
            </Text>
          </Link>
        </GridItem>
      ))}
    </Grid>
  )
}

export default SpotsList
