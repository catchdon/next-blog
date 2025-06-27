// pages/_app.js
import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/header'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* ✅ 구글 서치콘솔 메타 태그 추가 */}
      <Head>
        <meta
          name="google-site-verification"
          content="HiQmaNeBWMOzhfrWytGV0iE6-QdNR_Pn6DT7k_hFxI0"
        />
      </Head>

      <Header /> {/* ✅ 모든 페이지에 상단 메뉴 고정 */}
      <main className="pt-16"> {/* ⬅️ 헤더 높이만큼 padding 추가 */}
        <Component {...pageProps} />
      </main>
    </>
  )
}