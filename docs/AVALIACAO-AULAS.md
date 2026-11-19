# Avaliação automática nas aulas — DevLab 6.0

## Objetivo

Verificar comportamentos observáveis do código do aluno no ambiente **isolado** da prévia: alteração de textos, manipulação de classes, eventos com entradas diferentes, envio e validação de formulários, atualização de estado, JSON e armazenamento local.

## Aulas cobertas

| Aula | O que é avaliado |
|---|---|
| Primeiros passos | Clique altera título e resultado |
| Operadores | Percentual de 3/8 exibido como 37,5% |
| Console e debugging | Resultado do dobro de 4 no console |
| Loops | Cinco itens visíveis no DOM |
| Arrays | Pelo menos três tarefas não vazias |
| DOM básico | Clique modifica título, alterna e reverte classe |
| Eventos | Digitação de **dois nomes distintos** altera o resultado sem dado antigo |
| Formulários | Envio sem reload, trim, inserção de tarefa, limpeza, bloqueio de entrada vazia |
| Renderização | Dois cliques consecutivos exibem contagens 1 e 2 |
| API / JSON | Dois títulos esperados são renderizados |
| localStorage | Clique incrementa valor salvo e atualiza a interface |
| Acessibilidade | label associado, aria-live, confirmação e media query no CSS |

As demais aulas permanecem com **verificação orientativa de estrutura/conceito**. Não se deve anunciar essas verificações como testes comportamentais. As seis missões da Oficina continuam com testes específicos de funções, incluindo casos-limite.

## Arquitetura e segurança

- `src/lesson-assessment.js` define os testes por comportamento.
- `src/preview.js` carrega o avaliador **dentro de um iframe**; o usuário nunca executa seu código na origem principal do site.
- O iframe usa `sandbox="allow-scripts"`, sem `allow-same-origin`.
- Mensagens são aceitas apenas da janela do iframe atual e com token e identificador da solicitação correspondente.
- O site interrompe a espera de uma avaliação depois de 3 segundos e mostra a falha em vez de atribuir aprovação indevida.
- Quando um exercício com prova automática é editado após passar, a aprovação daquela prova é invalidada até nova verificação. Histórico antigo de progresso é preservado.
- O código da prévia não é adequado para operações sensíveis. Não se deve digitar credenciais ou tokens em exercícios.

## Feedback e progressão

O aluno enxerga cada critério com sucesso ou falha. Após aprovação, continua na etapa de prática para revisar a lista de resultados e pode optar por avançar para o projeto TaskFlow. O quiz da aula ainda é requisito para registrar a aprovação da prática.

## Validação

```bash
npm test
python tests/e2e_lesson_assessment.py  # requer Chromium e Playwright instalados
python tests/e2e_missions.py           # regressão da Oficina
```

A publicação em produção utiliza `offline/index.html` gerado por `python offline/build_standalone.py` e publicado com `node scripts/build-static.mjs`. O código React em `src/App.jsx` mantém a interface de avaliação para uso na variante React, mas não é a implementação que a Vercel usa no deploy estático atual.

## Limites atuais

- Os 12 conjuntos possuem critérios diferentes. Em exercícios de saída estática, como operadores e JSON, ainda não é possível provar que o aluno usou o algoritmo desejado sem especificar uma API de função com parâmetros variáveis.
- Não há verificação completa de toda a árvore de acessibilidade, Lighthouse ou teste em leitor de tela real.
- O editor de HTML/CSS/JS ainda não suporta projeto completo de vários arquivos no navegador.
- Executar um loop infinito na prévia DOM pode bloquear a aba; o timeout de 3 s limita o tempo de espera do resultado, não interrompe JavaScript síncrono executando no iframe.
