import os
import urllib.request
import re

FONTS_DIR = r"D:\Web Projects\Nursery\public\fonts"
os.makedirs(FONTS_DIR, exist_ok=True)

# Google Fonts CSS URL for Outfit
url = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

req = urllib.request.Request(url, headers=headers)
css_content = urllib.request.urlopen(req).read().decode('utf-8')

# Find all font files and download
font_urls = re.findall(r'url\((https://[^)]+\.woff2)\)', css_content)
print(f"Found {len(font_urls)} font urls in CSS.")

downloaded = {}
for i, furl in enumerate(font_urls):
    filename = f"font_{i}.woff2"
    # Try to deduce name from CSS context or query
    # E.g. Outfit or Playfair
    local_path = os.path.join(FONTS_DIR, filename)
    try:
        urllib.request.urlretrieve(furl, local_path)
        downloaded[furl] = f"/fonts/{filename}"
        print(f"Downloaded {filename} from {furl}")
    except Exception as e:
        print(f"Failed {furl}: {e}")

# Replace URLs in CSS
local_css = css_content
for furl, lpath in downloaded.items():
    local_css = local_css.replace(furl, lpath)

FONTS_CSS_PATH = r"D:\Web Projects\Nursery\src\fonts.css"
with open(FONTS_CSS_PATH, "w", encoding="utf-8") as f:
    f.write("/* Ugaoo-Inspired Font System: Outfit (Body/UI) + Playfair Display / Libertinus Serif (Botanical Display) */\n\n")
    f.write(local_css)

print(f"Updated {FONTS_CSS_PATH} with local Outfit and Playfair Display fonts!")
