/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: {
      autoLabel: 'always',
      labelFormat: 'test-style__[filename]__[local]',
    },
  },
}

module.exports = nextConfig
