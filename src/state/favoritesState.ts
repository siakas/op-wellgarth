import type { Spot } from '@/types/microcms'
import { atom } from 'recoil'

export const favoritesState = atom<Spot[]>({
  key: 'favoritesState',
  default: [],
})
