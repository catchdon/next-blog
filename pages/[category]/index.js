import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getAllPosts } from '@/lib/posts'
import { useState } from 'react'
import Head from 'next/head'

export async function getStaticPaths() {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map(post => post.category))]

  const paths = categories.map(category => ({
    params: { category },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts()
  const categoryPosts = allPosts.filter(
    post => post.category === params.category
  )

  return {
    props: {
      category: params.category,
      posts: categoryPosts,
    },
  }
}

export default function CategoryPage({ category, posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.replace('-', ' ')} | 게임교수`,
    "description": "게임 관련 콘텐츠 카테고리별 목록 페이지입니다.",
    "mainEntity": posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://www.unemployedprofessor.me/${post.category}/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": "게임교수"
      }
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      <Head>
        <title>{category.replace('-', ' ')} | 게임교수</title>
        <meta name="description" content={`게임교수의 ${category.replace('-', ' ')} 관련 최신 글 모음`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <header className="text-center">
        <h1 className="text-3xl font-extrabold capitalize">📂 {category.replace('-', ' ')}</h1>
        <p className="text-gray-600 mt-2">해당 카테고리의 최신 글을 확인하세요.</p>
      </header>

      {currentPage === 1 && <HeroPosts posts={posts} />}
      {currentPage === 1 && <MidPosts posts={posts} />}
      <LatestPosts
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}