// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 필요한 경우 폰트, favicon, 기타 전역 meta를 여기 추가 가능 */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}