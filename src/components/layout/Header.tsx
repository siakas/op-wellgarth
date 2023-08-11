import type { FC } from 'react'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { siteConfig } from '@@/site.config'

const Header: FC = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1.5rem"
      borderBottomWidth="1px"
      borderColor="gray.200"
    >
      <Box>
        <Text fontSize="x-large" fontWeight="bold" textTransform="uppercase">
          <Link href="/">{siteConfig.siteMeta.title}</Link>
        </Text>
      </Box>
      <Spacer />
      <Flex align="center" display={{ base: 'none', lg: 'flex' }}>
        <Box margin="0 1rem">
          <Text fontSize="lg">
            <Link href="/">トップ</Link>
          </Text>
        </Box>
        <Box margin="0 1rem">
          <Text fontSize="lg">
            <Link href="/favorites">お気に入り</Link>
          </Text>
        </Box>
        <Box margin="0 1rem">
          <Text fontSize="lg">未訪問</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
