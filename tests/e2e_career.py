from pathlib import Path
from playwright.sync_api import sync_playwright
import subprocess
import tempfile
import zipfile

html=(Path(__file__).resolve().parents[1]/'offline/index.html').read_text(encoding='utf-8')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(1440,900),(768,1000),(390,844)]:
  context=browser.new_context(viewport={'width':width,'height':height},accept_downloads=True)
  page=context.new_page()
  errors=[]
  page.on('pageerror', lambda err: errors.append(str(err)))
  page.evaluate('''() => { const map=new Map(); Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k),clear:()=>map.clear()}}) }''')
  page.set_content(html,wait_until='load')
  page.evaluate("location.hash='#/carreira'")
  page.wait_for_timeout(250)
  assert page.get_by_role('heading',name='Do código à entrega.').count()==1, (width, page.url, errors)
  assert page.locator('.career-project-card').count()==3
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'), f'horizontal overflow at {width}'
  if width==1440:
   page.screenshot(path=str(Path(__file__).resolve().parents[1]/'docs/screenshots/career-desktop.png'),full_page=True)
   page.locator('[data-career-action="open-workspace"]').click()
   page.locator('.ws-page').wait_for(timeout=5000)
   assert page.locator('.ws-page').count()==1
   assert page.locator('.ws-tree-file').count()>=3
   page.evaluate("location.hash='#/carreira'")
   page.wait_for_timeout(150)
   page.locator('[data-study-switch="1"]').first.click()
   page.locator('[data-career-check="0"]').check()
   assert '1/7 requisitos' in page.locator('.career-project-card.active').inner_text()
   page.locator('[data-career-select="api"]').click()
   assert page.get_by_role('heading',name='TaskAPI com testes').count()==1
   with page.expect_download() as d:
    page.locator('[data-career-action="export-starter"]').click()
   download=d.value
   assert download.suggested_filename.endswith('.zip'), download.suggested_filename
   with zipfile.ZipFile(download.path()) as z:
    names=z.namelist();assert 'src/app.js' in names and 'test/api.test.js' in names
    with tempfile.TemporaryDirectory() as d:
     z.extractall(d)
     run=subprocess.run(['node','--test'],cwd=d,capture_output=True,text=True,timeout=30)
     assert run.returncode==0,run.stdout+run.stderr
   page.locator('[data-career-select="fullstack"]').click()
   with page.expect_download() as d:
    page.locator('[data-career-action="export-starter"]').click()
   with zipfile.ZipFile(d.value.path()) as z:
    assert 'sql/001_init.sql' in z.namelist() and 'test/auth.test.js' in z.namelist()
    with tempfile.TemporaryDirectory() as temp:
     z.extractall(temp)
     run=subprocess.run(['node','--test'],cwd=temp,capture_output=True,text=True,timeout=35)
     assert run.returncode==0,run.stdout+run.stderr
   page.locator('[data-career-tab="git"]').click()
   assert 'simulação' in page.locator('.career-git').inner_text().lower()
   page.locator('#career-file').fill('<h1>Novo título</h1>')
   commands=['git switch -c feat/cabecalho','git add index.html','git commit -m "feat: melhora cabeçalho"','git switch main','git merge feat/cabecalho']
   for cmd in commands:
    page.locator('#career-git-command').fill(cmd)
    page.locator('#career-git-form button[type="submit"]').click()
   assert page.locator('.career-steps .complete').count()==3, page.locator('.career-console').inner_text()
   page.locator('[data-career-tab="portfolio"]').click()
   page.locator('#career-profile-name').fill('Estudante Fullstack')
   page.locator('#career-profile-name').press('Tab')
   with page.expect_download() as d:
    page.locator('[data-career-action="portfolio-html"]').click()
   content=Path(d.value.path()).read_text()
   assert '<h1>Estudante Fullstack</h1>' in content
   assert 'não constituem certificação' in content
   assert page.evaluate("localStorage.getItem('devlab-offline-v1:career-git')!==null")
   page.locator('[data-career-tab="git"]').click()
   assert page.locator('.career-steps .complete').count()==3
  elif width==390:
   page.screenshot(path=str(Path(__file__).resolve().parents[1]/'docs/screenshots/career-mobile.png'),full_page=True)
   page.locator('[data-career-tab="git"]').click()
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'), 'git mobile horizontal overflow'
   page.locator('[data-career-tab="portfolio"]').click()
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'), 'portfolio mobile overflow'
  assert not errors, (width,errors[:4])
  print('OK',width,'px: carreira, UI e sem erros de script')
  context.close()
 browser.close()
