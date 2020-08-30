module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // オブジェクトリテラルや配列リテラルの最後の要素のカンマを禁止（ただし複数行の場合は有無を不問とする）
    'comma-dangle': [2, 'only-multiline'],
    // 連続スペースの許可
    'no-multi-spaces': 0,
    // 関数宣言時の括弧の前にスペースを空けない
    // 'space-before-function-paren': [2, 'never']
  }
}
