import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\redesign_v3"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def test_loader():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1366, "height": 820})
        
        # Navigate and capture early before 350ms initial loader dismisses, or evaluate component in DOM
        await page.goto("http://localhost:3001/", wait_until="commit")
        # Give 80ms for React mount
        await page.wait_for_timeout(90)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "brand_new_botanical_logo_loader.png"))
        print("Captured brand_new_botanical_logo_loader.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_loader())
