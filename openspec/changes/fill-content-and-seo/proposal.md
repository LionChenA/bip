# Change: Fill Pages & SEO

## Why
The project has a core foundation, but the primary content pages (Work, About) are missing or incomplete. Additionally, the site lacks standard discovery and SEO mechanisms (Sitemap, RSS, Open Graph) required for a public launch. This proposal fills these gaps to reach "feature complete" status.

## What Changes
1.  **Work Page**:
    -   Implements a **Portfolio Tab** using `src/content/portfolio`.
    -   Implements a **Stack Tab** with an interactive "Icon Wall" and progress bars (Framer Motion).
    -   Displays "Used in" relationships for stack items.
    -   *Note*: Achievements tab is explicitly out of scope.
2.  **About Page**:
    -   Adds sections: Who Am I, Interests, Tech Stack (simplified), Achievements, Contact.
3.  **Home Page**:
    -   Adds "Latest Garden" (3 recent posts).
    -   Adds "Featured Projects".
    -   Refines hero and micro-interactions.
4.  **SEO & Discovery**:
    -   Adds `@astrojs/sitemap`.
    -   Adds Open Graph tags and dynamic OG images.
    -   Adds RSS feeds (`/rss.xml`, `/rss-articles.xml`).
    -   Adds Tag Pages (`/garden/tags/[tag]`).

## Impact
-   **Affected Capabilities**: `ui`, `seo`, `routing`
-   **Affected Code**: `src/pages/`, `src/components/`, `src/content/`, `src/config/`
-   **New Dependencies**: `@astrojs/sitemap`, `framer-motion`.
-   **Data**: Relies on `src/content/portfolio` and `src/content/blog` (Garden).
