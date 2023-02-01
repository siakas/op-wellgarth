import { css, Global } from '@emotion/react'
import { colord } from 'colord'
import { map } from 'lodash-es'

import { colors } from '@/styles/colors'

const toRgbValues = (hex: string) => {
  const rgba = colord(hex).toRgb()

  return [rgba.r, rgba.g, rgba.b].join(', ')
}

const GlobalStyle = () => {
  const style = css`
    :root {
      ${map(colors, (hex, key) => {
        return css`
          --color-${key}: ${hex};
          --color-${key}-rgb: ${toRgbValues(hex)};
        `
      })}
    }

    html {
      margin: 0;
      padding: 0;
      line-height: 1.55;
      -webkit-tap-highlight-color: transparent;
      text-size-adjust: 100%;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    body {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      background: #fff;
      color: #333;
    }

    a {
      text-decoration: underline;
      background-color: transparent;
      color: inherit;

      &:hover,
      &:active,
      &:focus {
        text-decoration: none;
      }
    }

    img,
    svg {
      vertical-align: bottom;
      max-width: 100%;
    }

    figure {
      margin: 0;
    }

    pre {
      font-family: 'Menlo', 'Monaco', 'Bitstream Vera Sans Mono',
        'Lucida Console', 'Consolas', 'Courier', monospace;
    }

    strong {
      font-weight: bold;
    }

    em {
      font-weight: bold;
      font-style: normal;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
      font-weight: bold;
    }

    p {
      max-height: 100%;
      margin: 0;
    }

    ul,
    ol,
    li {
      margin: 0;
      padding: 0;
    }

    li {
      // list-style-type: none によるリストマーカーのリセットは li 要素のみで指定し、
      // 個別に指定したい場合はコンポーネントごとに inherit に変更する
      list-style-type: none;
    }

    hr {
      display: none;
    }

    main {
      display: block;
    }

    input,
    textarea,
    button,
    optgroup,
    select {
      margin: 0;
      font: inherit;
    }

    button {
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    [hidden] {
      display: none;
    }

    // スムーススクロール後のキーボードフォーカス遷移のために、
    // 動的に tabindex を設定した要素にはアウトラインを表示しない
    [tabindex='-1'],
    [tabindex='-1']:focus {
      outline: none !important;
    }
  `

  return <Global styles={style} />
}

export default GlobalStyle
