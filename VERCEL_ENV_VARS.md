# Vercel Environment Variables

Copy and paste these environment variables into your Vercel project settings:

## Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add each of these variables:

**RESEND_API_KEY**
```
re_UHAfA8zW_2Y7GA7GByY2jsnfJccTxSsmH
```

**FROM_EMAIL**
```
no-reply@axiomlegaldata.com
```

**TO_EMAIL**
```
contact@axiomlegaldata.com
```

**NEXT_PUBLIC_RECAPTCHA_SITE_KEY**
```
6LdcMr4rAAAAAK2nI02NzW5X8AABNGCDoQj2N9sl
```

**RECAPTCHA_SECRET_KEY**
```
6LdcMr4rAAAAALzjUWGI6bAlm3DpH8huKzLaetVn
```

**NEXT_PUBLIC_SANITY_PROJECT_ID**
```
5oqt7nq0
```

**NEXT_PUBLIC_SANITY_DATASET**
```
production
```

**SANITY_API_TOKEN**
```
skjM14q4vQ7THfVout9ARenw06Jr6eSZOA7BtDslrtJ9GbC01nSPem5qHLsFX5KUFRQA84ur6sBYP7KukZJSfUlTlbZoGwoESy4azID9GKpw1PwBYNYSRbAmG8MoxmOhOIG0WxTN8Zh1Jf0RWhs4j9fGyFyBgNpYaKx0QuMmg3NxbydCfvrb
```

## Important Notes:
- Set all variables to apply to **Production**, **Preview**, AND **Development** environments
- After adding all variables, redeploy your site for changes to take effect
- Your forms will now send emails to contact@axiomlegaldata.com
- CAPTCHA will protect against spam
- Blog system will be ready for content creation

## Next Step: Set up Sanity Studio
To manage your blog content, you'll need to set up Sanity Studio in a separate directory or use Sanity's web interface at https://5oqt7nq0.sanity.studio/