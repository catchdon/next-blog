import { remark } from 'remark'
import html from 'remark-html'
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const fs = require('fs')
  const path = require('path')
  const matter = require('gray-matter')

  const fullPath = path.join(process.cwd(), 'posts', `${params.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    props: {
      post: {
        title: matterResult.data.title || '',
        date: matterResult.data.date
          ? new Date(matterResult.data.date).toISOString()
          : null,
        contentHtml,
      },
    },
  }
}

export default function Post({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.date}</p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  )
}