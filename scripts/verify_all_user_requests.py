import os
import time
from playwright.sync_api import sync_playwright

out_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\user_requests_v4"
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop Test
    page = browser.new_page(viewport={"width": 1366, "height": 850})
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)
    
    # Check TrustValueStrip (Free Plant Doctor with Stethoscope)
    trust = page.locator("text=Free Plant Doctor").first.locator("xpath=ancestor::div[contains(@class, 'flex items-start')]").first
    trust.screenshot(path=os.path.join(out_dir, "trust_free_plant_doctor_stethoscope.png"))
    print("Saved free plant doctor screenshot.")
    
    # Check ShopSection Category Tabs (All Plants no left cut)
    tabs = page.locator("button:has-text('All Plants')").first.locator("xpath=ancestor::div[contains(@class, 'flex items-center gap')]").first
    tabs.screenshot(path=os.path.join(out_dir, "shop_category_tabs_no_left_clipping.png"))
    print("Saved category tabs screenshot.")
    
    # 2. Check Blog Page (No header overlap + bottom faded hero)
    page.click("button:has-text('Blog')")
    time.sleep(1.5)
    page.screenshot(path=os.path.join(out_dir, "blog_page_top_faded_hero_no_overlap.png"))
    print("Saved blog page screenshot.")
    
    # 3. Check Categories Page (Completely redesigned luxury layout + no header overlap)
    page.click("button:has-text('Categories')")
    time.sleep(1.5)
    page.screenshot(path=os.path.join(out_dir, "categories_page_redesigned_no_overlap.png"))
    print("Saved categories page screenshot.")
    
    # 4. Check Product Page (Wider layout + no header overlap)
    page.click("button:has-text('Home')")
    time.sleep(1)
    # Click on first product
    page.locator("h3.font-heading").first.click()
    time.sleep(1.5)
    page.screenshot(path=os.path.join(out_dir, "product_page_wider_no_overlap.png"))
    print("Saved product page screenshot.")
    
    # 5. Mobile check on Shop Tabs & Blog Page
    mobile = browser.new_page(viewport={"width": 375, "height": 812})
    mobile.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)
    
    mobile.evaluate("window.scrollTo(0, 1200)")
    time.sleep(1)
    mobile_tabs = mobile.locator("button:has-text('All Plants')").first.locator("xpath=ancestor::div[contains(@class, 'flex items-center gap')]").first
    mobile_tabs.screenshot(path=os.path.join(out_dir, "mobile_shop_tabs_no_cut.png"))
    print("Saved mobile tabs screenshot.")
    
    browser.close()
print("All visual verification tests completed!")
