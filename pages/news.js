import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import posts from '@/lib/sample-posts'
import { useState } from 'react'

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="p-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold">📱 뉴스</h1>
        <p className="text-gray-600 mt-2">
          게임 관련 최신 뉴스와 트렌드를 소개합니다.
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


