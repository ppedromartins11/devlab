"""Sprint 9: verifica interface em Chromium usando HTML inline, sem dependência de localhost.
   Requer Playwright, Chromium local e não testa a Vercel autenticada.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parent.parent
html=(root/'offline/index.html').read_text(encoding='utf8')
out=root/'docs'/'screenshots'
out.mkdir(parents=True,exist_ok=True)

shim='''() => {
 const memory={};
 Object.defineProperty(window,'localStorage',{configurable:true,value:{
 getItem(k){return Object.hasOwn(memory,k)?memory[k]:null},
 setItem(k,v){memory[k]=String(v)},
 removeItem(k){delete memory[k]},clear(){for(const key of Object.keys(memory))delete memory[key]},
 key(i){return Object.keys(memory)[i]??null},get length(){return Object.keys(memory).length}
 }});
}'''

def scenario(browser,width,name):
 page=browser.new_page(viewport={'width':width,'height':900})
 page.set_default_timeout(3500)
 page.evaluate(shim)
 errors=[]
 page.on('pageerror', lambda error: errors.append(str(error)))
 page.set_content(html)
 assert page.locator('[data-nav="frontend"]').count()>0
 page.locator('.cl-track-item[data-nav="frontend"]').click()
 page.locator('.ft-track-card').first.wait_for()
 assert page.locator('.ft-track-card').count()==5
 assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), 'Overflow no catálogo'
 assert page.locator('.ft-hero h1').inner_text().startswith('Aprenda a construir')
 page.locator('[data-nav="frontend/trilha/html"]').first.click()
 page.locator('.ft-lesson-link').first.wait_for()
 assert page.locator('.ft-lesson-link').count()==5
 page.locator('[data-nav="frontend/aula/html-documento"]').first.click()
 page.locator('[data-study-switch="2"]').first.click()
 page.locator('.ft-quiz button').first.wait_for()
 assert page.locator('.ft-quiz button').count()==3
 assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), 'Overflow na aula'
 # Resposta errada não concede progresso.
 page.locator('button[data-ft-answer="0"]').click()
 assert page.locator('.ft-feedback.incorrect').count()==1
 assert 'html-documento' not in page.evaluate('Object.keys(fst.quiz)')
 page.locator('button[data-ft-answer="1"]').click()
 assert page.locator('.ft-feedback.correct').count()==1
 assert page.locator('.ft-check-row').count()==3
 page.locator('.cl-support-details summary').first.click()
 page.locator('#ft-notes').fill('Descobri que o head guarda metadados.')
 page.locator('[data-study-switch="4"]').first.click()
 for i in range(3): page.locator(f'input[data-ft-check="{i}"]').check()
 assert 'Revisão registrada' in page.locator('.ft-lesson-status').inner_text()
 page.locator('[data-study-switch="3"]').first.click()
 page.locator('button[data-ft-starter="html-documento"]').click()
 page.locator('.ws-page').first.wait_for(timeout=4000)
 assert page.locator('.ws-page').count()==1
 assert 'Formação · O documento' in page.locator('#ws-project-select').inner_text()
 assert page.locator('[data-ws-file="index.html"]').count()>0
 # Retorno à aula preserva o caderno sem recarregar o site.
 page.evaluate("location.hash='#/frontend/aula/html-documento'")
 page.wait_for_timeout(150)
 page.locator('.cl-support-details summary').first.click()
 assert page.locator('#ft-notes').input_value().startswith('Descobri')
 assert page.locator('.ft-lesson-status').inner_text().startswith('✓')
 page.screenshot(path=str(out/f'formacao-{name}.png'),full_page=True)
 assert not errors,errors[:4]
 page.close()

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for width,name in ((1440,'desktop'),(768,'tablet'),(390,'mobile')):
  scenario(browser,width,name)
  print(f'OK: formação frontend {name} {width}px')
 browser.close()
