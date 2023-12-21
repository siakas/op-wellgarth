import { Spot } from '@/types/microcms'
import Image from 'next/image'

export const SpotImage = ({ spot }: { spot: Spot }) => {
  return (
    <div className="mb-6">
      <Image
        alt=""
        className="block aspect-[1/0.525] w-full rounded object-cover"
        height={430}
        src={spot.eyecatch ? spot.eyecatch.url : '/assets/img/noimage.png'}
        width={820}
      />
    </div>
  )
}
