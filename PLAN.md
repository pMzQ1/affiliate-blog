# Autonomous Dutch Affiliate Blog — Project Plan

> Generated from architecture discussions. Drop this file in the root of your VS Code project.
> Work through phases in order. Each phase has clear deliverables and setup instructions.

---

## Design direction

Based on provided references, the design follows **Image 2 (clean card grid)** — NOT the busy magazine layout.

Key design principles:
- White/light-gray background, lots of whitespace
- Large featured images on post cards, rounded corners
- Category label in brand accent color (purple or coral — pick one)
- Clean sans-serif typography, no decorative elements
- 3-column card grid on desktop, 1-column on mobile
- Simple top navigation: logo left, links center, search right
- No sidebar clutter — full-width content focus

Brand accent color recommendation: **#6C63FF** (purple, trustworthy, modern) or **#E8593C** (coral, warm, gift-focused). Decide before Phase 3.

---

## Tech stack (100% free)

| Layer | Service | URL | Cost |
|---|---|---|---|
| Frontend | Next.js 14 on Vercel | vercel.com | Free |
| CMS / API | Strapi v4 on Render | render.com | Free (sleeps after 15min idle) |
| Database | Supabase PostgreSQL | supabase.com | Free (500MB) |
| Code hosting | GitHub | github.com | Free |
| Agent brain | Claude Code + MCP tools | Local in VS Code | Pay-per-post (~€0.05) |
| Keyword data | DataForSEO | dataforseo.com | Pay-per-use (~€0.01/lookup) |
| Domain | None yet | yoursite.vercel.app | Free subdomain |

---

## Repository structure

Create this structure in VS Code before writing any code:

```
affiliate-blog/
├── PLAN.md                        ← this file
├── .env.example                   ← template for all env vars (commit this)
├── .gitignore
│
├── frontend/                      ← Next.js 14 app (deploys to Vercel)
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               ← homepage
│   │   ├── blog/
│   │   │   ├── page.tsx           ← blog index (card grid)
│   │   │   └── [slug]/
│   │   │       └── page.tsx       ← individual post
│   │   ├── over-mij/
│   │   │   └── page.tsx           ← about page
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── affiliate-disclosure/
│   │       └── page.tsx           ← legally required in NL
│   ├── components/
│   │   ├── PostCard.tsx           ← the card from Image 2
│   │   ├── PostGrid.tsx           ← 3-col responsive grid
│   │   ├── CategoryBadge.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AffiliateDisclaimer.tsx ← shown on all product posts
│   ├── lib/
│   │   ├── strapi.ts              ← Strapi API client
│   │   └── types.ts               ← TypeScript interfaces
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── cms/                           ← Strapi v4 (deploys to Render)
│   ├── src/
│   │   ├── api/
│   │   │   ├── post/              ← blog post content type
│   │   │   ├── affiliate/         ← affiliate program registry
│   │   │   └── post-product/      ← products within a post
│   │   └── extensions/
│   ├── config/
│   └── package.json
│
└── agent/                         ← Claude Code MCP tools (runs locally)
    ├── mcp_server.py              ← registers all tools
    ├── requirements.txt
    ├── config/
    │   └── affiliates.json        ← your partner IDs and link templates
    ├── skills/
    │   ├── top10_gifts.md         ← writing skill: gift list posts
    │   ├── tech_gadgets.md        ← writing skill: tech/gadget posts
    │   └── kids_family.md         ← writing skill: kids & family posts
    └── tools/
        ├── keyword_research.py
        ├── product_search.py
        ├── build_links.py
        ├── write_post.py
        └── publish_to_strapi.py
```

---

## Phase 1 — Accounts & infrastructure

**Goal:** All four services running, connected, and serving a hello-world page.
**Time estimate:** 3–4 hours

### Step 1.1 — Create accounts

Sign up for all four services (use the same email for consistency):

- [ ] **GitHub** — github.com — create account, enable 2FA
- [ ] **Vercel** — vercel.com — sign up with GitHub (OAuth)
- [ ] **Render** — render.com — sign up with GitHub (OAuth)
- [ ] **Supabase** — supabase.com — sign up, create new project named `affiliate-blog`

### Step 1.2 — Create GitHub repository

```bash
# In VS Code terminal
mkdir affiliate-blog
cd affiliate-blog
git init
echo "# Affiliate Blog" > README.md
git add .
git commit -m "init"
# Create repo on github.com, then:
git remote add origin https://github.com/YOURUSERNAME/affiliate-blog.git
git push -u origin main
```

### Step 1.3 — Set up Supabase database

