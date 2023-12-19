import { Heading } from '@/components/elements/Heading'
import { Link } from '@/components/elements/Link'
import { getActiveCategories } from '@/lib/getContents'

export const AsideCategory = async () => {
  const { contents: categories } = await getActiveCategories()

  return (
    <div className="mb-12">
      <Heading.Basic>カテゴリ</Heading.Basic>
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link.Basic href={`/category/${category.id}/page/1`}>
              {category.name}
            </Link.Basic>
          </li>
        ))}
      </ul>
    </div>
  )
}
