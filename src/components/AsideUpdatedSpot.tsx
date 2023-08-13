import Link from 'next/link'
import { getUpdatedSpots } from '@/libs/getContents'
import HeadingBgGray from '@/components/HeadingBgGray'

const AsideUpdatedSpot = async () => {
  const { contents: spots } = await getUpdatedSpots()

  return (
    <div className="mb-12">
      <HeadingBgGray>最近更新されたスポット</HeadingBgGray>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id} className="border-b border-gray-200">
            <Link
              href={`${spot.id}`}
              className="block px-2 py-3 hover:underline"
            >
              {spot.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AsideUpdatedSpot
