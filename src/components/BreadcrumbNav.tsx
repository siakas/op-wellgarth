import type { Area } from '@/types/microcms'

type Props = {
  area?: Area
}

const BreadcrumbNav = ({ area }: Props) => {
  return (
    <nav>
      <ol>
        <li>
          <a href="/">スポット一覧</a>
        </li>
        {area && (
          <li>
            <a href={`/area/${area.id}/page/1`}>{area.name}</a>
          </li>
        )}
      </ol>
    </nav>
  )
}

export default BreadcrumbNav
