import type { FC } from 'react'
import type { Spot } from '@/types/microcms'
import { Box, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

type AsidePickupProps = {
  pickupSpots: Spot[]
}

const AsidePickup: FC<AsidePickupProps> = ({ pickupSpots = [] }) => {
  return (
    <Box mb={12}>
      <HeadingBgGray>お気に入りスポット</HeadingBgGray>

      <Stack spacing={6} mt="20px">
        {pickupSpots.map((spot) => (
          <Link key={spot.id} as={NextLink} href="#" display="block">
            <Image
              src={
                spot.eyecatch
                  ? spot.eyecatch.url
                  : 'https://placehold.jp/400x400.png'
              }
              alt=""
              objectFit="cover"
              borderRadius={5}
              sx={{ aspectRatio: '1 / 0.525' }}
            />
            <Text fontSize="sm" pt={2}>
              {spot.title}
            </Text>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default AsidePickup
