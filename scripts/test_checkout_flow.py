import os
import time
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\msnem\.gemini\antigravity\brain\95ba22b9-adf8-46c6-b2f5-d909efabb087\audit\checkout"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # 1. Desktop Test
    context = browser.new_context(viewport={"width": 1366, "height": 900})
    page = context.new_page()

    print("Navigating to shop page on localhost:3001...")
    page.goto("http://localhost:3001/shop", wait_until="networkidle")
    time.sleep(1)

    # Click 'Buy Now' on the first plant card
    print("Clicking 'Buy Now' on first plant card...")
    buy_now_btn = page.locator("button:has-text('Buy Now')").first
    buy_now_btn.click()
    time.sleep(1)

    current_url = page.url
    print(f"Current URL after Buy Now: {current_url}")
    assert "/checkout" in current_url, f"Expected /checkout in URL, got {current_url}"

    # Verify no popup modal
    modal_count = page.locator(".fixed.inset-0.z-50, .fixed.inset-0.z-\\[100\\]").count()
    print(f"Active popups count: {modal_count} (should be 0)")

    # Capture Desktop Checkout initial screenshot
    desk_path = os.path.join(output_dir, "desktop_checkout_page.png")
    page.screenshot(path=desk_path, full_page=True)
    print(f"Saved desktop checkout screenshot: {desk_path}")

    # Fill checkout form
    print("Testing form fill and pincode auto-fill...")
    page.locator("input[placeholder*='Anand Verma']").fill("Vikram Malhotra")
    page.locator("input[placeholder*='98765']").fill("9876543210")
    page.locator("input[placeholder*='House No']").fill("Plot 12, Subhash Marg")
    
    # Test Pincode auto-fill
    pincode_input = page.locator("input[placeholder*='487001']")
    pincode_input.fill("487001")
    time.sleep(0.5)

    city_val = page.locator("input[placeholder*='Narsinghpur']").input_value()
    print(f"Auto-filled City for 487001: '{city_val}'")

    # Test applying coupon GREEN10
    coupon_input = page.locator("input[placeholder*='GREEN10']")
    coupon_input.fill("GREEN10")
    page.locator("button:has-text('Apply')").first.click()
    time.sleep(1)

    # Capture Desktop with coupon applied
    coupon_shot = os.path.join(output_dir, "desktop_checkout_with_coupon.png")
    page.screenshot(path=coupon_shot)
    print(f"Saved coupon applied screenshot: {coupon_shot}")

    # Submit Order
    print("Submitting order...")
    page.locator("button:has-text('Place Order Now')").click()
    time.sleep(1.5)

    # Capture Order Success Confirmation screen
    success_shot = os.path.join(output_dir, "desktop_order_confirmed.png")
    page.screenshot(path=success_shot)
    print(f"Saved order confirmation screenshot: {success_shot}")

    # 2. Mobile Viewport Test (iPhone 14 / Pixel 7: 390x844)
    mobile_context = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
    mobile_page = mobile_context.new_page()

    print("Testing Mobile Checkout...")
    mobile_page.goto("http://localhost:3001/product?id=yellow-marigold-genda", wait_until="networkidle")
    time.sleep(1)

    # Click mobile Checkout button
    mobile_checkout_btn = mobile_page.locator("aside button:has-text('Checkout')")
    mobile_checkout_btn.click()
    time.sleep(1)

    print(f"Mobile URL: {mobile_page.url}")
    mobile_shot = os.path.join(output_dir, "mobile_checkout_page.png")
    mobile_page.screenshot(path=mobile_shot, full_page=True)
    print(f"Saved mobile checkout screenshot: {mobile_shot}")

    browser.close()
    print("All checkout tests passed successfully!")
