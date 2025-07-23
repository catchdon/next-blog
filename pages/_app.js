// pages/_app.js
import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/header'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* ✅ 글로벌 메타태그 (서치콘솔) */}
      <Head>
        {/* 구글 서치콘솔 */}
        <meta
          name="google-site-verification"
          content="HiQmaNeBWMOzhfrWytGV0iE6-QdNR_Pn6DT7k_hFxI0"
        />
        
        {/* ✅ 네이버 서치콘솔 */}
        <meta
          name="naver-site-verification"
          content="25f08956b2e4471f930ce3ab0fefa05345018d01"
        />
      </Head>

      <Header />
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
    </>
  )
}