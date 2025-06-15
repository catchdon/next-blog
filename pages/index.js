import Link from 'next/link'
import { getAllPosts } from '../lib/posts'

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default function Home({ posts }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">블로그 글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-6">
            <Link href={`/posts/${post.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="text-base">{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}