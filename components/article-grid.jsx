import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Top 10 PC Games of 2024",
    summary: "Discover the best PC games that defined this year, from indie gems to AAA blockbusters.",
    category: "PC Games",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/articles/top-pc-games-2024",
  },
  {
    id: 2,
    title: "Mobile Gaming Revolution: What's Next?",
    summary: "Exploring the future of mobile gaming with cloud gaming, AR, and next-gen smartphones.",
    category: "Mobile Games",
    author: "Mike Rodriguez",
    date: "Dec 14, 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/articles/mobile-gaming-future",
  },
  {
    id: 3,
    title: "PlayStation 5 vs Xbox Series X: 2024 Update",
    summary: "A comprehensive comparison of the latest console generation after two years in the market.",
    category: "Console Games",
    author: "Emma Wilson",
    date: "Dec 13, 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/articles/ps5-vs-xbox-2024",
  },
  {
    id: 4,
    title: "Best Gaming Laptops Under $1000",
    summary: "Budget-friendly gaming laptops that don't compromise on performance for the modern gamer.",
    category: "PC Games",
    author: "David Kim",
    date: "Dec 12, 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/articles/budget-gaming-laptops",
  },
  {
    id: 5,
    title: "iOS vs Android: Gaming Performance Test",
    summary: "Which mobile platform offers the better gaming experience? We put them to the test.",
    category: "Mobile Games",
    author: "Lisa Chang",
    date: "Dec 11, 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/articles/ios-android-gaming",
  },
  {
    id: 6,
    title: "Nintendo Switch 2: Everything We Know",
    summary: "All the latest rumors, leaks, and official information about Nintendo's next console.",
    category: "Console Games",
    author: "Tom Anderson",
    date: "Dec 10, 2024",
    image: "/placeholder.svg?height=200&width=300",
    href: "/articles/nintendo-switch-2",
  },
]

const categoryColors = {
  "PC Games": "bg-blue-100 text-blue-800",
  "Mobile Games": "bg-green-100 text-green-800",
  "Console Games": "bg-purple-100 text-purple-800",
}

export default function ArticleGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
        <Link
          href="/articles"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
            <div className="relative">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[article.category]}`}>
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3
                className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                <Link href={article.href}>{article.title}</Link>
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.summary}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
