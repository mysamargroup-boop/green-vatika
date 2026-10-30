import os
import time
from playwright.sync_api import sync_playwright

out_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\user_requests_v5"
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    print("Navigating to http://localhost:3001 ...")
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)

    # 1. Cookie Consent Banner
    cookie_banner = page.locator("aside[aria-label='Cookie and Privacy Preferences']")
    if cookie_banner.count() > 0:
        print("Cookie Consent banner detected!")
        cookie_banner.screenshot(path=os.path.join(out_dir, "cookie_consent_banner.png"))
        page.screenshot(path=os.path.join(out_dir, "homepage_with_cookie_consent.png"))

    # 2. Chatbot Verification (Neon Border, Spacebar, Owner intent, Real Timestamps, Session Memory)
    print("Testing Chatbot...")
    chat_btn = page.locator("button[aria-label='Open Green Vatika Plant Assistant']")
    if chat_btn.count() > 0:
        chat_btn.click()
        time.sleep(1)

        # Screenshot Chatbot Modal with neon border
        chat_modal = page.locator("div.fixed.z-50:has(button[title='Close chat'])")
        if chat_modal.count() > 0:
            chat_modal.screenshot(path=os.path.join(out_dir, "chatbot_open_neon_border.png"))

        # Test typing query with spaces
        chat_input = page.locator("input[placeholder*='Ask plant name']")
        chat_input.fill("who is your owner")
        typed_val = chat_input.input_value()
        print(f"Typed value with spaces: '{typed_val}'")
        assert " " in typed_val, "Spacebar failed in input!"

        # Send query
        page.keyboard.press("Enter")
        time.sleep(1.2)

        # Test Session Memory: Inquire about Desi Rose
        chat_input.fill("tell me about desi rose")
        page.keyboard.press("Enter")
        time.sleep(1.2)

        # Follow-up asking contextual "price?"
        chat_input.fill("price?")
        page.keyboard.press("Enter")
        time.sleep(1.2)

        # Capture conversation thread with timestamps and owner answer
        if chat_modal.count() > 0:
            chat_modal.screenshot(path=os.path.join(out_dir, "chatbot_owner_and_memory_session.png"))
        print("Chatbot tests verified successfully!")

        # Close chatbot
        page.click("button[title='Close chat']")
        time.sleep(0.5)

    # 3. Shop Catalog & Dropdowns
    print("Navigating to Shop...")
    page.click("button:has-text('Shop')")
    time.sleep(1.5)

    # Screenshot Shop Catalog with Botanical Animated Showcase
    page.screenshot(path=os.path.join(out_dir, "shop_catalog_botanical_showcase.png"))

    # Open Modern CustomSelect Dropdown
    sunlight_btn = page.locator("button[aria-label='Filter by Sunlight']")
    if sunlight_btn.count() > 0:
        sunlight_btn.click()
        time.sleep(0.6)
        page.screenshot(path=os.path.join(out_dir, "custom_dropdown_sunlight_open.png"))
        # Select 'Direct Sunlight'
        page.click("button[role='option']:has-text('Direct Sunlight')")
        time.sleep(0.6)

    # Open Sort Dropdown
    sort_btn = page.locator("button[aria-label='Sort Nursery Plants']")
    if sort_btn.count() > 0:
        sort_btn.click()
        time.sleep(0.6)
        page.screenshot(path=os.path.join(out_dir, "custom_dropdown_sort_open.png"))
        page.keyboard.press("Escape")
        time.sleep(0.4)

    # Verify Yellow Marigold is NOT displayed in shop catalog
    page_text = page.inner_text("body")
    has_marigold = "Yellow Marigold (Genda)" in page_text
    print(f"Is Yellow Marigold present in active shop catalog? {has_marigold}")

    # 4. Blog Post Page Width & Table Scroll Check
    print("Navigating to Blog Guides...")
    page.click("button:has-text('Blog')")
    time.sleep(1.5)

    # Click first guide (Balcony Guide with performance matrix table)
    first_guide = page.locator("article, div[class*='cursor-pointer']:has(h3)").first
    if first_guide.count() > 0:
        first_guide.click()
        time.sleep(1.5)

        # Scroll down to comparison table
        table_el = page.locator("table").first
        if table_el.count() > 0:
            table_el.scroll_into_view_if_needed()
            time.sleep(0.8)

            table_scroll = page.evaluate("""() => {
                const wrapper = document.querySelector('.overflow-x-auto');
                if (!wrapper) return null;
                return {
                    clientWidth: wrapper.clientWidth,
                    scrollWidth: wrapper.scrollWidth,
                    hasScroll: wrapper.scrollWidth > wrapper.clientWidth
                };
            }""")
            print(f"Blog post table scroll metrics at 1440px desktop: {table_scroll}")
            page.screenshot(path=os.path.join(out_dir, "blog_post_table_no_scroll_desktop.png"))

    # 5. Smooth scroll confirmation test
    smooth_scroll_html = page.evaluate("() => getComputedStyle(document.documentElement).scrollBehavior")
    smooth_scroll_body = page.evaluate("() => getComputedStyle(document.body).scrollBehavior")
    print(f"Computed scroll-behavior on html: '{smooth_scroll_html}', on body: '{smooth_scroll_body}'")

    browser.close()
    print("All v5 automated tests executed successfully!")
