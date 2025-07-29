// pages/api/rss.xml.js
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const SITE_URL = 'https://www.unemployedprofessor.me';

function getAllMarkdownFiles(dirPath, arrayOfFiles = []) {
  const entries = fs.readdirSync(dirPath);
  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (entry.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

export default function handler(req, res) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const files = getAllMarkdownFiles(postsDirectory);

  // 1. 파일별 메타 추출
  const posts = files.map((filePath) => {
    const slug = filePath
      .replace(postsDirectory + path.sep, '')
      .replace(/\.md$/, '');
    const title = slug.split('/').pop();
    const category = slug.includes('/') ? slug.split('/')[0] : null;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    // 첫 번째 빈 줄 전까지를 요약으로 사용
    const excerpt = fileContents.split(/\r?\n\r?\n/)[0];
    // 전체 본문을 HTML로 변환
    const contentHtml = marked(fileContents);
    const pubDate = fs.statSync(filePath).ctime.toISOString();

    return { title, slug, category, excerpt, contentHtml, pubDate };
  });

  // 2. pubDate 기준 내림차순 정렬 (최신 글이 위로)
  posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // 3. RSS XML 생성
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[게임교수]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[최신 게임 공략, 리뷰, 뉴스를 다루는 게임 전문 블로그]]></description>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/${post.slug.replace(/^\//, '')}</link>
      <pubDate>${post.pubDate}</pubDate>
      <guid>${SITE_URL}/${post.slug.replace(/^\//, '')}</guid>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.contentHtml}]]></content:encoded>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  // 4. 응답
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.status(200).send(rss);
}