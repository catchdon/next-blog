import { remark } from 'remark'
import html from 'remark-html'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import remarkGfm from 'remark-gfm'


export async function getStaticPaths() {
  const posts = getAllPosts('pc-games') // 🔥 카테고리 이름에 맞춰줍니다.
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug('pc-games', params.slug)

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

export default function PcGamePost({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
      </p>
      <div className="markdown prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}