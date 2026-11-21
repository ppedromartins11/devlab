"""UX modular DevLab 12: navegação, progresso preservado, etapas, busca, teclado e responsividade."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'offline/index.html').read_text('utf-8')
OUT=ROOT/'docs/screenshots';OUT.mkdir(parents=True,exist_ok=True)

SHIM='''() => {const memory=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>memory.has(k)?memory.get(k):null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k),clear:()=>memory.clear()}})}'''

def go(page,route):
    page.evaluate('(r)=>location.hash="#/"+r',route)
    page.wait_for_timeout(120)

def verify_layout(page,width,route):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'),f'overflow {width} {route}: '+str(page.evaluate('[document.documentElement.scrollWidth,innerWidth]'))
    assert page.locator('h1').count()==1,(width,route,page.locator('h1').count())

def main():
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  for width,height in [(1440,900),(768,900),(390,844)]:
   page=browser.new_page(viewport={'width':width,'height':height},accept_downloads=True)
   page.evaluate(SHIM)
   errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   page.set_content(HTML,wait_until='load')
   assert page.locator('.cl-sidebar .cl-nav-group').count()==3
   assert page.locator('.nav-unit').count()==0
   assert page.locator('.cl-track-item').count()==4
   if width==390:
    page.locator('[data-action="open-menu"]').click()
    assert page.locator('#cl-sidebar-nav').get_attribute('class').find('sidebar-open')>=0
    assert page.locator('[data-action="open-menu"]').get_attribute('aria-expanded')=='true'
    page.keyboard.press('Escape')
    assert page.locator('[data-action="open-menu"]').get_attribute('aria-expanded')=='false'
   assert page.locator('.ft-home-promo').count()==0
   verify_layout(page,width,'inicio')
   if width==1440:page.screenshot(path=str(OUT/'ux-clean-home-desktop.png'),full_page=True)
   if width==390:page.screenshot(path=str(OUT/'ux-clean-home-mobile.png'),full_page=True)
   go(page,'frontend/aula/html-documento')
   verify_layout(page,width,'frontend/aula/html-documento')
   assert page.locator('.cl-study-tabs').count()==1
   assert page.locator('.ft-panel:visible').count()==1
   assert page.locator('.ft-quiz:visible').count()==0
   # Os módulos são tabuláveis e aceitam navegação por setas.
   page.locator('[data-study-switch="1"]').first.focus()
   page.keyboard.press('ArrowRight')
   assert page.locator('[data-study-switch="2"]').first.get_attribute('aria-selected')=='true'
   assert page.locator('.ft-quiz:visible').count()==1
   page.locator('[data-ft-answer="1"]').click()
   assert page.locator('.ft-feedback.correct:visible').count()==1
   page.locator('[data-study-switch="3"]').first.click()
   assert page.locator('[data-ft-starter="html-documento"]:visible').count()==1
   page.locator('[data-study-switch="4"]').first.click()
   assert page.locator('.ft-check-row:visible').count()==3
   if width==1440:page.screenshot(path=str(OUT/'ux-clean-lesson-desktop.png'),full_page=True)
   if width==390:page.screenshot(path=str(OUT/'ux-clean-lesson-mobile.png'),full_page=True)
   page.locator('.cl-support-details').first.locator('summary').click()
   page.locator('#ft-notes').fill('Conceito aprendido sem perder a resposta anterior')
   page.locator('[data-ft-check="0"]').check()
   go(page,'backend/aula/node-runtime')
   verify_layout(page,width,'backend/aula/node-runtime')
   assert page.locator('.be-panel:visible').count()==1
   page.locator('[data-study-switch="2"]').first.click()
   assert page.locator('.be-choices:visible').count()==1
   page.locator('[data-be-answer="1"]').click()
   page.locator('[data-study-switch="3"]').first.click()
   assert page.locator('[data-be-download]:visible').count()==1
   go(page,'carreira')
   verify_layout(page,width,'carreira')
   assert page.locator('.career-project-card').count()==3
   assert page.locator('.cl-career-panel:visible').count()==1
   assert page.locator('[data-career-action="open-workspace"]:visible').count()==1
   page.locator('[data-study-switch="1"]').first.click()
   assert page.locator('[data-career-check="0"]:visible').count()==1
   page.locator('[data-career-check="0"]').check()
   page.locator('[data-study-switch="2"]').first.click()
   assert page.locator('[data-career-review="0"]:visible').count()==1
   page.locator('[data-study-switch="3"]').first.click()
   page.locator('#career-notes').fill('Evidência de projeto')
   assert page.locator('.cl-career-panel:visible').count()==1
   if width==1440:page.screenshot(path=str(OUT/'ux-clean-project-desktop.png'),full_page=True)
   if width==390:page.screenshot(path=str(OUT/'ux-clean-project-mobile.png'),full_page=True)
   page.locator('[data-career-select="api"]').click()
   assert page.locator('[data-career-action="export-starter"]:visible').count()==1
   go(page,'curso/javascript')
   page.locator('[data-nav="aula/primeiros-passos"]').first.click()
   verify_layout(page,width,'aula/primeiros-passos')
   assert page.locator('.page-lesson.cl-lesson-learn .lab-pane:visible').count()==0
   page.locator('[data-stage="practice"]').first.click()
   assert page.locator('.lab-pane:visible').count()==1
   go(page,'inicio')
   # global search indexes JS/TS + frontend/backend
   if width>860:
    page.locator('#lesson-search').fill('HTML documento')
    assert page.locator('.cl-search-results button').count()>0
    page.locator('.cl-search-results button').first.click()
    page.locator('.ft-lesson-page').wait_for(timeout=2500)
    assert page.locator('.ft-lesson-page').count()==1
   assert not errors,(width,errors[:4])
   print('UX DevLab 12 OK:',width,'px')
   page.close()
  browser.close()

if __name__=='__main__':main()
