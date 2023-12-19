import { Link } from '@/components/elements/Link'
import { Area, Category } from '@/types/microcms'
import { formatDate } from '@/utils/formatDate'

type Props = {
  area: Area
  categories: Category[]
  updatedAt: string
}

export const SpotMeta = ({ area, categories, updatedAt }: Props) => {
  return (
    <>
      <div className="mt-4 flex flex-col gap-2 leading-normal sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium leading-inherit">エリア</h3>
          <p className="text-lg leading-inherit">
            <Link.Basic href={`/area/${area.id}/page/1`}>
              {area.name}
            </Link.Basic>
          </p>
        </div>
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
      <div className="mt-2">
        <p className="text-right text-xs sm:text-sm">
          最終更新日：{formatDate(updatedAt ?? '', 'YYYY年M月D日')}
        </p>
      </div>
    </>
  )
}
