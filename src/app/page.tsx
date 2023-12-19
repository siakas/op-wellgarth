import { Pager } from '@/components/model/Pager'
import { SpotList } from '@/components/model/SpotList'
import { getSpotsByFilter } from '@/lib/getContents'

const Home = async () => {
  const { pager, spots } = await getSpotsByFilter(10, 1)

  return (
    <>
      <SpotList spots={spots.contents} />
      <Pager currentPage={1} pager={pager} />
    </>
  )
}

export default Home
