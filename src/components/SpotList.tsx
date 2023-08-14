import Link from 'next/link'
import type { Spot } from '@/types/microcms'

type Props = {
  spots: Spot[]
}

const SpotList = ({ spots }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-10">
      {spots.map((spot) => (
        <div key={spot.id}>
          <Link href={`/spot/${spot.id}`} className="group">
            <img
              src={
                spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'
              }
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
            />
            <p className="pt-3 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              {spot.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SpotList
