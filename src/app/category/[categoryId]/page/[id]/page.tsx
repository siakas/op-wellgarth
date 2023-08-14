import { flatMap, groupBy, times } from 'lodash-es'
import {
  getAllSpots,
  getLinkedCategories,
  getSpotsByFilter,
} from '@/libs/getContents'
import SpotList from '@/components/SpotList'

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
  // limit を 100 件として全件取得
  const { spots, pager } = await getSpotsByFilter(100, page, spotFilter)

  // カテゴリ一覧から現在のエリアを取得
  const { contents: categories } = await getLinkedCategories()
  const selectedCategory = categoryId
    ? categories.find((category) => category.id === categoryId)
    : undefined

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">
        「{selectedCategory?.name}」のスポット一覧
      </h1>
      <SpotList spots={spots.contents} />
    </>
  )
}

export const generateStaticParams = async () => {
  const { contents: spots } = await getAllSpots()

  // スポットの各カテゴリに対して新しいオブジェクトを作成
  const spotsWithCategories = flatMap(spots, (spot) =>
    spot.categories.map((category) => ({ ...spot, category }))
  )
  // カテゴリ ID をキーとしてグループ化
  const groupedByCategory = groupBy(spotsWithCategories, 'category.id')
  // 各カテゴリのスポット数に基づいてオブジェクトを生成し返却
  const params = flatMap(groupedByCategory, (categorySpots, categoryId) => {
    const pages = Math.ceil(categorySpots.length / 10)
    return times(pages, (page) => ({
      id: (page + 1).toString(),
      categoryId,
    }))
  })

  // console.log(params)

  return params
}

export default CategoryPage
