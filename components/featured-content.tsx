import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedContent() {
  const articles = [
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

  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">From Our Methodology Blog.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <Link key={index} href="/methodology">
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
