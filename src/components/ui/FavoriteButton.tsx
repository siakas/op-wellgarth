import type { FC } from 'react'
import type { Spot } from '@/types/microcms'
import { StarIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { favoritesState } from '@/state/favoritesState'

type FavoriteButtonProps = {
  spot: Spot
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ spot }) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState)

  // favorites の中に spot.id と一致する id を持つオブジェクトが存在するかをチェック
  const isFavorite = favorites.some((favorite) => favorite.id === spot.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      // id が一致するスポットを除去
      setFavorites(favorites.filter((favorite) => favorite.id !== spot.id))
    } else {
      // 現在の配列に渡されたスポットを追加
      setFavorites([spot, ...favorites])
    }
  }

  return (
    <Flex justifyContent="flex-end" mt={2}>
      <IconButton
        aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
        icon={<StarIcon />}
        onClick={toggleFavorite}
        color={isFavorite ? 'yellow.400' : 'blackAlpha.300'}
      />
    </Flex>
  )
}

export default FavoriteButton
