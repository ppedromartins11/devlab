---
name: web-quality
description: Fazer revisão de UX, acessibilidade, segurança e testes do DevLab antes de publicar no GitHub e Vercel.
---

# Qualidade Web — DevLab

## Checklist obrigatório
1. Verificar que a página inicial permite abrir a primeira aula, e que a aula abre teoria, exercício e projeto.
2. Validar quiz correto e incorreto; o estudante recebe feedback e sabe como prosseguir.
3. Verificar edição, prévia, console, execução e restauração dos arquivos.
4. Garantir que o projeto TaskFlow é persistido separadamente dos exercícios.
5. Confirmar que completar uma aula não perde resultados nem renomeia chaves de armazenamento.
6. Verificar foco visível, rótulos acessíveis, zoom 200%, contraste e controles em dispositivos móveis.
7. Executar `npm test`, `npm run build:static` e revisar o HTML gerado.
8. Confirmar commit, status do build Vercel e endereço publicado; não declarar deploy se estiver apenas local.

## Reporte
- Separar *verificado* de *não verificado*.
- Registrar limitações reais de TypeScript online e editor Monaco (não incluído no build estático).
- Ao encontrar uma regressão, bloquear o deploy até corrigi-la.
