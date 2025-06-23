const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const categories = ['pc-games', 'mobile-games', 'console-games', 'news']

function safeToISOString(date) {
  const parsed = new Date(date)
  return isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

// 🔹 전체 글 불러오기 (홈 화면용)
function getAllPosts() {
  const allPosts = []
  const slugSet = new Set()

  categories.forEach((category) => {
    const dir = path.join(process.cwd(), 'posts', category)
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const fullPath = path.join(dir, file)
      const content = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(content)

      let baseSlug = file.replace(/\.md$/, '')
      let slug = baseSlug
      let counter = 1

      while (slugSet.has(`${category}/${slug}`)) {
        slug = `${baseSlug}-${counter}`
        counter++
      }

      slugSet.add(`${category}/${slug}`)

      allPosts.push({
        slug,
        title: data.title,
        date: safeToISOString(data.date),
        summary: data.summary || '',
        category,
      })
    })
  })

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 🔹 카테고리별 글 불러오기
function getPostsByCategory(category) {
  const dir = path.join(process.cwd(), 'posts', category)
  const files = fs.readdirSync(dir)
  const slugSet = new Set()

  return files.map((file) => {
    const fullPath = path.join(dir, file)
    const content = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(content)

    let baseSlug = file.replace(/\.md$/, '')
    let slug = baseSlug
    let counter = 1

    while (slugSet.has(slug)) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    slugSet.add(slug)

    return {
      slug,
      title: data.title,
      date: safeToISOString(data.date),
      summary: data.summary || '',
      category,
    }
  }).sort((a, b) => (a.date < b.date ? 1 : -1))
}

// 🔹 글 상세보기
function getPostBySlug(category, slug) {
  const fullPath = path.join(process.cwd(), 'posts', category, `${slug}.md`)
  const content = fs.readFileSync(fullPath, 'utf8')
  const { data, content: body } = matter(content)

  return {
    slug,
    title: data.title,
    date: safeToISOString(data.date),
    content: body,
    category,
  }
}

module.exports = {
  getAllPosts,
  getPostsByCategory,
  getPostBySlug,
}