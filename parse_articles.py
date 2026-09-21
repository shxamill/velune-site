import bs4
soup = bs4.BeautifulSoup(open('full_selected_works.html', encoding='utf-16').read(), 'html.parser')
for i, article in enumerate(soup.find_all('article')):
    header = article.find('h4').text.strip()
    spans = [s.text.strip() for s in article.find_all('span', class_='text-ink-muted')]
    tags = [s.text.strip() for s in article.find_all('span', class_='bg-surface-container')]
    print(f"\n--- Article {i+1}: {header} ---")
    print(f"Subheadings: {spans}")
    print(f"Tags: {tags}")
    images = article.find_all('img')
    print(f"Media count: {len(images)}")
    for j, img in enumerate(images):
        print(f"  Media {j+1} Alt: {img.get('data-alt')}")
