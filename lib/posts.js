// lib/posts.js
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function safeToISOString(date) {
  const parsed = new Date(date)
  return isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

const postsDirectory = path.join(process.cwd(), 'posts')

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: safeToISOString(data.date),
      summary: data.summary || '',
    }
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    date: safeToISOString(data.date),
    content,
  }
}

module.exports = { getAllPosts, getPostBySlug }