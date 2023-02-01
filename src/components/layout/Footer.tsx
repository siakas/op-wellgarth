import { css } from '@emotion/react'

import { rem } from '@/styles'

const Footer = () => {
  const styles = {
    base: css`
      background-color: #50402d;
      color: #fff;
      padding: 3em 0 4em;

      p {
        font-size: ${rem(1.4)};
        line-height: 1;
        text-align: center;
      }

      small {
        font-size: inherit;
        font-weight: 400;
        font-style: normal;
      }
    `,
  }

  return (
    <footer css={styles.base}>
      <p>
        <small>© 2023 siakas</small>
      </p>
    </footer>
  )
}

export default Footer
