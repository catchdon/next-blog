import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getPostsByCategory } from '@/lib/posts' // ✅ 올바른 함수 import
import { useState } from 'react'

export async function getStaticProps() {
  const posts = getPostsByCategory('mobile-games') // ✅ 인자 있는 함수 사용
  return {
    props: {
      posts,
    },
  }
}

export default function MobileGamesPage({ posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">📱 모바일 게임</h1>
        <p className="text-gray-600 mt-2">
          모바일 게임 공략, 팁, 전략 가이드를 소개합니다.
        </p>
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