import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

export default function MidPosts({ posts }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {posts.slice(2, 6).map((post) => (
        <Link
          key={`${post.category}-${post.slug}`}
          href={`/${post.category}/${post.slug}`}
          className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition"
        >
          <div className="relative w-full h-36">
            <Image
              src={post.image || "/default-image.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
              {post.category}
            </span>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold line-clamp-2 mb-1">
              {post.title}
            </h3>
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
  )
}