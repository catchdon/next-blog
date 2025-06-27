// next-sitemap.config.js
import { getAllPosts } from './lib/posts.js'

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://www.unemployedprofessor.me',
  generateRobotsTxt: true,
  exclude: ['/search'],
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  outDir: './public',

  async transform(config, path) {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },

  async additionalPaths() {
    const posts = getAllPosts()
    return posts.map((post) => ({
      loc: `/${post.category}/${post.slug}`,
      lastmod: post.date || new Date().toISOString(),
    }))
  },
}