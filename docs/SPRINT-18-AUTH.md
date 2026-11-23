# DevLab — Sprint 18: autenticação (branch de integração)

## Escopo entregue nesta branch
- UI dark responsiva: login, cadastro, recuperação, nova senha, Google OAuth, conta e saída.
- Supabase Auth com PKCE e SDK fixado em `@supabase/supabase-js@2.119.2` (carregado somente quando configurado).
- Entrada como visitante sem simular identidades nem alterar localStorage de aulas.
- Importante: **a sincronização de progresso entre contas/dispositivos não está implementada**.
- Não há banco remoto, tabelas, migrations, RLS nem credenciais Supabase criadas nesta sprint.

## Build real em Vercel
O DevLab publicado usa `offline/index.html` gerado por Python, não a UI React.
`node scripts/build-static.mjs` agora regenera este HTML automaticamente e copia o resultado para `dist/`.
As variáveis abaixo são públicas e inseridas no HTML final **no build**:

```sh
DEVLAB_SUPABASE_URL=https://SEU-PROJETO.supabase.co
DEVLAB_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SUA_CHAVE
```

**Nunca inserir** `service_role`, `sb_secret_...`, Google Client Secret ou senha pessoal.
Sem essas duas variáveis, a plataforma continua acessível como visitante; as ações de login ficam indisponíveis até configuração.

## Ativação manual, após avaliação da branch
1. Criar projeto Supabase **exclusivo para o DevLab**, sem reutilizar Odonto Class.
2. Em Authentication > Providers, ativar Email, confirmação de e-mail e Google. No Google Cloud, criar credenciais OAuth Web; usar como URI de retorno o callback mostrado pelo Supabase (`https://SEU_REF.supabase.co/auth/v1/callback`). Client Secret fica no Supabase, nunca no frontend.
3. Em Authentication > URL Configuration, cadastrar como Site URL `https://devlab-zeta.vercel.app` e redirect `https://devlab-zeta.vercel.app/`. Adicionar URLs de desenvolvimento **exatas**, se necessário.
4. Na Vercel, adicionar as duas variáveis de build públicas acima e validar primeiro num Preview Deployment.
5. Conferir em navegador: registro, confirmação, login e-mail, senha incorreta, Google, recuperação, nova senha, saída, modo visitante e reabertura após reload.
6. Executar `python offline/build_standalone.py`, `npm test`, `node scripts/build-static.mjs` e testes Playwright nas larguras 320, 390, 768, 1440px antes do merge.

## Limitações de segurança e de produto
- A tela de login não protege recursos estáticos e não representa controle de acesso a dados. Se adicionar tabelas remotas, aplicar RLS por `auth.uid()` e grants adequados.
- Até a futura sprint de sincronização, o conteúdo das chaves `devlab-offline-v1:*` continua no dispositivo atual e não é separado por usuário. Não oferecer login multiusuário em dispositivo compartilhado como se houvesse isolamento.
- Visitante é escolha de sessão (`sessionStorage`), não conta Supabase. No fechamento do navegador, a escolha pode ser perdida.
- SDK servido de CDN fixado em versão por compatibilidade com o build estático; revisar dependência ao migrar para empacotamento local.
- Sem credenciais reais de Google e Supabase, testes automatizados verificam contrato, não a conexão real com esses provedores.

## Critérios de saída da sprint
- Sem exclusão ou renomeação das chaves anteriores de progresso.
- Build gerado contém UI real, a versão sem configuração segue navegável e o editor permanece no iframe isolado.
- Aprovação de CI, testes em navegador com contas de teste isoladas e revisão de acesso antes de publicação em produção.
