import { Link } from '@/components/elements/Link'
import { Area, Category } from '@/types/microcms'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

type Props = {
  currentPage: number
  pager: number[]
  selectedArea?: Area
  selectedCategory?: Category
}

export const Pager = ({
  currentPage,
  pager,
  selectedArea,
  selectedCategory,
}: Props) => {
  // ページャーの終端ページの値を取得
  const lastPage = pager.length > 0 ? pager[pager.length - 1] : 0

  // リンクのパスを取得する関数
  const getPath = (pageNumber: number) => {
    if (selectedArea) {
      return `/area/${selectedArea.id}/page/${pageNumber}`
    } else if (selectedCategory) {
      return `/category/${selectedCategory.id}/page/${pageNumber}`
    } else {
      return `/page/${pageNumber}`
    }
  }

  return (
    <div className="py-10">
      <ul
        className="flex items-center justify-center gap-2
        pt-10"
      >
        {/* 最初のページでなければ始端へのリンクを表示 */}
        {currentPage > 1 && (
          <li>
            <Link.Page href={getPath(1)}>
              <MdKeyboardDoubleArrowLeft size={24} />
            </Link.Page>
          </li>
        )}

        {/* 最初のページでなければ前ページに戻るリンクを表示 */}
        {currentPage > 1 && (
          <li>
            <Link.Page href={getPath(currentPage - 1)}>
              <MdKeyboardArrowLeft size={24} />
            </Link.Page>
          </li>
        )}

        {/* pager の配列の値に応じたナビゲーションを出力 */}
        {pager
          .filter((page) => currentPage - 3 <= page && page <= currentPage + 1)
          .map((page, index) => {
            const isActive: boolean = currentPage === page + 1
            return (
              <li key={index}>
                <Link.Page href={getPath(page + 1)} isActive={isActive}>
                  {page + 1}
                </Link.Page>
              </li>
            )
          })}

        {/* 最後のページでなければ次ページへ進むリンクを表示 */}
        {currentPage < pager.length && (
          <li>
            <Link.Page href={getPath(currentPage + 1)}>
              <MdKeyboardArrowRight size={24} />
            </Link.Page>
          </li>
        )}

        {/* 最後のページでなければ終端へのリンクを表示 */}
        {currentPage < pager.length && (
          <li>
            <Link.Page href={getPath(lastPage + 1)}>
              <MdKeyboardDoubleArrowRight size={24} />
            </Link.Page>
          </li>
        )}
      </ul>
    </div>
  )
}
