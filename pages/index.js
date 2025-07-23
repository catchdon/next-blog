import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getAllPosts } from '@/lib/posts'
import { useState } from 'react'
import Head from 'next/head'

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function HomePage({ posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "게임교수",
    "url": "https://www.unemployedprofessor.me",
    "description": "최신 게임 공략, 리뷰, 뉴스를 다루는 게임 전문 블로그",
    "blogPost": posts.slice(0, 10).map((post) => ({
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
    <>
      <Head>
        <title>게임교수 - 최신 게임 정보와 공략</title>
        <meta name="description" content="게임교수는 최신 PC, 모바일, 콘솔 게임 정보를 쉽고 빠르게 전달하는 게임 전문 블로그입니다." />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="게임교수 - 최신 게임 정보와 공략" />
        <meta property="og:description" content="게임 뉴스, 공략, 리뷰를 제공하는 게임 전문 블로그" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.unemployedprofessor.me/" />
        <meta property="og:image" content="https://www.unemployedprofessor.me/gameprofessor-logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="게임교수 - 최신 게임 정보와 공략" />
        <meta name="twitter:description" content="게임 뉴스, 공략, 리뷰를 제공하는 게임 전문 블로그" />
        <meta name="twitter:image" content="https://www.unemployedprofessor.me/gameprofessor-logo.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.unemployedprofessor.me/" />

        {/* 구조화 데이터 WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "게임교수",
              "url": "https://www.unemployedprofessor.me",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.unemployedprofessor.me/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* 구조화 데이터 Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "게임교수",
              "url": "https://www.unemployedprofessor.me",
              "logo": "https://www.unemployedprofessor.me/gameprofessor-logo.png"
            })
          }}
        />

        {/* ✅ 구조화 데이터 Blog + BlogPosting[] */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema)
          }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold">🎮 최신 게임 정보</h1>
          <p className="text-gray-600 mt-2">PC, 모바일, 콘솔 게임 뉴스 소식 및 가이드를 한 눈에 확인하세요!</p>
        </header>

        {currentPage === 1 && <HeroPosts posts={posts} />}
        {currentPage === 1 && <MidPosts posts={posts} />}
        <LatestPosts
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}