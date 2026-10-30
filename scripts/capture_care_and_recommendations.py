import os
import time
from playwright.sync_api import sync_playwright

out_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\user_requests_v6"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(1)

    # Click first plant
    page.locator("div[class*='cursor-pointer']:has(h3)").first.click()
    time.sleep(1.5)

    # Scroll to Care Guide
    page.locator("h3:has-text('Plant Specifications')").first.scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path=os.path.join(out_dir, "care_guide_3_cols_full.png"))

    # Scroll to You May Also Like
    page.locator("h3:has-text('You May Also Like')").first.scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path=os.path.join(out_dir, "you_may_also_like_both_prices_full.png"))

    browser.close()
