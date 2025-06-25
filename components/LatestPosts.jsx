import Image from "next/image"
import Link from "next/link"
import Pagination from "./Pagination"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

export default function LatestPosts({ posts, currentPage, setCurrentPage }) {
  const postsPerPage = 10

  const isFirstPage = currentPage === 1
  const offset = isFirstPage ? 6 : 0
  const start = offset + (currentPage - 1) * postsPerPage
  const end = start + postsPerPage

  const currentPosts = posts.slice(start, end)
  const totalPages = Math.ceil((posts.length - 6) / postsPerPage) + 1

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <div className="space-y-6">
        {currentPosts.map((post) => (
          <Link
            key={`${post.category}-${post.slug}`}
            href={`/${post.category}/${post.slug}`}
            className="flex flex-col md:flex-row gap-4 border-b pb-6">
            <div className="relative w-full md:w-1/3 h-48 rounded overflow-hidden">
              <Image
                src={post.thumbnail || "/default-image.jpg"}
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
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.date), {
                  addSuffix: true,
                  locale: ko,
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}