import time
from playwright.sync_api import sync_playwright

def fetch_dribbble():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={"width": 1440, "height": 900}
        )
        page = context.new_page()

        print("Navigating to Dribbble search: plant shop...")
        try:
            page.goto("https://dribbble.com/search/plant-shop", wait_until="networkidle", timeout=20000)
            page.wait_for_timeout(2000)

            # Get shots
            shots = page.evaluate("""() => {
                const cards = document.querySelectorAll('li.shot-thumbnail, [data-thumbnail-id], div.shot-details-container');
                return Array.from(cards).slice(0, 10).map(c => {
                    const title = c.querySelector('.shot-title, [data-test="shot-title"]')?.textContent?.trim();
                    const designer = c.querySelector('.display-name, [data-test="user-display-name"]')?.textContent?.trim();
                    const img = c.querySelector('img')?.src;
                    return { title, designer, img };
                });
            }""")
            print(f"Found {len(shots)} shots:")
            for s in shots:
                print(f"  - {s.get('title')} by {s.get('designer')} ({s.get('img')})")

            page.screenshot(path="C:/Users/msnem/.gemini/antigravity/brain/95ba22b9-adf8-46c6-b2f5-d909efabb087/audit/dribbble_plant_shop.png")
            print("Saved Dribbble search screenshot.")
        except Exception as e:
            print("Dribbble search error:", e)

        browser.close()

if __name__ == "__main__":
    fetch_dribbble()
