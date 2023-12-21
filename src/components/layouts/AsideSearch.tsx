'use client'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { KeyboardEvent } from 'react'

export const AsideSearch = () => {
  const router = useRouter()

  const onEnterKeyEvent = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.value.trim()) return
    if (e.key === 'Enter') {
      router.push(`/search?q=${e.currentTarget.value}`)
    }
  }

  return (
    <div className="mb-12">
      <Input
        className="text-base"
        onKeyDown={(e) => {
          onEnterKeyEvent(e)
        }}
        placeholder="サイト内検索"
        type="text"
      />
    </div>
  )
}
