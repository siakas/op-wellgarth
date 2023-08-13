import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const HeadingBgGray = ({ children }: Props) => {
  return (
    <h2 className="mb-2.5 rounded-md bg-stone-150 p-3 text-xl font-medium leading-tight">
      {children}
    </h2>
  )
}

export default HeadingBgGray
