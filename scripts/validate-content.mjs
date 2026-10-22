import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const dir = 'src/data/pages';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
const issues = [];
const slugs = new Map();

for (const f of files) {
  const p = path.join(dir, f);
  const raw = fs.readFileSync(p, 'utf8');
  const rel = (m) => issues.push(`${f}: ${m}`);
  if (!raw.startsWith('---')) { rel('no frontmatter'); continue; }
  let fm, content;
  try {
    ({ data: fm, content } = matter(raw));
  } catch (e) {
    rel(`YAML parse error: ${e.message}`);
    continue;
  }
  const req = ['slug','cluster','pageName','pageType','intent','priority','primaryKeyword','secondaryKeywords','title','description','h1','links','faqs'];
  for (const k of req) if (fm[k] === undefined) rel(`missing ${k}`);
  if (issues.length && issues[issues.length-1].startsWith(f)) { /* continue checks anyway */ }
  if (fm.slug === undefined) { continue; }
  if (slugs.has(fm.slug)) rel(`duplicate slug ${fm.slug} (also ${slugs.get(fm.slug)})`);
  slugs.set(fm.slug, f);
  if (!Array.isArray(fm.secondaryKeywords) || fm.secondaryKeywords.length < 3) rel('secondaryKeywords < 3');
  if (!Array.isArray(fm.links) || fm.links.length < 3) rel(`links=${fm.links && fm.links.length}`);
  if (!Array.isArray(fm.faqs) || fm.faqs.length < 4) rel(`faqs=${fm.faqs && fm.faqs.length}`);
  for (const l of fm.links || []) if (!l.slug || !l.anchor || !l.rel) rel(`bad link ${JSON.stringify(l)}`);
  for (const q of fm.faqs || []) if (!q.q || !q.a) rel(`bad faq ${JSON.stringify(q).slice(0,80)}`);
  if (fm.title && fm.title.length > 75) rel(`title long (${fm.title.length}): ${fm.title}`);
  if (fm.description && (fm.description.length < 120 || fm.description.length > 175)) rel(`desc len ${fm.description.length}`);
  // body checks
  if (/(^|\n)#\s/.test(content)) rel('body contains h1');
  if (!content.trimStart().startsWith('>')) rel('body does not start with definition blockquote');
  if (/(\{person_|{company_|{city_|{locality_)\d/.test(raw)) rel('forbidden token');
  const stray = raw.match(/\{(\w+)\}/g)?.filter((t) => !['{brand}','{company_name}','{country}','{state}','{city}','{audit_regulator}','{corporate_affairs_authority}','{indirect_tax_authority}','{direct_tax_authority}','{company_law_tribunal}','{supreme_court}','{international_policy_body}','{funding_program}','{country_1}','{country_2}','{country_3}','{contact_email}','{contact_phone}','{office_address}'].includes(t));
  if (stray && stray.length) rel(`unknown tokens: ${[...new Set(stray)].join(', ')}`);
  const wc = content.replace(/[#>*|\-`]/g, ' ').split(/\s+/).filter(Boolean).length;
  if (wc < 250) rel(`word count low: ${wc}`);
}

console.log('files:', files.length, '| unique slugs:', slugs.size);
console.log('issues:', issues.length);
for (const i of issues) console.log(' -', i);
