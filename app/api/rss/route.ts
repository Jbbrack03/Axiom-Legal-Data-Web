import { client, type BlogPost } from '@/lib/sanity'
import { NextResponse } from 'next/server'

async function getBlogPostsForRSS(): Promise<BlogPost[]> {
  const query = `
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc)[0...20] {
      _id,
      title,
      slug,
      author->{
        name
      },
      publishedAt,
      excerpt,
      body
    }
  `
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching blog posts for RSS:', error)
    return []
  }
}

function generateRSSXML(posts: BlogPost[]): string {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://axiomlegaldata.com'
  const currentDate = new Date().toUTCString()

  const rssItems = posts
    .map((post) => {
      const postURL = `${siteURL}/blog/${post.slug.current}`
      const publishDate = new Date(post.publishedAt).toUTCString()

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postURL}</link>
      <guid isPermaLink="true">${postURL}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${publishDate}</pubDate>
      <author>noreply@axiomlegaldata.com (${post.author.name})</author>
    </item>`
    })
    .join('')

  const rssXML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>Axiom Legal Data Blog</title>
    <atom:link href="${siteURL}/api/rss" rel="self" type="application/rss+xml" />
    <link>${siteURL}</link>
    <description>Insights into legal AI, synthetic data generation, and the future of legal technology from Axiom Legal Data.</description>
    <language>en-US</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <managingEditor>noreply@axiomlegaldata.com (Axiom Legal Data)</managingEditor>
    <webMaster>noreply@axiomlegaldata.com (Axiom Legal Data)</webMaster>
    <image>
      <url>${siteURL}/axiom-logo.svg</url>
      <title>Axiom Legal Data Blog</title>
      <link>${siteURL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return rssXML
}

export async function GET() {
  try {
    const posts = await getBlogPostsForRSS()
    const rssXML = generateRSSXML(posts)

    return new NextResponse(rssXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // Cache for 24 hours, allow stale for 12 hours
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}