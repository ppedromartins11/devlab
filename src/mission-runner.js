/** Executa código desconhecido somente em um Worker dentro de um iframe de origem opaca.
 * Não usa eval na origem do DevLab. Cada tentativa tem timeout e termina o Worker.
 */
function runWorker() {
  self.onmessage = async ({data}) => {
    const {code, functionName, cases} = data;
    const printable = value => {
      if (value === undefined) return 'undefined';
      try { return JSON.stringify(value); } catch { return String(value); }
    };
    const equal = (a,b) => {
      if (typeof a === 'number' && typeof b === 'number') return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a-b)<1e-9;
      if (Object.is(a,b)) return true;
      if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
      if (Array.isArray(a)!==Array.isArray(b)) return false;
      const keysA=Object.keys(a),keysB=Object.keys(b);
      return keysA.length===keysB.length && keysA.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));
    };
    try {
      const getFunction = new Function('"use strict";\n' + code + '\nreturn typeof ' + functionName + ' !== "undefined" ? ' + functionName + ' : undefined;');
      const tested = getFunction();
      if (typeof tested !== 'function') throw new Error('A função ' + functionName + ' não foi encontrada. Confira o nome e a assinatura.');
      const results = [];
      for (const item of cases) {
        let actual;
        try {
          const args = structuredClone(item.args);
          const before = structuredClone(args);
          const returned = tested(...args);
          if (item.requiresPromise && (!returned || typeof returned.then !== 'function')) throw new Error('A função deve retornar uma Promise.');
          if (!item.requiresPromise && returned && typeof returned.then === 'function') throw new Error('Este exercício exige uma função síncrona.');
          actual = await returned;
          const unchanged = !item.unchangedArgs || equal(args,before);
          results.push({label:item.label,ok:equal(actual,item.expected)&&unchanged,expected:printable(item.expected),actual:printable(actual),mutation:!unchanged});
        } catch(error) { results.push({label:item.label,ok:false,expected:printable(item.expected),actual:'Erro: ' + String(error.message || error).slice(0,200)}); }
      }
      self.postMessage({kind:'results',results});
    } catch(error) { self.postMessage({kind:'error',message:String(error.message||error).slice(0,300)}); }
  };
}

function sandboxRunner() {
  const send = (token, payload) => parent.postMessage({__devlab_mission:true,token,...payload}, '*');
  let activeWorker = null;
  window.addEventListener('message', event => {
    const data = event.data;
    if (event.source !== parent || !data || data.__devlab_mission !== true || data.command !== 'run') return;
    const token = data.token;
    try {
      if (activeWorker) activeWorker.terminate();
      const source = '(' + runWorker.toString() + ')();';
      const blobUrl = URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
      activeWorker = new Worker(blobUrl);
      URL.revokeObjectURL(blobUrl);
      activeWorker.onmessage = workerEvent => send(token,workerEvent.data);
      activeWorker.onerror = () => send(token,{kind:'error',message:'Falha ao executar o Worker isolado.'});
      activeWorker.postMessage({code:data.code,functionName:data.functionName,cases:data.cases});
    } catch(error) { send(token,{kind:'error',message:'O navegador não permitiu iniciar o ambiente isolado: '+String(error.message||error)}); }
  });
  parent.postMessage({__devlab_mission:true,kind:'ready'}, '*');
}

export function runMissionInSandbox(mission, source, timeoutMs=4500) {
  if (!mission || typeof source !== 'string') return Promise.resolve({kind:'error',message:'Missão inválida.'});
  if (!source.trim()) return Promise.resolve({kind:'error',message:'Escreva a função antes de executar os testes.'});
  if (source.length > 16000) return Promise.resolve({kind:'error',message:'O código ultrapassou o limite deste exercício (16 mil caracteres).'});
  return new Promise(resolve => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox','allow-scripts');
    iframe.setAttribute('aria-hidden','true');
    iframe.style.cssText='position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;border:0;';
    const token = Math.random().toString(36).slice(2) + Date.now();
    let finished = false;
    const finish = result => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      window.removeEventListener('message',onMessage);
      iframe.remove();
      resolve(result);
    };
    const onMessage = event => {
      if (event.source !== iframe.contentWindow || event.data?.__devlab_mission !== true) return;
      if (event.data.kind === 'ready') {
        iframe.contentWindow.postMessage({__devlab_mission:true,command:'run',token,code:source,functionName:mission.functionName,cases:mission.tests},'*');
      } else if (event.data.token === token && ['results','error'].includes(event.data.kind)) {
        finish(event.data);
      }
    };
    const timer = setTimeout(()=>finish({kind:'error',message:'Tempo limite excedido. Procure loops infinitos ou cálculos que não terminam.'}),timeoutMs);
    window.addEventListener('message',onMessage);
    // A origem do iframe é opaca. O código do aluno roda dentro de um Worker desse iframe.
    iframe.srcdoc = '<!doctype html><html lang="pt-BR"><body><script>(' + sandboxRunner.toString().replace('runWorker.toString()', '('+runWorker.toString()+').toString()') + ')();<' + '/script></body></html>';
    document.body.appendChild(iframe);
  });
}
