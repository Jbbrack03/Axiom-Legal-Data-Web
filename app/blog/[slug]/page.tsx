import { client, urlFor, type BlogPost } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, User, ArrowLeft, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `
    *[_type == "post" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      title,
      slug,
      author->{
        name,
        image,
        bio
      },
      publishedAt,
      excerpt,
      mainImage,
      body,
      tags,
      seo
    }
  `
  
  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getRelatedPosts(currentPostId: string, tags: string[]): Promise<BlogPost[]> {
  if (!tags || tags.length === 0) return []
  
  const query = `
    *[_type == "post" && _id != $currentPostId && count(tags[@ in $tags]) > 0 && publishedAt <= now()] | order(publishedAt desc)[0...3] {
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
      tags
    }
  `
  
  try {
    return await client.fetch(query, { currentPostId, tags })
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(600).url()}
          alt={value.alt || ''}
          width={800}
          height={600}
          className="rounded-lg w-full h-auto"
        />
        {value.caption && (
          <p className="text-sm text-muted-foreground text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
    codeBlock: ({ value }: any) => (
      <div className="my-6 bg-muted/20 border border-border rounded-lg overflow-hidden">
        {value.filename && (
          <div className="px-4 py-2 bg-muted/30 border-b border-border text-sm text-muted-foreground">
            {value.filename}
          </div>
        )}
        <pre className="p-4 overflow-x-auto">
          <code className={`language-${value.language || 'javascript'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
    callout: ({ value }: any) => (
      <div className={`my-6 p-4 rounded-lg border-l-4 ${
        value.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500' :
        value.type === 'error' ? 'bg-red-900/20 border-red-500' :
        value.type === 'success' ? 'bg-green-900/20 border-green-500' :
        'bg-blue-900/20 border-blue-500'
      }`}>
        {value.title && (
          <h4 className="font-semibold mb-2 text-white">{value.title}</h4>
        )}
        <div className="text-foreground">
          <PortableText value={value.content} />
        </div>
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-white mt-12 mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-white mt-10 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-white mt-8 mb-3 leading-tight">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-foreground text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-foreground leading-relaxed">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <Link
        href={value.href}
        className="text-primary hover:text-primary/80 underline transition-colors"
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className="bg-muted/20 px-2 py-1 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post._id, post.tags)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        <article>
          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-white"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>

          {/* Author Bio */}
          <div className="border-t border-border mt-16 pt-12">
            <div className="flex items-start gap-6">
              {post.author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image).width(64).height(64).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Written by {post.author.name}
                </h3>
                {post.author.bio && (
                  <div className="text-foreground">
                    <PortableText value={post.author.bio} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug.current}`}
                  className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-32">
                    <Image
                      src={urlFor(relatedPost.mainImage).width(300).height(150).url()}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(relatedPost.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}