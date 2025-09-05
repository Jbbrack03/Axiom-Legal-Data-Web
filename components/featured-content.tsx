import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { client, type BlogPost } from '@/lib/sanity'

async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt
    }
  `
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export async function FeaturedContent() {
  const articles = await getFeaturedBlogPosts()

  // Fallback content if no articles exist
  const fallbackArticles = [
    {
      title: "Why Most Legal AI is Built on a Shaky Foundation: The Data Problem.",
      excerpt:
        "Exploring the critical challenges facing legal AI development and why synthetic data offers a more reliable foundation for building robust systems.",
    },
    {
      title: "Introducing Our 'PII Shield': A New Standard for Ethical Data in Legal Tech.",
      excerpt:
        "How our comprehensive privacy protection framework ensures complete PII redaction while maintaining data utility for AI training.",
    },
    {
      title: "Benchmarking Against LegalBench: Putting Our Synthetic Data to the Test.",
      excerpt:
        "Rigorous testing results showing how our synthetic legal data performs against real-world benchmarks and industry standards.",
    },
  ]

  const displayArticles = articles.length > 0 ? articles : fallbackArticles

  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">From Our Blog.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {displayArticles.map((article, index) => (
          <Link key={article._id || index} href={article.slug ? `/blog/${article.slug.current}` : "/blog"}>
            <Card className="bg-card border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full">
              <CardHeader>
                <CardTitle className="text-white text-lg leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
