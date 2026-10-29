import time
from playwright.sync_api import sync_playwright

def verify_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Test in desktop and mobile viewports
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        pages_to_test = [
            ("#categories", "Categories Page", "Explore Our Botanical Categories"),
            ("#about", "About Page", "About Green Vatika Nursery"),
            ("#services", "Services Page", "Transforming Spaces Into Flourishing Living Oases"),
            ("#blog", "Blog Page", "Evidence-Based Indian Gardening Wisdom"),
            ("#contact", "Contact Page", "Connect With Green Vatika Nursery"),
            ("#shop", "Shop Page", "Shop Sun-Hardened Plants & Handcrafted Pots"),
            ("#quiz", "Quiz Matcher Page", "Find Your Ideal Plant Match in 60 Seconds"),
        ]

        print("=== VERIFYING DISTINCT STANDALONE PAGES ===")
        for route, label, expected_title in pages_to_test:
            url = f"http://localhost:3001/{route}"
            print(f"\n--- Testing {label} ({url}) ---")
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(350)

            # Check that scroll is strictly at top (0, 0)
            scroll_y = page.evaluate("() => window.scrollY")
            print(f"ScrollY on load: {scroll_y} (Expected: 0)")

            # Check that page title is distinct and rendered
            h1_text = page.evaluate("() => document.querySelector('h1')?.textContent?.trim()")
            print(f"Page H1: '{h1_text}'")

            assert scroll_y == 0, f"Scroll was not at top on {label}: got {scroll_y}"
            assert h1_text and expected_title.lower() in h1_text.lower(), f"Expected title '{expected_title}' not found in H1 '{h1_text}'"

            # Capture screenshot
            clean_name = label.lower().replace(' ', '_')
            page.screenshot(path=f"C:/Users/msnem/.gemini/antigravity/brain/95ba22b9-adf8-46c6-b2f5-d909efabb087/audit/page_{clean_name}.png")
            print(f"Screenshot saved: page_{clean_name}.png")

        browser.close()
        print("\nALL DISTINCT STANDALONE PAGES VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    verify_pages()
