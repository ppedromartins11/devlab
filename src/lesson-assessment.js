/**
 * Verificações comportamentais da prévia isolada. Nenhuma solução é executada
 * no contexto da aplicação principal; a função é serializada para o iframe.
 * A validação é por resultados observáveis, sem exigir nomes de variáveis.
 */
export const behaviorLessonIds = Object.freeze([
  'primeiros-passos', 'operadores', 'debug-console', 'loops', 'arrays',
  'dom-basico', 'eventos', 'formularios', 'renderizacao', 'api-json',
  'storage', 'acessibilidade'
]);

export function assessLessonBehavior(id, doc, observedLogs) {
  const checks = [];
  const add = (label, ok) => checks.push({label, ok: Boolean(ok)});
  const one = selector => doc.querySelector(selector);
  const many = selector => [...doc.querySelectorAll(selector)];
  const text = selector => one(selector)?.textContent?.trim() ?? '';
  const click = selector => {const el=one(selector);if(el)el.click();return Boolean(el);};
  const input = (el, value) => { if (!el) return false;el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));return true; };
  const submit = selector => {const el=one(selector);return el?.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));};
  const count = () => many('#list li').length;
  const resultValue = () => text('#result');
  switch(id) {
    case 'primeiros-passos': {
      const beforeTitle=text('#title'),beforeResult=resultValue();
      add('O botão existe e pode ser acionado.',click('#action'));
      add('O clique altera o título.',text('#title')!==beforeTitle);
      add('O clique altera a mensagem exibida.',resultValue()!==beforeResult);
      break;
    }
    case 'operadores': {
      add('O percentual de 3 tarefas em 8 é exibido corretamente.',/37[.,]5\s*%?/.test(resultValue()));
      break;
    }
    case 'debug-console': {
      add('A depuração mostra o resultado de dobrar 4 (= 8).',observedLogs.some(e=>e.level==='log'&&e.values.some(v=>/(?:^|\D)8(?:\D|$)/.test(v))));
      break;
    }
    case 'loops': {
      add('A lista tem exatamente cinco itens.',count()===5);
      add('Os cinco itens possuem texto visível.',many('#list li').every(el=>el.textContent.trim().length>0));
      break;
    }
    case 'arrays': {
      const items=many('#list li').map(el=>el.textContent.trim());
      add('Três tarefas estão renderizadas.',items.length>=3);
      add('A lista não contém tarefas vazias.',items.length>0&&items.every(Boolean));
      break;
    }
    case 'dom-basico': {
      const title=one('#title'),button=one('#action');
      if(!title||!button) {add('Título e botão estão presentes.',false);break;}
      const beforeText=title.textContent, beforeClass=title.classList.contains('destaque');
      button.click();
      add('Clicar altera o texto do título.',title.textContent!==beforeText);
      add('O clique alterna a classe destaque.',title.classList.contains('destaque')!==beforeClass);
      button.click();
      add('O segundo clique reverte a classe destaque.',title.classList.contains('destaque')===beforeClass);
      break;
    }
    case 'eventos': {
      const field=one('#name'),out=one('#result');
      if(!field||!out){add('Campo e resultado estão presentes.',false);break;}
      const before=out.textContent;
      input(field,'Ada Lovelace');
      add('A página responde ao primeiro texto digitado.',out.textContent.includes('Ada Lovelace'));
      input(field,'Grace Hopper');
      add('A página responde a um segundo texto, sem ficar com o antigo.',out.textContent.includes('Grace Hopper')&&!out.textContent.includes('Ada Lovelace'));
      add('O resultado não permanece igual ao inicial.',out.textContent!==before);
      break;
    }
    case 'formularios': {
      const form=one('#task-form'),field=one('#task-title');
      if(!form||!field){add('Formulário e campo estão presentes.',false);break;}
      const start=count();
      input(field,'  Estudar DOM  ');
      const dispatched=submit('#task-form');
      const items=many('#list li');
      add('Enviar não provoca navegação ou recarga.',dispatched===false);
      add('Enviar uma tarefa acrescenta um item na lista.',items.length===start+1);
      add('O título da tarefa é exibido sem espaços extras.',items.some(el=>el.textContent.trim()==='Estudar DOM'));
      add('O campo é limpo após cadastrar.',field.value==='');
      input(field,'  ');submit('#task-form');
      add('Uma tarefa vazia não pode ser cadastrada.',count()===start+1);
      break;
    }
    case 'renderizacao': {
      const out=one('#result'),button=one('#action');
      if(!out||!button){add('Contador e botão estão presentes.',false);break;}
      const before=out.textContent;
      button.click();const first=out.textContent;
      button.click();const second=out.textContent;
      add('O primeiro clique atualiza o contador.',first!==before&&/\b1\b/.test(first));
      add('O segundo clique incrementa novamente.',second!==first&&/\b2\b/.test(second));
      break;
    }
    case 'api-json': {
      const texts=many('#list li').map(el=>el.textContent.trim());
      add('Duas tarefas são mostradas após interpretar o JSON.',texts.length===2);
      add('A lista mostra os títulos de ambos os objetos.',texts.some(t=>t.includes('Ler documentação'))&&texts.some(t=>t.includes('Criar projeto')));
      break;
    }
    case 'storage': {
      const field=one('#result'),button=one('#action');
      if(!field||!button){add('Botão e resultado estão disponíveis.',false);break;}
      const raw=localStorage.getItem('contador');
      const before=Number(raw||0);
      button.click();
      const saved=Number(localStorage.getItem('contador'));
      add('O clique salva uma contagem incrementada.',Number.isFinite(saved)&&saved===before+1);
      add('O valor salvo aparece na interface.',new RegExp('(?:^|\\D)'+saved+'(?:\\D|$)').test(field.textContent));
      break;
    }
    case 'acessibilidade': {
      const field=one('#name'),label=one('label[for="name"]'),status=one('#status'),form=one('#form');
      add('Campo tem um label associado pelo id.',Boolean(field&&label&&label.control===field));
      add('Mensagem de status utiliza aria-live.',Boolean(status&&['polite','assertive'].includes(status.getAttribute('aria-live'))));
      if(!field||!form||!status){add('Formulário apresenta confirmação ao enviar.',false);break;}
      const before=status.textContent;
      input(field,'DevLab');submit('#form');
      add('Formulário apresenta confirmação ao enviar.',status.textContent.trim().length>0&&status.textContent!==before);
      break;
    }
    default: {
      add('Esta aula ainda não tem testes comportamentais.',false);
    }
  }
  return checks;
}
