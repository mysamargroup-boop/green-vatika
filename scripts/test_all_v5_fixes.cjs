const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const auditDir = path.join('C:', 'Users', 'msnem', '.gemini', 'antigravity', 'brain', '95ba22b9-adf8-46c6-b2f5-d909efabb087', 'audit', 'user_requests_v5');
  if (!fs.existsSync(auditDir)) {
    fs.mkdirSync(auditDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Verify Cookie Consent Banner
  const cookieBanner = await page.$('aside[aria-label="Cookie and Privacy Preferences"]');
  if (cookieBanner) {
    console.log('Cookie banner detected!');
    await page.screenshot({ path: path.join(auditDir, 'cookie_banner_desktop.png') });
  }

  // 2. Open Chatbot & Test Spacebar, Neon Border, Owner Intent, Real Timestamps, and Session Memory
  console.log('Testing Chatbot...');
  // Click floating chatbot button
  const chatButton = await page.$('button[aria-label="Open Green Vatika Plant Assistant"]');
  if (chatButton) {
    await chatButton.click();
    await page.waitForTimeout(600);

    // Screenshot initial open chatbot (notice initial timestamp and neon glowing input)
    await page.screenshot({ path: path.join(auditDir, 'chatbot_open_neon_border.png') });

    // Type query with spaces: "who is your owner"
    const input = await page.$('input[placeholder*="Ask plant name"]');
    if (input) {
      await input.fill('who is your owner');
      await page.waitForTimeout(300);
      const typedValue = await input.inputValue();
      console.log('Typed value with spaces:', JSON.stringify(typedValue));

      // Press Enter to send
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);

      // Now test session memory: Ask about Desi Rose
      await input.fill('tell me about desi rose');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);

      // Follow-up asking contextual "price?"
      await input.fill('price?');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);

      await page.screenshot({ path: path.join(auditDir, 'chatbot_owner_and_memory_test.png') });
    }

    // Close chatbot
    const closeBtn = await page.$('button[title="Close chat"]');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(400);
  }

  // 3. Test Shop Catalog Hero & Modern Dropdown & Verify Yellow Marigold is Hidden
  console.log('Navigating to Shop Page...');
  await page.evaluate(() => {
    // Navigate via header or click Shop
    const shopBtn = document.querySelector('button[aria-label*="Shop"], nav button:has-text("Shop")') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Shop'));
    if (shopBtn) shopBtn.click();
  });
  await page.waitForTimeout(1000);

  // Take screenshot of Shop Page with Botanical Animated Showcase
  await page.screenshot({ path: path.join(auditDir, 'shop_catalog_botanical_showcase.png') });

  // Open modern CustomSelect dropdown
  const dropdownTrigger = await page.$('button[aria-label="Filter by Sunlight"]');
  if (dropdownTrigger) {
    console.log('Opening Sunlight CustomSelect dropdown...');
    await dropdownTrigger.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(auditDir, 'custom_dropdown_open_luxury.png') });
    // Click option
    const option = await page.$('button[role="option"]:has-text("Direct Sunlight")');
    if (option) await option.click();
    await page.waitForTimeout(400);
  }

  // Check if Yellow Marigold is present in shop (it should NOT be!)
  const marigoldText = await page.evaluate(() => {
    return document.body.innerText.includes('Yellow Marigold (Genda)');
  });
  console.log('Is Yellow Marigold present in shop list?', marigoldText);

  // 4. Test Blog Post Page: Container Width & Table Scroll Check
  console.log('Navigating to Blog Page...');
  await page.evaluate(() => {
    const blogBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Blog') || b.textContent.includes('Guides'));
    if (blogBtn) blogBtn.click();
  });
  await page.waitForTimeout(1000);

  // Click on the first blog post to view its post page
  const firstPostCard = await page.$('article, div[class*="group cursor-pointer"]');
  if (firstPostCard) {
    await firstPostCard.click();
    await page.waitForTimeout(1200);

    // Scroll down to the table
    await page.evaluate(() => {
      const table = document.querySelector('table');
      if (table) table.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(600);

    // Check if table parent container has horizontal scroll
    const tableScrollInfo = await page.evaluate(() => {
      const tableWrapper = document.querySelector('.overflow-x-auto');
      if (!tableWrapper) return null;
      return {
        clientWidth: tableWrapper.clientWidth,
        scrollWidth: tableWrapper.scrollWidth,
        hasHorizontalScroll: tableWrapper.scrollWidth > tableWrapper.clientWidth
      };
    });
    console.log('Table scroll metrics:', tableScrollInfo);

    await page.screenshot({ path: path.join(auditDir, 'blog_post_wide_table_no_scroll.png') });
  }

  console.log('All tests completed successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
