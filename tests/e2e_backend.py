"""Navegação real HTTP no Chromium, sem backend de produção nem mocks de Playwright."""
from pathlib import Path
import json,zipfile, tempfile
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent.parent
def go(page,base,route):
    page.evaluate('(route)=>{location.hash="#/"+route}',route)
    page.wait_for_timeout(120)

def main():
    base='no-navigation: standalone HTML rendered in Chromium'
    out=ROOT/'docs/screenshots';out.mkdir(parents=True,exist_ok=True)
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
        page=browser.new_page(viewport={'width':1440,'height':900},accept_downloads=True)
        page.evaluate("""() => {window.__devlab_test_store={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>Object.prototype.hasOwnProperty.call(window.__devlab_test_store,k)?window.__devlab_test_store[k]:null,setItem:(k,v)=>{window.__devlab_test_store[k]=String(v)},removeItem:k=>{delete window.__devlab_test_store[k]}}})}""")
        page.set_content((ROOT/'offline/index.html').read_text(),wait_until='load')
        errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
        go(page,base,'backend')
        assert page.locator('.be-track').count()==5
        assert 'Construa o servidor' in page.locator('h1').inner_text()
        page.screenshot(path=str(out/'backend-catalogo.png'),full_page=True)
        go(page,base,'backend/trilha/node')
        assert page.locator('.be-lesson-row').count()==5
        go(page,base,'backend/aula/node-runtime')
        lesson=page.locator('h1').inner_text();assert 'Node.js:' in lesson
        page.locator('[data-study-switch="2"]').first.click()
        page.locator('[data-be-answer="0"]').click()
        assert page.locator('.be-feedback.is-error').count()==1
        page.locator('[data-be-answer="1"]').click()
        assert page.locator('.be-feedback.is-success').count()==1
        page.locator('.cl-support-details summary').first.click()
        page.locator('#be-notes').fill('Testei Node fora do browser e diferenciei DOM de APIs nativas.')
        page.locator('[data-study-switch="4"]').first.click()
        for index in range(3):page.locator(f'[data-be-check="{index}"]').check()
        assert 'Revisão registrada' in page.locator('.be-status').inner_text()
        page.screenshot(path=str(out/'backend-aula.png'),full_page=True)
        saved=page.evaluate('JSON.stringify(window.__devlab_test_store)')
        second=browser.new_page(viewport={'width':1440,'height':900},accept_downloads=True)
        second.evaluate('saved=>{window.__devlab_test_store=JSON.parse(saved);Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem:k=>Object.prototype.hasOwnProperty.call(window.__devlab_test_store,k)?window.__devlab_test_store[k]:null,setItem:(k,v)=>{window.__devlab_test_store[k]=String(v)},removeItem:k=>{delete window.__devlab_test_store[k]}}})}',saved)
        second.set_content((ROOT/'offline/index.html').read_text(),wait_until='load')
        go(second,base,'backend/aula/node-runtime')
        assert 'Revisão registrada' in second.locator('.be-status').inner_text()
        second.locator('.cl-support-details summary').first.click()
        assert 'Testei Node fora' in second.locator('#be-notes').input_value()
        second.close()
        page.locator('[data-study-switch="3"]').first.click()
        with page.expect_download(timeout=30000) as download_info:
            page.locator('[data-be-download]').click()
        download=download_info.value
        assert download.suggested_filename.endswith('.zip')
        with tempfile.TemporaryDirectory() as t:
            path=Path(t)/'test.zip';download.save_as(str(path))
            with zipfile.ZipFile(path) as z:
                assert z.testzip() is None
                assert 'src/app.js' in z.namelist()
                assert 'test/api.test.js' in z.namelist()
        go(page,base,'backend/lab')
        assert 'simulação' in page.locator('h1').locator('..').inner_text().lower()
        page.locator('#be-lab-send').click()
        assert '200' in page.locator('.be-response-status').inner_text()
        page.locator('#be-lab-path').fill('/tasks')
        page.locator('#be-lab-send').click()
        assert '401' in page.locator('.be-response-status').inner_text()
        page.locator('#be-lab-role').select_option('alice')
        page.locator('#be-lab-send').click()
        assert '200' in page.locator('.be-response-status').inner_text()
        assert 'Organizar a API' in page.locator('.be-response-code').inner_text()
        page.locator('#be-lab-method').select_option('POST')
        page.locator('#be-lab-body').fill('{"title":"  Criar tarefa  "}')
        page.locator('#be-lab-send').click()
        assert '201' in page.locator('.be-response-status').inner_text()
        assert 'Criar tarefa' in page.locator('.be-response-code').inner_text()
        page.locator('#be-lab-method').select_option('PATCH')
        page.locator('#be-lab-path').fill('/tasks/2')
        page.locator('#be-lab-body').fill('{"completed":true}')
        page.locator('#be-lab-send').click()
        assert '404' in page.locator('.be-response-status').inner_text()
        page.screenshot(path=str(out/'backend-laboratorio.png'),full_page=True)
        for width in [390,768,1440]:
            page.set_viewport_size({'width':width,'height':850})
            for route in ['backend','backend/aula/api-json','backend/lab']:
                go(page,base,route)
                overflow=page.evaluate('document.documentElement.scrollWidth > innerWidth+1')
                assert not overflow,(width,route,page.evaluate('document.documentElement.scrollWidth'),page.evaluate('innerWidth'))
                assert page.locator('h1').count()==1,(width,route)
            if width==390: page.screenshot(path=str(out/'backend-mobile.png'),full_page=True)
        go(page,base,'frontend')
        assert page.locator('.ft-track-card').count()==5
        go(page,base,'oficina')
        assert page.locator('h1').count()==1
        assert not errors,errors
        print('Chromium: catálogo, quiz, checklist, persistência, ZIP, HTTP, autorização, 3 larguras e regressão UI aprovados.')
        browser.close()
if __name__=='__main__':main()
