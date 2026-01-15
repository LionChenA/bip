## ADDED Requirements

### Requirement: Global SEO
The system SHALL provide a centralized SEO mechanism for all pages.

#### Scenario: Default Metadata
- **WHEN** a page is visited
- **THEN** it must have `title`, `description`, and `og:image` meta tags.

#### Scenario: Custom OG Image
- **WHEN** a specific page (like a blog post) provides a custom image
- **THEN** the `og:image` tag must reflect that specific image.

### Requirement: Sitemap
The system SHALL generate a `sitemap-index.xml` and `sitemap-0.xml` for search engines.

#### Scenario: Build generation
- **WHEN** the site is built (`npm run build`)
- **THEN** a `sitemap-index.xml` file is created in the dist folder.

### Requirement: RSS Feeds
The system SHALL provide RSS feeds for content subscription.

#### Scenario: Main Feed
- **WHEN** user visits `/rss.xml`
- **THEN** they receive a valid XML feed of all recent content.

#### Scenario: Articles Feed
- **WHEN** user visits `/rss-articles.xml`
- **THEN** they receive a valid XML feed containing only content of type "article".
