import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { getAllSpots } from '@/libs'

// Props の型に InferGetStaticPropsType を指定
// getStaticProps で return された値をもとに、Page に渡される Props の型を類推してくれる
type SpotPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents: spots } = await getAllSpots()
  const paths = spots.map((spot) => {
    return {
      params: {
        spotId: spot.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = (
  context: GetStaticPropsContext
) => {
  const spotId = context.params?.spotId

  return {
    props: {
      spotId,
    },
  }
}

const SpotPage: NextPage<SpotPageProps> = ({ spotId }) => {
  return <div>{spotId}</div>
}

export default SpotPage
