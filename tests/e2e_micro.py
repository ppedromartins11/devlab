"""Sprint 21: percurso de microprática real no navegador, sem API nem dados de produção."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / 'offline/index.html').read_text('utf-8')
SHIM = """() => {
 const data=new Map();
 Object.defineProperty(window,'localStorage',{configurable:true,value:{
  getItem:k=>data.has(k)?data.get(k):null,
  setItem:(k,v)=>data.set(k,String(v)),
  removeItem:k=>data.delete(k),
  clear:()=>data.clear()
 }});
}"""

def go(page,route):
    page.evaluate('(route)=>location.hash="#/"+route',route)
    page.wait_for_timeout(150)

with sync_playwright() as playwright:
    browser=playwright.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for width in (390,768,1440):
        page=browser.new_page(viewport={'width':width,'height':850})
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.evaluate(SHIM)
        page.set_content(HTML,wait_until='load')
        assert page.locator('.dl-daily').count()==1
        go(page,'aula/variaveis')
        assert page.locator('.dl-micro').count()==1
        field=page.locator('[data-micro-input]')
        field.fill('errado')
        page.locator('[data-micro-form] button[type="submit"]').click()
        assert page.locator('.dl-micro-feedback.incorrect').count()==1
        page.locator('[data-micro-hint]').click()
        assert 'Dica 1' in page.locator('.dl-micro-hints').inner_text()
        page.locator('[data-micro-input]').fill('pontos')
        page.locator('[data-micro-form] button[type="submit"]').click()
        assert page.locator('.dl-micro-feedback.correct').count()==1
        assert page.evaluate('JSON.parse(localStorage.getItem("devlab-offline-v1:micro-completed")).variaveis') is True
        page.locator('[data-micro-next]').click()
        assert page.locator('#code-editor').count()==1
        go(page,'aula/variaveis')
        # O estado de estudo não deve ser apagado ao retornar.
        assert page.evaluate('JSON.parse(localStorage.getItem("devlab-offline-v1:micro-completed")).variaveis') is True
        go(page,'linguagem/aula/py-intro')
        assert page.locator('.dl-lesson-meter').count()==1
        assert page.locator('.dl-micro').count()==1
        page.locator('[data-micro-input]').fill('nome')
        page.locator('[data-micro-form] button[type="submit"]').click()
        assert page.locator('.dl-micro-feedback.correct').count()==1
        page.locator('[data-micro-next]').click()
        assert page.locator('.rp-guided-panel:not([hidden]) .rp-answers').count()==1
        page.locator('[data-lang-answer="0"]').click()
        assert page.locator('.dl-guided-retry').count()==1
        page.locator('[data-lang-answer="1"]').click()
        assert page.locator('.rp-answer-feedback').count()==1
        go(page,'linguagem/aula/php-servidor')
        assert page.locator('.dl-micro').count()==1
        page.locator('[data-micro-input]').fill('echo')
        page.locator('[data-micro-form] button[type="submit"]').click()
        page.locator('[data-micro-next]').click()
        assert page.locator('.rp-guided-panel:not([hidden]) .rp-answers').count()==1
        go(page,'frontend/aula/html-documento')
        assert page.locator('.dl-micro').count()==1
        # Sprint 22: cada aula contém prática editável, inclusive linguagens com execução local.
        assert page.evaluate('allMicroLessonIds.length')==179
        for route in ['aula/projeto-integrador','aula/ts-tipos','linguagem/aula/py-venv',
                      'linguagem/aula/java-streams','linguagem/aula/sql-transactions',
                      'linguagem/aula/js-closures','linguagem/aula/ts-config',
                      'frontend/aula/react-estado','backend/aula/api-routes']:
            go(page,route)
            assert page.locator('.dl-micro').count()==1,(width,route)
            assert page.locator('[data-micro-form]').count()==1,(width,route)
            page.locator('[data-micro-practice-details] summary').click()
            assert page.locator('[data-micro-practice-input]').count()==1,(width,route)
            assert page.locator('[data-micro-open-practice]').count()==1,(width,route)
        go(page,'linguagem/aula/sql-transactions')
        page.locator('[data-micro-practice-details] summary').click()
        field=page.locator('[data-micro-practice-input]')
        field.fill('SELECT 123; -- meu rascunho de prática')
        go(page,'linguagem/aula/sql-transactions')
        page.locator('[data-micro-practice-details] summary').click()
        assert page.locator('[data-micro-practice-input]').input_value().startswith('SELECT 123')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2'),width
        assert not errors,(width,errors)
        page.close()
        print('OK micro UX',width,'px')
    browser.close()
