import { Link } from '@/components/elements/Link'
import { Spot } from '@/types/microcms'

export const SpotPageTitle = ({ spot }: { spot: Spot }) => {
  return (
    <div className="mt-10">
      <p className="mb-2 flex">
        <Link.Basic
          className="px-8"
          href={`https://kyoto-gourmet.microcms.io/apis/spots/${spot.id}`}
          target="_blank"
        >
          編集
        </Link.Basic>
      </p>
      <h1 className="text-base font-semibold leading-[1.4] sm:text-3xl md:text-4xl">
        {spot.title}
      </h1>
    </div>
  )
}
