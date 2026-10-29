import os
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaoo"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 850})
    
    print("Checking cart and checkout flow on ugaoo.com...")
    try:
        page.goto("https://www.ugaoo.com/products/tiger-lily-bulbs", wait_until="domcontentloaded", timeout=45000)
        page.wait_for_timeout(3000)
        
        btn = page.locator("button[name='add'], .btn-add-to-cart, [class*='add-to-cart']").first
        if btn.is_visible():
            btn.click()
            page.wait_for_timeout(3000)
            page.screenshot(path=os.path.join(output_dir, "ugaoo_cart_drawer.png"))
            print("Captured cart drawer!")
            
            checkout_btn = page.locator("button[name='checkout'], a[href*='checkout'], [class*='checkout']").first
            if checkout_btn.is_visible():
                print("Found checkout button text:", checkout_btn.inner_text())
                checkout_btn.click()
                page.wait_for_timeout(4000)
                print("Checkout page URL:", page.url)
                page.screenshot(path=os.path.join(output_dir, "ugaoo_checkout_page.png"))
                print("Captured checkout page!")
    except Exception as e:
        print("Error in cart check:", e)
        
    browser.close()
