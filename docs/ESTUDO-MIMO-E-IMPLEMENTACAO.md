# DevLab 2.0 — análise funcional da referência Mimo

## Fontes públicas avaliadas

- https://mimo.org/mimo-coding-app
- https://mimo.org/learn-to-code
- https://mimo.org/courses/learn-javascript
- https://mimo.org/press-kit

Esta é uma análise das funcionalidades e interfaces apresentadas publicamente, não uma extração do aplicativo fechado, de sua API interna, base de dados, algoritmos, assinaturas, ativos visuais ou código-fonte.

## Adaptações autorais implementadas

| Conceito observado | Implementação no DevLab |
| --- | --- |
| Aulas curtas e progressivas | 24 aulas JS e 5 aulas TS, agrupadas em unidades |
| Interação a cada conteúdo | 29 quizzes autorais de múltipla escolha, feedback na hora e explicação da resposta |
| Aprender, praticar, construir | Navegação em três etapas por aula |
| Projeto real durante a aprendizagem | TaskFlow com arquivos HTML/CSS/JS compartilhados entre as aulas |
| Aprender programando | Editor de código com realce simples offline e Monaco opcional no React |
| Testar o código | Prévia em iframe isolado, console e verificação de estrutura do exercício |
| Feedback de comportamento | 9 atividades com checagens reais dentro do iframe (DOM, eventos, lista, formulário e console) |
| Gamificação leve | XP calculado a partir de atividades concluídas e sequência de dias ativos |
| Dicas progressivas | Checklist inicialmente oculto, revelado sob demanda |
| Trilha evolutiva | JavaScript precede TypeScript, mas revisão pode ser acessada sem bloqueios artificiais |

### O que não foi copiado

Identidade visual, logotipo, textos, imagens, exercícios, estrutura interna do código, conteúdo proprietário, UX exata, fluxo de pagamento, travas de assinatura, limitação de vidas ou integração com tutor de IA.

## Limites conhecidos

- Os checkpoints estruturais apenas identificam sinais de implementação. Eles **não garantem correção funcional**. Nove lições incluem testes observáveis executados dentro do iframe. O objetivo da próxima evolução é adicionar testes dinâmicos a todas as aulas.
- O progresso e os arquivos são salvos no armazenamento local do navegador. Não há usuário autenticado nem sincronização entre dispositivos. Limpar os dados do site remove o progresso local.
- A versão React/Monaco requer instalar pacotes; ela foi atualizada nos fontes, mas não houve build npm validado neste ambiente porque não existe acesso ao registro npm. A versão standalone foi testada com navegador Chromium.
- A trilha de TypeScript é introdutória e deve ser realizada depois dos fundamentos de JavaScript.
- Não há backend, execução de Node.js no servidor, certificação nem assistente de IA.

## Segurança

O HTML/JS digitado pelo estudante roda em `iframe sandbox="allow-scripts"` (sem `allow-same-origin`). O compilador TypeScript é distribuído localmente. O iframe comunica console e armazenamentos virtuais por mensagens validadas por origem de frame e token. A aplicação não fornece uma garantia de isolamento contra códigos de terceiros intencionalmente maliciosos: use o laboratório apenas para código próprio e não cole segredos.

## Publicação

O `vercel.json` publica a versão standalone testada, sem npm install, executando `node scripts/build-static.mjs`. A interface React/Monaco permanece disponível localmente com `npm install && npm run dev`.

Não existe ainda repositório DevLab entre os repositórios GitHub conectados consultados. Para publicar em um repositório exclusivo, crie um repositório novo e use os arquivos deste pacote. O deploy não está confirmado até uma URL válida receber a aplicação e ser testada.
