import { Box, Heading } from '@chakra-ui/react'

const Home = () => {
  return (
    <>
      <Box p={10} m="auto" maxW={800}>
        <Heading as="h1" size="2xl">
          トップページ
        </Heading>
      </Box>
    </>
  )
}

export default Home
