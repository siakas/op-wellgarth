import type { FC } from 'react'
import type { Area } from '@/types/microcms'
import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

type AsideAreaProps = {
  areas: Area[]
}

const AsideArea: FC<AsideAreaProps> = ({ areas = [] }) => {
  return (
    <Box mb={12}>
      <HeadingBgGray>エリア</HeadingBgGray>

      <Flex as="ul" flexWrap="wrap" fontSize="sm" gap="8px">
        {areas.map((area) => (
          <Box key={area.id} as="li">
            <Link
              as={NextLink}
              href={`/area/${area.id}`}
              display="block"
              p={2}
              bg="blackAlpha.100"
              borderRadius={4}
              _hover={{ textDecoration: 'none', bg: 'blue.100' }}
            >
              {area.name}
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default AsideArea
