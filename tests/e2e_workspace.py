"""E2E do Workspace executado em HTML inline porque localhost pode ser bloqueado no executor.
Substitui localStorage por um Map de teste, sem alegar persistência de domínio real.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from zipfile import ZipFile
from tempfile import TemporaryDirectory

ROOT = Path(__file__).parents[1]
HTML = (ROOT/'offline/index.html').read_text(encoding='utf-8')

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    context=browser.new_context(viewport={'width':1480,'height':940},accept_downloads=True)
    context.route('https://cdn.jsdelivr.net/**',lambda route:route.abort())
    page=context.new_page()
    errors=[]
    page.on('pageerror',lambda err:errors.append(str(err)))
    page.evaluate('''() => {const memory = new Map();Object.defineProperty(window, 'localStorage', {configurable:true,value:{getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k),clear:()=>memory.clear()}})}''')
    page.evaluate('location.hash="#/workspace"')
    page.set_content(HTML,wait_until='load')
    page.wait_for_function('() => !!document.querySelector(".ws-page")')
    page.wait_for_function('() => wst.lastReady === true',timeout=10000)
    assert page.locator('.ws-tree-file').count()==4
    frame=page.frame_locator('#ws-preview-frame')
    assert frame.locator('#heading').inner_text()=='Minhas tarefas'
    assert frame.locator('body').evaluate('() => location.origin')=='null'
    frame.locator('#task-input').fill('Primeiro compromisso')
    frame.locator('button[type=submit]').click()
    page.wait_for_function('() => document.querySelector("#ws-console")?.textContent?.includes("Tarefas: 1")')
    assert frame.locator('li').all_text_contents()==['Primeiro compromisso']

    page.locator('[data-ws-action=add-file]').click()
    page.locator('#ws-dialog-value').fill('src/helpers.js')
    page.locator('#ws-dialog-form button[type=submit]').click()
    assert page.locator('.ws-tree-file[data-ws-file="src/helpers.js"]').count()==1
    page.locator('#ws-code-editor').fill('export function dobro(n) { return n * 2; }\n')
    page.locator('.ws-tree-file[data-ws-file="src/main.js"]').click()
    main=page.locator('#ws-code-editor').input_value()
    page.locator('#ws-code-editor').fill("import { dobro } from './helpers.js';\nconsole.log('DOBRO TESTE:', dobro(21));\n"+main)
    page.wait_for_function('() => document.querySelector("#ws-console")?.textContent?.includes("DOBRO TESTE: 42")',timeout=12000)

    page.locator('[data-ws-action=add-folder]').click()
    page.locator('#ws-dialog-value').fill('src/components')
    page.locator('#ws-dialog-form button[type=submit]').click()
    assert page.locator('.ws-tree-folder').filter(has_text='components').count()==1

    page.locator('.ws-tree-file[data-ws-file="src/helpers.js"]').click()
    page.locator('[data-ws-action=rename-file]').click()
    page.locator('#ws-dialog-value').fill('src/helpers2.js')
    page.locator('#ws-dialog-form button[type=submit]').click()
    assert page.locator('.ws-tree-file[data-ws-file="src/helpers2.js"]').count()==1
    page.wait_for_function('() => document.querySelector("#ws-console")?.textContent?.includes("Módulo não encontrado")',timeout=12000)
    page.locator('.ws-tree-file[data-ws-file="src/main.js"]').click()
    page.locator('#ws-code-editor').fill(page.locator('#ws-code-editor').input_value().replace('./helpers.js','./helpers2.js'))
    page.wait_for_function('() => document.querySelector("#ws-console")?.textContent?.includes("DOBRO TESTE: 42")',timeout=12000)

    with page.expect_download(timeout=9000) as download_info:
        page.locator('[data-ws-action=export]').click()
    dl=download_info.value
    assert dl.suggested_filename.endswith('.zip')
    with TemporaryDirectory() as td:
        path=Path(td)/'project.zip'
        dl.save_as(path)
        with ZipFile(path) as z:
            assert 'index.html' in z.namelist()
            assert 'src/helpers2.js' in z.namelist()
            assert 'src/helpers.js' not in z.namelist()
            assert 'DOBRO TESTE' in z.read('src/main.js').decode()

    # Não reescreve o TaskFlow anterior; cria projeto separado.
    page.on('dialog',lambda d:d.accept())
    page.locator('[data-ws-action=import-taskflow]').click()
    assert len(page.locator('#ws-project-select option').all_text_contents())==2
    page.locator('#ws-project-select').select_option(label='TaskFlow modular')
    assert page.locator('.ws-tree-file[data-ws-file="src/helpers2.js"]').count()==1
    page.locator('[data-nav="inicio"]').first.click()
    page.evaluate('location.hash="#/workspace"')
    page.wait_for_function('() => !!document.querySelector(".ws-page")')
    assert page.locator('.ws-tree-file[data-ws-file="src/helpers2.js"]').count()==1
    page.screenshot(path=str(ROOT/'sprint8-desktop.png'),full_page=True)
    assert not errors,errors
    print('Desktop E2E: imports, formulário real, arquivos, pastas, renomeação, erro esperado, ZIP e persistência simulada — OK')

    mobile=browser.new_context(viewport={'width':390,'height':844})
    mobile.route('https://cdn.jsdelivr.net/**',lambda route:route.abort())
    m=mobile.new_page();m.evaluate('location.hash="#/workspace"');m.set_content(HTML,wait_until='load')
    m.wait_for_function('() => !!document.querySelector(".ws-page")')
    assert m.evaluate('document.documentElement.scrollWidth - innerWidth') <= 1
    assert m.locator('.ws-tree-file').count()==4
    m.screenshot(path=str(ROOT/'sprint8-mobile.png'),full_page=True)
    print('Mobile E2E: 390px, explorador e editor sem rolagem horizontal — OK')
    browser.close()
