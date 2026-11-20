# Sprint 11 — Jornada profissional e portfólio

## Escopo implementado

A rota `#/carreira` acrescenta três experiências independentes ao DevLab:

1. **Projetos integradores:** três briefings autorais (Biblioteca de estudos, TaskAPI com testes, TaskFlow full-stack). Cada um possui requisitos verificáveis, checklist de revisão de código, espaço de anotações, evidência de testes e links externos opcionais.
2. **Laboratório Git:** simulação local de `status`, `diff`, `branch`, `switch -c`, `add`, `restore --staged`, `commit`, `switch`, `merge` por fast-forward e `log`. Não executa Git nem cria branches no seu GitHub.
3. **Portfólio:** geração de um site HTML estático e de um arquivo Markdown, sem publicar ou sincronizar dados. URLs são restritas a HTTPS, e o HTML escapa conteúdo digitado e aplica CSP.

### Reutilização de código e progressão

- **Biblioteca de estudos:** botão cria uma cópia de projeto inicial dentro do Workspace da Sprint 8, com arquivos locais, README.md e prévia real.
- **TaskAPI com testes:** ZIP baseado no starter Node da Sprint 10, com rotas CRUD reais e `node:test`. Não inclui PostgreSQL, login nem autenticação real.
- **TaskFlow full-stack:** ZIP inclui interface Node, testes e exemplos de banco/autenticação da Sprint 10. São blocos didáticos não integrados completamente; o aluno precisa implementar PostgreSQL e segurança antes de usar em produção.
- A conclusão de um projeto significa apenas **checklist autodeclarado**. Não existe aprovação automática do sistema inteiro nem verificação dos links ou da execução real no computador do estudante.

## Fluxo recomendado (terminal Git real)

Crie um repositório pessoal a partir do projeto exportado. Exemplo:

```bash
git init
git add .
git commit -m "chore: inicia projeto integrador"
git branch -M main
git switch -c feat/primeira-entrega
# Altere o código e escreva testes
npm test
git add .
git commit -m "feat: implementa primeira entrega"
# Configure o remote a partir de um repositório criado na sua conta do GitHub
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
git push -u origin feat/primeira-entrega
```

Depois abra uma pull request no GitHub, confira o diff, revise possíveis credenciais e aguarde os testes do repositório antes do merge. Para projetos somente HTML/CSS/JS, substitua `npm test` pelos testes que você efetivamente escreveu.

## Critérios de qualidade da Sprint

- Testes de unidade dos estados Git, progressos e HTML/Markdown seguro: `node --test tests/career.mjs`.
- Testes anteriores: `npm test`.
- Prévia offline: `python offline/build_standalone.py` e `node scripts/build-static.mjs`.
- Navegador Chromium (opcional): `python tests/e2e_career.py`; testa abas, progresso, exportações, simulação e 390/768/1440px. Usa HTML injetado e `localStorage` em memória porque este ambiente bloqueia páginas locais — teste com domínio real continua recomendado.
- CI no GitHub Actions executa os testes Node e o build estático.

## Limitações, segurança e privacidade

- Dados são armazenados no `localStorage` do domínio e não sincronizam entre dispositivos. Exportar é responsabilidade do estudante. Limpar o navegador pode apagar o histórico.
- URLs e textos adicionados ao portfólio são dados fornecidos pelo estudante, não auditados.
- O simulador Git **não executa comandos reais**, não envia commits e não ensina resolução automática de conflitos; o merge exibido é apenas fast-forward.
- A marcação de checklists não valida acesso indevido, cobertura de testes nem correção do código. A área profissional não concede certificados.
- Não adicione tokens, senhas, dados pessoais sensíveis ou links privados às notas e aos projetos que pretende compartilhar.
- A Sprint 11 não depende de Supabase, Vercel ou contas externas. O deploy **não é requisito** para utilizar a versão offline. A versão React+Monaco ainda não tem paridade total com a versão estática.
