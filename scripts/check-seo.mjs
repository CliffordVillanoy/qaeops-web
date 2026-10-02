import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const base = 'https://cliffordvillanoy.github.io/qaeops-web/';
const pages = ['index.html', 'documentation/index.html', 'setup/index.html', 'roadmap/index.html', 'about/index.html', 'privacy.html', 'terms.html'];
const sitemap = readFileSync('sitemap.xml', 'utf8');
const titles = new Set();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const url = base + (page === 'index.html' ? '' : page.replace(/index\.html$/, ''));
  assert(html.includes(`<link rel="canonical" href="${url}">`), `${page}: canonical`);
  assert(sitemap.includes(`<loc>${url}</loc>`), `${page}: sitemap entry`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: H1 count`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `${page}: unique title`);
  titles.add(title);
  assert(html.match(/<meta name="description" content="[^"]+"/), `${page}: description`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if (/^(?:[a-z]+:|\/\/|#)/i.test(link)) continue;
    const path = link.split(/[?#]/)[0];
    if (!path) continue;
    assert(existsSync(resolve(dirname(page), path)), `${page}: missing ${path}`);
  }
}
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length);
assert(readFileSync('_config.yml', 'utf8').includes('  - docs'));
console.log('PASS: seven canonical pages, sitemap, metadata, headings, local links, and preview exclusion.');
