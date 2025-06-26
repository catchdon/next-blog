import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getAllPosts } from '@/lib/posts'
import { useState } from 'react'

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">🎮 최신 게임 정보</h1>
        <p className="text-gray-600 mt-2">PC, 모바일, 콘솔 게임 소식을 한눈에 확인하세요!</p>
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