import { Color, Size } from '@/types/elements'
import clsx from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  href: Url
  target?: string
}

// ロジックは Base に集約する
const Base = ({ children, className, href, target }: Props) => {
  return (
    <NextLink
      className={clsx(className)}
      href={href}
      rel={target ? 'noopener noreferrer' : undefined}
      target={target}
    >
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

  // ページネーション用リンクボタン
  Page: (
    props: Props & {
      isActive?: boolean
    },
  ) => {
    const { isActive = false } = props
    return (
      <Base
        {...props}
        className={clsx(
          'grid h-10 w-10 place-items-center rounded hover:text-blue-600',
          isActive && 'bg-[#2b6cb0] text-white hover:text-white',
          props.className,
        )}
      />
    )
  },
}

export { Link }
