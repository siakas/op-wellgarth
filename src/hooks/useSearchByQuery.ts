import type { KeyboardEvent } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useSearchByQuery = (query: string) => {
  const [searchValue, setSearchValue] = useState<string>(query)

  const router = useRouter()

  const onEnterKeyEvent = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value.trim()) return
    if (e.key === 'Enter') {
      void router.push(`/search?q=${e.currentTarget.value}`)
    }
  }

  return {
    onEnterKeyEvent,
    searchValue,
    setSearchValue,
  }
}
