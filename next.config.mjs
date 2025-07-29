/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',      // 기존 사이트맵 API
      },
      {
        source: '/rss.xml',
        destination: '/api/rss.xml',      // 추가한 RSS API
      },
    ]
  },
}

export default nextConfig