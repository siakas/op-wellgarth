import Link from 'next/link'
import { getLinkedAreas } from '@/libs/getContents'
import HeadingBgGray from '@/components/HeadingBgGray'

const AsideArea = async () => {
  const { contents: areas } = await getLinkedAreas()

  return (
    <div className="mb-12">
      <HeadingBgGray>エリアから探す</HeadingBgGray>
      <ul className="flex flex-wrap gap-2 text-sm">
        {areas.map((area) => (
          <li key={area.id}>
            <Link
              href={`/area/${area.id}/page/1`}
              className="block whitespace-nowrap rounded bg-stone-100 p-2 transition hover:bg-blue-100"
            >
              {area.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AsideArea
