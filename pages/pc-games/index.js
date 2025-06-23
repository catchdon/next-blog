import { useState } from 'react'
import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getPostsByCategory } from '@/lib/posts'

export async function getStaticProps() {
  const posts = getPostsByCategory('pc-games')  // 📂 posts/pc-games 폴더
  console.log('📦 PC 게임 posts:', posts)

  return {
    props: {
      posts
    }
  }
}

export default function PcGamesPage({ posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">🖥️ PC 게임</h1>
        <p className="text-gray-600 mt-2">
          PC 게임 공략, 팁, 전략 가이드를 소개합니다.
        </p>
      </header>

      {currentPage === 1 && (
        <>
          <HeroPosts posts={posts} />
          <MidPosts posts={posts} />
        </>
      )}

      <LatestPosts
        posts={posts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}