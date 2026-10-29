import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\redesign_v3"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Test 1: Desktop Viewport
        page = await browser.new_page(viewport={"width": 1366, "height": 820})
        
        print("1. Testing Homepage with Ugaoo-style category circles & trust strip...")
        await page.goto("http://localhost:3001/", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        # Screenshot Hero + Categories
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_home_hero_categories.png"))
        print("Captured desktop_home_hero_categories.png")
        
        # Scroll to Category Section & Featured
        cat_section = page.locator("#section-categories")
        await cat_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_categories_circles.png"))
        print("Captured desktop_categories_circles.png")
        
        featured_section = page.locator("#featured")
        await featured_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_featured_plants.png"))
        print("Captured desktop_featured_plants.png")
        
        # Test 2: Dedicated Checkout Page with Delivery Notice
        print("2. Navigating to /checkout...")
        await page.goto("http://localhost:3001/checkout", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        # If cart is empty, add a plant first
        empty_cart = await page.locator("text='Your Order Cart is Empty'").count()
        if empty_cart > 0:
            print("Cart is empty, adding plant via Shop...")
            await page.goto("http://localhost:3001/", wait_until="networkidle")
            await page.wait_for_timeout(500)
            # Click Buy Now on first plant
            buy_now_btn = page.locator("button:has-text('Buy Now')").first
            await buy_now_btn.click()
            await page.wait_for_timeout(1200)
            
        print("Current URL:", page.url)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_checkout_delivery_notice.png"))
        print("Captured desktop_checkout_delivery_notice.png")
        
        # Test Pincode smart detector (Delhi pincode 110001 to show 'Coming Soon')
        pincode_input = page.locator("input[placeholder='e.g. 487001']")
        if await pincode_input.count() > 0:
            await pincode_input.fill("110001")
            await page.wait_for_timeout(500)
            await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "checkout_out_of_state_pincode_notice.png"))
            print("Captured checkout_out_of_state_pincode_notice.png")
            
            # Now test MP pincode (487001 to show 'Active Express')
            await pincode_input.fill("487001")
            await page.wait_for_timeout(500)
            await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "checkout_mp_pincode_active.png"))
            print("Captured checkout_mp_pincode_active.png")

        # Test Nursery Pickup Mode
        pickup_btn = page.locator("button:has-text('Nursery Pickup')")
        if await pickup_btn.count() > 0:
            await pickup_btn.click()
            await page.wait_for_timeout(500)
            await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "checkout_nursery_pickup_selected.png"))
            print("Captured checkout_nursery_pickup_selected.png")

        # Test 3: Mobile Viewport
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        print("3. Testing Mobile Viewport...")
        await mobile_page.goto("http://localhost:3001/", wait_until="networkidle")
        await mobile_page.wait_for_timeout(800)
        
        mobile_cat = mobile_page.locator("#section-categories")
        await mobile_cat.scroll_into_view_if_needed()
        await mobile_page.wait_for_timeout(500)
        await mobile_page.screenshot(path=os.path.join(SCREENSHOT_DIR, "mobile_categories_horizontal_scroll.png"))
        print("Captured mobile_categories_horizontal_scroll.png")
        
        # Test Mobile Checkout
        await mobile_page.goto("http://localhost:3001/checkout", wait_until="networkidle")
        await mobile_page.wait_for_timeout(800)
        await mobile_page.screenshot(path=os.path.join(SCREENSHOT_DIR, "mobile_checkout_delivery_notice.png"))
        print("Captured mobile_checkout_delivery_notice.png")

        await browser.close()
        print("All visual audit tests completed successfully!")

if __name__ == "__main__":
    asyncio.run(run_tests())
