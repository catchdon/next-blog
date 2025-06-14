import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>나의 Next 블로그</title>
      </Head>
      <h1>블로그 글 목록</h1>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>{title}</Link> ({date})
          </li>
        ))}
      </ul>
    </div>
  )
}