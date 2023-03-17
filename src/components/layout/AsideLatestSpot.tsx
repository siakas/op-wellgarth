import NextLink from 'next/link'
import type { FC } from 'react'
import { Box, Link } from '@chakra-ui/react'
import type { Spot } from '@/types/microcms'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

type AsideLatestSpotProps = {
  latestSpots: Spot[]
}

const AsideLatestSpot: FC<AsideLatestSpotProps> = ({ latestSpots = [] }) => {
  return (
    <Box mb={12}>
      <HeadingBgGray>最新のスポット</HeadingBgGray>

      <Box as="ul">
        {latestSpots.map((spot) => (
          <Box key={spot.id} as="li" borderBottom="1px solid #eee">
            <Link as={NextLink} href="#" display="block" p="12px 10px">
              {spot.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AsideLatestSpot
