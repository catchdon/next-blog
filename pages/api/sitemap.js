// pages/api/sitemap.js
import { getAllPosts } from '@/lib/posts'

export default async function handler(req, res) {
  const baseUrl = 'https://www.unemployedprofessor.me'

  const posts = getAllPosts()

  const urls = posts.map((post) => {
    return `
      <url>
        <loc>${baseUrl}/${post.category}/${post.slug}</loc>
        <lastmod>${post.date}</lastmod>
      </url>
    `
  }).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${urls}
  </urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemap)
  res.end()
}