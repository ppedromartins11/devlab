"""DevLab 13: tema escuro e rotas funcionais, sem substituir a suíte de aprendizagem."""
from pathlib import Path
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parents[1]
html=(root/'offline/index.html').read_text(encoding='utf-8')
shots=root/'docs/screenshots'
shots.mkdir(parents=True,exist_ok=True)
shim="""() => {const data=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return data.get(k)??null},setItem(k,v){data.set(k,String(v))},removeItem(k){data.delete(k)},clear(){data.clear()}}})}"""

def go(page,route):
    page.evaluate('(r)=>{location.hash="#/"+r}', route)
    page.wait_for_timeout(180)

def main():
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
        for width,height in [(1440,900),(768,900),(390,844)]:
            page=browser.new_page(viewport={'width':width,'height':height},accept_downloads=True)
            page.evaluate(shim)
            errors=[]
            page.on('pageerror',lambda exc: errors.append(str(exc)))
            page.set_content(html,wait_until='load')
            assert page.locator('.cl-sidebar .brand-text').inner_text().startswith('DevLab')
            assert page.locator('.rp-main-card').count()==3  # Catálogo de carreiras atual
            assert page.locator('[data-nav="linguagens"]').count()>0  # Acesso ao catálogo de linguagens
            body_bg=page.evaluate('getComputedStyle(document.body).backgroundColor')
            assert body_bg=='rgb(11, 13, 18)',(width,body_bg)
            assert '0 de 79' in page.locator('.cl-sidebar-progress').inner_text()
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'), ('home overflow',width,page.evaluate('[document.documentElement.scrollWidth,innerWidth]'))
            if width==1440:
                page.screenshot(path=str(shots/'devlab13-dark-home-desktop.png'),full_page=True)
                page.keyboard.press('Control+k')
                assert page.evaluate('document.activeElement?.id')=='lesson-search'
                page.locator('#lesson-search').fill('HTML documento')
                assert page.locator('.cl-search-results button').count()>0
                page.locator('.cl-search-results button').first.click()
                page.locator('.ft-lesson-page').wait_for(timeout=3000)
                go(page,'inicio')
            if width==390:
                page.screenshot(path=str(shots/'devlab13-dark-home-mobile.png'),full_page=True)
                page.locator('[data-action="open-menu"]').click()
                assert 'sidebar-open' in page.locator('#cl-sidebar-nav').get_attribute('class')
                page.keyboard.press('Escape')
                assert 'sidebar-open' not in page.locator('#cl-sidebar-nav').get_attribute('class')
            for route,selector in [('frontend','.ft-page'),('frontend/aula/html-documento','.ft-lesson-page'),('backend','.be-page'),('backend/aula/node-runtime','.be-lesson-page'),('carreira','.career-page'),('workspace','.ws-shell'),('oficina','.mission-card'),('curso/javascript','.unit-card')]:
                go(page,route)
                assert page.locator(selector).count()>0,(width,route,selector)
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(width,route,page.evaluate('[document.documentElement.scrollWidth,innerWidth]'))
                if width==1440 and route=='frontend/aula/html-documento':
                    page.screenshot(path=str(shots/'devlab13-dark-lesson-desktop.png'),full_page=True)
                if width==1440 and route=='workspace':
                    page.screenshot(path=str(shots/'devlab13-dark-workspace.png'),full_page=True)
            assert not errors,(width, errors[:4])
            page.close()
        browser.close()
    print('OK — tema escuro, marca, busca, 8 rotas e responsividade em 1440/768/390 px.')

if __name__=='__main__':main()
