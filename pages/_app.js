// pages/_app.js
import '../styles/globals.css'
import Header from '../components/header'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header /> {/* ✅ 모든 페이지에 상단 메뉴 고정 */}
      <Component {...pageProps} />
    </>
  )
}