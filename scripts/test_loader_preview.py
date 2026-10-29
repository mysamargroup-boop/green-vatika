import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\redesign_v3"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def test_loader_preview():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1366, "height": 820})
        
        # Navigate to a special hash or query that triggers initial loading longer
        await page.goto("http://localhost:3001/?loading_test=true", wait_until="domcontentloaded")
        await page.wait_for_timeout(100)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "initial_loading_spinner.png"))
        print("Captured initial_loading_spinner.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_loader_preview())
