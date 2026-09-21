import re

with open('src/components/home/SelectedWorksSection.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix self closing tags double slash
code = code.replace('/ />', '/>')
code = code.replace('/>\n    </video>', '/>')
code = code.replace('/>\n   </video>', '/>')
code = code.replace('/>\n     </video>', '/>')
code = code.replace('autoPlay="True"', 'autoPlay')
code = code.replace('loop="True"', 'loop')
code = code.replace('muted="True"', 'muted')
code = code.replace('playsInline="True"', 'playsInline')
code = code.replace('style="font-variation-settings: \'FILL\' 1;"', "style={{ fontVariationSettings: \"'FILL' 1\" }}")
code = code.replace('class="', 'className="')

with open('src/components/home/SelectedWorksSection.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
