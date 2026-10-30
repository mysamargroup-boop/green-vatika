from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1366, 'height': 850})
    page.goto('https://www.ugaoo.com', wait_until='domcontentloaded', timeout=40000)
    page.wait_for_timeout(3000)
    
    # Locate first section inside main or slideshow
    first_sec = page.locator('main > div, main > section, .shopify-section').nth(0)
    print('First sec box:', first_sec.bounding_box())
    first_sec.screenshot(path=r'C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaoo\ugaoo_hero_exact.png')
    
    # Save the links and images inside it
    info = first_sec.evaluate('''el => {
        const imgs = Array.from(el.querySelectorAll('img')).map(i => ({
            src: i.src,
            srcset: i.srcset,
            alt: i.alt,
            w: i.naturalWidth,
            h: i.naturalHeight
        }));
        const links = Array.from(el.querySelectorAll('a')).map(a => ({
            href: a.href,
            text: a.innerText.trim()
        }));
        return { imgs, links, text: el.innerText.trim() };
    }''')
    import json
    print('Hero details:', json.dumps(info, indent=2))
    
    # Switch to mobile
    page.set_viewport_size({'width': 375, 'height': 812})
    page.wait_for_timeout(1000)
    first_sec_m = page.locator('main > div, main > section, .shopify-section').nth(0)
    first_sec_m.screenshot(path=r'C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaoo\ugaoo_hero_exact_mobile.png')
    
    browser.close()
