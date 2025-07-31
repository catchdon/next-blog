// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="google-adsense-account" content="ca-pub-2232732758246542"></meta>
        {/* 기본 파비콘 */}
        <link rel="icon" href="/favicon.ico" />

        {/* SVG 파비콘(있으면) */}
        <link rel="icon" type="image/svg+xml" href="/icon0.svg" />

        {/* PNG 파비콘(있는 경우) */}
        <link rel="icon" type="image/png" href="/icon1.png" />

        {/* 애플 터치 아이콘 */}
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* 웹 앱(안드로이드/크롬/홈화면) 아이콘 */}
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* 브라우저/OS용 색상 등 */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="게임교수" />
        <meta name="apple-mobile-web-app-title" content="게임교수" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}