> **Important:** Do NOT manually create tables for `posts`, `affiliates`, or `post_products` here. Strapi manages its own PostgreSQL schema automatically — it will create and migrate its own tables when it first connects to Supabase. Creating duplicate raw tables will cause conflicts.

All you need to do in this step is:

1. Go to Supabase Dashboard → Settings → Database → Connection string (URI mode)
2. Copy the `DATABASE_URL` — you will use it in Step 1.6
3. Confirm the database is reachable (the connection string is all that's needed for now)

After Phase 2 is complete (Strapi content types created and Strapi has run migrations), you can optionally seed your affiliate network records via the Strapi admin panel or API.

### Step 1.4 — Bootstrap Next.js frontend

```bash
cd affiliate-blog
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
cd frontend
npm run dev
# Confirm running at localhost:3000
```

### Step 1.5 — Bootstrap Strapi CMS

```bash
cd ..
npx create-strapi-app@latest cms \
  --quickstart \
  --no-run
cd cms
# Edit config/database.js to use Supabase PostgreSQL connection
# (see Phase 1.6 below)
npm run develop
# Confirm Strapi admin at localhost:1337/admin
```

### Step 1.6 — Connect Strapi to Supabase

In `cms/config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: { rejectUnauthorized: false },
    },
  },
});
```

Get your `DATABASE_URL` from: Supabase Dashboard → Settings → Database → Connection string (URI mode).

### Step 1.7 — Deploy to Vercel + Render

**Deploy frontend to Vercel:**
- Go to vercel.com → New Project → Import your GitHub repo
- Select the `frontend/` subfolder as root directory
- Add env var: `NEXT_PUBLIC_STRAPI_URL=https://your-app.onrender.com`
- Deploy — note your `.vercel.app` URL

**Deploy CMS to Render:**
- Go to render.com → New → Web Service → Connect GitHub repo
- Root directory: `cms`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Add env vars: `DATABASE_URL`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`
- Deploy — note your `.onrender.com` URL

### Phase 1 checklist

- [ ] GitHub repo created and code pushed
- [ ] Supabase project created, tables created
- [ ] Next.js running locally at localhost:3000
- [ ] Strapi running locally at localhost:1337
- [ ] Strapi connected to Supabase database
- [ ] Frontend deployed to Vercel (live URL working)
- [ ] CMS deployed to Render (admin panel accessible)
- [ ] Frontend can fetch data from Strapi API

---

## Phase 2 — Strapi content types & Next.js frontend design

**Goal:** Strapi has the correct content types. Next.js homepage and blog index look like the design reference (Image 2 — clean card grid).
**Time estimate:** 4–6 hours

### Step 2.1 — Create Strapi content types

In Strapi admin (localhost:1337/admin) → Content-Type Builder, create:

**Post** content type:
- `slug` — UID (based on title), required
- `title_nl` — Short text, required
- `content_html` — Rich text (Blocks)
- `excerpt_nl` — Long text
- `keyword_primary` — Short text
- `post_type` — Enumeration: top10_gifts, tech_gadgets, kids_family, review
- `status` — Enumeration: draft, published (default: draft)
- `featured_image` — Media (single image)
- `seo_title` — Short text
- `seo_description` — Long text
- `published_at` — DateTime

**Affiliate** content type:
- `network` — Enumeration: bol, amazon_nl, awin
- `partner_id` — Short text
- `link_template` — Long text
- `active` — Boolean (default true)

**Post-Product** content type:
- `post` — Relation → Post (many-to-one)
- `affiliate` — Relation → Affiliate (many-to-one)
- `product_name` — Short text, required
- `product_description` — Long text
- `affiliate_url` — Short text, required
- `image_url` — Short text
- `price` — Decimal
- `position` — Integer

### Step 2.2 — Build the PostCard component

Design spec based on Image 2:

```tsx
// frontend/src/components/PostCard.tsx
// Card layout:
// - Full-width image at top, 16:9 ratio, rounded-t-lg
// - Category badge below image (accent color text, no background)
// - Title in dark bold text, 18-20px
// - Excerpt in gray, 14px, max 2 lines
// - Author avatar + date at bottom
// - Subtle border or shadow on card
// - Hover: slight lift (translateY -2px) + deeper shadow
```

### Step 2.3 — Build the homepage

Page structure (top to bottom):
1. **Hero section** — headline + subline + search bar (like Image 2 top)
2. **Featured post** — latest post, full-width card with large image
3. **Recent posts grid** — 3-column card grid (PostGrid component)
4. **Category sections** — one row per category (cadeaus, tech, kinderen)
5. **Newsletter signup** — simple email capture (optional for Phase 2)

### Step 2.4 — Static pages (required for NL/EU law)

Create these pages before any affiliate content goes live:

**`/over-mij`** — About page:
- Who you are (keep it personal — Dutch readers respond to authenticity)
- Why you write about these topics
- Photo optional but recommended for trust

**`/contact`** — Contact page:
- Simple contact form (use Formspree free tier — no backend needed)
- Email address

**`/affiliate-disclosure`** — REQUIRED by Dutch law (ACM guidelines) and Amazon Associates ToS:
```
Dit blog bevat affiliate links. Als je via een link op deze site
een aankoop doet, ontvang ik een kleine commissie — zonder extra
kosten voor jou. Dit helpt mij om deze website te onderhouden.
Ik raad alleen producten aan die ik zelf de moeite waard vind.
```
Link to this page from footer and from every post that contains affiliate links.

**`/privacy`** — Privacy policy (required under GDPR):
- What data you collect (analytics if any, contact form data)
- Use iubenda.com free tier to generate a compliant Dutch privacy policy

### Phase 2 checklist

- [ ] All Strapi content types created
- [ ] Strapi API tokens configured (Settings → API Tokens → create Full Access token)
- [ ] `lib/strapi.ts` client working, can fetch posts
- [ ] PostCard component built matching Image 2 style
- [ ] Homepage built with hero + card grid
- [ ] Blog index page (/blog) built
- [ ] Individual post page (/blog/[slug]) built with affiliate disclaimer
- [ ] About, Contact, Disclosure, Privacy pages created
- [ ] Footer links to all legal pages
- [ ] Mobile responsive (test at 375px width)
- [ ] Deployed and live on Vercel

---

## Phase 3 — Agent MCP tools

**Goal:** Claude Code in VS Code can autonomously research, write, and publish a full Dutch affiliate blog post when you describe a topic in natural language.
**Time estimate:** 6–8 hours

### Step 3.1 — Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
# Verify:
claude --version
```

Claude Code is Anthropic's official CLI agent for VS Code. After install, open VS Code terminal and type `claude` to start a session. You talk to it in natural language.

### Step 3.2 — Set up Python MCP environment

```bash
cd affiliate-blog/agent
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

`requirements.txt`:
```
mcp>=1.0.0
anthropic>=0.40.0
requests>=2.31.0
python-dotenv>=1.0.0
paapi5-python-sdk>=1.0.0   # Amazon Product Advertising API (PA-API 5.0)
```

> **Note:** `boto3` is the AWS SDK for services like S3/DynamoDB — it does **not** work with the Amazon Product Advertising API. Use `paapi5-python-sdk` instead.

### Step 3.3 — Configure affiliates.json

```json
{
  "bol": {
    "partner_id": "YOUR_BOL_PARTNER_ID",
    "link_template": "https://partner.bol.com/click/...?pid={partner_id}&ref={product_id}",
    "api_key": "YOUR_BOL_API_KEY",
    "api_secret": "YOUR_BOL_API_SECRET"
  },
  "amazon_nl": {
    "associate_tag": "yourtag-21",
    "marketplace": "nl",
    "pa_api_key": "YOUR_PA_API_KEY",
    "pa_api_secret": "YOUR_PA_API_SECRET",
    "host": "webservices.amazon.nl",
    "region": "eu-west-1"
  },
  "awin": {
    "publisher_id": "YOUR_AWIN_PUBLISHER_ID",
    "api_token": "YOUR_AWIN_API_TOKEN",
    "merchants": {
      "example_merchant": {
        "advertiser_id": "12345",
        "deep_link_template": "https://www.awin1.com/cread.php?awinmid={advertiser_id}&awinaffid={publisher_id}&ued={url}"
      }
    }
  }
}
```

### Step 3.4 — Build the five MCP tools

Each tool is a Python function in `agent/tools/`. The MCP server registers them so Claude Code can discover and call them.

**Tool 1: keyword_research**
- Input: `topic` (string), `locale` (default "nl")
- Calls DataForSEO Keywords for Site API or Keywords Data API
- Returns: primary keyword, 3 secondary keywords, monthly search volume, keyword difficulty score
- Logic: filter for KD < 40 and volume > 100 for realistic ranking chance

**Tool 2: product_search**
- Input: `topic`, `affiliates` (list: ["bol", "amazon_nl"]), `count` (default 12)
- Calls Bol.com partner API and/or Amazon PA-API
- Returns: list of products with name, price, image URL, product ID, affiliate network

**Tool 3: build_links**
- Input: `products` (list from tool 2)
- Reads `affiliates.json`
- For each product, constructs the correct affiliate tracking URL
- Returns: products with `affiliate_url` field added

**Tool 4: write_post**
- Input: `topic`, `keywords` (from tool 1), `products` (from tool 3), `post_type` (default "top10_gifts"), `skill_override` (optional path to custom skill file)
- Reads the skill template from `skills/{post_type}.md`
- Calls Anthropic API (claude-sonnet-4-6) with skill as system prompt
- Returns: complete post HTML including all affiliate links, SEO title, meta description, excerpt

**Tool 5: publish_to_strapi**
- Input: `post` (from tool 4), `status` (default "draft")
- Calls Strapi REST API: `POST /api/posts`
- Also creates post_product records for each product
- Returns: Strapi post ID and admin URL for review

### Step 3.5 — Register tools in MCP server

```python
# agent/mcp_server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server
from tools.keyword_research import keyword_research
from tools.product_search import product_search
from tools.build_links import build_links
from tools.write_post import write_post
from tools.publish_to_strapi import publish_to_strapi

server = Server("affiliate-blog-agent")

# Register all 5 tools here with their schemas
# Claude Code auto-discovers them when the server runs
```

### Step 3.6 — Configure Claude Code to use your MCP server

Create `~/.claude.json` in your home directory (this is Claude Code's config file — note: top-level home dir, **not** `~/.claude/mcp_servers.json`):

```json
{
  "mcpServers": {
    "affiliate-blog": {
      "command": "python",
      "args": ["/path/to/affiliate-blog/agent/mcp_server.py"],
      "env": {
        "STRAPI_URL": "https://your-app.onrender.com",
        "STRAPI_API_TOKEN": "your_token",
        "ANTHROPIC_API_KEY": "your_key",
        "DATAFORSEO_LOGIN": "your_login",
        "DATAFORSEO_PASSWORD": "your_password"
      }
    }
  }
}
```

Alternatively, create a project-level `.mcp.json` file in the root of your `affiliate-blog/` directory for a repo-scoped config (recommended if you work across multiple machines).

After this, open VS Code terminal, type `claude`, and your tools are available.

### Step 3.7 — Write the skill templates

**`agent/skills/top10_gifts.md`** — The most important skill. Should instruct:
- Tone: warm, helpful, Dutch ("jij/je" not "u"), like a knowledgeable friend
- Structure: intro (150w) → comparison table → 10 products as H2 sections → conclusion with top pick
- Each product section: name, price mention, 2-3 sentences why it's great, who it's for, affiliate link as natural CTA ("Bekijk op Bol.com" not "Click here")
- SEO: primary keyword in H1, first 100 words, and 2 H2s. Secondary keywords naturally distributed.
- Length: 1,400–1,800 words
- Legal: include "Dit artikel bevat affiliate links" at the top

**`agent/skills/tech_gadgets.md`** — More technical tone, spec comparisons, targets queries like "beste bluetooth speaker onder 50 euro"

**`agent/skills/kids_family.md`** — Safety-first language, age ranges, parent trust signals, COPPA-aware (no data collection on kids)

### Step 3.8 — Test the full pipeline

In VS Code terminal, type `claude` then:

```
Schrijf een nieuwe blogpost over het topic: "10 leukste cadeaus voor een meisje van 8 jaar". 
Gebruik Bol.com producten. Sla op als draft.
```

Claude Code should autonomously:
1. Call `keyword_research` → find best NL keyword
2. Call `product_search` → find 12 Bol.com products
3. Call `build_links` → generate affiliate URLs
4. Call `write_post` with `kids_family` skill
5. Call `publish_to_strapi` as draft
6. Report back the Strapi admin URL to review

### Phase 3 checklist

- [ ] Claude Code installed and working in VS Code
- [ ] Python venv set up, all packages installed
- [ ] `affiliates.json` filled with your real partner IDs
- [ ] All 5 MCP tools built and tested individually
- [ ] MCP server running and Claude Code can see the tools
- [ ] Skill templates written for all 3 post types
- [ ] End-to-end test: one full post generated, reviewed in Strapi, published, visible on site

---

## Phase 4 — SEO, internal linking & growth

**Goal:** Every post is technically SEO-perfect and the site starts building authority.
**Time estimate:** Ongoing

### Step 4.1 — Technical SEO in Next.js

Add to every post page:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.seo_title,
    description: post.seo_description,
    openGraph: { images: [post.featured_image_url] },
  }
}
```

Add to `app/layout.tsx`:
- Canonical URLs
- hreflang for nl-NL and nl-BE
- JSON-LD structured data (see below)

### Step 4.2 — Structured data (rich snippets)

Add `ItemList` schema to all top-10 posts — this enables rich snippets in Google NL:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "10 leukste cadeaus voor een meisje van 8 jaar",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Product Name",
      "url": "https://yoursite.vercel.app/blog/slug#product-1"
    }
  ]
}
```

The `write_post` MCP tool should generate this JSON-LD automatically and include it in the post HTML.

### Step 4.3 — Internal linking (automatic)

Add a 6th MCP tool: `scan_internal_links`
- Reads all published posts from Strapi
- Extracts keywords from each post
- When writing a new post, finds posts with matching keywords
- Injects contextual internal links into the post content
- This is the #1 most impactful free SEO improvement

### Step 4.4 — XML sitemap

```tsx
// app/sitemap.ts
export default async function sitemap() {
  const posts = await getAllPosts()
  return [
    { url: 'https://yoursite.vercel.app', lastModified: new Date() },
    { url: 'https://yoursite.vercel.app/blog', lastModified: new Date() },
    ...posts.map(post => ({
      url: `https://yoursite.vercel.app/blog/${post.slug}`,
      lastModified: new Date(post.published_at),
    }))
  ]
}
```

### Step 4.5 — Google Search Console

- [ ] Submit sitemap at search.google.com/search-console
- [ ] Verify site ownership (Vercel makes this easy — add TXT record)
- [ ] After 4+ weeks: check which posts have impressions but low CTR → update titles
- [ ] After 8+ weeks: check which keywords are almost ranking (position 8-15) → update content

### Step 4.6 — Backlink strategy (Google-safe)

Semi-automated legitimate tactics:

**Directories (one-time, ~30 min):**
- startpagina.nl — submit your site
- vinden.nl — submit your site
- bloggersnetwerk.nl — register as blogger

**Ongoing:**
- When you publish a post about products from a specific brand, email their PR team — many brands will link back to reviews
- The `write_post` tool can generate a short outreach email template automatically — you just review and send

---

## Environment variables reference

Create `.env.local` in `frontend/` and `.env` in `cms/` and `agent/`. Never commit these — only commit `.env.example`.

```bash
# Shared
ANTHROPIC_API_KEY=sk-ant-...

