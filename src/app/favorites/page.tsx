'use client'

import { SpotList } from '@/components/model/SpotList'
import { useSpotStore } from '@/stores/spotStore'

const FavoritesPage = () => {
  // お気に入りスポット一覧を取得
  const spots = useSpotStore((state) => state.favoriteSpots)

  return (
    <>
      {spots.length ? (
        <SpotList spots={spots} />
      ) : (
        <p>お気に入りスポットはありません。</p>
      )}
    </>
  )
}

export default FavoritesPage
