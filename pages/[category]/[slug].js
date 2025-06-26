import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { category: post.category, slug: post.slug },
  }))

  console.log("📦 정적 경로 목록:", paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { category, slug } = params
  const post = getPostBySlug(category, slug)

  const processedContent = await remark()
    .use(remarkGfm)
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

export default function PostPage({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
      </p>
      <div className="prose markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}