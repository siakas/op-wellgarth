import type { FC } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'

const AsideSearch: FC = () => {
  return (
    <Box mb={12}>
      <Text fontSize="sm" fontWeight="bold" color="blackAlpha.700">
        サイト内検索
      </Text>
      <InputGroup mt="5px">
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon color="gray.500" />}
        />
        <Input type="text" borderColor="blackAlpha.300" />
      </InputGroup>
    </Box>
  )
}

export default AsideSearch
