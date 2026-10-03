import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const pages = ['index.html', 'documentation/index.html', 'setup/index.html', 'roadmap/index.html', 'about/index.html', 'privacy.html', 'terms.html'];
const bodyText = html => html.split(/<body[^>]*>/)[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
for (const page of pages) {
  const before = execFileSync('git', ['show', `80ebbc2:${page}`], { encoding: 'utf8' });
  const after = readFileSync(page, 'utf8');
  assert.equal(bodyText(after), bodyText(before), `${page}: content preservation`);
  assert(after.includes('styles.min.css'), `${page}: minified stylesheet`);
  assert(!after.match(/<script src="[^\"]*theme-init/), `${page}: inline theme initialization`);
  assert(after.includes('media="print" onload="this.media='), `${page}: nonblocking fonts`);
  assert(after.includes('<noscript>'), `${page}: font fallback without JavaScript`);
  assert(!after.match(/<input[^>]+aria-expanded/), `${page}: searchbox ARIA`);
}
console.log('PASS: unchanged page content, optimized loading, no-JS fallback, and searchbox ARIA.');
