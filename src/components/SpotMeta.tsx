import { formatDate } from '@/utils'
import type { Area, Category } from '@/types/microcms'

type Props = {
  area: Area
  categories: Category[]
  updateAt: string
}

const SpotMeta = ({ area, categories, updateAt }: Props) => {
  return (
    <>
      <div className="mt-4 flex flex-col gap-2 leading-normal sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium leading-inherit">エリア</h3>
          <p className="text-sm leading-inherit">
            <a
              href={`/area/${area.id}/page/1`}
              className="block whitespace-nowrap rounded bg-stone-100 p-2 transition hover:bg-blue-100"
            >
              {area.name}
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium leading-inherit">カテゴリ</h3>
          <ul className="flex items-center gap-2 text-sm leading-inherit">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`/category/${category.id}/page/1`}
                  className="block whitespace-nowrap rounded bg-stone-100 p-2 transition hover:bg-blue-100"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-right text-xs sm:text-sm">
          最終更新日：{formatDate(updateAt ?? '', 'YYYY年M月D日')}
        </p>
      </div>
    </>
  )
}

export default SpotMeta
