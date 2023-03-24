import type { FC, KeyboardEvent } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const AsideSearch: FC = () => {
  const router = useRouter()

  const onEnterKeyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim()) return
    if (e.key === 'Enter') {
      void router.push(`/search?q=${e.currentTarget.value}`)
    }
  }

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
        <Input
          type="text"
          borderColor="blackAlpha.300"
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            onEnterKeyEvent(e)
          }}
        />
      </InputGroup>
    </Box>
  )
}

export default AsideSearch
