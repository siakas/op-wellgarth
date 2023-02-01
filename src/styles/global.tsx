import { css, Global } from '@emotion/react'

const GlobalStyle = () => {
  const style = css`
    :root {
      --color: red;
    }

    body {
      margin: 0;
      padding: 0;
    }
  `

  return <Global styles={style} />
}

export default GlobalStyle
