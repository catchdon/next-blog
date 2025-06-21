import Image from "next/image"
import Link from "next/link"

export default function HeroPosts({ posts }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {posts.slice(0, 2).map((post) => (
        <Link
          key={post.id}
          href={post.href}
          className="relative block w-full h-64 md:h-80 rounded-xl overflow-hidden group">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300" />
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <div className="bg-white text-black text-xs px-2 py-0.5 inline-block rounded mb-2">
              {post.category}
            </div>
            <h3 className="text-xl md:text-2xl font-bold leading-snug">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}