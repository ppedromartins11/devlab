# Trilha didática — JavaScript para lógica e desenvolvimento web

O objetivo é sair da compreensão de instruções e algoritmos para a capacidade de entregar uma pequena aplicação web original. A progressão favorece **entender → praticar isoladamente → aplicar no TaskFlow → revisar**.

## Trilha JavaScript

| Unidade | Conteúdo | Competência principal |
|---|---|---|
| 01. Fundamentos | Papel do JavaScript, variáveis, tipos, operadores, console | Compreender dados e fluxo de execução |
| 02. Lógica | Condições, switch, loops, funções | Resolver problemas com regras e repetição |
| 03. Dados | Arrays, objetos, map/filter/reduce, strings e datas | Modelar e transformar informações |
| 04. Interfaces | DOM, eventos, formulários, renderização e estado | Criar interfaces que respondem ao usuário |
| 05. Web real | Promises, HTTP/JSON, armazenamento, acessibilidade | Tratar assincronia e persistência |
| 06. Projeto | Organização, testes, TaskFlow, Git e publicação | Integrar conhecimentos em um sistema |

As aulas incluem introdução conceitual, exemplo, desafio no editor e um marco aplicável ao TaskFlow.

## Trilha TypeScript — depois do JavaScript

1. Relação com JavaScript e processo de compilação.
2. Tipos primitivos, inferência, arrays e unions.
3. Interfaces, types e modelagem de objetos.
4. Funções tipadas e acesso seguro ao DOM.
5. Generics, tipos utilitários e evolução do projeto.

## Projeto TaskFlow

Requisitos ao final da trilha JavaScript:

- Criar tarefa a partir de um formulário.
- Validar textos e exibir mensagens de erro.
- Guardar tarefas como objetos em um array.
- Renderizar tarefas a partir do estado.
- Marcar tarefa como concluída e desfazer.
- Filtrar tarefas em todas, pendentes e concluídas.
- Excluir tarefas.
- Salvar e restaurar tarefas no navegador.
- Apresentar layout responsivo e navegação por teclado.
- Testar casos comuns, limites e estados vazios.

O TaskFlow é iniciado como scaffold com comentários `TODO`, para que o aluno escreva o comportamento gradualmente, em vez de simplesmente receber uma solução pronta.


## Formação backend — Sprint 10

| Percurso | Competência principal |
| --- | --- |
| Node.js | Runtime, módulos, variáveis de ambiente, assincronia e testes. |
| HTTP e REST | Status, métodos, rotas, JSON, CRUD e consumo com fetch. |
| PostgreSQL | Modelagem, constraints, SQL parametrizado, transações e migrações. |
| Segurança | Senhas com salt, sessões, autorização por objeto e testes negativos. |
| Integração | Testes HTTP, documentação, deploy e aplicação full-stack. |

A prática usa um laboratório HTTP simulado no navegador e projetos ZIP reais para VS Code. Banco e autenticação exigem integração pelo aluno; somente o servidor Node em memória está executável de imediato. Ver `docs/SPRINT-10.md`.
