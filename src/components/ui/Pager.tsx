import type { FC } from 'react'
import type { Area, Category } from '@/types/microcms'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

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
    // ToDo：同じスタイルを複数の箇所で繰り返し書いており冗長になっているのを解消したい
    // ・問題点：これが Chakra UI を利用することの弊害なのか、Chakra UI を利用しても解決しうる問題なのか、ChatGPT に相談したい
    // ・問題点：_hover 時のスタイルにも三項演算子などで条件分岐のスタイルを定義したいが、定義方法がわからない

    <Box py={10}>
      <Flex
        as="ul"
        pt={10}
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
        {/* 最初のページでなければ左矢印を表示 */}
        {currentPage > 1 && (
          <Box as="li" mx={2}>
            <Link
              as={NextLink}
              href={getPath(currentPage - 1)}
              w={10}
              h={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
              textDecoration="none"
              _hover={{ color: 'blue.500' }}
            >
              <ChevronLeftIcon w={6} h={6} />
            </Link>
          </Box>
        )}

        {/* pager の配列の値に応じたナビゲーションを出力 */}
        {/* if を使った処理だと false 時の return がないことが ESLint のエラーに抵触するため、filter と map の組み合わせによる出力としている */}
        {pager
          .filter((page) => currentPage - 4 <= page && page <= currentPage + 2)
          .map((page, index) => {
            const isActive: boolean = currentPage === page + 1
            return (
              <Box
                key={index}
                as="li"
                borderRadius={5}
                bg={isActive ? 'blue.600' : ''}
              >
                <Link
                  as={NextLink}
                  href={getPath(page + 1)}
                  w={10}
                  h={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={isActive ? 'white' : ''}
                  fontWeight={isActive ? 'bold' : ''}
                  _hover={{ textDecoration: 'none' }}
                >
                  {page + 1}
                </Link>
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
            <Link
              as={NextLink}
              href={getPath(currentPage + 1)}
              w={10}
              h={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
              _hover={{ textDecoration: 'none', color: 'blue.500' }}
            >
              <ChevronRightIcon w={6} h={6} />
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default Pager
