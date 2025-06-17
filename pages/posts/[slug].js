import { remark } from 'remark'
import html from 'remark-html'
const { getAllPosts, getPostBySlug } = require('../../lib/posts')

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
  const post = getPostBySlug(params.slug)

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()

  return {
    props: {
      post: {
        title: post.title || '',
        date: post.date,
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