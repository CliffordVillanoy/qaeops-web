# LP-M4 — SEO and Crawler Controls

Status: Planned; implementation requires the final production domain.
Scope: The four public static pages: Overview, Documentation, Roadmap, and About.

## Objective

Make the existing HTML pages understandable and discoverable by search engines without adding a framework, build system, analytics, or speculative content. Crawler controls communicate preferences; they do not secure public content or prevent non-compliant scraping.

## Deliverables

1. Confirm one HTTPS production origin and one permanent URL for each public page.
2. Keep one accurate title, meta description, and visible H1 on every page.
3. Add a self-referencing canonical URL and page-specific Open Graph metadata to every page.
4. Add truthful homepage JSON-LD using only verified product facts. Do not add ratings, reviews, customer counts, pricing, or availability claims without evidence.
5. Add `/sitemap.xml` at the site root with the four canonical, absolute public URLs. Maintain it manually when public pages are added, removed, or renamed.
6. Add `/robots.txt` at the site root and reference the sitemap:

   ```text
   User-agent: *
   Allow: /

   Sitemap: https://FINAL-DOMAIN/sitemap.xml
   ```

7. Create one representative social-preview image only if a suitable existing asset cannot meet the required dimensions and content.
8. After deployment, verify the site in Google Search Console, submit the sitemap, and inspect all four canonical URLs.

## Pre-launch rule

Keep unfinished or confidential material unpublished. If a public preview is necessary, protect it with authentication where the host supports it. Do not rely on `robots.txt` as privacy, access control, or scraping prevention.

## Scraping response

Do not add a long crawler blocklist before traffic shows a problem. If abusive automated traffic appears, use hosting or CDN controls such as rate limiting, bot challenges, request logging, and targeted blocking. Keep private source and secrets outside the deployed site.

## Acceptance criteria

- All four pages return successfully over the chosen HTTPS origin.
- Each page has one accurate title, description, H1, canonical URL, and matching Open Graph URL.
- `sitemap.xml` is valid XML and contains only the four canonical public URLs.
- `robots.txt` is reachable at the site root, permits public indexing, and points to the production sitemap.
- Canonical URLs in HTML, the sitemap, and redirects agree.
- Structured data passes validation and contains no unverified claims.
- Search Console accepts the sitemap and can inspect each public URL.
- No private repository content, secrets, local paths, or unfinished internal documents are deployed.

## Execution order

Final domain → page metadata → `sitemap.xml` → `robots.txt` → structured data → validation → deployment and Search Console submission.
