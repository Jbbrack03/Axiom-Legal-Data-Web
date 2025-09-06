# Axiom Legal Data Website - Performance & SEO Implementation Plan

## 🎯 Executive Summary
Systematic implementation of critical performance and SEO optimizations to improve search engine rankings, Core Web Vitals, and user experience.

**Expected Results:**
- 3-5 second load time improvement
- Proper search engine indexing with rich snippets
- 80-90% reduction in image file sizes
- Higher conversion rates from improved performance

---

## 📋 Phase 1: Critical Performance (Week 1)

### Task 1.1: Enable Next.js Image Optimization
- **File**: `next.config.mjs`
- **Action**: Remove `images: { unoptimized: true }`
- **Replace with**: Modern image optimization config
- **Impact**: Enables automatic WebP/AVIF conversion and responsive sizing

### Task 1.2: Optimize Large Images
- **Files**: `public/founder-headshot.png` (2.1MB), `public/josh-headshot.png` (2.9MB)
- **Action**: Convert to optimized WebP format with proper dimensions
- **Impact**: 80-90% file size reduction

### Task 1.3: Add SEO Foundation Files
- **Files**: `public/robots.txt`, `app/sitemap.ts`
- **Action**: Create essential SEO discovery files
- **Impact**: Enable proper search engine indexing

**Phase 1 Success Criteria:**
- [ ] Images load under 1 second
- [ ] Search engines can discover and index the site
- [ ] Core Web Vitals LCP < 2.5 seconds

---

## 📋 Phase 2: SEO Enhancement (Week 2)

### Task 2.1: Open Graph Metadata
- **File**: `app/layout.tsx`
- **Action**: Add comprehensive social sharing metadata
- **Impact**: Better social media presentation and CTR

### Task 2.2: Structured Data Implementation
- **Files**: Page components
- **Action**: Add JSON-LD schema markup for organization/website
- **Impact**: Rich snippets in search results

### Task 2.3: Page-Specific Meta Descriptions
- **Files**: All page components
- **Action**: Add unique, descriptive meta tags for each route
- **Impact**: Improved search result appearance and CTR

**Phase 2 Success Criteria:**
- [ ] Social media sharing shows rich previews
- [ ] Search results display rich snippets
- [ ] All pages have unique meta descriptions

---

## 📋 Phase 3: Polish & Monitor (Week 3)

### Task 3.1: Dependency Cleanup
- **File**: `package.json`
- **Action**: Remove unused frameworks (Svelte, Vue, Remix)
- **Impact**: Reduced bundle size and build complexity

### Task 3.2: Quality Gates
- **File**: `next.config.mjs`
- **Action**: Enable TypeScript/ESLint checks in production builds
- **Impact**: Better code quality and fewer runtime issues

### Task 3.3: Performance Monitoring Setup
- **Action**: Implement Core Web Vitals tracking and alerts
- **Impact**: Continuous performance monitoring

**Phase 3 Success Criteria:**
- [ ] Clean dependency tree with no unused packages
- [ ] Strict build quality checks passing
- [ ] Performance monitoring dashboard active

---

## 🔧 Implementation Details

### Critical Code Changes

#### 1. next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Re-enable for production quality
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Re-enable for production quality
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
```

#### 2. public/robots.txt
```
User-agent: *
Allow: /

# Block admin and api routes
Disallow: /api/
Disallow: /studio/

# Sitemap
Sitemap: https://axiomlegaldata.com/sitemap.xml
```

#### 3. app/sitemap.ts
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://axiomlegaldata.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pilot-program`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

#### 4. Enhanced app/layout.tsx metadata
```typescript
export const metadata: Metadata = {
  title: "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
  description: "Empower legal tech innovators to train AI models with high-fidelity, legally defensible synthetic data. Build with confidence, without prohibitive costs and legal risks.",
  generator: "v0.app",
  metadataBase: new URL('https://axiomlegaldata.com'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { title: 'Axiom Legal Data Blog RSS Feed', url: '/api/rss' }
      ]
    }
  },
  openGraph: {
    title: "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
    description: "TSTR-validated synthetic legal data for AI training. Stop paying lawyers $500/hour for training data.",
    url: 'https://axiomlegaldata.com',
    siteName: 'Axiom Legal Data',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Axiom Legal Data - Legal AI Training Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
    description: "TSTR-validated synthetic legal data for AI training",
    images: ['/og-image.png'],
  },
  icons: {
    icon: "/favicon.svg",
  },
}
```

---

## 📊 Success Metrics

### Performance Metrics
- **Load Time**: Target < 2 seconds (currently ~5 seconds)
- **LCP**: Target < 2.5 seconds
- **CLS**: Target < 0.1
- **FID**: Target < 100ms

### SEO Metrics
- **Search Console Indexing**: 100% of pages indexed
- **Rich Snippets**: Organization and website schema active
- **Social Sharing**: Open Graph previews working

### Technical Metrics
- **Image Sizes**: Average < 100KB per image
- **Bundle Size**: Maintain < 150KB First Load JS
- **Build Quality**: Zero TypeScript/ESLint errors

---

## 🚀 Getting Started

1. **Review Phase 1 tasks** - Focus on critical performance issues
2. **Test changes locally** - Verify optimizations work correctly  
3. **Deploy incrementally** - Release phases systematically
4. **Monitor metrics** - Track improvements after each phase

This plan provides a systematic approach to transform your website into a high-performance, SEO-optimized platform ready for search engine success.