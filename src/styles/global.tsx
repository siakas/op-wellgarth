import { css, Global } from '@emotion/react'

const GlobalStyle = () => {
  const style = css`
    :root {
      --color: #000;
    }
  `

  return <Global styles={style} />
}

export default GlobalStyle
