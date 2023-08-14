type Props = {
  title: string
}

const SpotPageTitle = ({ title }: Props) => {
  return (
    <h1 className="mt-10 text-base font-semibold leading-[1.4] sm:text-3xl md:text-4xl">
      {title}
    </h1>
  )
}

export default SpotPageTitle
