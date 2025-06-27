import Link from 'next/link'
import Head from 'next/head'
import { getAllPosts } from '@/lib/posts'

export async function getServerSideProps(context) {
  const { q = '' } = context.query
  const posts = getAllPosts()
  const query = q.toLowerCase()

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.title?.toLowerCase().includes(query)
    const contentMatch = post.content?.toLowerCase().includes(query)
    return titleMatch || contentMatch
  })

  return {
    props: {
      query,
      results: filteredPosts,
    },
  }
}

export default function SearchPage({ query, results }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "name": `검색 결과: ${query}`,
        "description": "게임 관련 콘텐츠 검색 결과 페이지",
        "url": `https://www.unemployedprofessor.me/search?q=${encodeURIComponent(query)}`,
        "isPartOf": {
            "@type": "Website",
            "name": "게임교수",
            "url": "https://www.unemployedprofessor.me"
        },
        ...(results.length > 0 && {
            "mainEntity": results.slice(0, 10).map((post) => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "url": `https://www.unemployedprofessor.me/${post.category}/${post.slug}`,
            "datePublished": post.date,
            "author": {
                "@type": "Person",
                "name": "게임교수"
            }
            }))
        })
    }

  return (
    <>
      <Head>
        <title>{`검색 결과: "${query}"`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          {`검색 결과: "${query}"`}
        </h1>

        {results.length === 0 ? (
          <p className="text-gray-500">일치하는 글이 없습니다.</p>
        ) : (
          <ul className="space-y-6">
            {results.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="text-blue-600 hover:underline text-lg font-medium"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">{post.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}