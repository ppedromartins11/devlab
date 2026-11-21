# Instruções para agentes de desenvolvimento — DevLab

O DevLab é uma plataforma pessoal de estudos: a prioridade é o fluxo **aprender → praticar → construir**.

Antes de alterações de UI, leia `.agents/skills/frontend-ui/SKILL.md` e `docs/DESIGN-SYSTEM.md`.
Antes de alterações de lógica, leia `.agents/skills/web-development/SKILL.md`.
Antes de entregar ou fazer deploy, leia `.agents/skills/web-quality/SKILL.md`.

**A versão Vercel é gerada a partir de `offline/index.html`, não do React/Monaco.**
Mantenha as duas visões em sintonia quando possível, mas priorize a interface publicada. Nunca apague ou reescreva o progresso já salvo pelos alunos. Não introduza código do aluno fora do iframe isolado.

Valide com:

```bash
python offline/build_standalone.py
npm run build:static
npm test
```

Configuração visual: `src/styles.css` contém a estrutura legada; `src/workspace.css` reúne os estilos do workspace atual. Prefira CSS organizado e decisões justificadas por usabilidade, não efeitos decorativos.

## Oficina de código (DevLab 5)

- Os contratos das missões vivem em `src/missions.js`; os testes de comportamento devem ser determinísticos, cobrindo casos-limite.
- `src/mission-runner.js` executa código do aluno exclusivamente em um Worker de um iframe com origem opaca. Nunca mover `new Function` para o contexto principal.
- Não considerar aprovada uma solução apenas pela presença de keywords. Não alterar as chaves antigas do armazenamento local.
- Para publicar, gerar `offline/index.html` via `python offline/build_standalone.py`, rodar `node scripts/build-static.mjs` e executar os testes automatizados.

## Sprint 10 — Backend

- `src/backend-curriculum.js` é a fonte das 25 aulas; `src/backend-starters.js` exporta projetos Node reais; `src/backend-http-lab.js` implementa somente um **simulador didático**, não autenticação real.
- `offline/source/backend-ui.js` e `backend-v10.css` compõem a interface publicada; `offline/build_standalone.py` incorpora esses módulos.
- Nunca apresentar simulações de usuário como autorização de produção. As funções PostgreSQL e de sessão são exercícios ainda não conectados à API básica.
- Novas chaves `backend-*` são independentes; não renomear `frontend-*`, `mission-*` e outras chaves legadas.
- Antes do deploy: `node --test tests/backend.mjs`, `npm test`, `node scripts/build-static.mjs` e os testes de navegador que o ambiente permitir.

## Sprint 11

- `src/career.js`: contratos, progresso autodeclarado, exportação segura de portfólio, estados Git simulados.
- `offline/source/career-ui.js` e `career-v11.css`: experiência da rota `#/carreira`.
- `docs/SPRINT-11.md`: escopo, limitações e instruções para Git real.
- Para alterar esta área, rode `node --test tests/career.mjs`, `npm test`, `python offline/build_standalone.py` e os testes opcionais de navegador.
- Não confundir o simulador Git com integração remota. Não tratar checklists como certificação automática.

## Sprint 12 — organização pedagógica

- A versão de produção mantém as rotas e o progresso existentes, mas separa visualmente as trilhas em **Aprender / Praticar / Construir**.
- `src/learning-navigation.js` contém o modelo puro de navegação e busca. `offline/source/learning-shell.js` gera a interface e controla qual módulo está visível sem reiniciar o editor.
- `offline/source/learning-v12.css` é a última camada de estilo na geração. Evite acrescentar promoções e cartões decorativos à página inicial.
- Cada aula frontend/backend possui cinco etapas independentes. Não remova conteúdo nem marque checklists como verificação automática.
- A Jornada Profissional possui quatro etapas por projeto; os registros de evidências permanecem nas mesmas chaves `career-*` de `localStorage`.
- A busca da barra lateral atualiza apenas os resultados; nunca deve invocar `render()` a cada tecla e interromper a prévia.
- Valide com `node --test tests/learning-navigation.mjs`, `python tests/e2e_clean_ux.py`, `npm test` e os fluxos de navegador existentes.
