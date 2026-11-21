# Sprint 13 — identidade DevLab dark minimalista

## Escopo

Aplique a identidade escura aprovada pelo usuário sem mudar rotas, IDs de aulas ou chaves de armazenamento. Nova barra superior com busca e atalho `Ctrl/⌘+K`, menu de leitura mais simples, página inicial com resumos derivados dos dados persistidos e marca `</>` original.

### Superfícies

- Canvas `#0B0D12`, sidebar `#0E1016`, cards `#171A22`, bordas `#30343F`.
- Texto `#F2F3F7`, secundário `#A7ADBB`, acento lilás `#AAA0FA` usado discretamente.
- Botão principal branco neutro; a visualização do projeto do aluno **não** recebe filtros de cor.

### Integridade

- Total 79 aulas; número concluído vem de `st.completed`, `frontendSummary().done`, `backendSummary().done`. Não são dados de demonstração.
- O progresso não é reinterpretado como prova de conhecimento: os checklists frontend/backend permanecem revisões autodeclaradas.
- Busca indexa JS/TS, frontend e backend e não remonta o editor durante a digitação.
- O CSS dark é compartilhado pela build standalone e pelo código React. Ainda não há paridade de recursos na alternativa React.
- A prévia do aluno roda dentro de iframe isolado e conserva seu próprio CSS.

### Validação

```bash
npm test
python tests/e2e_clean_ux.py
python tests/e2e_dark_theme.py
npm run build:static
```

O roteiro Chromium cobre início, progresso, 8 rotas, busca global, `Ctrl+K`, menu móvel, ausência de rolagem horizontal em 390/768/1440 px e ausência de exceções de JavaScript. Outros roteiros do repositório preservam quiz, prática, editor e projetos.
