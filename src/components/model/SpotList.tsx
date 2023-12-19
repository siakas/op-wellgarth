import { Spot } from '@/types/microcms'
import Image from 'next/image'

type Props = {
  spots: Spot[]
}

export const SpotList = ({ spots }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-10">
      {spots.map((spot) => (
        <div key={spot.id}>
          <a className="group" href={`/spot/${spot.id}`}>
            <Image
              alt=""
              className="block aspect-gold w-full rounded object-cover transition-opacity group-hover:opacity-90"
              height={400}
              src={
                spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'
              }
              width={600}
            />
            <ul className="flex flex-wrap gap-1 pt-2 text-xs text-gray-500">
              <li className="rounded bg-slate-200 p-1">{spot.area.name}</li>
              {spot.categories.map((category) => (
                <li className="rounded bg-slate-200 p-1" key={category.id}>
                  {category.name}
                </li>
              ))}
            </ul>
            <p className="pt-1.5 text-base font-semibold text-gray-700 group-hover:underline md:text-lg md:leading-snug">
              {spot.title}
            </p>
          </a>
        </div>
      ))}
    </div>
  )
}
