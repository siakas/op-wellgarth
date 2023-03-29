import type { FC } from 'react'
import type { Spot } from '@/types/microcms'
import { Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type SpotRelatedProps = {
  spots: Spot[]
}

const SpotRelated: FC<SpotRelatedProps> = ({ spots }) => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={4}
    >
      {spots.map((spot) => (
        <GridItem key={spot.id}>
          <Link as={NextLink} href={`/${spot.id}`} display="block">
            <Image
              src={
                spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'
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
              fontSize="sm"
              lineHeight="1.4"
            >
              {spot.title}
            </Text>
          </Link>
        </GridItem>
      ))}
    </Grid>
  )
}

export default SpotRelated
