import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\delivery_paused"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def test_delivery_paused():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # 1. Desktop Test
        page = await browser.new_page(viewport={"width": 1366, "height": 840})
        print("1. Loading Homepage...")
        await page.goto("http://localhost:3001/", wait_until="networkidle")
        await page.wait_for_timeout(800)
        
        # Header announcement screenshot
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_header_delivery_paused_announcement.png"))
        print("Captured desktop_header_delivery_paused_announcement.png")
        
        # Add a plant via Shop Buy Now button
        print("2. Clicking Buy Now on featured plant...")
        buy_now_btn = page.locator("button:has-text('Buy Now')").first
        await buy_now_btn.scroll_into_view_if_needed()
        await page.wait_for_timeout(300)
        await buy_now_btn.click()
        await page.wait_for_timeout(1000)
        
        # Check current URL is /checkout
        print("Current URL:", page.url)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_checkout_delivery_paused_top.png"))
        print("Captured desktop_checkout_delivery_paused_top.png")
        
        # Scroll to Step 2 & Step 3
        fulfillment_step = page.locator("text='Fulfillment Method'")
        await fulfillment_step.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_checkout_fulfillment_nursery_pickup.png"))
        print("Captured desktop_checkout_fulfillment_nursery_pickup.png")

        # Scroll to Order Summary & Submit button
        order_summary = page.locator("text='Order Summary'")
        await order_summary.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_checkout_order_summary_free_pickup.png"))
        print("Captured desktop_checkout_order_summary_free_pickup.png")

        # Fill name & phone and test placement
        await page.locator("input[placeholder='e.g. Anand Verma']").fill("Anand Verma")
        await page.locator("input[placeholder='+91 98765 43210']").fill("9479480068")
        await page.wait_for_timeout(300)
        
        submit_btn = page.locator("button:has-text('Reserve for Nursery Pickup')")
        await submit_btn.click()
        await page.wait_for_timeout(1200)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "desktop_order_confirmed_nursery_pickup.png"))
        print("Captured desktop_order_confirmed_nursery_pickup.png")

        # 2. Mobile Viewport Test
        mobile_page = await browser.new_page(viewport={"width": 390, "height": 844})
        print("3. Testing Mobile Viewport...")
        await mobile_page.goto("http://localhost:3001/checkout", wait_until="networkidle")
        await mobile_page.wait_for_timeout(800)
        
        # Add item if cart empty
        empty_count = await mobile_page.locator("text='Your Order Cart is Empty'").count()
        if empty_count > 0:
            await mobile_page.goto("http://localhost:3001/", wait_until="networkidle")
            await mobile_page.wait_for_timeout(500)
            await mobile_page.locator("button:has-text('Buy Now')").first.click()
            await mobile_page.wait_for_timeout(800)
            
        await mobile_page.screenshot(path=os.path.join(SCREENSHOT_DIR, "mobile_checkout_delivery_paused.png"))
        print("Captured mobile_checkout_delivery_paused.png")

        await browser.close()
        print("All tests completed successfully!")

if __name__ == "__main__":
    asyncio.run(test_delivery_paused())
