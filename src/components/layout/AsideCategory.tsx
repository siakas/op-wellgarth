import type { FC } from 'react'
import type { Category } from '@/types/microcms'
import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

type AsideCategoryProps = {
  categories: Category[]
}

const AsideCategory: FC<AsideCategoryProps> = ({ categories = [] }) => {
  return (
    <Box mb={12}>
      <HeadingBgGray>カテゴリ</HeadingBgGray>

      <Flex as="ul" flexWrap="wrap" fontSize="sm" gap="8px">
        {categories.map((category) => (
          <Box key={category.id} as="li">
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
    </Box>
  )
}

export default AsideCategory
