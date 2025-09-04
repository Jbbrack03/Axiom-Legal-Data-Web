import { client, urlFor, type BlogPost } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, User, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author->{
        name,
        image
      },
      publishedAt,
      excerpt,
      mainImage,
      tags,
      featured
    }
  `
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

async function getFeaturedPost(): Promise<BlogPost | null> {
  const query = `
    *[_type == "post" && featured == true && publishedAt <= now()] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      author->{
        name,
        image
      },
      publishedAt,
      excerpt,
      mainImage,
      tags,
      featured
    }
  `
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function BlogPage() {
  const [blogPosts, featuredPost] = await Promise.all([
    getBlogPosts(),
    getFeaturedPost()
  ])

  const regularPosts = featuredPost 
    ? blogPosts.filter(post => post._id !== featuredPost._id)
    : blogPosts

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Insights & Innovation
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto text-pretty">
            Deep dives into legal AI, synthetic data generation, and the future of legal technology.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Article</h2>
            <Card className="bg-card border-border overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={urlFor(featuredPost.mainImage).width(600).height(400).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    <Link 
                      href={`/blog/${featuredPost.slug.current}`}
                      className="hover:text-primary transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Blog Posts Grid */}
        {regularPosts.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post._id} className="bg-card border-border overflow-hidden group">
                  <div className="relative h-48">
                    <Image
                      src={urlFor(post.mainImage).width(400).height(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags?.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-foreground text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <section className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-foreground max-w-2xl mx-auto">
              We're preparing insightful content about legal AI, synthetic data generation, and the future of legal technology. 
              Check back soon for our latest articles and insights.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}