import type { FC } from 'react'
import type { Area, Category } from '@/types/microcms'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import NextLink from 'next/link'

type BreadcrumbNavProps = {
  area?: Area
  category?: Category
}

const BreadcrumbNav: FC<BreadcrumbNavProps> = ({ area, category }) => {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon />} mb={8}>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/">
          スポット一覧
        </BreadcrumbLink>
      </BreadcrumbItem>

      {area && (
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href={`/area/${area.id}/page/1`}>
            {area.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {category && (
        <BreadcrumbItem>
          <BreadcrumbLink
            as={NextLink}
            href={`/category/${category.id}/page/1`}
          >
            {category.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  )
}

export default BreadcrumbNav
