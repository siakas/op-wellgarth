import Link from 'next/link'

import { css } from '@emotion/react'

import { rem } from '@/styles'

const Header = () => {
  const styles = {
    base: css`
      background-color: #50402d;
      color: #fff;
      padding: 1.6em 0;

      h1 {
        font-size: ${rem(2.4)};
        text-align: center;
        line-height: 1.2;
        font-weight: normal;
      }
    `,
  }

  return (
    <header css={styles.base}>
      <h1>
        <Link href="/">京都グルメ</Link>
      </h1>
    </header>
  )
}

export default Header
