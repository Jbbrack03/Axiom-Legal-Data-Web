# Axiom Legal Data Website - Setup Instructions

## Overview
Your website now includes:
- ✅ **Form Backend**: Email notifications for pilot program and contact forms
- ✅ **CAPTCHA Protection**: Google reCAPTCHA v3 for bot prevention
- ✅ **Blog System**: Sanity CMS for professional blog management
- ✅ **Professional Design**: Consistent with your existing website theme

## Required Services & Setup

### 1. Email Service (Resend) - FREE
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys and create a new key
3. Verify your sending domain: `axiomlegaldata.com`
4. Add your API key to environment variables

### 2. Google reCAPTCHA v3 - FREE
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Create a new site with:
   - reCAPTCHA v3
   - Domain: `axiomlegaldata.com` (and `localhost` for development)
3. Get your Site Key and Secret Key
4. Add them to environment variables

### 3. Sanity CMS - FREE TIER
1. Sign up at [sanity.io](https://www.sanity.io/)
2. Create a new project
3. Get your Project ID and API Token
4. Add them to environment variables

## Environment Variables Setup

Create a `.env.local` file in your project root:

```env
# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=no-reply@axiomlegaldata.com
TO_EMAIL=contact@axiomlegaldata.com

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here
```

## Vercel Deployment Setup

In your Vercel dashboard, add these environment variables:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add all the variables from your `.env.local` file

## Blog Content Management

### Setting up Sanity Studio (One-time setup)
```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity Studio in a separate directory
sanity init

# Use the schemas from /sanity/schemas/ folder
# Copy author.ts, blogPost.ts, and blockContent.ts to your studio

# Deploy your studio
sanity deploy
```

### Creating Blog Content
1. Access your Sanity Studio at `https://your-project.sanity.studio/`
2. Create authors first (for bylines)
3. Create blog posts with:
   - Title, slug, featured image
   - Rich content with images, code blocks, callouts
   - SEO metadata
   - Tags and featured flag

## Features Included

### Form Backend
- **Pilot Program Form**: Captures company info and data requirements
- **Contact Form**: General inquiries with company context
- **Email Templates**: Professional HTML emails sent to contact@axiomlegaldata.com
- **Validation**: Server-side validation with detailed error messages
- **CAPTCHA**: Invisible reCAPTCHA v3 protection

### Blog System
- **Professional CMS**: Sanity-powered content management
- **Rich Content**: Support for images, code blocks, callouts, and more
- **SEO Optimized**: Meta titles, descriptions, and keywords
- **Author Profiles**: Author bios and social links
- **Related Posts**: Automatic related article suggestions
- **Responsive Design**: Mobile-friendly layout

### Security & Performance
- **Bot Protection**: reCAPTCHA v3 with score-based filtering
- **Rate Limiting**: Built-in Next.js API rate limiting
- **Input Validation**: Zod schema validation on all forms
- **Email Security**: Reply-to headers and professional templates

## Costs
- **Resend**: FREE tier (3,000 emails/month)
- **Google reCAPTCHA**: FREE
- **Sanity**: FREE tier (3 users, unlimited API requests)
- **Total Monthly Cost**: $0 (until you scale)

## Testing Checklist

1. ✅ Forms submit successfully
2. ✅ Emails arrive at contact@axiomlegaldata.com
3. ✅ CAPTCHA prevents spam
4. ✅ Blog posts display correctly
5. ✅ Mobile responsive design
6. ✅ All links work properly

## Support

If you encounter any issues:
1. Check the browser console for JavaScript errors
2. Verify all environment variables are set correctly
3. Test form submissions in development mode first
4. Ensure your domain is verified with Resend and reCAPTCHA

Your professional website is now ready for launch! 🚀