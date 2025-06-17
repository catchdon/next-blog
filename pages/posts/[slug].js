import { getAllPosts, getPostBySlug } from '../../lib/posts'
import { remark } from 'remark'
import html from 'remark-html'

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
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}