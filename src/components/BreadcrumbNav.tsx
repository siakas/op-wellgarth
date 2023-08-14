import { MdKeyboardArrowRight } from 'react-icons/md'
import type { Area } from '@/types/microcms'

type Props = {
  area?: Area
}

const BreadcrumbNav = ({ area }: Props) => {
  return (
    <nav>
      <ol className="flex items-center gap-1">
        <li>
          <a href="/">スポット一覧</a>
        </li>
        {area && (
          <li className="flex items-center gap-1">
            <MdKeyboardArrowRight size={24} />
            <a href={`/area/${area.id}/page/1`}>{area.name}</a>
          </li>
        )}
      </ol>
    </nav>
  )
}

export default BreadcrumbNav
