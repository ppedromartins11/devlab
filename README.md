# DevLab — Aprenda construindo

Plataforma de estudo pessoal de **JavaScript e TypeScript** com teoria em unidades, exercícios por aula, editor de código, visualização da página em tempo real, console e projeto integrador TaskFlow.

O conteúdo, o design e o código são próprios. A organização em **curso → unidades → aulas** foi inspirada na estrutura pública de [mauriciodesouza.dev/estudo/cursos/csharp](https://mauriciodesouza.dev/estudo/cursos/csharp); não foi feita cópia de código, materiais didáticos ou identidade visual do site consultado.

## DevLab 2.0 — experiência inspirada no Mimo

Esta versão traz o percurso **Aprender → Praticar → Construir**: teoria curta, quiz de fixação com feedback instantâneo, exercícios de código, verificação orientativa e aplicação ao projeto TaskFlow. O progresso conta XP e sequência de estudo, sem vidas, anúncios ou bloqueios artificiais. As 29 aulas possuem perguntas originais; 9 exercícios têm também testes observáveis no iframe.

As funcionalidades foram inspiradas em características publicamente descritas em [Mimo](https://mimo.org/mimo-coding-app), mas não foram copiados materiais, identidade visual ou código da plataforma. Consulte [Estudo funcional e implementação](docs/ESTUDO-MIMO-E-IMPLEMENTACAO.md).

**Publicação Vercel:** importe o repositório; a configuração `vercel.json` faz deploy da versão standalone sem instalar dependências. Na versão publicada, o compilador TypeScript é carregado sob demanda de uma CDN, exigindo internet ao acessar lições TS. O ZIP original mantém o compilador local para uso offline. Localmente você pode usar `npm run build:static` para gerar `dist/`. A versão React+Monaco continua acessível por `npm install` e `npm run dev`.

**Importante:** o progresso permanece no navegador, não sincroniza entre dispositivos; a verificação estrutural de exercícios não é prova de correção, exceto os testes funcionais pontuais indicados.

## Começar agora — sem npm

1. Extraia o ZIP.
2. Abra **`offline/index.html`** no navegador. É uma versão que roda sem instalação de bibliotecas.
3. Clique em **JavaScript → Fundamentos → O que são HTML, CSS e JavaScript**.
4. Altere o código na aba `script.js`: a prévia é atualizada após uma breve pausa, ou clique em **Executar**.
5. Use **Exercício da aula** para testar ideias e **Projeto guiado** para editar um TaskFlow compartilhado entre as aulas.

Para usar o VS Code, abra a pasta `offline/` e use a extensão **Live Server**, clicando em “Go Live”. Isso oferece uma origem `http://localhost` estável para o armazenamento no navegador e evita as limitações que alguns navegadores impõem a arquivos `file://`.

A versão offline inclui realce básico, numeração de linhas, indentação com Tab, abas HTML/CSS/JS/TS, prévia isolada, console de erros, salvamento local e exportação. Para experimentar um editor **Monaco (motor do VS Code)**, use a versão React abaixo.

## Versão avançada — React + Monaco

Abra a raiz do projeto num terminal e execute:

```bash
npm install
npm run dev
```

Abra a URL local exibida pelo Vite, normalmente `http://localhost:5173`.

Este aplicativo usa React, Monaco Editor, Vite e o compilador TypeScript. O preview roda em `iframe sandbox="allow-scripts"`. A versão React tem editor completo com realce de sintaxe, sugestões e edição em abas, além das mesmas aulas e do TaskFlow.

**Validação:** os fontes React passaram na análise sintática JSX. O build React ainda não pôde ser executado no ambiente de criação porque o acesso ao registro npm estava indisponível. A versão offline não precisa dessa instalação.

## Como o curso funciona

- **JavaScript:** 24 aulas distribuídas em 6 unidades: fundamentos, lógica, dados, DOM, web real e projeto final.
- **TypeScript:** 5 aulas da segunda trilha, abordando compilação, tipos, interfaces, funções e generics.
- **Aula:** teoria curta + conceitos + exemplo + desafio + editor HTML/CSS/JS (ou TS) + prévia + console.
- **Projeto evolutivo:** TaskFlow começa como um esqueleto com tarefas `TODO`. A cada aula, o aluno implementa melhorias. Os marcos do projeto são marcados manualmente; o progresso das aulas depende do quiz e do exercício validado.
- **Progresso:** conclusão de aulas e código são gravados no `localStorage` deste navegador/dispositivo, sem autenticação, cadastro, backend ou envio de dados.
- **Segurança:** a prévia executa código num `iframe` isolado, sem a permissão `allow-same-origin`. Para o exercício de persistência, a prévia recebe uma implementação de `localStorage` ligada ao armazenamento local do DevLab. **Não execute código de terceiros no laboratório.**

## Exportação de código

No editor, clique em **Exportar** para baixar um documento `.html` com HTML, CSS e JavaScript incorporados. No modo TypeScript, a exportação gera o arquivo `.ts`, não uma página HTML pronta. Para um projeto com vários arquivos e build, use a versão React e o repositório como base.

## Estrutura de arquivos

```text
devlab-javascript/
├── offline/
│   ├── index.html              # site independente de pacotes
│   ├── source/app.js           # lógica da versão offline
│   ├── source/offline-extra.css
│   ├── build_standalone.py     # recompila offline/index.html
│   └── vendor/typescript.js    # compilador TS para a versão offline
├── src/
│   ├── App.jsx                 # aplicação React
│   ├── course.js               # unidades, aulas, exemplos, desafios, TaskFlow
│   ├── preview.js              # construção da prévia segura
│   ├── monacoSetup.js          # editor Monaco e workers locais
│   ├── main.jsx
│   └── styles.css              # visual desktop e mobile
├── docs/TRILHA.md              # planejamento didático
├── tests/smoke.mjs             # testes de sintaxe/consistência
├── index.html                  # ponto de entrada React
├── package.json
└── vite.config.js
```

Para alterar ou acrescentar aulas, edite **`src/course.js`**. Na versão offline, execute `python offline/build_standalone.py` para reconstruir o site com as mudanças. Na versão React, o Vite aplica mudanças diretamente em desenvolvimento.

## Verificações automáticas

```bash
node tests/smoke.mjs
```

O teste valida contagem das aulas, conteúdo necessário, sintaxe dos exercícios JavaScript, compilação dos exercícios TypeScript, geração de prévia e exportação. O navegador não foi usado na validação automatizada devido a uma restrição do ambiente de execução; testes de interação devem ser refeitos após abrir o site no seu computador.

## Limitações importantes

- Trata-se de um **laboratório client-side**. Não executa Node.js, bibliotecas instaladas via npm dentro da prévia, banco de dados ou autenticação real.
- As conclusões de aulas e marcos do projeto são **manuais**, não correções automáticas dos desafios.
- A compilação TypeScript da prévia remove anotações de tipo, mas não substitui uma verificação completa `tsc` do projeto. O Monaco da versão React fornece diagnóstico de tipos no editor.
- O compilador TypeScript incluído em `offline/vendor/` é distribuído sob Apache 2.0; veja `LICENSE-typescript.txt` ao lado dele.
- Em navegação privada ou bloqueio de armazenamento local, o progresso pode não ser persistido.
