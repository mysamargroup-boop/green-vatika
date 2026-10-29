import { chromium } from 'playwright';

async function verifyAll() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  console.log('--- 1. Testing Page Load at http://localhost:3001 ---');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

  // Check scrollRestoration
  const scrollRestoration = await page.evaluate(() => history.scrollRestoration);
  const initialScrollY = await page.evaluate(() => window.scrollY);
  console.log(`Scroll restoration: ${scrollRestoration} (Expected: manual)`);
  console.log(`Initial scrollY: ${initialScrollY} (Expected: 0)`);

  // Check Category titles in Browse by Category
  const catNames = await page.evaluate(() => {
    const el = document.querySelectorAll('#section-categories .font-heading');
    return Array.from(el).map(e => ({
      text: e.textContent?.trim(),
      className: e.className,
      scrollHeight: e.scrollHeight,
      clientHeight: e.clientHeight
    }));
  });
  console.log('Category names test:', JSON.stringify(catNames, null, 2));

  // Check Chatbot Trigger button
  const triggerBtn = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open Green Vatika Plant Assistant"], button[aria-label="Open Green Vatika Assistant"]');
    return {
      text: btn?.textContent?.trim() || '',
      hasIcon: !!btn?.querySelector('svg'),
      className: btn?.className
    };
  });
  console.log('Chatbot trigger button:', triggerBtn);

  // Click chatbot button to open modal
  await page.click('button[aria-label="Open Green Vatika Plant Assistant"], button[aria-label="Open Green Vatika Assistant"]');
  await page.waitForTimeout(300);

  // Check Chatbot Modal Position on Mobile
  const modalBox = await page.evaluate(() => {
    const modal = document.querySelector('div.fixed.bottom-4');
    if (!modal) return null;
    const rect = modal.getBoundingClientRect();
    return {
      left: rect.left,
      right: window.innerWidth - rect.right,
      width: rect.width,
      viewportWidth: window.innerWidth,
      isSymmetric: Math.abs(rect.left - (window.innerWidth - rect.right)) < 5
    };
  });
  console.log('Chatbot modal centering on mobile:', modalBox);

  // Test Tab Navigation & Scroll-To-Top
  console.log('--- 2. Testing Tab Navigation to Categories ---');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('nav button, header button')).find(b => b.textContent?.trim() === 'Categories');
    if (link) link.click();
  });
  await page.waitForTimeout(500);

  const afterNavScrollY = await page.evaluate(() => window.scrollY);
  const currentHash = await page.evaluate(() => window.location.hash);
  console.log(`After nav to Categories: hash=${currentHash}, scrollY=${afterNavScrollY}`);

  console.log('--- 3. Testing Tab Navigation to Contact ---');
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('nav button, header button')).find(b => b.textContent?.trim() === 'Contact');
    if (link) link.click();
  });
  await page.waitForTimeout(500);

  const contactScrollY = await page.evaluate(() => window.scrollY);
  const contactHash = await page.evaluate(() => window.location.hash);
  console.log(`After nav to Contact: hash=${contactHash}, scrollY=${contactScrollY}`);

  // Test Refresh scroll position
  console.log('--- 4. Testing Page Refresh Scroll Position ---');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const refreshScrollY = await page.evaluate(() => window.scrollY);
  console.log(`After reload scrollY: ${refreshScrollY} (Expected: 0)`);

  await browser.close();
  console.log('Verification finished successfully!');
}

verifyAll().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