# Frontend (frontend/.env.local)
NEXT_PUBLIC_STRAPI_URL=https://your-app.onrender.com
STRAPI_API_TOKEN=your_full_access_token

# CMS (cms/.env)
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
JWT_SECRET=your_secret
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres

# Agent (agent/.env)
STRAPI_URL=https://your-app.onrender.com
STRAPI_API_TOKEN=your_full_access_token
ANTHROPIC_API_KEY=sk-ant-...
DATAFORSEO_LOGIN=your_login
DATAFORSEO_PASSWORD=your_password
BOL_API_KEY=your_key
BOL_API_SECRET=your_secret
AMAZON_PA_API_KEY=your_key
AMAZON_PA_API_SECRET=your_secret
AMAZON_ASSOCIATE_TAG=yourtag-21
AWIN_PUBLISHER_ID=your_id
AWIN_API_TOKEN=your_token
```

---

## Daily workflow (once everything is built)

1. Open VS Code
2. Open terminal, type `claude`
3. Say: *"Schrijf een nieuwe blogpost over [TOPIC]. Gebruik [BOL/AMAZON] producten. Post type: [top10_gifts/tech_gadgets/kids_family]."*
4. Wait ~90 seconds
5. Open your Strapi admin URL (bookmarked)
6. Review the draft post — check products, links, tone
7. Click Publish
8. Post is live within 60 seconds on your Vercel site

**To update an existing post:**
- Say: *"Update de blogpost [SLUG] — voeg 3 nieuwe Bol.com producten toe en ververs de prijzen."*

---

## Phase summary

| Phase | Deliverable | Est. time |
|---|---|---|
| 1 | All 4 services live, hello-world deployed | 3–4 hrs |
| 2 | Full frontend design live, all pages built | 4–6 hrs |
| 3 | Agent pipeline working end to end | 6–8 hrs |
| 4 | SEO complete, Search Console connected | 2 hrs + ongoing |

**Total to first working post:** ~15–18 hours of focused work.

---

## Important Dutch/EU legal notes

- **Affiliate disclosure**: Required on every page with affiliate links (ACM guidelines)
- **Privacy policy**: Required under GDPR — use iubenda.com free tier
- **Cookie banner**: Required if you use analytics — skip analytics in Phase 1 to avoid this
- **KvK registration**: Not required to start, but required if you earn income — register when you hit €500/month
- **Belastingdienst**: Affiliate income is taxable in NL — keep records from day one

---

*Next step: Start Phase 1 — create your four accounts and run the setup commands above.*
