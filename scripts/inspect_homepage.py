import time
from playwright.sync_api import sync_playwright

def inspect():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop 1440x900
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:3001", wait_until="networkidle")
        page.wait_for_timeout(500)

        page.screenshot(path="C:/Users/msnem/.gemini/antigravity/brain/95ba22b9-adf8-46c6-b2f5-d909efabb087/audit/home_desktop_full.png", full_page=True)
        print("Captured full desktop homepage screenshot.")

        # Capture specific sections
        sections = [
            ("hero", "#home"),
            ("categories", "#section-categories"),
            ("featured_shop", "#featured"),
            ("quiz", "#section-quiz"),
            ("services", "#section-services"),
            ("testimonials", "#testimonials"),
            ("blog", "#section-blog"),
            ("contact", "#section-contact")
        ]

        for name, selector in sections:
            el = page.query_selector(selector)
            if el:
                el.screenshot(path=f"C:/Users/msnem/.gemini/antigravity/brain/95ba22b9-adf8-46c6-b2f5-d909efabb087/audit/section_{name}.png")
                print(f"Captured section screenshot: {name}")

        # Mobile 390x844
        mobile_page = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_page.goto("http://localhost:3001", wait_until="networkidle")
        mobile_page.wait_for_timeout(500)
        mobile_page.screenshot(path="C:/Users/msnem/.gemini/antigravity/brain/95ba22b9-adf8-46c6-b2f5-d909efabb087/audit/home_mobile_full.png", full_page=True)
        print("Captured full mobile homepage screenshot.")

        browser.close()

if __name__ == "__main__":
    inspect()
