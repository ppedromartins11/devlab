"""Teste do laboratório v5 com Chromium e HTML inline (navegação externa bloqueada no ambiente)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

HTML = Path(__file__).parents[1].joinpath('dist/index.html').read_text()

def mock_storage(page, values=None):
    page.evaluate("""values=>{ const map=new Map(Object.entries(values));
      Object.defineProperty(window,'localStorage',{configurable:true,value:{
        getItem:k=>map.has(k)?map.get(k):null,
        setItem:(k,v)=>map.set(k,String(v)),
        removeItem:k=>map.delete(k),
        clear:()=>map.clear(),
        key:i=>Array.from(map.keys())[i]??null,
        get length(){return map.size;},
        dump:()=>Object.fromEntries(map)
      }});
    }""", values or {})

def load_site(page, route, storage=None):
    mock_storage(page,storage)
    page.set_content(HTML)
    page.evaluate("route=>{location.hash='#/'+route;}",route)
    page.locator('h1').first.wait_for(timeout=5000)

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    context=browser.new_context(viewport={'width':1366,'height':900},device_scale_factor=1)
    page=context.new_page(); errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    load_site(page,'oficina')
    assert page.locator('.mission-card').count()==6
    print('HUB 6 missões')
    page.screenshot(path=str(Path(__file__).parents[1]/'oficina-v5.png'),full_page=True)
    page.locator('[data-nav="missao/maior-numero"]').first.click()
    page.locator('[data-action="run-tests"]').click()
    page.locator('.mission-grade.failed').wait_for(timeout=9000)
    assert '0/5' in page.locator('.mission-results-head').inner_text()
    print('STARTER reprova corretamente')
    page.locator('#code-editor').fill('function maiorNumero(numeros){return numeros.reduce((a,b)=>a>b?a:b);}')
    page.locator('[data-action="run-tests"]').click()
    page.locator('.mission-grade.passed').wait_for(timeout=9000)
    assert '5/5' in page.locator('.mission-results').inner_text()
    print('IMPLEMENTAR 5/5')
    page.screenshot(path=str(Path(__file__).parents[1]/'missao-v5.png'),full_page=True)
    page.locator('[data-nav="oficina"]').last.click()
    assert '1 de 6' in page.locator('.mission-stat').inner_text()
    page.locator('[data-nav="missao/contar-pares"]').first.click()
    page.locator('[data-action="run-tests"]').click()
    page.locator('.mission-grade.failed').wait_for(timeout=9000)
    page.locator('#code-editor').fill('function contarPares(numeros){return numeros.filter(n=>n%2===0).length;}')
    page.locator('[data-action="run-tests"]').click()
    page.locator('.mission-grade.passed').wait_for(timeout=9000)
    print('DEBUG código defeituoso detectado e corrigido')
    page.evaluate("location.hash='#/missao/total-carrinho'")
    assert page.locator('#code-editor').input_value()==''
    page.locator('[data-action="run-tests"]').click()
    page.locator('.mission-error').wait_for(timeout=9000)
    page.locator('#code-editor').fill('function totalCarrinho(itens){return itens.reduce((n,i)=>n+i.preco*i.quantidade,0)}')
    page.locator('[data-action="run-tests"]').click()
    page.locator('.mission-grade.passed').wait_for(timeout=9000)
    print('AUTONOMIA começa em branco e aprova solução real')
    storage=page.evaluate('localStorage.dump()')
    assert any('mission-drafts' in k for k in storage)
    assert any('mission-progress' in k for k in storage)
    fresh=context.new_page()
    load_site(fresh,'missao/total-carrinho',storage)
    assert fresh.locator('#code-editor').input_value().startswith('function totalCarrinho')
    assert 'Aprovada' in fresh.locator('.mission-status').inner_text()
    print('PERSISTÊNCIA salva e recupera estado versionado')
    fresh.locator('#code-editor').fill('function totalCarrinho(){return 123}')
    assert 'Aguardando testes' in fresh.locator('.mission-status').inner_text() if fresh.locator('.mission-status').is_visible() else True
    fresh.locator('[data-action="run-tests"]').click()
    fresh.locator('.mission-grade.failed').wait_for(timeout=9000)
    print('REGRESSÃO reprova código editado após aprovação')
    fresh.locator('#code-editor').fill('function totalCarrinho(itens){while(true){}}')
    fresh.locator('[data-action="run-tests"]').click()
    fresh.locator('.mission-error').wait_for(timeout=9000)
    assert 'Tempo limite' in fresh.locator('.mission-error').inner_text()
    print('TIMEOUT interrompe loop infinito no worker')
    mobile=context.new_page();mobile.set_viewport_size({'width':390,'height':844})
    load_site(mobile,'oficina')
    assert mobile.evaluate('document.documentElement.scrollWidth <= innerWidth')
    mobile.screenshot(path=str(Path(__file__).parents[1]/'oficina-v5-mobile.png'),full_page=True)
    mobile.evaluate("location.hash='#/missao/maior-numero'")
    assert mobile.evaluate('document.documentElement.scrollWidth <= innerWidth')
    print('MOBILE 390px sem overflow horizontal')
    assert not errors,errors
    browser.close()
    print('OK — Fluxo completo, persistência, casos negativos, timeout e mobile.')
