import { Color, Size } from '@/types/elements'
import clsx from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  href: Url
}

// ロジックは Base に集約する
const Base = ({ children, className, href }: Props) => {
  return (
    <NextLink className={clsx(className)} href={href}>
      {children}
    </NextLink>
  )
}

const Link = {
  Base,

  // 基本的なリンクボタン
  Basic: (
    props: Props & {
      hoverColor?: Color
      size?: Size
    },
  ) => {
    const { hoverColor = 'primary', size = 'sm' } = props
    return (
      <Base
        {...props}
        className={clsx(
          'block whitespace-nowrap rounded bg-stone-100 p-2 transition',
          hoverColor === 'primary' && 'hover:bg-blue-100',
          size === 'sm' && 'text-sm',
          props.className,
        )}
      />
    )
  },
}

export { Link }
