import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOT_DIR = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\redesign_v3"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def test_loader():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1366, "height": 820})
        
        # Navigate to home
        await page.goto("http://localhost:3001/", wait_until="networkidle")
        await page.wait_for_timeout(500)
        
        # We can trigger the loader in DOM by clicking a category or running JS to set isNavigating / render loader
        # Let's inspect the loader HTML or render it via DOM injection
        await page.evaluate("""() => {
            const loaderDiv = document.createElement('div');
            loaderDiv.id = 'test-botanical-loader-preview';
            loaderDiv.innerHTML = `
                <div class="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FAF8F5]/95 backdrop-blur-md">
                    <div class="flex flex-col items-center justify-center space-y-6 select-none">
                        <div class="relative flex items-center justify-center">
                            <div class="absolute inset-0 -m-8 rounded-full bg-emerald-600/15 blur-2xl animate-pulse"></div>
                            <div class="relative w-32 h-32 flex items-center justify-center">
                                <div class="absolute inset-0 rounded-full border-2 border-emerald-950/10"></div>
                                <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0A4C36] border-r-[#0A4C36] animate-spin"></div>
                                <div class="absolute inset-2 rounded-full border-2 border-transparent border-b-amber-600 border-l-amber-600/60 animate-spin" style="animation-direction: reverse; animation-duration: 2.5s;"></div>
                                <div class="relative z-10 w-20 h-20 rounded-full bg-white shadow-xl border-2 border-[#0A4C36]/20 flex items-center justify-center p-2.5">
                                    <img src="/logo.png" alt="Green Vatika Logo" class="w-full h-full object-contain">
                                </div>
                            </div>
                        </div>
                        <div class="text-center space-y-2">
                            <div class="font-serif font-black text-2xl tracking-[0.22em] uppercase text-[#0A4C36]">Green Vatika</div>
                            <p class="text-xs font-semibold text-muted-foreground tracking-wider uppercase flex items-center justify-center gap-2">
                                <span>Nurturing Authentic Flora</span>
                                <span class="inline-flex items-center space-x-1">
                                    <span class="h-1.5 w-1.5 rounded-full bg-[#0A4C36] animate-bounce"></span>
                                    <span class="h-1.5 w-1.5 rounded-full bg-[#0A4C36] animate-bounce"></span>
                                    <span class="h-1.5 w-1.5 rounded-full bg-[#0A4C36] animate-bounce"></span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(loaderDiv);
        }""")
        
        await page.wait_for_timeout(300)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "botanical_logo_loader_rendered.png"))
        print("Captured botanical_logo_loader_rendered.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_loader())
