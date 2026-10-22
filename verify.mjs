import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const pages = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(p);
  }
}
walk(dist);

const issues = [];
const targets = new Set(pages.map((p) => p.replaceAll('\\', '/')));
for (const p of pages) {
  const h = fs.readFileSync(p, 'utf8');
  const h1s = (h.match(/<h1/g) || []).length;
  if (h1s !== 1) issues.push(`${p} h1=${h1s}`);
  // Configured tokens must never leak; {person_N}/{company_N}/{city_N}/{locality_N}
  // are intentional visible TODOs (see placeholder-checklist.md).
  if (/\{(?!(?:person|company|city|locality)_\d+\})(\w+)\}/.test(h)) issues.push(`${p} TOKEN LEAK`);
  const hrefs = [...h.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1].split('#')[0].split('?')[0]);
  for (const href of new Set(hrefs)) {
    if (href.startsWith('/@') || href.endsWith('.xml') || href.startsWith('/_')) continue;
    const t1 = path.join(dist, href, 'index.html').replaceAll('\\', '/');
    const t2 = path.join(dist, href).replaceAll('\\', '/');
    const direct = fs.existsSync(path.join(dist, href)) && fs.statSync(path.join(dist, href)).isFile();
    if (!targets.has(t1) && !targets.has(t2) && !direct) issues.push(`${p} BROKEN LINK ${href}`);
  }
}
console.log('pages checked:', pages.length);
console.log('issues:', issues.length);
for (const i of issues.slice(0, 40)) console.log(' -', i);
