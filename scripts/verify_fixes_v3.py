import os
import time
from playwright.sync_api import sync_playwright

out_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\fix_verification_v3"
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 850})
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)
    
    # 1. Comparison Section on Desktop
    comp = page.locator("text=Green Vatika vs The Rest").first.locator("xpath=ancestor::section").first
    comp.scroll_into_view_if_needed()
    time.sleep(0.5)
    comp.screenshot(path=os.path.join(out_dir, "desktop_comparison_no_black_lines.png"))
    print("Desktop comparison screenshot saved.")
    
    # 2. WhatsApp Doctor Banner on Desktop
    doc = page.locator("text=Stuck with plant care?").first.locator("xpath=ancestor::section").first
    doc.scroll_into_view_if_needed()
    time.sleep(0.5)
    doc.screenshot(path=os.path.join(out_dir, "desktop_whatsapp_banner_full_width.png"))
    print("Desktop whatsapp banner screenshot saved.")
    
    # 3. New Replacement Pillars Section (Replacing 10 Years About)
    pillars = page.locator("text=Why Green Vatika Plants Flourish in Indian Homes").first.locator("xpath=ancestor::section").first
    pillars.scroll_into_view_if_needed()
    time.sleep(0.5)
    pillars.screenshot(path=os.path.join(out_dir, "desktop_new_pillars_section.png"))
    print("New pillars section screenshot saved.")
    
    # 4. Mobile Comparison & Spacing
    mobile = browser.new_page(viewport={"width": 375, "height": 812})
    mobile.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)
    
    comp_m = mobile.locator("text=Green Vatika vs The Rest").first.locator("xpath=ancestor::section").first
    comp_m.scroll_into_view_if_needed()
    time.sleep(0.5)
    comp_m.screenshot(path=os.path.join(out_dir, "mobile_comparison_cards.png"))
    print("Mobile comparison cards screenshot saved.")
    
    doc_m = mobile.locator("text=Stuck with plant care?").first.locator("xpath=ancestor::section").first
    doc_m.scroll_into_view_if_needed()
    time.sleep(0.5)
    doc_m.screenshot(path=os.path.join(out_dir, "mobile_whatsapp_banner.png"))
    print("Mobile whatsapp banner screenshot saved.")
    
    browser.close()
print("All fix screenshots completed successfully!")
