"""Testes de downloads Vite e preview modular (HTML inline, não prod)."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from zipfile import ZipFile
root=Path(__file__).resolve().parent.parent
html=(root/'offline/index.html').read_text(encoding='utf8')
out=root/'docs'/'screenshots';out.mkdir(exist_ok=True,parents=True)
shim="""() => {const d={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>d[k]??null,setItem:(k,v)=>d[k]=String(v),removeItem:k=>delete d[k],clear:()=>{for(const k of Object.keys(d))delete d[k]},key:i=>Object.keys(d)[i]??null,get length(){return Object.keys(d).length}}});}"""
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(accept_downloads=True,viewport={'width':1440,'height':900});page.evaluate(shim);page.set_default_timeout(6000);page.set_content(html)
 page.locator('.ft-home-promo button').click();page.locator('.ft-track-card').first.wait_for();page.screenshot(path=str(out/'formacao-catalogo.png'),full_page=True)
 for track,lesson in [('typescript','ts-modelos'),('react','react-componentes')]:
  page.locator(f'[data-nav="frontend/trilha/{track}"]').click()
  page.locator('.ft-lesson-link').first.wait_for()
  page.locator(f'.ft-lesson-link[data-nav="frontend/aula/{lesson}"]').click()
  page.locator('.ft-quiz').wait_for()
  with page.expect_download() as info:
   page.locator(f'[data-ft-starter="{lesson}"]').click()
  download=info.value
  output=root/f'tests/{track}-starter-test.zip';download.save_as(str(output))
  with ZipFile(output) as z:
   assert z.testzip() is None
   if track=='react':assert 'src/App.jsx' in z.namelist()
   else:assert 'src/main.ts' in z.namelist()
  print('Download e arquivo ZIP válido:', track,output.stat().st_size)
  output.unlink()
  page.locator('.ft-lesson-breadcrumb button').first.click();page.locator('.ft-track-card').first.wait_for()
 # Projeto HTML/JS modular real
 page.locator('[data-nav="frontend/trilha/html"]').click();page.locator('.ft-lesson-link[data-nav="frontend/aula/html-documento"]').click();page.locator('.ft-quiz').wait_for();page.locator('[data-ft-starter="html-documento"]').click();page.locator('.ws-page').wait_for();page.wait_for_timeout(1400)
 print('Workspace preview status:',page.locator('#ws-preview-status').inner_text())
 print('Workspace console:',page.locator('#ws-console').inner_text()[:160])
 assert page.locator('#ws-preview-status').inner_text().startswith('Projeto carregado'),page.locator('#ws-console').inner_text()
 frame=page.frame_locator('#ws-preview-frame');frame.locator('#study-input').fill('Exercício novo');frame.locator('#study-form button').click();assert 'Exercício novo' in frame.locator('#study-list').inner_text()
 print('Workspace módulos import/export e formulário: OK')
 b.close()
