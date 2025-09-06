import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-09-04'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'dummy-token',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
    image: any
    bio?: any[]
  }
  publishedAt: string
  excerpt: string
  mainImage: any
  body: any[]
  tags: string[]
  featured: boolean
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image: any
  bio: any[]
}