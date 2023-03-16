import NextLink from 'next/link'
import type { FC } from 'react'
import { Box, Link } from '@chakra-ui/react'
import type { Area } from '@/types/microcms'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

type AsideAreaProps = {
  areas: Area[]
}

const AsideArea: FC<AsideAreaProps> = ({ areas = [] }) => {
  return (
    <Box mb={12}>
      <HeadingBgGray>エリア</HeadingBgGray>

      <Box as="ul">
        {areas.map((area) => (
          <Box key={area.id} as="li" borderBottom="1px solid #eee">
            <Link
              as={NextLink}
              href={`/area/${area.id}`}
              display="block"
              p="12px 10px"
            >
              {area.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AsideArea
