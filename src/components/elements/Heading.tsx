import { Color, Rounded, Size } from '@/types/elements'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

// ロジックは Base に集約する
// 複製して新たなコンポーネントを作る際にも、UI のバリエーション側でエラーが出づらい
const Base = ({ children, className }: Props) => {
  return <h2 className={clsx(className)}>{children}</h2>
}

// バリエーションは Heading に追加する
// 主に機能だけ使い回したい場合にバリエーションを追加する
const Heading = {
  // ベースの見出し
  Base,

  // 基本的な見出し
  Basic: (
    props: Props & {
      // オプションを追加
      color?: Color
      rounded?: Rounded
      size?: Size
    },
  ) => {
    const { color = 'secondary', rounded = 'md', size = 'xl' } = props
    return (
      <Base
        {...props}
        className={clsx(
          'mb-2.5 p-3 text-xl font-medium leading-tight',
          rounded === 'md' && 'rounded-md',
          color === 'primary' && 'bg-primary-100',
          color === 'secondary' && 'bg-stone-150',
          props.className,
        )}
      />
    )
  },

  // アウトラインの見出し
  Outline: (
    props: Props & {
      // オプションを追加
      color?: Color
      rounded?: Rounded
      size?: Size
    },
  ) => {
    const { color = 'secondary', rounded = 'md', size = 'xl' } = props
    return (
      <Base
        {...props}
        className={clsx(
          'mb-2.5 border-2 p-3 text-xl font-medium leading-tight',
          rounded === 'md' && 'rounded-md',
          color === 'primary' && 'border-primary-200',
          color === 'secondary' && 'border-secondary-200',
          props.className,
        )}
      />
    )
  },
}

// それぞれの見出しの見た目は Base の見出しに対してバリエーションを追加する
// バリエーション追加例：
// - Outline ボーダーのみ
export { Heading }
