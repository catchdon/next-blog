// pages/404.js
import Link from 'next/link'
import Head from 'next/head'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>페이지를 찾을 수 없습니다 - 게임교수</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-5xl font-extrabold text-red-600">404</h1>
        <p className="text-xl mt-4 text-gray-700">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p className="mt-2 text-gray-500">
          주소를 다시 확인하시거나, 아래 버튼을 눌러 홈으로 돌아가세요.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </>
  )
}