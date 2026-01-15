## 1. Preparation
- [x] 1.1 Install dependencies: `@astrojs/sitemap`, `framer-motion`, `react-icons`.
- [x] 1.2 Create `src/data/stack.ts` to define technology metadata (icons via `react-icons`, labels, colors).
- [x] 1.3 Verify/Update `src/content/config.ts` to ensure `portfolio` schema has `stack` array.

## 2. Work Page (`/work`)
- [x] 2.1 Create `src/pages/work/index.astro`.
- [x] 2.2 Implement `PortfolioTab` component:
    - [x] Grid layout for projects.
    - [x] Project Card component (Cover, Title, Desc, Tech Tags).
- [x] 2.3 Implement `StackTab` component:
    - [x] Data Logic: Merge `stack.ts` definitions with usage stats from `portfolio` collection.
    - [x] Icon Wall layout using `react-icons`.
    - [x] Interactive Progress Bars (using `framer-motion`).
    - [x] Logic to filter projects by selected tech ("Used in...").

## 3. About Page (`/about`)
- [x] 3.1 Create `src/pages/about/index.astro`.
- [x] 3.2 Implement "Who Am I" section (Bio).
- [x] 3.3 Implement "Interests" section.
- [x] 3.4 Implement simplified "Tech Stack" (can reuse logic from Work but simpler UI).
- [x] 3.5 Implement "Achievements" section (static list for now).
- [x] 3.6 Implement "Contact" section (links).

## 4. Home Page (`/`) Refinement
- [x] 4.1 Update `src/pages/index.astro` Hero section.
- [x] 4.2 Add "Latest Garden" section (fetch top 3 from `blog` collection).
- [x] 4.3 Add "Featured Projects" section (fetch `featured: true` from `portfolio`).

## 5. SEO & Routing
- [x] 5.1 Configure `astro.config.mjs` for `@astrojs/sitemap` and `site` URL.
- [x] 5.2 Create `src/components/SEO.astro` (or update existing Head).
- [x] 5.3 Create `src/pages/garden/tags/[tag].astro` for dynamic tag pages.
- [x] 5.4 Create `src/pages/rss.xml.ts` (Main feed).
- [x] 5.5 Create `src/pages/rss-articles.xml.ts` (Articles only).

## 6. Polish
- [x] 6.1 Verify all links and routing.
- [x] 6.2 Check mobile responsiveness for Icon Wall and Grids.
