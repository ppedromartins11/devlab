"""Teste da correção automática DOM, eventos e formulários no browser real."""
from pathlib import Path
from playwright.sync_api import sync_playwright
HTML = (Path(__file__).parents[1] / 'dist/index.html').read_text()

def open_site(page):
    page.evaluate("""() => { const store = new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:key=>store.get(key)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()}}); }""")
    page.set_content(HTML,wait_until='load')

def assess(page, id, source, expect, timeout=5000, css=None):
    page.evaluate("id=>location.hash='#/aula/'+id",id)
    page.locator('.lesson-heading h1').wait_for()
    correct=page.evaluate('(id)=>checkpoints[id].answer',id)
    if page.locator('.quiz-choice:not([disabled])').count():
        page.locator(f'[data-answer="{correct}"]').first.click()
    page.locator('[data-stage="practice"]').first.click()
    if css is not None:
        page.locator('[data-tab="css"]').click()
        page.locator('#code-editor').fill(css)
        page.locator('[data-tab="js"]').click()
    page.locator('#code-editor').fill(source)
    page.wait_for_timeout(900)
    page.locator('[data-action="check-exercise"]').click()
    page.wait_for_function('() => st.checkResult!==null && st.pendingCheck===null',timeout=timeout)
    actual=page.evaluate('st.checkResult.passed')
    checks=page.evaluate('st.checkResult.checks.map(x=>(x.ok?"✓ ":"× ")+x.label).join("\\n")')
    if actual!=expect: print('FAILED',id,'expected',expect,'got',actual,'checks=',checks)
    assert actual==expect,(id,checks)
    return checks

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    page=browser.new_page(viewport={'width':1366,'height':900})
    errors=[]
    page.on('pageerror',lambda err:errors.append(str(err)))
    open_site(page)
    assess(page,'eventos','const nome = document.querySelector("#name");',False)
    assess(page,'eventos','document.querySelector("#name").addEventListener("input",e=>{document.querySelector("#result").textContent=e.target.value})',True)
    assert page.evaluate("st.practicePassed.includes('eventos')")
    page.locator('[data-stage="practice"]').first.click()
    page.locator('#code-editor').fill('console.log("código modificado")')
    assert not page.evaluate("st.practicePassed.includes('eventos')"), 'Editar código previamente aprovado deve invalidar aprovação automática'
    assess(page,'eventos','console.log("código modificado")',False)
    assess(page,'dom-basico',"document.querySelector('#action').addEventListener('click',()=>{document.querySelector('#title').textContent='Mudou';})",False)
    assess(page,'dom-basico',"document.querySelector('#action').addEventListener('click',()=>{const t=document.querySelector('#title');t.textContent='Mudou';t.classList.toggle('destaque')})",True)
    assess(page,'formularios',"document.querySelector('#task-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#list').innerHTML='<li>Qualquer</li>'})",False)
    assess(page,'formularios',"const f=document.querySelector('#task-form'),i=document.querySelector('#task-title'),list=document.querySelector('#list');f.addEventListener('submit',e=>{e.preventDefault();const v=i.value.trim();if(!v)return;const li=document.createElement('li');li.textContent=v;list.append(li);i.value='';});",True)
    page.screenshot(path=str(Path(__file__).parents[1]/'avaliacao-formularios-v6.png'),full_page=True)
    assess(page,'renderizacao',"document.querySelector('#action').addEventListener('click',()=>document.querySelector('#result').textContent='1')",False)
    assess(page,'renderizacao',"let contador=0;function renderizar(){document.querySelector('#result').textContent='Total: '+contador;}document.querySelector('#action').addEventListener('click',()=>{contador++;renderizar()});renderizar();",True)
    assess(page,'storage',"let contador=Number(localStorage.getItem('contador')||0);document.querySelector('#action').addEventListener('click',()=>{contador++;localStorage.setItem('contador',contador);document.querySelector('#result').textContent='Total '+contador;});",True)
    # Acessibilidade: ajustar só CSS é válido porque o starter já tem um formulário com handler.
    from_js="const form=document.querySelector('#form');form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#status').textContent='Salvo!';});"
    css="@media (max-width: 600px){.app{padding:12px}}"
    assess(page,'acessibilidade',from_js,True,css=css)
    assert not errors,errors
    mobile=browser.new_page(viewport={'width':390,'height':844})
    open_site(mobile)
    mobile.evaluate("location.hash='#/aula/formularios'")
    mobile.locator('.lesson-heading h1').wait_for()
    assert mobile.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Layout móvel não pode ter rolagem horizontal'
    mobile.screenshot(path=str(Path(__file__).parents[1]/'avaliacao-mobile-v6.png'),full_page=True)
    browser.close()
    print('PASSOU: 11 execuções reais de aulas, 5 reprovações, 6 aprovações, invalidação do progresso e mobile.')
