import os

with open('D:/Web Projects/Nursery/src/data/mockData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in lines:
    if 'image:' in line or 'hoverImage:' in line:
        parts = line.split("'")
        if len(parts) >= 2:
            path = parts[1]
            full_path = os.path.join('D:/Web Projects/Nursery/public', path.lstrip('/'))
            if os.path.exists(full_path):
                sz = os.path.getsize(full_path) / 1024
                print(f"OK: {path} ({sz:.1f} KB)")
            else:
                print(f"MISSING: {path}")
