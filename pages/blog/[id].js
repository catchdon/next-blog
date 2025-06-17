import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'posts'))
  const paths = files.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(process.cwd(), 'posts', `${params.id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    props: {
      title: matterResult.data.title,
      date: matterResult.data.date
        ? new Date(matterResult.data.date).toISOString()
        : null,
      contentHtml,
    },
  }
}

export default function Post({ title, date, contentHtml }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  )
}
