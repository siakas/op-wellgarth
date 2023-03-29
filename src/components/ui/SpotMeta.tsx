import type { FC } from 'react'
import type { Area, Category } from '@/types/microcms'
import { Box, Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

type SpotMetaProps = {
  area: Area
  categories: Category[]
}

const SpotMeta: FC<SpotMetaProps> = ({ area, categories }) => {
  return (
    <Flex
      mt={2}
      lineHeight="base"
      gap={{ base: '8px', sm: '24px' }}
      flexDirection={{ base: 'column', sm: 'row' }}
    >
      <Flex alignItems="center" gap="8px">
        <Heading as="h3" fontSize="sm" lineHeight="inherit">
          エリア
        </Heading>
        <Flex as="ul" fontSize="sm" alignItems="center" gap="8px">
          <Box as="li">
            <Link
              as={NextLink}
              href={`/area/${area.id}/page/1`}
              display="block"
              p={2}
              bg="blackAlpha.100"
              borderRadius={4}
              _hover={{ textDecoration: 'none', bg: 'blue.100' }}
            >
              {area.name}
            </Link>
          </Box>
        </Flex>
      </Flex>
      <Flex alignItems="center" gap="8px">
        <Heading as="h3" fontSize="sm" lineHeight="inherit">
          カテゴリ
        </Heading>
        <Flex as="ul" fontSize="sm" alignItems="center" gap="8px">
          {categories.map((category) => (
            <Box as="li" key={category.id}>
              <Link
                as={NextLink}
                href={`/category/${category.id}/page/1`}
                display="block"
                p={2}
                bg="blackAlpha.100"
                borderRadius={4}
                _hover={{ textDecoration: 'none', bg: 'blue.100' }}
              >
                {category.name}
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SpotMeta
