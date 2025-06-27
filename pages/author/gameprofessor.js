// pages/author/gameprofessor.tsx

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function GameProfessorPage() {
  return (
    <>
      <Head>
        <title>게임교수 - 작성자 소개</title>
        <meta
          name="description"
          content="게임교수는 최신 게임 정보를 쉽고 정확하게 전달하는 게임 전문 블로거입니다."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="게임교수 - 작성자 소개" />
        <meta property="og:description" content="게임 트렌드와 공략을 전하는 게임 전문 블로그 게임교수의 운영자를 소개합니다." />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="/gameprofessor-logo.png" />
        <meta property="og:url" content="https://www.unemployedprofessor.me/m/author/gameprofessor" />
      </Head>

      <div className="max-w-2xl mx-auto p-6">
        {/* 작성자 프로필 */}
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src="/gameprofessor-logo.png"
            alt="게임교수 프로필"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">게임교수</h1>
            <p className="text-gray-600 text-sm">게임의 흐름과 트렌드를 쉽게 알려드립니다.</p>
          </div>
        </div>

        {/* 소개글 */}
        <p className="text-base leading-relaxed text-gray-700 mb-6">
          안녕하세요, ‘게임교수’입니다. 이 블로그는 다양한 게임 정보, 공략, 리뷰, 그리고 게이머로서의 실질적인 경험을 공유하는 공간입니다.
          누구나 쉽게 이해할 수 있도록 구성하였으며, 최신 트렌드도 빠르게 전달드릴게요!
        </p>

        {/* 홈으로 돌아가기 */}
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </>
  )
}