import os
import time
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\enhancements"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 900})

    # Test 1: Category Slug in Product URL
    print("Testing category slug in product URL...")
    page.goto("http://localhost:3001/shop", wait_until="networkidle")
    time.sleep(1)

    # Click first plant card
    page.locator(".cursor-pointer:has-text('Yellow Marigold')").first.click()
    time.sleep(1)

    prod_url = page.url
    print(f"Product Page URL after click: {prod_url}")
    assert "/product/flowering/yellow-marigold-genda" in prod_url or "flowering" in prod_url, f"Expected category slug in URL, got {prod_url}"

    # Screenshot product page with new slug
    page.screenshot(path=os.path.join(output_dir, "product_page_with_category_slug.png"))

    # Test direct URL load with category slug
    print("Testing direct reload of URL with category slug...")
    page.goto("http://localhost:3001/product/flowering/yellow-marigold-genda", wait_until="networkidle")
    h1_text = page.inner_text("h1")
    print(f"H1 on direct category slug URL: {h1_text}")
    assert "Yellow Marigold" in h1_text, f"Expected Yellow Marigold, got {h1_text}"

    # Test 2: Blog Page Redesigned Top Featured Card
    print("Testing Blog Page Top Card...")
    page.goto("http://localhost:3001/blog", wait_until="networkidle")
    time.sleep(1)
    page.screenshot(path=os.path.join(output_dir, "blog_page_redesigned_top_card.png"))

    # Test 3: Broadened Blog Post Page
    print("Testing Broadened Blog Post Page...")
    # Click on the featured blog post
    page.locator("span:has-text('Read Guide')").first.click()
    time.sleep(1)
    print(f"Blog Post URL: {page.url}")
    page.screenshot(path=os.path.join(output_dir, "blog_post_page_broad_layout.png"))

    # Test 4: Verify Theme Colors and Thin Scrollbar
    theme_info = page.evaluate("""() => {
        const bodyStyle = window.getComputedStyle(document.body);
        return {
            bgColor: bodyStyle.backgroundColor,
            color: bodyStyle.color,
            fontFamily: bodyStyle.fontFamily,
            scrollbarWidth: bodyStyle.scrollbarWidth
        };
    }""")
    print("Computed Theme & Font Info:", theme_info)

    browser.close()
    print("All enhancement tests completed successfully!")
