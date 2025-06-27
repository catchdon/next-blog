import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 웹사이트 전체 구조화 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.unemployedprofessor.me",
              "name": "게임교수 블로그",
              "description": "PC, 모바일, 콘솔 게임 리뷰, 가이드, 공략, 트렌드, 뉴스를 소개하는 전문 블로그",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.unemployedprofessor.me/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}