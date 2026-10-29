import urllib.request
import re
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

# Playfair Display (luxury botanical display headings) + Plus Jakarta Sans (ultra-clean modern UI & body)
url = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap'

req = urllib.request.Request(url, headers=headers)
css_content = urllib.request.urlopen(req).read().decode('utf-8')

blocks = css_content.split('@font-face')
fonts_dir = 'public/fonts'
os.makedirs(fonts_dir, exist_ok=True)

font_face_css = []

for block in blocks:
    if 'src:' not in block:
        continue
    family_match = re.search(r"font-family:\s*['\"]([^'\"]+)['\"]", block)
    weight_match = re.search(r"font-weight:\s*(\d+)", block)
    style_match = re.search(r"font-style:\s*(\w+)", block)
    url_match = re.search(r"src:\s*url\((https://[^\)]+\.woff2)\)", block)
    
    if family_match and weight_match and style_match and url_match:
        family = family_match.group(1)
        weight = weight_match.group(1)
        style = style_match.group(1)
        woff2_url = url_match.group(1)
        
        safe_family = family.replace(' ', '')
        filename = f"{safe_family}-{weight}-{style}.woff2"
        local_path = os.path.join(fonts_dir, filename)
        
        if not os.path.exists(local_path):
            data = urllib.request.urlopen(urllib.request.Request(woff2_url, headers=headers)).read()
            with open(local_path, 'wb') as f:
                f.write(data)
            print(f"Downloaded: {filename} ({len(data)/1024:.1f} KB)")
        else:
            print(f"Exists: {filename}")
            
        font_face_css.append(f"""@font-face {{
  font-family: '{family}';
  font-style: {style};
  font-weight: {weight};
  font-display: swap;
  src: url('/fonts/{filename}') format('woff2');
}}""")

css_out_path = 'src/fonts.css'
with open(css_out_path, 'w', encoding='utf-8') as f:
    f.write("\n\n".join(font_face_css) + "\n")

print(f"Generated {css_out_path} with {len(font_face_css)} local font faces.")
