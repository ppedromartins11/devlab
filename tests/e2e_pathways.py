"""E2E de trilhas e linguagens via Chromium com HTML inline e localStorage simulado.
O navegador automatizado bloqueia conexões localhost; o teste não substitui um teste real de rede.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'offline/index.html').read_text('utf-8')
SHIM='''() => {const memory=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>memory.has(k)?memory.get(k):null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k),clear:()=>memory.clear()}})}'''

def go(page,route):
 page.evaluate('(r)=>location.hash="#/"+r',route)
 page.wait_for_timeout(140)

def main():
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  for width,height in [(1440,900),(768,1024),(390,844)]:
   page=browser.new_page(viewport={'width':width,'height':height},accept_downloads=True)
   page.evaluate(SHIM)
   errors=[]
   page.on('pageerror',lambda error:errors.append(str(error)))
   page.set_content(HTML,wait_until='load')
   assert page.locator('.rp-main-card').count()==3
   page.screenshot(path=str(ROOT/'docs/screenshots'/f'roadmaps-home-{width}.png'),full_page=True)
   if width==1440:
    page.locator('.rp-main-card[data-nav="trilha/frontend"]').click();page.wait_for_timeout(130)
    assert page.locator('.rp-stage').count()==6
    page.screenshot(path=str(ROOT/'docs/screenshots'/'roadmaps-frontend.png'),full_page=True)
    first=page.locator('.rp-stage').first
    if first.get_attribute('open') is None:first.locator('summary').click()
    first.locator('[data-rp-check]').check()
    go(page,'trilhas');go(page,'trilha/frontend')
    assert page.locator('.rp-stage').first.locator('[data-rp-check]').is_checked(),'checkpoint not persisted on route switch'
    page.locator('.rp-stage').first.locator('.rp-lesson-link').first.click();page.wait_for_timeout(130)
    assert '/aula/' in page.url or 'aula/' in page.url
    go(page,'linguagens')
    assert page.locator('.rp-language-card').count()==6
    page.screenshot(path=str(ROOT/'docs/screenshots'/'roadmaps-languages.png'),full_page=True)
    page.locator('.rp-language-card[data-nav="linguagem/python"]').click();page.wait_for_timeout(130)
    assert page.locator('.rp-language-lesson').count()==17
    page.locator('.rp-language-lesson').first.click();page.wait_for_timeout(130)
    assert 'py-intro' in page.url
    page.locator('[data-lang-step="1"]').first.click()
    page.locator('[data-lang-answer="1"]').click()
    assert page.get_by_text('Resposta correta',exact=False).count()>0
    page.locator('[data-lang-step="2"]').first.click()
    page.locator('[data-lang-check]').first.check()
    page.locator('[data-lang-note]').fill('Testei o código no VS Code.')
    go(page,'linguagens');go(page,'linguagem/aula/py-intro')
    page.locator('[data-lang-step="2"]').first.click()
    assert page.locator('[data-lang-check]').first.is_checked()
    assert page.locator('[data-lang-note]').input_value()=='Testei o código no VS Code.'
    page.screenshot(path=str(ROOT/'docs/screenshots'/'roadmaps-python-lesson.png'),full_page=True)
   else:
    for route,selector in [('trilhas','.rp-main-card'),('linguagens','.rp-language-card'),('trilha/fullstack','.rp-stage'),('linguagem/aula/java-intro','.rp-guided-panel')]:
     go(page,route)
     assert page.locator(selector).count()>0,(route,selector)
     assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'),(width,route,page.evaluate('[document.documentElement.scrollWidth,innerWidth]'))
   assert not errors,(width,errors[:4])
   print('OK',width,'px')
   page.close()
  browser.close()
  print('OK — trilhas, linguagens, quiz, checklist, notas e responsividade')

if __name__=='__main__':main()
