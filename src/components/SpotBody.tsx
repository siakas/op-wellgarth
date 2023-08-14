type Props = {
  sanitizedHtml: string
}

const SpotBody = ({ sanitizedHtml }: Props) => {
  return (
    <div
      className="prose mt-5 max-w-none md:mt-10"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    ></div>
  )
}

export default SpotBody
