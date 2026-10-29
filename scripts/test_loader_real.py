import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\redesign_v3"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def test_loader_real():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1366, "height": 820})
        
        await page.goto("http://localhost:3001/", wait_until="networkidle")
        await page.wait_for_timeout(400)
        
        # Click on Categories tab in header and capture instantly
        cat_btn = page.locator("button:has-text('Categories')").first
        await cat_btn.click()
        # The transition loader displays during navigation
        await page.wait_for_timeout(50)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "real_app_navigation_loader.png"))
        print("Captured real_app_navigation_loader.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_loader_real())
