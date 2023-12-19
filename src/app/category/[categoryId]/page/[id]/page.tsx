import { Pager } from '@/components/model/Pager'
import { SpotList } from '@/components/model/SpotList'
import { getActiveCategories, getSpotsByFilter } from '@/lib/getContents'

type Props = {
  params: {
    categoryId: string
    id: string
  }
}

const CategoryPage = async ({ params }: Props) => {
  const pageId = params.id
  const page: number = pageId ? parseInt(pageId as string, 10) : 1
  const categoryId = params.categoryId

  // スポット取得用のフィルタを定義
  const spotFilter = categoryId
    ? `categories[contains]${categoryId}`
    : undefined

  // カテゴリでフィルタリングしたスポット一覧を取得
  const { pager, spots } = await getSpotsByFilter(10, page, spotFilter)

  // カテゴリ一覧から現在のカテゴリを取得
  const { contents: categories } = await getActiveCategories()
  const selectedCategory = categoryId
    ? categories.find((category) => category.id === categoryId)
    : undefined

  return (
    <>
      <h1 className="mb-5 text-2xl font-medium">
        「{selectedCategory?.name}」周辺のスポット一覧
      </h1>
      <SpotList spots={spots.contents} />
      <Pager
        currentPage={page}
        pager={pager}
        selectedCategory={selectedCategory}
      />
    </>
  )
}

export default CategoryPage
