import Header from '../components/header'
import FeaturedSection from '../components/featured-section'
import BannerAd from '../components/banner-ad'
import ArticleGrid from '../components/article-grid'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        <FeaturedSection />
        <BannerAd />
        <ArticleGrid />
      </main>
    </div>
  )
}