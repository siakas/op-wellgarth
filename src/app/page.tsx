import { getSpotsByFilter } from '@/libs/getContents'
import SpotList from '@/components/SpotList'

const Home = async () => {
  // とりあえず最新 30 件表示
  const { spots, pager } = await getSpotsByFilter(30, 1)

  return (
    <>
      <SpotList spots={spots.contents} />
    </>
  )
}

export default Home
