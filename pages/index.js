// pages/index.js
import FeaturedSection from '../components/featured-section'
import BannerAd from '../components/banner-ad'
import ArticleGrid from '../components/article-grid'

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      <FeaturedSection />
      <BannerAd />
      <ArticleGrid />
    </main>
  )
}