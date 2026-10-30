import os
import time
from playwright.sync_api import sync_playwright

out_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\user_requests_v6"
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    print("Navigating to http://localhost:3001 ...")
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)

    # 1. Header Logo Tagline (Hinglish: Seedha Nursery Se Aapke Ghar)
    header_logo = page.locator("button:has(img[alt='Green Vatika Logo'])").first
    header_logo.screenshot(path=os.path.join(out_dir, "header_hinglish_tagline.png"))
    tagline_text = page.locator("header").inner_text()
    print("Header text snippet:", "Seedha Nursery Se Aapke Ghar" in tagline_text)

    # 2. WhatsApp Doctor Banner (White button, dark text)
    doctor_banner = page.locator("section:has-text('Chat With Plant Doctor')").first
    if doctor_banner.count() > 0:
        doctor_banner.scroll_into_view_if_needed()
        time.sleep(0.8)
        doctor_banner.screenshot(path=os.path.join(out_dir, "whatsapp_doctor_banner_white_btn.png"))
        print("WhatsApp doctor banner with white button captured.")

    # 3. Footer (Crafted with Samar centered)
    footer = page.locator("footer").first
    if footer.count() > 0:
        footer.scroll_into_view_if_needed()
        time.sleep(0.8)
        footer.screenshot(path=os.path.join(out_dir, "footer_crafted_with_samar_centered.png"))
        print("Footer centered credits captured.")

    # 4. Navigate to a Product Page (e.g. Adenium Bonsai)
    print("Navigating to Product Page...")
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(1)

    # Click first plant card
    first_plant = page.locator("div[class*='cursor-pointer']:has(h3)").first
    if first_plant.count() > 0:
        first_plant.click()
        time.sleep(1.5)

        # Above-the-fold Product Page Screenshot (3:4 Image, Price Color, Short Desc, FOMO)
        page.screenshot(path=os.path.join(out_dir, "product_page_top_fomo_price_desc.png"))

        # Scroll to Plant Specifications & Care Guide (3 Columns)
        care_guide = page.locator("div:has-text('Plant Specifications & Care Guide')").last
        if care_guide.count() > 0:
            care_guide.scroll_into_view_if_needed()
            time.sleep(0.8)
            care_guide.screenshot(path=os.path.join(out_dir, "product_care_guide_3_columns.png"))

        # Scroll to "You May Also Like" (both prices, discount badge, reviews)
        related_section = page.locator("div:has-text('You May Also Like')").last
        if related_section.count() > 0:
            related_section.scroll_into_view_if_needed()
            time.sleep(0.8)
            related_section.screenshot(path=os.path.join(out_dir, "product_you_may_also_like_details.png"))

    browser.close()
    print("All v6 visual tests executed successfully!")
