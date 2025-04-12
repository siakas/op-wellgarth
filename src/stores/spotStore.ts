import { Spot } from '@/types/microcms'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type SpotStore = {
  /** お気に入りスポットの追加 */
  addFavoriteSpot: (spot: Spot) => void
  /** お気に入りスポット */
  favoriteSpots: Spot[]
  /** お気に入りスポットの削除 */
  removeFavoriteSpot: (spotId: string) => void
}

export const useSpotStore = create<SpotStore>()(
  devtools(
    persist(
      (set) => ({
        addFavoriteSpot: (spot) =>
          set(
            (state) => ({
              favoriteSpots: [spot, ...state.favoriteSpots],
            }),
            false,
            'Spot/addFavoriteSpot',
          ),
        favoriteSpots: [],
        removeFavoriteSpot: (spotId) =>
          set(
            (state) => ({
              favoriteSpots: state.favoriteSpots.filter(
                (spot) => spot.id !== spotId,
              ),
            }),
            false,
            'Spot/removeFavoriteSpot',
          ),
      }),
      {
        name: 'SpotStore',
        partialize: (state) => ({ favoriteSpots: state.favoriteSpots }),
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      enabled: process.env.NODE_ENV === 'production',
      name: 'SpotStore',
    },
  ),
)
