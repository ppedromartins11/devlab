/** Gera uma página executada EXCLUSIVAMENTE num iframe sandbox="allow-scripts".
 *  O usuário pode editar HTML/CSS/JS/TS, mas não acessa a página hospedeira. */
function jsonSafe(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028|\u2029/g, ' ');
}

export function buildPreview({ html, css, js, token, stored = {} }) {
  const cssSafe = String(css).replace(/<\/style/gi, '<\\/style');
  const script = String(js);
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${cssSafe}</style>
<script>
(() => {
  const token = ${jsonSafe(token)};
  const memoria = ${jsonSafe(stored)};
  const send = (kind, payload) => parent.postMessage({ __devlab: true, token, kind, payload }, '*');
  const toText = (value) => {
    if (typeof value === 'string') return value;
    if (value instanceof Error) return value.message;
    try { return JSON.stringify(value); } catch { return String(value); }
  };
  const storage = {
    get length() { return Object.keys(memoria).length; },
    key(i) { return Object.keys(memoria)[i] ?? null; },
    getItem(k) { return Object.hasOwn(memoria, String(k)) ? memoria[String(k)] : null; },
    setItem(k, v) { memoria[String(k)] = String(v); send('storage', memoria); },
    removeItem(k) { delete memoria[String(k)]; send('storage', memoria); },
    clear() { for (const key of Object.keys(memoria)) delete memoria[key]; send('storage', memoria); }
  };
  try { Object.defineProperty(window, 'localStorage', { configurable: true, value: storage }); }
  catch (error) { send('log', { level: 'warn', args: ['Armazenamento virtual indisponível: ' + error.message] }); }
  for (const level of ['log', 'warn', 'error', 'info', 'debug']) {
    const native = console[level]?.bind(console);
    console[level] = (...args) => {
      send('log', { level, args: args.map(toText) });
      native?.(...args);
    };
  }
  window.addEventListener('error', event => send('log', {level:'error', args:[event.message]}));
  window.addEventListener('unhandledrejection', event => send('log', {level:'error',args:[toText(event.reason)]}));
  const observedLogs=[];
  // A verificação executa no iframe, nunca na origem da plataforma.
  for (const level of ['log','error']) {
    const previous = console[level];
    console[level] = (...args) => { observedLogs.push({level,values:args.map(toText)}); previous(...args); };
  }
  window.addEventListener('message', event => {
    const msg=event.data;
    if(event.source!==parent || !msg || msg.__devlab_check!==true || msg.token!==token)return;
    const id=msg.id;
    const report=(ok,detail)=>send('check-result',{id,ok,detail});
    try {
      const first=(selector)=>document.querySelector(selector);
      if(id==='primeiros-passos') {
        const title=first('#title'),result=first('#result'),button=first('#action');
        if(!title||!result||!button)return report(false,'Não encontrei o botão, o título ou o resultado.');
        const before=[title.textContent,result.textContent];button.click();
        return report(title.textContent!==before[0]&&result.textContent!==before[1],'O clique precisa alterar o título E o texto do resultado.');
      }
      if(id==='operadores')return report(/37[.,]5/.test(first('#result')?.textContent||''),'O resultado esperado é 37,5% (3 de 8 tarefas).');
      if(id==='debug-console')return report(observedLogs.some(x=>x.values.join(' ').includes('8')),'dobrar(4) deve retornar 8; confira o console.');
      if(id==='loops')return report(document.querySelectorAll('#list li').length===5,'O loop deve gerar exatamente cinco itens na lista.');
      if(id==='arrays')return report(document.querySelectorAll('#list li').length>=3,'Mostre ao menos três tarefas como itens da lista.');
      if(id==='eventos') {
        const input=first('#name'),result=first('#result');if(!input||!result)return report(false,'Input ou resultado não encontrado.');
        input.value='Teste DevLab';input.dispatchEvent(new Event('input',{bubbles:true}));
        return report((result.textContent||'').includes('Teste DevLab'),'O resultado deve reagir ao texto digitado.');
      }
      if(id==='formularios') {
        const form=first('#task-form'),input=first('#task-title');if(!form||!input)return report(false,'Formulário ou campo não encontrado.');
        const before=document.querySelectorAll('#list li').length;input.value='Nova tarefa';form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
        return report(document.querySelectorAll('#list li').length>before,'Enviar uma tarefa precisa adicionar um item à lista.');
      }
      if(id==='renderizacao') {
        const button=first('#action'),result=first('#result');if(!button||!result)return report(false,'Botão ou resultado não encontrado.');
        const before=result.textContent;button.click();return report(result.textContent!==before,'Clicar no botão precisa atualizar o contador na tela.');
      }
      if(id==='api-json')return report(document.querySelectorAll('#list li').length>=2,'Renderize os dois títulos do JSON na lista.');
      return report(true,'Verificação estrutural concluída.');
    }catch(error){return report(false,'Erro durante o teste: '+toText(error));}
  });
  send('ready', null);
})();
</script></head><body>${html}
<script>
try {
  const runUserCode = new Function(${jsonSafe(script)});
  runUserCode();
} catch (error) { console.error(error instanceof Error ? error.message : String(error)); }
</script></body></html>`;
}

export function loadStorageBucket(bucket) {
  try { const value = JSON.parse(localStorage.getItem(bucket) || '{}'); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
  catch { return {}; }
}

export function makeExportHtml({html,css,js}) {
  return `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Meu projeto - DevLab</title>\n<style>\n${String(css).replace(/<\/style/gi,'<\\/style')}\n</style>\n</head>\n<body>\n${html}\n<script>\n${String(js).replace(/<\/script/gi,'<\\/script')}\n<\/script>\n</body>\n</html>`;
}
