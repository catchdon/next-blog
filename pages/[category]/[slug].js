import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Image from 'next/image'
import Head from 'next/head' // ✅ Head 추가

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { category: post.category, slug: post.slug },
  }))
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
        slug,
        category,
      },
    },
  }
}

export default function PostPage({ post }) {
  const fullUrl = `https://yourdomain.com/${post.category}/${post.slug}` // ✅ 실제 도메인으로 수정
  const publishDate = format(new Date(post.date), 'yyyy-MM-dd')

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": publishDate,
    "author": {
      "@type": "Person",
      "name": "게임교수",
      "url": "https://www.unemployedprofessor.me/author" // 필요시 작성자 소개 페이지
    },
    "publisher": {
      "@type": "Organization",
      "name": "게임교수",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.unemployedprofessor.me/gameprofessor-logo.png" // public 경로 또는 절대 URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "url": fullUrl
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Head>
        <title>{post.title} | 게임교수</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })} ·{' '}
        <span className="font-medium text-gray-700">by 게임교수</span>
      </p>

      <div className="prose markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <div className="mt-12 p-4 bg-gray-50 border rounded-lg flex items-center space-x-4">
        <Image
          src="/gameprofessor-logo.png"
          alt="게임교수"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">게임교수</p>
          <p className="text-sm text-gray-600">게임의 흐름과 트렌드를 쉽게 알려드립니다.</p>
        </div>
      </div>
    </div>
  )
}