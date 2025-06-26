import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getPostsByCategory } from '@/lib/posts' // ✅ 올바른 함수 import
import { useState } from 'react'


export default function ConsoleGamesPage({ posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">🎮 콘솔 게임</h1>
        <p className="text-gray-600 mt-2">
          플레이스테이션, 스위치, 엑스박스 등 콘솔 게임 정보를 담았습니다.
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

// 🔹 정적 데이터 불러오기
export async function getStaticProps() {
  const posts = await getPostsByCategory('console-games') // ✅ md 읽기

  return {
    props: {
      posts,
    },
  }
}
