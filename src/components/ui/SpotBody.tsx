import type { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'

type SpotBodyProps = {
  sanitizedHtml: string
}

const SpotBody: FC<SpotBodyProps> = ({ sanitizedHtml }) => {
  const styles = {
    base: css`
      display: block;

      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      li {
        line-height: 2;

        &::before {
          margin-right: 10px;
          content: '-';
        }
      }
    `,
  }

  return (
    <Box
      mt={10}
      css={styles.base}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}

export default SpotBody
