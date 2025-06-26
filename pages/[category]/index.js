import HeroPosts from '@/components/HeroPosts'
import MidPosts from '@/components/MidPosts'
import LatestPosts from '@/components/LatestPosts'
import { getAllPosts } from '@/lib/posts'
import { useState } from 'react'

export async function getStaticPaths() {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map(post => post.category))]

  const paths = categories.map(category => ({
    params: { category },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts()
  const categoryPosts = allPosts.filter(
    post => post.category === params.category
  )

  return {
    props: {
      category: params.category,
      posts: categoryPosts,
    },
  }
}

export default function CategoryPage({ category, posts }) {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold capitalize">📂 {category.replace('-', ' ')} 카테고리</h1>
        <p className="text-gray-600 mt-2">해당 카테고리의 최신 글을 확인하세요.</p>
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