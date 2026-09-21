import bs4
import re

with open('full_selected_works.html', encoding='utf-16') as f:
    html = f.read()

# Replace React specific stuff first before beautifulsoup
html = html.replace('<!--', '{/*')
html = html.replace('-->', '*/}')
html = html.replace('style="font-variation-settings: \'FILL\' 1;"', "style={{ fontVariationSettings: \"'FILL' 1\" }}")

soup = bs4.BeautifulSoup(html, 'html.parser')

def replace_img(soup_obj, img_alt, src, is_video=False):
    img = soup_obj.find('img', {'data-alt': img_alt})
    if img:
        if is_video:
            new_tag = soup.new_tag("video", src=src, autoPlay=True, loop=True, muted=True, playsInline=True, className=img.get('class'))
        else:
            new_tag = soup.new_tag("img", src=src, alt=img_alt, className=img.get('class'))
        img.replace_with(new_tag)

replace_img(soup, "Atmospheric editorial beauty reel frame for makeup artist Kinjal Mehtha, close-up of sculpted cheekbones and delicate golden hour backlight, soft focus bridal couture in natural earthy tones, cinematic slow motion still.", "/media/work/kinjal-mehtha/IMG_3846.MP4", True)
replace_img(soup, "Editorial portrait monograph still for Kinjal Mehtha beauty styling, bride looking down with intimate serenity, detailed gold jhumka earring, soft muted linen backdrop, radiant warm skin tones.", "/media/work/kinjal-mehtha/IMG_3845.PNG", False)

replace_img(soup, "Detailed macro shot of cosmetic pigments, creamy blush textures, and fine soft makeup brushes on warm natural limestone, high tactile fidelity, studio still life for Lakshi Lingaraju.", "/media/work/lakshi-lingaraju/IMG_5846.PNG", False)
replace_img(soup, "Full monograph fashion portrait for Lakshi Lingaraju, model bathed in diffused natural skylight with radiant dewy skin, wearing minimal hand-woven silk, quiet elegance, muted warm ivory background.", "/media/work/lakshi-lingaraju/IMG_5845.MP4", True)

replace_img(soup, "Ultra-wide cinematic widescreen visual for Yash Jain editorial makeup campaign, moody ambient lighting with subtle indigo and warm tungsten hues, model gazing into reflective water pool, museum quality stillness.", "/media/work/yash-jain/IMG_5847.MP4", True)

replace_img(soup, "Macro textural close-up of luxury bespoke Stilat outerwear, heavyweight virgin wool weave with hand-finished horn buttons and structured lapel, high definition craft photography, warm neutral studio.", "/media/work/stilat/IMG_5852.JPG.jpeg", False)
replace_img(soup, "Editorial motion shot of model walking in minimalist architectural corridor wearing flowing Stilat autumn luxury trench coat, sharp shadows, cinematic daylight, editorial poise and garment fluidity.", "/media/work/stilat/IMG_5849.MOV", True)

replace_img(soup, "Styling lookbook composition for PL Edits, creative stylist curating accessory palettes on limestone desk, fine jewelry pieces, leather gloves, and bespoke eyewear, soft afternoon light, editorial calm.", "/media/work/pl-edit/IMG_5853.MP4", True)
replace_img(soup, "Vertical editorial fashion silhouette by PL Edits, model in tailored silhouette posing against warm textured canvas wall, high fashion styling and art direction, restrained minimalist luxury.", "/media/work/pl-edit/IMG_5854.JPG.jpeg", False)

tsx = soup.prettify()
# fix class -> className
tsx = tsx.replace(' class="', ' className="')

# For BeautifulSoup classes that were generated with new_tag:
tsx = tsx.replace(' classname="', ' className="')
# And the list of classes might be formatted differently by bs4, e.g. class="['w-full', ...]"
def fix_list_class(match):
    # e.g. className="['w-full', 'h-full', 'object-cover']"
    import ast
    lst_str = match.group(1)
    if lst_str.startswith('['):
        lst = ast.literal_eval(lst_str)
        return 'className="' + ' '.join(lst) + '"'
    return match.group(0)
tsx = re.sub(r'className="([^"]+)"', fix_list_class, tsx)

# Fix self-closing tags for JSX
tsx = re.sub(r'<img([^>]+)>', r'<img\1 />', tsx)
tsx = re.sub(r'<video([^>]+)>', r'<video\1 />', tsx)

# Drop any data-alt attributes
tsx = re.sub(r'\sdata-alt="[^"]*"', '', tsx)

out = """import React from 'react';

export default function SelectedWorksSection() {
  return (
    %s
  );
}
""" % tsx

with open('src/components/home/SelectedWorksSection.tsx', 'w', encoding='utf-8') as f:
    f.write(out)
