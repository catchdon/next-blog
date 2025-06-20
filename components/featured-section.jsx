import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

export default function FeaturedSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Featured Game"
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-2xl">
              <span
                className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-3">
                Featured
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                The Ultimate Guide to Cyberpunk 2077: Phantom Liberty
              </h1>
              <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                Dive deep into the latest expansion of Cyberpunk 2077 with our comprehensive review, tips, and
                everything you need to know about Night City's newest adventure.
              </p>
              <div className="flex items-center space-x-4 text-gray-300 text-sm mb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Alex Chen</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Dec 18, 2024</span>
                </div>
              </div>
              <Link
                href="/featured-article"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Read Full Article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
