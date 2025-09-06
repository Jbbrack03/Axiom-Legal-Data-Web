import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { client, type BlogPost } from '@/lib/sanity'

async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      estimatedReadingTime
    }
  `
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export async function EnhancedFeaturedContent() {
  const articles = await getFeaturedBlogPosts()

  // Enhanced fallback content with more detailed information
  const fallbackArticles = [
    {
      _id: "1",
      title: "Why Most Legal AI is Built on a Shaky Foundation: The Data Problem",
      excerpt: "Exploring the critical challenges facing legal AI development and why synthetic data offers a more reliable foundation for building robust systems.",
      publishedAt: "2024-12-15",
      estimatedReadingTime: 8,
      category: "Industry Analysis",
      slug: null
    },
    {
      _id: "2", 
      title: "Introducing Our 'PII Shield': A New Standard for Ethical Data in Legal Tech",
      excerpt: "How our comprehensive privacy protection framework ensures complete PII redaction while maintaining data utility for AI training.",
      publishedAt: "2024-12-10",
      estimatedReadingTime: 6,
      category: "Technology Deep Dive",
      slug: null
    },
    {
      _id: "3",
      title: "Benchmarking Against LegalBench: Putting Our Synthetic Data to the Test",
      excerpt: "Rigorous testing results showing how our synthetic legal data performs against real-world benchmarks and industry standards.",
      publishedAt: "2024-12-05", 
      estimatedReadingTime: 12,
      category: "Research & Validation",
      slug: null
    },
  ]

  const displayArticles = articles.length > 0 ? articles : fallbackArticles

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return 'Recent'
    }
  }

  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Insights & Analysis
        </h2>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          Deep dives into legal AI, synthetic data validation, and the future of legal technology.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {displayArticles.map((article, index) => {
          const isMainArticle = index === 0
          return (
            <Link 
              key={article._id || index} 
              href={article.slug ? `/blog/${article.slug.current}` : "/blog"}
              className={`group block ${isMainArticle ? 'lg:col-span-2' : ''}`}
            >
              <article className={`relative bg-gradient-to-br from-background/50 to-background/30 rounded-2xl border border-primary/10 overflow-hidden hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full ${isMainArticle ? 'lg:min-h-[400px]' : 'min-h-[300px]'}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-60" />
                
                {/* Content */}
                <div className={`relative z-10 p-6 lg:p-8 h-full flex flex-col ${isMainArticle ? 'lg:justify-between' : 'justify-between'}`}>
                  {/* Category & Meta */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      {'category' in article && article.category && (
                        <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      )}
                      <div className="flex items-center space-x-4 text-muted-foreground text-xs">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.publishedAt || "")}</span>
                        </div>
                        {'estimatedReadingTime' in article && article.estimatedReadingTime && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.estimatedReadingTime} min read</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-white leading-tight group-hover:text-primary/90 transition-colors ${isMainArticle ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-foreground leading-relaxed ${isMainArticle ? 'text-lg' : 'text-base'}`}>
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors mt-6">
                    <span className="font-medium">Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </article>
            </Link>
          )
        })}
      </div>

      {/* View All Blog Link */}
      <div className="text-center mt-12">
        <Link 
          href="/blog"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}