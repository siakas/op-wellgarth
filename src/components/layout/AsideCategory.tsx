import NextLink from 'next/link'
import type { FC } from 'react'
import { Box, Link } from '@chakra-ui/react'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

const AsideCategory: FC = () => {
  return (
    <Box mb={12}>
      <HeadingBgGray>カテゴリ</HeadingBgGray>

      <Box as="ul">
        <Box as="li" borderBottom="1px solid #eee">
          <Link as={NextLink} href="#" display="block" p="12px 10px">
            テキストテキストテキストテキスト
          </Link>
        </Box>
        <Box as="li" borderBottom="1px solid #eee">
          <Link as={NextLink} href="#" display="block" p="12px 10px">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Link>
        </Box>
        <Box as="li" borderBottom="1px solid #eee">
          <Link as={NextLink} href="#" display="block" p="12px 10px">
            テキストテキストテキストテキスト
          </Link>
        </Box>
        <Box as="li" borderBottom="1px solid #eee">
          <Link as={NextLink} href="#" display="block" p="12px 10px">
            テキストテキストテキストテキスト
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default AsideCategory
