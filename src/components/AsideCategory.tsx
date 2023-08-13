import Link from 'next/link'
import { getLinkedCategories } from '@/libs/getContents'
import HeadingBgGray from '@/components/HeadingBgGray'

const AsideCategory = async () => {
  const { contents: categories } = await getLinkedCategories()

  return (
    <div className="mb-12">
      <HeadingBgGray>カテゴリから探す</HeadingBgGray>
      <ul className="flex flex-wrap gap-2 text-sm">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.id}/page/1`}
              className="block whitespace-nowrap rounded bg-stone-100 p-2 transition hover:bg-blue-100"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AsideCategory
