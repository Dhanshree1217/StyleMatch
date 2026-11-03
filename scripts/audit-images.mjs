/**
 * StyleMatch Image Audit Script
 * Run with: npm run audit-images
 *
 * This script crawls through your project data files and pages, extracts every image URL,
 * tests each one over the network in parallel, and prints a clear summary of working vs broken URLs.
 */

import fs from 'fs';
import path from 'path';

function getSourceFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.git', 'dist'].includes(item)) {
        results = results.concat(getSourceFiles(fullPath));
      }
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getSourceFiles('./src');
const urlRegex = /https?:\/\/[^\s'"`,;)<>]+/g;
const urlOrigins = new Map();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(urlRegex) || [];
  const imgUrls = matches.filter((u) =>
    !u.includes('supabase.co') &&
    !u.includes('github.com') &&
    !u.includes('w3.org') &&
    !u.includes('localhost') &&
    !u.endsWith('...') &&
    (u.includes('unsplash.com') ||
     u.includes('.jpg') ||
     u.includes('.jpeg') ||
     u.includes('.png') ||
     u.includes('.webp') ||
     u.includes('images'))
  );

  for (const u of imgUrls) {
    if (!urlOrigins.has(u)) {
      urlOrigins.set(u, new Set());
    }
    urlOrigins.get(u).add(file);
  }
}

async function checkSingleUrl(url, retryCount = 1) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: controller.signal,
    }).catch(() => null);

    clearTimeout(timer);
    if (res && res.ok) {
      return { url, ok: true, status: res.status };
    }

    if (retryCount > 0) {
      await new Promise((r) => setTimeout(r, 600));
      return checkSingleUrl(url, retryCount - 1);
    }

    return { url, ok: false, status: res ? res.status : 'TIMEOUT_OR_BLOCKED' };
  } catch (err) {
    clearTimeout(timer);
    if (retryCount > 0) {
      await new Promise((r) => setTimeout(r, 600));
      return checkSingleUrl(url, retryCount - 1);
    }
    return { url, ok: false, status: err.name === 'AbortError' ? 'TIMEOUT' : err.message };
  }
}

async function runWorkerPool(items, concurrency = 4) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      const res = await checkSingleUrl(items[i]);
      results.push(res);
      process.stdout.write(res.ok ? '.' : 'X');
      // Gentle pause to avoid CDN rate limiting
      await new Promise((r) => setTimeout(r, 80));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

async function runAudit() {
  const urls = Array.from(urlOrigins.keys());
  console.log(`\n======================================================`);
  console.log(`🔍 StyleMatch Image Audit`);
  console.log(`Scanning ${urls.length} unique remote image URLs across ${files.length} files...`);
  console.log(`======================================================\n`);

  const results = await runWorkerPool(urls, 4);
  const ok = results.filter((r) => r.ok);
  const broken = results.filter((r) => !r.ok);

  console.log(`\n\n==================== AUDIT RESULTS ====================`);
  console.log(`TOTAL AUDITED: ${urls.length}`);
  console.log(`✅ WORKING (200 OK): ${ok.length}`);
  console.log(`❌ BROKEN / FAILED:   ${broken.length}`);
  console.log(`=======================================================\n`);

  if (broken.length === 0) {
    console.log(`🎉 PERFECT SCORE! Every single image URL in your app is valid and working!\n`);
  } else {
    console.log(`⚠️ THE FOLLOWING ${broken.length} IMAGE(S) FAILED:\n`);
    for (const b of broken) {
      const originFiles = Array.from(urlOrigins.get(b.url)).join(', ');
      console.log(`[Status ${b.status}] ${b.url}`);
      console.log(`  Found in: ${originFiles}\n`);
    }
  }
}

runAudit();
