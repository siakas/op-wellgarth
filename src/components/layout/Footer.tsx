import type { FC } from 'react'
import { Box, Container, Flex, Text } from '@chakra-ui/react'

const Footer: FC = () => {
  return (
    <Box as="footer" bg="gray.700" color="white" pt={20} pb={14}>
      <Container maxW="1200px">
        <Flex as="ul" fontSize="sm" gap="30px">
          <Box as="li">
            <a href="#">運営会社</a>
          </Box>
          <Box as="li">
            <a href="#">ニュース</a>
          </Box>
          <Box as="li">
            <a href="#">特定商取引法に基づく表記</a>
          </Box>
          <Box as="li">
            <a href="#">利用規約</a>
          </Box>
          <Box as="li">
            <a href="#">プライバシーポリシー</a>
          </Box>
        </Flex>
        <Text fontSize="sm" color="gray.400" mt={4}>
          Copyright © Kyoto Finder. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
