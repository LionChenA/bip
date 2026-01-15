## 1. Preparation
- [ ] 1.1 Install dependencies: `@astrojs/sitemap`, `framer-motion`, `react-icons`.
- [ ] 1.2 Create `src/data/stack.ts` to define technology metadata (icons via `react-icons`, labels, colors).
- [ ] 1.3 Verify/Update `src/content/config.ts` to ensure `portfolio` schema has `stack` array.

## 2. Work Page (`/work`)
- [ ] 2.1 Create `src/pages/work/index.astro`.
- [ ] 2.2 Implement `PortfolioTab` component:
    - [ ] Grid layout for projects.
    - [ ] Project Card component (Cover, Title, Desc, Tech Tags).
- [ ] 2.3 Implement `StackTab` component:
    - [ ] Data Logic: Merge `stack.ts` definitions with usage stats from `portfolio` collection.
    - [ ] Icon Wall layout using `react-icons`.
    - [ ] Interactive Progress Bars (using `framer-motion`).
    - [ ] Logic to filter projects by selected tech ("Used in...").

## 3. About Page (`/about`)
- [ ] 3.1 Create `src/pages/about/index.astro`.
- [ ] 3.2 Implement "Who Am I" section (Bio).
- [ ] 3.3 Implement "Interests" section.
- [ ] 3.4 Implement simplified "Tech Stack" (can reuse logic from Work but simpler UI).
- [ ] 3.5 Implement "Achievements" section (static list for now).
- [ ] 3.6 Implement "Contact" section (links).

## 4. Home Page (`/`) Refinement
- [ ] 4.1 Update `src/pages/index.astro` Hero section.
- [ ] 4.2 Add "Latest Garden" section (fetch top 3 from `blog` collection).
- [ ] 4.3 Add "Featured Projects" section (fetch `featured: true` from `portfolio`).

## 5. SEO & Routing
- [ ] 5.1 Configure `astro.config.mjs` for `@astrojs/sitemap` and `site` URL.
- [ ] 5.2 Create `src/components/SEO.astro` (or update existing Head).
- [ ] 5.3 Create `src/pages/garden/tags/[tag].astro` for dynamic tag pages.
- [ ] 5.4 Create `src/pages/rss.xml.ts` (Main feed).
- [ ] 5.5 Create `src/pages/rss-articles.xml.ts` (Articles only).

## 6. Polish
- [ ] 6.1 Verify all links and routing.
- [ ] 6.2 Check mobile responsiveness for Icon Wall and Grids.
