import { Heading } from '@/components/elements/Heading'
import { getUpdatedSpots } from '@/lib/getContents'

export const AsideUpdatedSpots = async () => {
  const { contents: spots } = await getUpdatedSpots()

  return (
    <div className="mb-12">
      <Heading.Basic>最近更新されたスポット</Heading.Basic>
      <ul>
        {spots.map((spot) => (
          <li className="border-b border-gray-200" key={spot.id}>
            <a
              className="block px-2 py-3 hover:underline"
              href={`/spot/${spot.id}`}
            >
              {spot.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
