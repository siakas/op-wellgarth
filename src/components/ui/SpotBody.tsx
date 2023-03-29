import type { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { rem } from '@/styles'

type SpotBodyProps = {
  sanitizedHtml: string
}

const SpotBody: FC<SpotBodyProps> = ({ sanitizedHtml }) => {
  const styles = {
    base: css`
      h3 {
        margin: 32px 0 12px;
        font-size: ${rem(2.4)};
        font-weight: bold;
        border-bottom: 1px solid #ddd;

        + p {
          margin-top: 0.8em;
        }
      }

      p {
        line-height: 1.86;
        margin-top: 1.5em;

        br {
          display: block;
          margin: 10px 0;
        }

        /* br 要素しか持っていない p 要素を非表示化 */
        /* MicroCMS のリッチエディタの仕様で、空行にも p > br が生成されてしまう問題への対処 */
        &:has(br:only-child) {
          display: none;
        }
      }

      ul,
      li {
        padding: 0;
        margin: 0;
      }

      ul {
        list-style: disc;
        margin-left: 1.6em;
      }

      li {
        line-height: 1.7;
        list-style: inherit;

        & + li {
          margin-top: 0.2em;
        }
      }
    `,
  }

  return (
    <Box
      mt={{ base: '20px', md: '40px' }}
      css={styles.base}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

export default SpotBody
