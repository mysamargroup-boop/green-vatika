import os
import time
import json
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaoo"
os.makedirs(output_dir, exist_ok=True)

def scroll_full_page(page):
    print("Scrolling page slowly to trigger lazy loading...")
    total_height = page.evaluate("document.body.scrollHeight")
    current_scroll = 0
    step = 600
    while current_scroll < total_height:
        current_scroll += step
        page.evaluate(f"window.scrollTo(0, {current_scroll})")
        time.sleep(0.35)
        total_height = page.evaluate("document.body.scrollHeight")
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 1366, "height": 850},
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    page = context.new_page()

    print("Opening https://www.ugaoo.com...")
    try:
        page.goto("https://www.ugaoo.com", wait_until="domcontentloaded", timeout=45000)
        time.sleep(3)
    except Exception as e:
        print("Page goto error:", e)

    # Dismiss any popups if present
    try:
        page.locator("button.popup-close, .needsclick, button[aria-label='Close'], .close-btn, #close-popup").first.click(timeout=3000)
    except Exception:
        pass

    scroll_full_page(page)

    home_screenshot_path = os.path.join(output_dir, "ugaoo_home_full.png")
    page.screenshot(path=home_screenshot_path, full_page=True)
    print(f"Saved homepage full screenshot: {home_screenshot_path}")

    # Extract design tokens from homepage
    design_info = page.evaluate("""() => {
        const bodyStyle = window.getComputedStyle(document.body);
        const headings = Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 5).map(h => ({
            tag: h.tagName,
            text: h.innerText.slice(0, 30),
            fontFamily: window.getComputedStyle(h).fontFamily,
            fontSize: window.getComputedStyle(h).fontSize,
            fontWeight: window.getComputedStyle(h).fontWeight,
            color: window.getComputedStyle(h).color
        }));

        const buttons = Array.from(document.querySelectorAll('button, a.btn, .btn, [class*="button"]')).slice(0, 5).map(b => ({
            text: (b.innerText || '').slice(0, 25),
            bg: window.getComputedStyle(b).backgroundColor,
            color: window.getComputedStyle(b).color,
            radius: window.getComputedStyle(b).borderRadius,
            padding: window.getComputedStyle(b).padding
        }));

        const cards = Array.from(document.querySelectorAll('[class*="product-card"], [class*="card"], [class*="grid-item"]')).slice(0, 3).map(c => ({
            className: c.className,
            bg: window.getComputedStyle(c).backgroundColor,
            radius: window.getComputedStyle(c).borderRadius,
            border: window.getComputedStyle(c).border
        }));

        const fonts = new Set();
        document.querySelectorAll('body, h1, h2, h3, p, span, a, button').forEach(el => {
            const f = window.getComputedStyle(el).fontFamily;
            if (f) fonts.add(f);
        });

        return {
            bodyFont: bodyStyle.fontFamily,
            bodyColor: bodyStyle.color,
            bgColor: bodyStyle.backgroundColor,
            headings,
            buttons,
            cards,
            allFonts: Array.from(fonts)
        };
    }""")
    with open(os.path.join(output_dir, "ugaoo_design_tokens.json"), "w", encoding="utf-8") as f:
        json.dump(design_info, f, indent=2)
    print("Saved design tokens JSON.")

    # Find product links
    product_links = page.evaluate("""() => {
        const links = Array.from(document.querySelectorAll('a[href*="/products/"]'));
        return Array.from(new Set(links.map(a => a.href))).filter(h => h.includes('/products/'));
    }""")
    print("Found product links count:", len(product_links))

    # Find collection links
    collection_links = page.evaluate("""() => {
        const links = Array.from(document.querySelectorAll('a[href*="/collections/"]'));
        return Array.from(new Set(links.map(a => a.href))).filter(h => h.includes('/collections/'));
    }""")
    print("Found collection links count:", len(collection_links))

    # Visit a collection page
    coll_target = None
    for cl in collection_links:
        if "plant" in cl.lower() and not "care" in cl.lower():
            coll_target = cl
            break
    if not coll_target and collection_links:
        coll_target = collection_links[0]

    if coll_target:
        print("Visiting collection:", coll_target)
        try:
            page.goto(coll_target, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)
            scroll_full_page(page)
            coll_screenshot_path = os.path.join(output_dir, "ugaoo_collection_full.png")
            page.screenshot(path=coll_screenshot_path, full_page=True)
            print("Saved collection screenshot:", coll_screenshot_path)
        except Exception as e:
            print("Collection page error:", e)

    # Visit a product page
    prod_target = None
    if product_links:
        prod_target = product_links[0]
    
    # If no product links found on home, search on collection page
    if not prod_target:
        new_prod_links = page.evaluate("""() => {
            const links = Array.from(document.querySelectorAll('a[href*="/products/"]'));
            return Array.from(new Set(links.map(a => a.href))).filter(h => h.includes('/products/'));
        }""")
        if new_prod_links:
            prod_target = new_prod_links[0]

    if prod_target:
        print("Visiting product:", prod_target)
        try:
            page.goto(prod_target, wait_until="domcontentloaded", timeout=45000)
            time.sleep(3)
            scroll_full_page(page)
            prod_screenshot_path = os.path.join(output_dir, "ugaoo_product_full.png")
            page.screenshot(path=prod_screenshot_path, full_page=True)
            print("Saved product screenshot:", prod_screenshot_path)

            # Analyze product page elements
            prod_info = page.evaluate("""() => {
                const title = document.querySelector('h1')?.innerText;
                const price = document.querySelector('.price, [class*="price"]')?.innerText;
                const addToCartBtn = document.querySelector('button[name="add"], .btn-add-to-cart, [class*="add-to-cart"]');
                return {
                    title,
                    price,
                    btnStyle: addToCartBtn ? {
                        text: addToCartBtn.innerText,
                        bg: window.getComputedStyle(addToCartBtn).backgroundColor,
                        color: window.getComputedStyle(addToCartBtn).color,
                        radius: window.getComputedStyle(addToCartBtn).borderRadius
                    } : null
                };
            }""")
            with open(os.path.join(output_dir, "ugaoo_product_info.json"), "w", encoding="utf-8") as f:
                json.dump(prod_info, f, indent=2)
        except Exception as e:
            print("Product page error:", e)

    browser.close()
    print("Done inspection!")
