import { remark } from 'remark'
import html from 'remark-html'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export async function getStaticPaths() {
  const posts = getAllPosts('mobile-games')
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug('mobile-games', params.slug)

  const processedContent = await remark().use(html).process(post.content)
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

export default function MobileGamePost({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
      </p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  )
}