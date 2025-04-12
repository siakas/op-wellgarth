'use client'

import { Link } from '@/components/elements/Link'
import { Area, Category } from '@/types/microcms'
import { formatDate } from '@/utils/formatDate'
import { Star } from 'lucide-react'
import { useState } from 'react'

type Props = {
  area: Area
  categories: Category[]
  updatedAt: string
}

export const SpotMeta = ({ area, categories, updatedAt }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false)

  // お気に入りボタンがクリックされたときの処理
  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev)
  }

  return (
    <>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 leading-normal sm:flex-row sm:gap-6">
          {/* エリア */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium leading-inherit">エリア</h3>
            <p className="text-lg leading-inherit">
              <Link.Basic href={`/area/${area.id}/page/1`}>
                {area.name}
              </Link.Basic>
            </p>
          </div>
          {/* カテゴリ */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium leading-inherit">カテゴリ</h3>
            <ul className="flex items-center gap-2 text-sm leading-inherit">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link.Basic href={`/category/${category.id}/page/1`}>
                    {category.name}
                  </Link.Basic>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* お気に入り表示 */}
        <button
          className="grid size-9 place-items-center rounded bg-stone-100 p-2 transition hover:bg-blue-100"
          onClick={handleFavoriteClick}
        >
          <Star
            color="#1f2937"
            fill={isFavorite ? '#1f2937' : 'transparent'}
            size={20}
          />
        </button>
      </div>

      {/* 最終更新日 */}
      <div className="mt-2">
        <p className="text-right text-xs sm:text-sm">
          最終更新日：{formatDate(updatedAt ?? '', 'YYYY年M月D日')}
        </p>
      </div>
    </>
  )
}
