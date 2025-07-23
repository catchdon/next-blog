import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

export default function HeroPosts({ posts }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {posts.slice(0, 2).map((post) => (
        <Link
          key={`${post.category}-${post.slug}`}
          href={`/${post.category}/${post.slug}`}
          className="relative block w-full h-64 md:h-80 rounded-xl overflow-hidden group"
        >
          <Image
            src={post.thumbnail || "/gameprofessor-logo.png"}
            alt={post.title}
            priority
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300" />
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <div className="bg-white text-black text-xs px-2 py-0.5 inline-block rounded mb-1">
              {post.category}
            </div>
            <h3 className="text-xl md:text-2xl font-bold leading-snug mb-1">
              {post.title}
            </h3>
            <p className="text-sm text-white opacity-90">
              {formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: ko })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}