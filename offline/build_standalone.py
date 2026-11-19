from pathlib import Path
import re
root = Path(__file__).parent
src = root.parent / 'src'
course = (src/'course.js').read_text()
preview = (src/'preview.js').read_text()
learning = (src/'learning.js').read_text()
runtime = (src/'runtime-check.js').read_text()
study = (src/'study-tools.js').read_text()
app = (root/'source'/'app.js').read_text()
css = (src/'styles.css').read_text()
css = re.sub(r'^@import[^\n]*\n?', '', css, count=1)
css += '\n' + (root/'source'/'offline-extra.css').read_text()
css += '\n' + (src/'workspace.css').read_text()
css += '\n' + (root/'source'/'study.css').read_text()
js = course.replace('export const ', 'const ') + '\n' + learning.replace('export const ', 'const ').replace('export function ', 'function ') + '\n' + runtime.replace('export const ', 'const ') + '\n' + preview.replace('export function ','function ') + '\n' + study.replace('export const ','const ').replace('export function ','function ') + '\n' + app
# Never close the host <script> when embedded JavaScript strings mention it.
js = re.sub(r'</script', r'<\\/script', js, flags=re.I)
html = '''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f7f7f5"><meta name="description" content="DevLab - Curso prático de JavaScript e TypeScript com editor e prévia."><title>DevLab · Aprenda construindo</title><style>''' + css + '''</style></head><body><div id="root"></div><script>''' + js + '''</script></body></html>'''
(root/'index.html').write_text(html, encoding='utf-8')
print(f'Escrito {root/"index.html"} ({len(html):,} caracteres)')
