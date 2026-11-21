"""Inspeção ampla das rotas reais; não substitui testes manuais em Safari/iOS.
Roda inline porque o Chromium automatizado deste ambiente bloqueia localhost.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'offline/index.html').read_text()
SHIM='''() => {const store=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k),clear:()=>store.clear()}})}'''

def main():
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  for width in (390,1440):
   page=browser.new_page(viewport={'width':width,'height':850});page.evaluate(SHIM);errors=[]
   page.on('pageerror',lambda exc:errors.append(str(exc)))
   page.set_content(HTML,wait_until='load')
   links=page.evaluate('learningCatalogEntries().map(entry=>entry.route)')
   extras=['inicio','trilhas','linguagens','frontend','backend','backend/lab','workspace','oficina','revisao','desafios','carreira','projeto','curso/javascript','curso/typescript']
   links=list(dict.fromkeys(extras+links))
   defects=[]
   for route in links:
    try:
     page.evaluate('(r)=>location.hash="#/"+r',route)
     page.wait_for_timeout(35)
     title=page.locator('main#main-content').inner_text(timeout=3500)
     if not title.strip():defects.append((route,'página sem conteúdo'))
     width_info=page.evaluate('({doc:document.documentElement.scrollWidth,screen:innerWidth})')
     if width_info['doc']>width_info['screen']+2:defects.append((route,'overflow global '+str(width_info)))
    except Exception as exc:
     defects.append((route,str(exc)[:140]))
   print('AUDIT',width,'px','total',len(links),'route defects',len(defects),'page errors',len(errors))
   for defect in defects[:20]:print(' DEFECT',defect)
   for err in errors[:8]:print(' ERROR',err[:160])
   assert not defects,(width,defects[:20])
   assert not errors,(width,errors[:8])
   page.close()
  browser.close()
if __name__=='__main__':main()
