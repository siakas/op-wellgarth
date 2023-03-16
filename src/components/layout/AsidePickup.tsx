import NextLink from 'next/link'
import type { FC } from 'react'
import { Box, Image, Link, Stack, Text } from '@chakra-ui/react'
import HeadingBgGray from '@/components/ui/HeadingBgGray'

const AsidePickup: FC = () => {
  return (
    <Box mb={12}>
      <HeadingBgGray>お気に入りスポット</HeadingBgGray>

      <Stack spacing={6} mt="20px">
        <Link as={NextLink} href="#" display="block">
          <Image
            src="https://placehold.jp/400x400.png"
            alt=""
            objectFit="cover"
            borderRadius={5}
            sx={{ aspectRatio: '1.618 / 1' }}
          />
          <Text fontSize="sm" pt={2}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
        </Link>
        <Link as={NextLink} href="#" display="block">
          <Image
            src="https://placehold.jp/400x400.png"
            alt=""
            objectFit="cover"
            borderRadius={5}
            sx={{ aspectRatio: '1.618 / 1' }}
          />
          <Text fontSize="sm" pt={2}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
        </Link>
        <Link as={NextLink} href="#" display="block">
          <Image
            src="https://placehold.jp/400x400.png"
            alt=""
            objectFit="cover"
            borderRadius={5}
            sx={{ aspectRatio: '1.618 / 1' }}
          />
          <Text fontSize="sm" pt={2}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
        </Link>
        <Link as={NextLink} href="#" display="block">
          <Image
            src="https://placehold.jp/400x400.png"
            alt=""
            objectFit="cover"
            borderRadius={5}
            sx={{ aspectRatio: '1.618 / 1' }}
          />
          <Text fontSize="sm" pt={2}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
        </Link>
      </Stack>
    </Box>
  )
}

export default AsidePickup
