import type { FC } from 'react'
import type { Spot } from '@/types/microcms'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

type AsidePickupProps = {
  pickupSpots: Spot[]
}

const AsidePickup: FC<AsidePickupProps> = ({ pickupSpots = [] }) => {
  return (
    <Box mb={12}>
      <HeadingBgGray>お気に入りスポット</HeadingBgGray>

      <Box
        mt="20px"
        display={{ base: 'grid', lg: 'block' }}
        gridTemplateColumns="repeat(2, 1fr)"
        gap="18px"
      >
        {pickupSpots.map((spot) => (
          <Link
            key={spot.id}
            as={NextLink}
            href={`/${spot.id}`}
            display="block"
            mb={{ base: '0', lg: '20px' }}
          >
            <Image
              src={
                spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'
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
      </Box>

      <Flex
        justifyContent="flex-end"
        alignItems="center"
        fontSize="sm"
        gap={1}
        mt={4}
      >
        <ChevronRightIcon w={4} h={4} />
        <Link as={NextLink} href="/pickup/page/1">
          もっと見る
        </Link>
      </Flex>
    </Box>
  )
}

export default AsidePickup
