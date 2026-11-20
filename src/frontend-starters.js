/** Projetos iniciais originais da Sprint 9. A versão React/TS é destinada ao VS Code. */
export function frontendStarterFiles(track,lesson){
  if(!track||!lesson||track.id!==lesson.track)throw new Error('Trilha ou aula inválida.');
  const title=lesson.title;
  const instructions=`# ${title}\n\n${lesson.objective}\n\n## Missão\n\n${lesson.practice}\n\n## Critérios de revisão\n\n${lesson.checks.map(c=>'- [ ] '+c).join('\n')}\n\nA revisão dos critérios é manual. Concluir o checklist não executa uma avaliação automática do seu projeto.\n`;
  if(track.id==='typescript'){
    return {
      'README.md':instructions+'\n## Executar\n\n1. Instale Node.js LTS e abra esta pasta no VS Code.\n2. Execute `npm install`.\n3. Execute `npm run typecheck` para verificar tipos.\n4. Execute `npm run dev` para testar o comportamento no navegador.\n',
      'package.json':JSON.stringify({name:'devlab-typescript-starter',version:'1.0.0',private:true,type:'module',scripts:{dev:'vite --host 0.0.0.0',build:'tsc --noEmit && vite build',typecheck:'tsc --noEmit'},devDependencies:{typescript:'^5.9.3',vite:'^6.1.0'}},null,2)+'\n',
      'tsconfig.json':JSON.stringify({compilerOptions:{target:'ES2022',lib:['ES2022','DOM','DOM.Iterable'],module:'ESNext',moduleResolution:'Bundler',strict:true,noEmit:true,skipLibCheck:true},include:['src']},null,2)+'\n',
      'index.html':'<!doctype html>\n<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prática TypeScript</title></head><body><main id="app"></main><script type="module" src="/src/main.ts"></script></body></html>\n',
      'src/main.ts':`// ${title}\n// ${lesson.objective}\ninterface Tarefa { id: string; titulo: string; concluida: boolean }\n\nconst tarefas: Tarefa[] = [];\nconst app = document.querySelector<HTMLElement>('#app');\nif(app){\n  const titulo = document.createElement('h1');\n  titulo.textContent = 'Laboratório TypeScript';\n  app.append(titulo);\n}\n\n// TODO: ${lesson.practice}\nconsole.log('Tarefas:',tarefas.length);\n`,
    };
  }
  if(track.id==='react'){
    return {
      'README.md':instructions+'\n## Executar\n\n1. Instale Node.js LTS, extraia os arquivos e abra a pasta no VS Code.\n2. Execute `npm install` e `npm run dev`.\n3. Abra o endereço local indicado pelo Vite.\n4. Execute `npm run build` antes de considerar o trabalho concluído.\n',
      'package.json':JSON.stringify({name:'devlab-react-starter',version:'1.0.0',private:true,type:'module',scripts:{dev:'vite --host 0.0.0.0',build:'vite build',preview:'vite preview'},dependencies:{react:'^19.0.0','react-dom':'^19.0.0'},devDependencies:{vite:'^6.1.0','@vitejs/plugin-react':'^4.4.1'}},null,2)+'\n',
      'vite.config.js':"import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins:[react()] });\n",
      'index.html':'<!doctype html>\n<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prática React</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>\n',
      'src/main.jsx':"import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.jsx';\nimport './styles.css';\ncreateRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);\n",
      'src/App.jsx':`import { useState } from 'react';\n\n// ${title}\nexport default function App(){\n  const [tarefas,setTarefas]=useState([]);\n  return (\n    <main className="app">\n      <p className="eyebrow">DEVLAB / FORMAÇÃO FRONTEND</p>\n      <h1>Meu painel de tarefas</h1>\n      <p>Comece implementando os critérios definidos no README.</p>\n      <p>{tarefas.length} tarefa(s)</p>\n      {/* TODO: ${lesson.practice} */}\n    </main>\n  );\n}\n`,
      'src/styles.css':'* { box-sizing:border-box; }\nbody { margin:0; font-family:system-ui,sans-serif; background:#f2f6f3; color:#253a30; }\n.app { max-width:780px; margin:40px auto; background:white; border:1px solid #dbe7df; border-radius:12px; padding:32px; }\n.eyebrow { color:#2d7653; font-size:11px; letter-spacing:.14em; font-weight:700; }\nbutton { cursor:pointer; }\n',
    };
  }
  const html=`<!doctype html>\n<html lang="pt-BR">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>${track.project}</title>\n  <link rel="stylesheet" href="./styles/style.css">\n</head>\n<body>\n  <header class="site-header"><span>DEVLAB / FORMAÇÃO FRONTEND</span></header>\n  <main id="conteudo" class="container">\n    <h1>${track.project}</h1>\n    <p id="message">${lesson.objective}</p>\n    <section class="cards" aria-label="Projetos de estudo">\n      <article class="card"><h2>Primeira etapa</h2><p>Adapte este conteúdo ao desafio.</p></article>\n      <article class="card"><h2>Próximo passo</h2><p>Altere estrutura, estilos e comportamento.</p></article>\n    </section>\n    <form id="study-form"><label for="study-input">Nova tarefa</label><input id="study-input" required placeholder="O que quer praticar?"><button type="submit">Adicionar</button></form>\n    <ul id="study-list"></ul>\n  </main>\n  <footer class="site-footer">Projeto de estudo · DevLab</footer>\n  <script type="module" src="./src/main.js"></script>\n</body>\n</html>\n`;
  const css=`* { box-sizing:border-box; }\n:root { font-family:system-ui,sans-serif; color:#21392e; background:#f3f6f3; }\nbody { margin:0; }\n.site-header, .site-footer { padding:18px; background:#e1ebe4; color:#355a45; }\n.container { width:min(100% - 32px,920px); margin:36px auto; }\n.card { background:white; border:1px solid #d6e5d9; padding:20px; border-radius:10px; }\nbutton { margin:8px 0; padding:10px 16px; border:0; border-radius:8px; background:#226247; color:white; cursor:pointer; }\ninput { padding:10px; max-width:100%; }\n/* TODO: ${lesson.objective} */\n`;
  const js=`import { adicionarItem } from './utils.js';\n\nconst form=document.querySelector('#study-form');\nconst list=document.querySelector('#study-list');\nform?.addEventListener('submit',event=>{\n  event.preventDefault();\n  const input=document.querySelector('#study-input');\n  const text=input?.value.trim()||'';\n  if(!text)return;\n  adicionarItem(list,text);\n  input.value='';\n});\n// TODO: ${lesson.practice}\n`;
  const utils=`export function adicionarItem(lista,texto){\n  const li=document.createElement('li');\n  li.textContent=texto;\n  lista.append(li);\n}\n`;
  return {'index.html':html,'styles/style.css':css,'src/main.js':js,'src/utils.js':utils};
}
export function frontendWorkspaceStarter(track,lesson){
  const files=frontendStarterFiles(track,lesson);
  if(track.id==='react'||track.id==='typescript')throw new Error('Esta trilha requer VS Code e Node.js. Exporte o starter.');
  return {files,entry:'src/main.js'};
}
