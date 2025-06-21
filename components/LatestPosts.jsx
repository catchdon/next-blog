import Image from "next/image"
import Link from "next/link"
import Pagination from "./Pagination"
import { timeAgo } from '@/lib/utils/timeAgo'

export default function LatestPosts({ posts, currentPage, setCurrentPage }) {
  const postsPerPage = 10

  const isFirstPage = currentPage === 1
  const offset = isFirstPage ? 6 : 0
  const start = offset + (currentPage - 1) * postsPerPage
  const end = start + postsPerPage

  const currentPosts = posts.slice(start, end)
  const totalPages = Math.ceil((posts.length - 6) / postsPerPage) + 1

  // ✅ 페이지 바뀔 때 자동 스크롤 함수
  const handlePageChange = (page) => {
    setCurrentPage(page)
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50) // DOM 업데이트 후 실행
}

  return (
    <>
      <div className="space-y-6">
        {currentPosts.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            className="flex flex-col md:flex-row gap-4 border-b pb-6">
            <div className="relative w-full md:w-1/3 h-48 rounded overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                {post.category}
              </span>
            </div>
            <div className="md:w-2/3 space-y-2">
              <h3 className="text-lg font-bold leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <p className="text-xs text-gray-500">{timeAgo(post.date)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ✅ 페이지네이션에 스크롤 포함된 핸들러 전달 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}