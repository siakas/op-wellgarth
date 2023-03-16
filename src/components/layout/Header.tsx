import type { FC } from 'react'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'

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
        <Text fontSize="xl" fontWeight="bold">
          Your Logo
        </Text>
      </Box>
      <Spacer />
      <Flex align="center">
        <Box margin="0 1rem">
          <Text fontSize="lg">Home</Text>
        </Box>
        <Box margin="0 1rem">
          <Text fontSize="lg">About</Text>
        </Box>
        <Box margin="0 1rem">
          <Text fontSize="lg">Contact</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
