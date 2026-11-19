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
