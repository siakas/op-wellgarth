import type { FC } from 'react'
import type { Area, Category } from '@/types/microcms'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'
import PagerLink from '@/components/ui/PagerLink'

type PagerProps = {
  currentPage: number
  pager: number[]
  selectedArea?: Area
  selectedCategory?: Category
}

const Pager: FC<PagerProps> = ({
  currentPage,
  pager,
  selectedArea,
  selectedCategory,
}) => {
  // ページャーの終端ページの値を取得
  const lastPage = pager.length > 0 ? pager[pager.length - 1] : 0

  // リンクのパスを取得する関数を定義
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
    <Box py={10}>
      <Flex
        as="ul"
        pt={10}
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
        {/* 最初のページでなければ始端への矢印を表示 */}
        {currentPage > 1 && (
          <Box as="li">
            <PagerLink href={getPath(1)}>
              <ArrowLeftIcon w={3} h={3} />
            </PagerLink>
          </Box>
        )}

        {/* 最初のページでなければ左矢印を表示 */}
        {currentPage > 1 && (
          <Box as="li" mx={2}>
            {/* リンクコンポーネントのスタイルが共通するので、PagerLink として Chakra の props を継承したコンポーネントを作成した */}
            {/* これにより共通するスタイルの props の繰り返しの記述を回避でき、全体のコードをシンプルに保てる */}
            <PagerLink href={getPath(currentPage - 1)}>
              <ChevronLeftIcon w={6} h={6} />
            </PagerLink>
          </Box>
        )}

        {/* pager の配列の値に応じたナビゲーションを出力 */}
        {/* if を使った処理だと false 時の return がないことが ESLint のエラーに抵触するため、filter と map の組み合わせによる出力としている */}
        {pager
          .filter((page) => currentPage - 3 <= page && page <= currentPage + 1)
          .map((page, index) => {
            const isActive: boolean = currentPage === page + 1
            return (
              <Box
                key={index}
                as="li"
                borderRadius={5}
                bg={isActive ? 'blue.600' : ''}
              >
                <PagerLink
                  href={getPath(page + 1)}
                  color={isActive ? 'white' : ''}
                  fontWeight={isActive ? 'bold' : ''}
                  _hover={{
                    color: isActive ? 'white' : 'blue.500',
                  }}
                >
                  {page + 1}
                </PagerLink>
              </Box>
            )
          })}

        {/* {pager.map((page, index) => {
          const isActive: boolean = currentPage === page + 1
          if (currentPage - 3 <= page && page <= currentPage + 1) {
            return (
              <Box key={index} as="li">
                <Link
                  as={NextLink}
                  href="#"
                  w={10}
                  h={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ textDecoration: 'none', color: 'blue.500' }}
                >
                  {page + 1}
                </Link>
              </Box>
            )
          }
        })} */}

        {/* 最後のページでなければ左矢印を表示 */}
        {currentPage < pager.length && (
          <Box as="li" mx={2}>
            <PagerLink href={getPath(currentPage + 1)}>
              <ChevronRightIcon w={6} h={6} />
            </PagerLink>
          </Box>
        )}

        {/* 最後のページでなければ終端への矢印を表示 */}
        {currentPage < pager.length && (
          <Box as="li">
            <PagerLink href={getPath(lastPage + 1)}>
              <ArrowRightIcon w={3} h={3} />
            </PagerLink>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default Pager
