import bs4
html = open('next-section.html', encoding='utf-8').read()
soup = bs4.BeautifulSoup(html, 'html.parser')
for child in soup.body.find_all(recursive=False):
    print("TAG:", child.name)
    print("ID/CLASS:", child.get('id'), child.get('class'))
    if child.name == 'main':
        for idx, section in enumerate(child.find_all(['section', 'div'], recursive=False)):
            print(f"  MAIN SECTION {idx}:", section.get('id'), section.get('class'))
            print(f"  PREVIEW: {section.text[:100].strip().replace(chr(10), ' ')}")
