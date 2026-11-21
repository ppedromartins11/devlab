"""Regressão visual e funcional do editor sobreposto no tema escuro.
Chromium inline: o ambiente automatizado bloqueia acesso a localhost.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'offline/index.html').read_text(encoding='utf-8')
SHIM='''() => {const memory=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>memory.has(k)?memory.get(k):null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k),clear:()=>memory.clear()}})}'''
SIZES=[(320,740),(375,812),(390,844),(430,932),(768,1024),(1024,768),(1440,900)]

def route(page,path):
    page.evaluate('(name)=>{location.hash="#/"+name}',path)
    page.wait_for_timeout(130)

def check_editor(page,expected_tabs=('html','css','js')):
    assert page.locator('#code-editor').count()==1
    for tab in expected_tabs:
        page.locator(f'.editor-tabs [data-tab="{tab}"]').click()
        code=page.locator('#code-editor').input_value()
        assert code.strip(),f'{tab}: código vazio'
        rendered=page.locator('#syntax-layer').inner_text()
        assert rendered.strip(),f'{tab}: realce vazio'
        props=page.evaluate('''()=>{
          const e=document.querySelector('#code-editor'),h=document.querySelector('#syntax-layer');
          const c=getComputedStyle(e),p=getComputedStyle(h);
          return {bg:c.backgroundColor,fill:c.webkitTextFillColor,visible:p.visibility,opacity:p.opacity,
                  x:e.getBoundingClientRect().width,y:e.getBoundingClientRect().height,preWidth:h.getBoundingClientRect().width,
                  rendered:h.innerText.length};
        }''')
        assert props['bg'] in ('rgba(0, 0, 0, 0)','transparent'),(tab,props)
        assert props['fill'] in ('rgba(0, 0, 0, 0)','transparent'),(tab,props)
        assert props['visible']=='visible' and props['opacity']=='1'
        assert props['x']>100 and props['y']>=180 and props['preWidth']>100
    page.locator('.editor-tabs [data-tab="js"]').click()

def main():
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
        for width,height in SIZES:
            page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1,accept_downloads=True,is_mobile=width<=430,has_touch=width<=430)
            errors=[];page.on('pageerror',lambda err:errors.append(str(err)));page.on('dialog',lambda d:d.accept())
            page.evaluate(SHIM);page.set_content(HTML,wait_until='load')
            route(page,'aula/primeiros-passos')
            page.locator('[data-stage="practice"]').first.click()
            check_editor(page)
            # Editar -> alternar entre arquivos -> recuperar conteúdo salvo.
            original=page.locator('#code-editor').input_value()
            test_code='document.querySelector("#result").textContent="Código executado no DevLab";'
            page.locator('#code-editor').fill(test_code)
            assert test_code in page.locator('#syntax-layer').inner_text()
            page.locator('.editor-tabs [data-tab="html"]').click()
            page.locator('.editor-tabs [data-tab="js"]').click()
            assert page.locator('#code-editor').input_value()==test_code
            page.locator('[data-action="run"]').first.click()
            page.wait_for_timeout(170)
            iframe=page.frame_locator('#devlab-preview')
            assert iframe.locator('#result').inner_text()=='Código executado no DevLab'
            page.locator('[data-action="reset"]').first.click()
            assert page.locator('#code-editor').input_value()!=test_code
            # Barra horizontal global e erros de JS, incluindo aparelhos estreitos.
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2'),f'rolagem horizontal: {width}'
            assert not errors,(width,errors[:3])
            if width in (390,1440):
                page.locator('#code-editor').scroll_into_view_if_needed()
                page.screenshot(path=str(ROOT/'docs/screenshots'/f'editor-fixed-{width}.png'),full_page=True)
            # Testar abas de TypeScript e ausência de fundo opaco.
            route(page,'aula/ts-intro');page.locator('[data-stage="practice"]').first.click()
            for tab in ('html','css','ts'):
                page.locator(f'.editor-tabs [data-tab="{tab}"]').click()
                assert page.locator('#code-editor').input_value().strip()
                assert page.evaluate('getComputedStyle(document.querySelector("#code-editor")).backgroundColor')=='rgba(0, 0, 0, 0)'
            # Oficina: área diferente, também precisa continuar com código visível.
            route(page,'oficina')
            first=page.locator('[data-nav^="missao/"]').first
            assert first.count(),f'Oficina indisponível: {width}'
            first.click()
            page.locator('#code-editor').wait_for(timeout=5000)
            assert page.locator('#code-editor').count()==1
            assert not errors,(width,errors[:3])
            print(f'PASS {width}px — HTML/CSS/JS/TS, edição, alternância, prévia, restauração, Oficina e layout')
            page.close()
        browser.close()

if __name__=='__main__':main()
