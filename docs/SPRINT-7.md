# Sprint 7 — Avaliação por funções e casos-limite

## Escopo entregue

| Grupo | Cobertura | Validação |
| --- | ---: | --- |
| DOM / eventos / formulário / armazenamento | 12 | Interação com a prévia isolada (`src/lesson-assessment.js`) |
| Contratos JavaScript | 10 | Funções e entradas variadas em Web Worker |
| Contratos TypeScript | 5 | AST da assinatura, transpilation e resultados em Web Worker |
| Marcos de entrega (TaskFlow / README) | 2 | Autoavaliação orientativa (não prova automatizada) |
| **Total** | **29** | **27 com alguma validação automatizada** |

### Quais são os novos contratos?

- `variaveis`: apresentarPerfil(nome, pontos, ativo)
- `condicionais`: mensagemProgresso(concluidas)
- `switch`: legendaStatus(status)
- `funcoes`: percentual(concluidas, total)
- `objetos`: resumirTarefas(tarefas)
- `metodos-array`: resumoTarefas(tarefas)
- `strings-numeros`: normalizarTitulo(texto)
- `arquitetura`: criarTarefa(id, titulo)
- `testes`: tituloValido(texto)
- `assincrono`: carregarMensagem(nome, atraso) com Promise
- `ts-intro`: apresentarHoras(nome: string, horas: number): string
- `ts-tipos`: mediaNotas(notas: number[]): number
- `ts-interfaces`: titulosPendentes(tarefas: Tarefa[]): string[]
- `ts-funcoes`: percentual(parte: number, total: number): number
- `ts-generics`: primeiro<T>(itens: T[]): T | undefined

Cada contrato recebe pelo menos três casos e um starter próprio. O código do aluno permanece no navegador; o avaliador devolve os resultados de cada caso com entradas variáveis, arrays vazios, entradas distintas e não mutação quando aplicável. O código, os casos e os resultados esperados estão disponíveis no repositório: este é um laboratório pedagógico, não uma prova antifraude.

## Arquitetura

- `src/lesson-contracts.js`: dados dos contratos e inspeção das assinaturas TypeScript via AST.
- `src/mission-runner.js`: runner reaproveitado da Oficina. Cria um Worker temporário dentro de um iframe com `sandbox="allow-scripts"`; aceita Promise em testes marcados `requiresPromise`, aplica timeout e remove o iframe quando termina.
- `src/runtime-check.js`: união das 12 aulas DOM e 15 contratos em uma única relação de cobertura.
- `offline/source/app.js`: tratamento do estado de edição, quiz, chamadas para o Worker, feedback individual e invalidação de aprovação após edição.
- `src/App.jsx`: fluxo equivalente preparado para a variante React, sem build local nesta entrega.
- `src/preview-guard.js`: alerta e bloqueio preventivo para padrões óbvios de loop sem condição explícita na **prévia**, inclusive em comentários e strings corretamente desconsiderados.

## Segurança e limites

O **Worker** consegue ser finalizado por timeout de 5 segundos sem travar a página em chamadas síncronas dos contratos. Ele roda em iframe de origem opaca e não tem acesso ao DOM do DevLab nem ao localStorage da aplicação. **Isso não equivale a executar código arbitrário com segurança absoluta.** Não cole segredos no editor.

O editor HTML/CSS/DOM ainda usa uma prévia em iframe: `sandbox="allow-scripts"` isola a origem, porém um loop síncrono em um evento da página pode ocupar a thread de execução do navegador. O guard detecta apenas exemplos triviais como `while(true)` e `for(;;)`; não cobre loops dinâmicos, recursão infinita ou todas as variantes possíveis. A próxima evolução dessa área exige um ambiente de execução com isolamento mais forte e uma estratégia própria para a avaliação do DOM.

A análise TypeScript confere a **forma das assinaturas** e alguns tipos especificados, mas não faz a checagem estática completa de projetos reais. A emissão usa `transpileModule`; para um sistema maior, use `tsc --noEmit` com libs e tsconfig.

## Compatibilidade e validação

O projeto preserva `devlab-offline-v1:*` (versão estática) e `devlab-v1:*` (variante React), sem migrações destrutivas. A primeira aprovação sob um novo contrato precisa ser verificada novamente; os drafts existentes não são apagados.

```bash
npm test
node scripts/build-static.mjs
python tests/e2e_sprint7.py # opcional, com Chromium e Playwright
```

O teste browser utiliza HTML injetado na página e `localStorage` em memória porque o ambiente de automação bloqueia acesso a localhost; a verificação de sincronização/persistência no domínio real deve ser feita manualmente.
