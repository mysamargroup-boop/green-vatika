import os
import time
from playwright.sync_api import sync_playwright

out_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaao_redesign_v2"
os.makedirs(out_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop Test
    page = browser.new_page(viewport={"width": 1366, "height": 850})
    page.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)
    
    page.screenshot(path=os.path.join(out_dir, "desktop_hero_ugaoo.png"))
    print("Desktop hero screenshot saved.")
    
    page.screenshot(path=os.path.join(out_dir, "desktop_full_home.png"), full_page=True)
    print("Desktop full home screenshot saved.")
    
    # 2. Mobile Test (375x812)
    mobile = browser.new_page(viewport={"width": 375, "height": 812})
    mobile.goto("http://localhost:3001", wait_until="networkidle")
    time.sleep(2)
    
    # Hero viewport
    mobile.screenshot(path=os.path.join(out_dir, "mobile_hero_ugaoo.png"))
    print("Mobile hero screenshot saved.")
    
    # Scroll down to categories
    cat = mobile.locator("#section-categories")
    cat.scroll_into_view_if_needed()
    time.sleep(1)
    cat.screenshot(path=os.path.join(out_dir, "mobile_categories_no_scrollbar.png"))
    print("Mobile categories screenshot saved.")
    
    # Chatbot button screenshot on mobile
    mobile.evaluate("window.scrollTo(0, 500)")
    time.sleep(0.5)
    mobile.screenshot(path=os.path.join(out_dir, "mobile_chatbot_position.png"))
    print("Mobile chatbot screenshot saved.")
    
    # Full mobile page
    mobile.screenshot(path=os.path.join(out_dir, "mobile_full_home.png"), full_page=True)
    print("Mobile full home screenshot saved.")
    
    browser.close()
print("All verification screenshots completed successfully!")
