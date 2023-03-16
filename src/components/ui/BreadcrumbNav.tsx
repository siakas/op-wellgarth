import type { FC } from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

const BreadcrumbNav: FC = () => {
  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      mb={8}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">スポット一覧</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">カテゴリやエリアなど</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
