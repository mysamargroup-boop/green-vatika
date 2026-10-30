from playwright.sync_api import sync_playwright
import json
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1366, 'height': 850})
    page.goto('https://www.ugaoo.com', wait_until='domcontentloaded', timeout=40000)
    page.wait_for_timeout(3000)
    
    # Save focused screenshot of top viewport (hero)
    page.screenshot(path=r'C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaoo\focused_hero.png')
    
    # Also mobile
    page.set_viewport_size({'width': 375, 'height': 812})
    page.wait_for_timeout(1000)
    page.screenshot(path=r'C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\ugaoo\focused_hero_mobile.png')
    
    data = page.evaluate('''() => {
        const banners = Array.from(document.querySelectorAll('.slideshow, [class*="banner"], [class*="slider"], .hero, main > div:first-child')).slice(0, 5).map(e => ({
            tag: e.tagName,
            cls: e.className,
            text: e.innerText.trim().slice(0, 300),
            imgs: Array.from(e.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt }))
        }));
        return banners;
    }''')
    print('Hero Banners:', json.dumps(data, indent=2))
    browser.close()
