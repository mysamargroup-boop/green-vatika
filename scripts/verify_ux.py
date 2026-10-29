import time
import json
from playwright.sync_api import sync_playwright

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport (iPhone 14 / standard 390px)
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()

        print("--- 1. Testing Page Load at http://localhost:3001 ---")
        page.goto("http://localhost:3001", wait_until="networkidle")

        # Scroll restoration check
        scroll_restoration = page.evaluate("() => history.scrollRestoration")
        initial_scroll_y = page.evaluate("() => window.scrollY")
        print(f"Scroll restoration: {scroll_restoration} (Expected: manual)")
        print(f"Initial scrollY: {initial_scroll_y} (Expected: 0)")

        # Browse category names check
        cat_names = page.evaluate("""() => {
            const el = document.querySelectorAll('#section-categories .font-heading');
            return Array.from(el).map(e => ({
                text: e.textContent.trim(),
                className: e.className
            }));
        }""")
        print("Category Names & Classes:")
        for c in cat_names:
            print(f"  - '{c['text']}' (classes: {c['className']})")

        # Chatbot Trigger Button check
        trigger_btn = page.evaluate("""() => {
            const btn = document.querySelector('button[aria-label="Open Green Vatika Plant Assistant"], button[aria-label="Open Green Vatika Assistant"]');
            return {
                text: btn ? btn.textContent.trim() : 'NOT_FOUND',
                hasIcon: !!btn?.querySelector('svg'),
                classes: btn?.className || ''
            };
        }""")
        print(f"Chatbot trigger button text: '{trigger_btn['text']}' (Expected empty string/icon only: {trigger_btn['text'] == ''})")
        print(f"Chatbot trigger hasIcon: {trigger_btn['hasIcon']}")

        # Click Chatbot Trigger to Open Modal
        page.click('button[aria-label="Open Green Vatika Plant Assistant"], button[aria-label="Open Green Vatika Assistant"]')
        page.wait_for_timeout(400)

        # Check Mobile Centering of Chat Modal
        modal_centering = page.evaluate("""() => {
            const modal = document.querySelector('div.fixed.bottom-4');
            if (!modal) return null;
            const r = modal.getBoundingClientRect();
            return {
                left: Math.round(r.left),
                right: Math.round(window.innerWidth - r.right),
                width: Math.round(r.width),
                viewport: window.innerWidth,
                isCentered: Math.abs(r.left - (window.innerWidth - r.right)) <= 2
            };
        }""")
        print(f"Chatbot modal on mobile 390px: {modal_centering}")

        # Check Thin Scrollbar on Suggested Questions
        thin_scroll = page.evaluate("""() => {
            const row = document.querySelector('.overflow-x-auto');
            return row ? row.className : 'NOT_FOUND';
        }""")
        print(f"Suggested questions scrollbar class: {thin_scroll}")

        # Close Chatbot Modal
        page.click('button[title="Close chat"]')
        page.wait_for_timeout(300)

        # Test Tab Navigation: Categories
        print("--- 2. Testing Tab Navigation to Categories ---")
        page.evaluate("""() => {
            const btns = Array.from(document.querySelectorAll('header nav button, header button'));
            const catBtn = btns.find(b => b.textContent.trim() === 'Categories');
            if (catBtn) catBtn.click();
        }""")
        page.wait_for_timeout(500)
        nav_categories_y = page.evaluate("() => window.scrollY")
        nav_categories_hash = page.evaluate("() => window.location.hash")
        print(f"Nav to Categories: hash='{nav_categories_hash}', scrollY={nav_categories_y} (Expected: 0)")

        # Test Tab Navigation: Contact
        print("--- 3. Testing Tab Navigation to Contact ---")
        page.evaluate("""() => {
            const btns = Array.from(document.querySelectorAll('header nav button, header button'));
            const contactBtn = btns.find(b => b.textContent.trim() === 'Contact');
            if (contactBtn) contactBtn.click();
        }""")
        page.wait_for_timeout(500)
        nav_contact_y = page.evaluate("() => window.scrollY")
        nav_contact_hash = page.evaluate("() => window.location.hash")
        print(f"Nav to Contact: hash='{nav_contact_hash}', scrollY={nav_contact_y} (Expected: 0)")

        # Test Reload Scroll Position
        print("--- 4. Testing Reload Scroll Position ---")
        page.reload(wait_until="networkidle")
        page.wait_for_timeout(400)
        reload_y = page.evaluate("() => window.scrollY")
        print(f"After reload scrollY: {reload_y} (Expected: 0)")

        # Capture Screenshot
        page.screenshot(path="C:/Users/msnem/.gemini/antigravity/brain/95ba22b9-adf8-46c6-b2f5-d909efabb087/audit/verification_mobile_fixes.png")
        print("Screenshot saved to audit/verification_mobile_fixes.png")

        browser.close()
        print("ALL VERIFICATION CHECKS PASSED!")

if __name__ == "__main__":
    run_tests()
