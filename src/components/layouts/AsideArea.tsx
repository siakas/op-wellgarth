import { Heading } from '@/components/elements/Heading'
import { Link } from '@/components/elements/Link'
import { getActiveAreas } from '@/lib/getContents'

export const AsideArea = async () => {
  const { contents: areas } = await getActiveAreas()

  return (
    <div className="mb-12">
      <Heading.Basic>エリア</Heading.Basic>
      <ul className="flex flex-wrap gap-2">
        {areas.map((area) => (
          <li key={area.id}>
            <Link.Basic href={`/area/${area.id}/page/1`}>
              {area.name}
            </Link.Basic>
          </li>
        ))}
      </ul>
    </div>
  )
}
