import re

p = 'src/data/mockData.ts'
with open(p, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        "image: '/images/green-vatika/flowering/Adenium_Bonsai_Desert_Rose_Rs100.webp'",
        "image: '/images/green-vatika/flowering/Adenium_Bonsai_Rs100.webp'"
    ),
    (
        "hoverImage: '/images/green-vatika/flowering/Adenium_Bonsai_Desert_Rose_Rs100.webp'",
        "hoverImage: '/images/green-vatika/flowering/Adenium_Bonsai_Rs100.jpg'"
    ),
    (
        "image: '/drive_plants/Aparajita 50.jpg'",
        "image: '/images/green-vatika/flowering/Aparajita_Blue_Pea_Rs50.webp',\n    hoverImage: '/images/green-vatika/flowering/Aparajita_Blue_Pea_Rs50.jpg'"
    ),
    (
        "image: '/drive_plants/Mogara 70.jpg'",
        "image: '/images/green-vatika/flowering/Mogara_Arabian_Jasmine_Rs70.webp',\n    hoverImage: '/images/green-vatika/flowering/Mogara_Arabian_Jasmine_Rs70.jpg'"
    ),
    (
        "image: '/drive_plants/Chandani 60.jpg'",
        "image: '/images/green-vatika/flowering/Chandani_Crepe_Jasmine_Rs60.webp',\n    hoverImage: '/images/green-vatika/flowering/Chandani_Crepe_Jasmine_Rs60.jpg'"
    ),
    (
        "image: '/drive_plants/Krishna Kamal (Kaurav Pandav) 50.jpg'",
        "image: '/images/green-vatika/flowering/Krishna_Kamal_Passionflower_Rs50.webp',\n    hoverImage: '/images/green-vatika/flowering/Krishna_Kamal_Passionflower_Rs50.jpg'"
    )
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1
        print(f"Replaced: {old[:50]}")
    else:
        print(f"NOT FOUND: {old[:50]}")

with open(p, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully performed {count} replacements in mockData.ts")
