import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      <Head>
        <title>Next.js 블로그</title>
      </Head>
      <header style={{ marginBottom: '2rem' }}>
        <h2>
          <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>
            📝 나의 블로그
          </Link>
        </h2>
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#888' }}>
        © {new Date().getFullYear()} 나의 블로그
      </footer>
    </div>
  )
}