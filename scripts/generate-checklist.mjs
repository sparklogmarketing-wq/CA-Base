/**
 * generate-checklist.mjs - scans src/data/pages/*.md for placeholder tokens
 * and writes ../placeholder-checklist.md (token reference + page x placeholder matrix).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'src', 'data', 'pages');
const OUT = path.join(ROOT, '..', 'placeholder-checklist.md');

const CATEGORY = (token) => {
  if (token === 'brand' || token === 'company_name') return 'Brand';
  if (token === 'contact_email' || token === 'contact_phone' || token === 'office_address') return 'Contact';
  if (token === 'city') return 'City (seed)';
  if (token === 'state') return 'State';
  if (/^city_\d+$/.test(token)) return 'Other city (branch/coverage)';
  if (/^locality_\d+$/.test(token)) return 'Bangalore locality';
  if (/^person_\d+$/.test(token)) return 'Person';
  if (/^company_\d+$/.test(token)) return 'Third-party firm / corporate';
  return 'Regulatory / context';
};

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).sort();
const perToken = new Map(); // token -> { count, files: Set }
const perFile = []; // { file, tokens: Map }

for (const f of files) {
  const text = fs.readFileSync(path.join(DIR, f), 'utf8');
  const tokens = new Map();
  for (const m of text.matchAll(/\{(\w+)\}/g)) {
    const t = m[1];
    tokens.set(t, (tokens.get(t) || 0) + 1);
    const u = perToken.get(t) || { count: 0, files: new Set() };
    u.count++;
    u.files.add(f);
    perToken.set(t, u);
  }
  perFile.push({ file: f, tokens });
}

const configured = {
  brand: '(site.name)', company_name: '(site.name)', country: 'India', state: 'Karnataka',
  audit_regulator: 'NFRA', corporate_affairs_authority: 'MCA', indirect_tax_authority: 'CBIC',
  direct_tax_authority: 'CBDT', company_law_tribunal: 'NCLT', supreme_court: 'Supreme Court of India',
  international_policy_body: 'OECD', funding_program: 'Startup India Seed Fund Scheme',
  contact_email: '(site.email)', contact_phone: '(site.phone)', office_address: '(site.address)',
  country_1: 'the US', country_2: 'the UK', country_3: 'Singapore', city: '(per-route city)',
};

const sortTok = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const catOrder = { 'Brand': 0, 'Contact': 1, 'City (seed)': 2, 'State': 3, 'Other city (branch/coverage)': 4, 'Bangalore locality': 5, 'Person': 6, 'Third-party firm / corporate': 7, 'Regulatory / context': 8 };

const L = [];
L.push('# Placeholder Checklist');
L.push('');
L.push(`Generated from \`CA-Website/src/data/pages/*.md\` (${files.length} pages). Configured tokens resolve at build time from \`src/config/site.ts\`; unconfigured tokens render literally as visible TODOs.`);
L.push('');
L.push('## Token reference');
L.push('');
L.push('| Token | Category | Resolves to | Occurrences | Pages |');
L.push('|---|---|---|---:|---:|');
for (const t of [...perToken.keys()].sort((a, b) => {
  const c = catOrder[CATEGORY(a)] - catOrder[CATEGORY(b)];
  return c !== 0 ? c : sortTok(a, b);
})) {
  const u = perToken.get(t);
  const status = configured[t] ?? '**UNFILLED - renders as literal TODO**';
  L.push(`| \`{${t}}\` | ${CATEGORY(t)} | ${status} | ${u.count} | ${u.files.size} |`);
}
L.push('');
L.push('## Page x placeholder matrix');
L.push('');
L.push('| Page file | Placeholders used (token x count) |');
L.push('|---|---|');
for (const { file, tokens } of perFile) {
  if (!tokens.size) { L.push(`| ${file} | - |`); continue; }
  const list = [...tokens.entries()]
    .sort((a, b) => sortTok(a[0], b[0]))
    .map(([t, n]) => `\`{${t}}\` x${n}`)
    .join(', ');
  L.push(`| ${file} | ${list} |`);
}
L.push('');

fs.writeFileSync(OUT, L.join('\n'));
console.log(`checklist written: ${OUT} (${files.length} pages, ${perToken.size} distinct tokens)`);
