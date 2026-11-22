"""Fluxos reais de PHP — navegador Chromium com build estático e estado isolado."""
import pathlib, json, os
from playwright.sync_api import sync_playwright
ROOT=pathlib.Path(__file__).resolve().parents[1]
HTML=(ROOT/'offline/index.html').read_text('utf-8')
SHIM="""() => {const storage=new Map();Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>storage.has(k)?storage.get(k):null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k),clear:()=>storage.clear()}})}"""
def go(page,route):
    page.evaluate('(r)=>location.hash="#/"+r',route)
    page.wait_for_timeout(110)
SHOT=ROOT/'docs/screenshots'
SHOT.mkdir(parents=True,exist_ok=True)

with sync_playwright() as playwright:
  browser=playwright.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for width in [320,390,768,1440]:
    page=browser.new_page(viewport={'width':width,'height':860},device_scale_factor=1)
    errors=[]
    page.on('pageerror',lambda exc:errors.append(str(exc)))
    page.evaluate(SHIM)
    page.set_content(HTML,wait_until='load')
    go(page,'linguagem/php')
    page.locator('.php-course .php-module').first.wait_for(timeout=12000)
    assert page.locator('.php-module').count()==8
    assert page.locator('.php-lesson-link').count()==32
    assert 'PHP' in page.locator('h1').first.inner_text()
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2'),f'overflow PHP course {width}'
    if width in (390,1440): page.screenshot(path=str(SHOT/f'php-course-{width}.png'),full_page=True)
    # clique em aula do modulo inicial
    page.locator('.php-lesson-link').first.click()
    assert '#/linguagem/aula/php-servidor' in page.url
    page.locator('.rp-lesson-tabs [data-lang-step="1"]').click()
    assert '<?php' in page.locator('.rp-guided-code').inner_text()
    page.locator('.rp-lesson-tabs [data-lang-step="2"]').click()
    page.locator('[data-lang-answer="0"]').click()
    assert 'Questão de fixação' in page.locator('.rp-guided-panel:not([hidden])').inner_text()
    assert 'Resposta correta' not in page.locator('.rp-guided-panel:not([hidden])').inner_text()
    page.locator('[data-lang-answer="1"]').click()
    assert 'Resposta correta' in page.locator('.rp-guided-panel:not([hidden])').inner_text()
    page.locator('.rp-lesson-tabs [data-lang-step="3"]').click()
    page.locator('[data-lang-check]').nth(0).check()
    page.locator('[data-lang-check]').nth(1).check()
    page.locator('[data-lang-check]').nth(2).check()
    assert 'Aula revisada' in page.locator('.rp-guided-panel:not([hidden])').inner_text()
    page.locator('[data-lang-note]').fill('Estudei PHP e o terminal php -v funciona.')
    go(page,'linguagens')
    go(page,'linguagem/aula/php-servidor')
    page.locator('.rp-lesson-tabs [data-lang-step="3"]').click()
    assert page.locator('[data-lang-note]').input_value()=='Estudei PHP e o terminal php -v funciona.'
    assert 'Aula revisada' in page.locator('.rp-guided-panel:not([hidden])').inner_text()
    assert not errors,f'errors PHP page {width}: {errors[:3]}'
    page.close()
  # simulated exam: answer every question deliberately with the known correct response
  page=browser.new_page(viewport={'width':390,'height':850})
  errors=[]; page.on('pageerror',lambda exc:errors.append(str(exc)))
  page.evaluate(SHIM)
  page.set_content(HTML,wait_until='load')
  go(page,'linguagem/php/simulado')
  assert page.locator('.php-exam-question').count()==1
  assert page.locator('[data-php-exam-answer]').count()==3
  # obtain questions via JS (content is public local course data); exercise interactions rather than hardcoding
  questions=page.evaluate('phpExamQuestions.map(q=>({key:q.key,answer:q.answer}))')
  assert len(questions)==24
  for index, question in enumerate(questions):
    page.locator(f'[data-php-exam-answer="{question["answer"]}"]').click()
    if index<23:page.locator('[data-php-exam-go="'+str(index+1)+'"]').click()
  assert page.locator('[data-php-exam-submit]').is_enabled()
  page.screenshot(path=str(SHOT/'php-exam-mobile.png'),full_page=True)
  page.locator('[data-php-exam-submit]').click()
  assert '100%' in page.locator('.php-exam-result').inner_text()
  go(page,'linguagem/php')
  go(page,'linguagem/php/simulado')
  assert '100%' in page.locator('.php-exam-result').inner_text()
  page.locator('[data-php-exam-reset]').click()
  assert page.locator('.php-exam-question').count()==1
  assert not errors,errors[:4]
  # old editor did not regress after embedding PHP curriculum
  go(page,'aula/primeiros-passos')
  page.locator('[data-stage="practice"]').first.click()
  page.locator('#code-editor').wait_for(timeout=10000)
  assert len(page.locator('#code-editor').input_value())>10
  assert len(page.locator('#syntax-layer').inner_text())>10
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2')
  page.close()
  browser.close()
print('OK: PHP course 390/768/1440, quiz, feedback, saves, 24-question exam, reload, reset and JS editor regression')
