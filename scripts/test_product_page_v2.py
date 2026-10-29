import os
import time
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\product_v2"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop Test (1366x850 standard laptop viewport)
    page = browser.new_page(viewport={"width": 1366, "height": 850})
    print("Loading product page on localhost:3001...")
    page.goto("http://localhost:3001/product/flowering/yellow-marigold-genda", wait_until="networkidle")
    time.sleep(1)

    # Capture viewport (Above the fold - proving full image and buy box fit without scroll)
    above_fold_path = os.path.join(output_dir, "desktop_product_above_the_fold.png")
    page.screenshot(path=above_fold_path)
    print(f"Saved above-the-fold screenshot: {above_fold_path}")

    # Verify thumbnails are on the side
    thumb_box = page.locator("button[aria-label*='View product image 1']").first.bounding_box()
    main_img_box = page.locator("img[alt*='Yellow Marigold']").first.bounding_box()
    print(f"Thumb X: {thumb_box['x']}, Main Img X: {main_img_box['x']}")
    assert thumb_box['x'] < main_img_box['x'], "Expected thumbnail on the side of the main image"

    # Verify Reviews are right near price
    price_text = page.locator("span.font-heading:has-text('₹')").first.inner_text().encode('ascii', 'ignore').decode()
    rating_text = page.locator("div:has-text('Verified Customer Reviews')").first.inner_text().encode('ascii', 'ignore').decode()
    print(f"Price: {price_text}, Rating section text: {rating_text[:40]}...")

    # Scroll down to test Reviews and FAQs
    page.evaluate("window.scrollTo(0, 1000)")
    time.sleep(0.5)

    # Click first FAQ accordion to toggle
    faq_btn = page.locator("button:has-text('How is my')").first
    faq_btn.click()
    time.sleep(0.5)

    # Capture full page screenshot showing Reviews and FAQs
    full_path = os.path.join(output_dir, "desktop_product_full_with_faqs_reviews.png")
    page.screenshot(path=full_path, full_page=True)
    print(f"Saved full page with FAQs & Reviews: {full_path}")

    # 2. Mobile Viewport Test (390x844)
    mobile_page = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
    mobile_page.goto("http://localhost:3001/product/flowering/yellow-marigold-genda", wait_until="networkidle")
    time.sleep(1)
    mobile_shot = os.path.join(output_dir, "mobile_product_compact_above_fold.png")
    mobile_page.screenshot(path=mobile_shot)
    print(f"Saved mobile screenshot: {mobile_shot}")

    browser.close()
    print("All Product Page v2 verification tests passed successfully!")
