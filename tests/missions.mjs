import assert from 'node:assert/strict';
import vm from 'node:vm';
import { missions, findMission, missionCategories } from '../src/missions.js';

const solutions = {
 'maior-numero': 'function maiorNumero(numeros){ return numeros.reduce((a,b)=>a>b?a:b); }',
 'conversor-celsius': 'function celsiusParaFahrenheit(celsius){ return celsius * 9/5 + 32; }',
 'contar-pares': 'function contarPares(numeros){ return numeros.filter(n=>n%2===0).length; }',
 'calcular-desconto': 'function precoComDesconto(preco,percentual){ return preco - preco*percentual/100; }',
 'total-carrinho': 'function totalCarrinho(itens){ return itens.reduce((total,item)=>total+item.preco*item.quantidade,0); }',
 'filtrar-tarefas': 'function titulosPendentes(tarefas){ return tarefas.filter(t=>t.concluida===false).map(t=>t.titulo); }'
};

function evaluate(mission,source){
 const ctx=vm.createContext({});
 const fn=vm.runInContext(`${source}\n; ${mission.functionName}`,ctx,{timeout:800});
 const results=mission.tests.map(c=>{
  const args=structuredClone(c.args),before=JSON.stringify(args);
  const result=fn(...args);
  return JSON.stringify(result)===JSON.stringify(c.expected) && (!c.unchangedArgs||JSON.stringify(args)===before);
 });
 return results;
}
assert.equal(missions.length,6,'Oficina precisa de seis missões');
assert.equal(new Set(missions.map(m=>m.id)).size, missions.length,'IDs únicos');
for(const mission of missions){
 assert.equal(findMission(mission.id),mission);
 assert(mission.tests.length>=5, 'Ao menos cinco casos por missão: '+mission.id);
 assert(mission.requirements.length>=3);
 assert(mission.tests.some(t=>t.label.toLowerCase().includes('negativo')||t.label.toLowerCase().includes('vazio')||t.label.toLowerCase().includes('decimal')||t.label.toLowerCase().includes('alterar')||t.label.toLowerCase().includes('zeros')), 'Casos limite: '+mission.id);
 assert(evaluate(mission,solutions[mission.id]).every(Boolean),'Solução correta falhou: '+mission.id);
 if(mission.type==='debug')assert(evaluate(mission,mission.starter).some(v=>!v),'Bug inicial não foi detectado: '+mission.id);
 if(mission.type==='autonomy')assert.equal(mission.starter,'','Avaliação autônoma deve começar vazia');
}
assert.equal(missionCategories.length,3);
console.log('OK — 6 missões, 31 casos de teste, bugs reproduzidos, avaliações do zero e soluções validadas.');
