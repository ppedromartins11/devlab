/** DevLab Sprint 10 — Formação backend autoral. Sem serviços reais embutidos no navegador. */
const Q = (question,options,answer,explanation)=>({question,options,answer,explanation});
const L=(id,title,minutes,objective,theory,example,quiz,practice,checks)=>({id,title,minutes,objective,theory,example,quiz,practice,checks});
export const backendTracks=[
{
 id:'node',title:'Node.js e fundamentos',short:'JavaScript fora do navegador',level:'Fundamentos',duration:'4 h',project:'Servidor HTTP de tarefas',
 description:'Entenda o runtime Node.js, módulos, scripts, ambiente, requisições e tarefas assíncronas antes de adicionar frameworks.',
 outcome:'Executar um servidor Node local, explicar seu ciclo de vida e cobrir comportamentos essenciais com testes.',
 lessons:[
 L('node-runtime','Node.js: runtime e processo',16,'Executar JavaScript no terminal e diferenciar o ambiente do navegador.',[
 'Node.js executa JavaScript fora do navegador, oferecendo APIs de arquivos, rede e processos. Ele não possui document, window ou DOM: a responsabilidade do servidor é receber entradas e produzir respostas, não renderizar elementos diretamente.',
 'Separe responsabilidades: um módulo organiza regras de negócio; o servidor aceita requisições HTTP e chama essas regras. Durante o desenvolvimento, use console e debugger para investigar entradas, exceções e tempos de resposta.'],
 `console.log('Node:', process.version);\nconsole.log('Diretório:', process.cwd());\n// node src/server.js`,Q('Qual recurso existe no Node.js e não é uma API de DOM?',['document.querySelector','node:fs','window.location'],1,'node:fs oferece acesso ao sistema de arquivos no ambiente de execução do Node.'),
 'Execute a API local no terminal e descreva o que acontece quando o processo inicia, escuta uma porta e encerra.', ['Executar node --version e npm --version.','Iniciar servidor e confirmar GET /health.','Explicar por que document não existe no Node.']),
 L('node-modules','Módulos ES e divisão de responsabilidades',18,'Criar módulos pequenos e reutilizáveis, separando regras da camada HTTP.',[
 'import e export permitem compartilhar funções entre arquivos. Em projetos Node com "type": "module", as extensões .js são explícitas nos imports relativos; um módulo não deve iniciar um servidor simplesmente por ser importado.',
 'Organize código por responsabilidade: http.js formata respostas, store.js lida com dados e server.js compõe as dependências. Essa divisão simplifica testes e evita que regras de negócio dependam de um socket de rede.'],
 `// src/validation.js\nexport function normalizarTitulo(texto){\n  return String(texto).trim();\n}\n// src/server.js: import { normalizarTitulo } from './validation.js'`,Q('Por que extrair validações para um módulo separado?',['Para evitar testes','Para reutilizar e testar sem rede','Para diminuir a segurança'],1,'Separar a lógica do transporte HTTP permite testar comportamento sem iniciar o servidor.'),
 'Extraia uma função de validação de tarefa para um arquivo próprio e importe no servidor, sem duplicar a regra.', ['Criar módulo de validação com export.','Usar import com extensão .js.','Testar a função sem fazer requisição HTTP.']),
 L('node-env','Variáveis de ambiente e segredos',18,'Ler configurações sem publicar credenciais no código-fonte.',[
 'Porta, endereço do banco e segredos devem vir do ambiente. process.env devolve strings ou undefined; valide tipos e valores antes de inicializar recursos. Nunca inclua senha ou token no código enviado ao GitHub.',
 'Documente somente nomes e valores não sensíveis em exemplos. Arquivos .env locais devem entrar no .gitignore. Em produção, configure variáveis no serviço de hospedagem, com escopo e acesso restritos.'],
 `const port = Number(process.env.PORT ?? 3001);\nif(!Number.isInteger(port) || port<1 || port>65535){\n  throw new Error('PORT inválida');\n}`,Q('Qual arquivo pode ser versionado com segurança?',['.env com senha real','.env.example sem segredos','backup da chave privada'],1,'.env.example documenta nomes e valores fictícios; segredos reais ficam no ambiente.'),
 'Adicione validação de PORT e documente as variáveis do projeto em um arquivo de exemplo sem valores privados.', ['Validar faixa da porta.','Ignorar .env local no Git.','Documentar configuração sem compartilhar credenciais.']),
 L('node-async','Assincronia, promises e tratamento de erros',22,'Usar async/await corretamente e não perder exceções assíncronas.',[
 'A operação de banco ou rede é assíncrona. await aguarda o resultado sem bloquear todo o loop de eventos; erros podem rejeitar a promise e precisam de tratamento no limite de requisição.',
 'Use try/catch nas fronteiras apropriadas e devolva erro HTTP controlado. Evite esconder falhas em catch vazio, e não inclua stack traces ou SQL completo nas respostas ao cliente.'],
 `async function carregarTarefas(repositorio){\n  return await repositorio.listar();\n}\ntry { await carregarTarefas(repo); }\ncatch(error){ console.error('Consulta falhou'); }`,Q('Quando uma Promise é rejeitada sem tratamento, o que pode ocorrer?',['Resposta 200 automática','Falha não tratada no processo','Conversão para string vazia'],1,'Rejeições precisam ser tratadas; sem isso podem provocar falha do fluxo e do processo.'),
 'Implemente uma função assíncrona que consulta tarefas e retorne um erro controlado quando o repositório falhar.', ['Utilizar async/await corretamente.','Simular uma rejeição e capturá-la.','Não expor detalhes internos ao cliente.']),
 L('node-test','Testes nativos do Node.js',20,'Escrever testes com node:test e assert para regras de negócio.',[
 'O módulo node:test permite descrever casos automatizados sem instalar frameworks. Um bom teste prepara a entrada, executa o comportamento e confere saída, erros e invariantes.',
 'Casos-limite importam: título vazio, espaços, valores longos e IDs inexistentes. Um teste que passa com somente uma entrada pode não revelar um bug; escreva casos que tentem refutar sua solução.'],
 `import test from 'node:test';\nimport assert from 'node:assert/strict';\ntest('normaliza espaços',()=>{\n  assert.equal('  API  '.trim(),'API');\n});`,Q('Qual teste tem maior chance de revelar um problema de validação?',['Somente entrada feliz','Entrada vazia e espaços','Repetir o mesmo dado'],1,'Casos de borda costumam expor validações incompletas que não aparecem no fluxo feliz.'),
 'Escreva três testes para criação de tarefa, incluindo uma entrada válida, um campo vazio e um título grande.', ['Usar node:test e assert.','Testar fluxo válido e limite.','Executar npm test antes de considerar concluído.'])
]},
{
 id:'http',title:'HTTP e APIs REST',short:'Contratos entre cliente e servidor',level:'Intermediário',duration:'4 h',project:'API REST com CRUD',
 description:'Pratique métodos, rotas, códigos de status, JSON, validação e consumo de API real por HTTP.',
 outcome:'Expor endpoints de tarefas com contrato claro, validações consistentes e respostas HTTP corretas.',
 lessons:[
 L('api-http','Requisição, resposta e cabeçalhos',17,'Interpretar método, URL, status, headers e corpo HTTP.',[
 'HTTP descreve a troca entre cliente e servidor. O request inclui método, URL, cabeçalhos e às vezes body. O response devolve status, headers e representação dos dados, que normalmente usa JSON em APIs.',
 'Um status 200 significa sucesso na leitura; 201, criação; 204, operação sem conteúdo. O corpo da resposta não substitui o status adequado e os clientes não devem depender de mensagens textuais para detectar erros.'],
 `// Exemplo de resposta\nHTTP/1.1 201 Created\nContent-Type: application/json\n\n{"id": 12, "title": "Revisar HTTP"}`,Q('Ao criar um recurso, qual status HTTP é o mais apropriado?',['201','404','500'],0,'201 Created indica criação; inclua a representação ou localização do recurso quando fizer sentido.'),
 'Use o laboratório HTTP para comparar uma leitura GET e uma criação POST, observando os códigos e os headers.', ['Diferenciar request e response.','Distinguir 200, 201 e 204.','Explicar Content-Type application/json.']),
 L('api-routes','Rotas, métodos e recursos',20,'Projetar endpoints claros e coerentes com a semântica REST.',[
 'Uma URL identifica um recurso: /tasks representa a coleção e /tasks/12 representa um item. GET lê sem alterar dados, POST cria, PATCH atualiza parcialmente e DELETE remove. Um endpoint não deve usar GET para operações destrutivas.',
 'Separe o roteamento das operações de dados. Quando o recurso não existe, devolva 404. Quando o método não é suportado, 405 e, quando possível, o header Allow com os métodos aceitos.'],
 `GET /tasks\nPOST /tasks\nGET /tasks/12\nPATCH /tasks/12\nDELETE /tasks/12`,Q('Qual método atualiza parcialmente uma tarefa existente?',['GET','PATCH','OPTIONS'],1,'PATCH representa alteração parcial, enquanto GET deve ser seguro e somente de leitura.'),
 'Implemente PATCH /tasks/:id para alterar a propriedade completed sem substituir o título.', ['Verificar recurso inexistente (404).','Não alterar recurso em GET.','Retornar conteúdo atualizado após PATCH.']),
 L('api-json','Entrada JSON, validação e erros',22,'Validar dados recebidos antes de gravar ou processar.',[
 'Toda entrada do cliente é não confiável. Analise JSON com tratamento de erro, imponha tamanho máximo do corpo e valide tipos, comprimentos e formatos. Não assuma que req.body existe ou que um campo tem o tipo desejado.',
 'Use respostas previsíveis como { error: { code, message } }. 400 representa JSON malformado; 422 pode representar dados semanticamente inválidos; 413 indica payload grande. Evite vazar stacks e dados internos.'],
 `if(typeof body.title!=='string' || !body.title.trim()) {\n  return json(res,422,{error:{code:'INVALID_TITLE',message:'Informe um título.'}});\n}`,Q('Qual resposta é apropriada para um título vazio em JSON válido?',['422','201','101'],0,'422 indica que a representação JSON foi entendida, mas não atende às regras de domínio.'),
 'Envie três corpos JSON ao endpoint: válido, malformado e título vazio; confira o status e o formato do erro.', ['Tratar falha ao analisar JSON.','Validar tipo e tamanho do título.','Não registrar senhas ou corpo bruto em logs.']),
 L('api-crud','CRUD e paginação',25,'Implementar as operações de criar, listar, atualizar e remover dados.',[
 'CRUD resume Create, Read, Update e Delete; são operações, não necessariamente os métodos HTTP. Defina uma interface de serviço que permita trocar armazenamento em memória por PostgreSQL sem modificar todo o roteador.',
 'Uma coleção grande precisa de filtros e paginação com limite superior. Evite devolver milhares de registros sem controle. Seja consistente com IDs inválidos, estados inexistentes e mensagens de erro.'],
 `// GET /tasks?limit=20\nconst limit=Math.min(100,Math.max(1,Number(url.searchParams.get('limit')||20)));`,Q('Por que impor limite máximo na paginação?',['Para ocultar dados','Para controlar carga e tamanho da resposta','Para mudar o método HTTP'],1,'Limites protegem banco, servidor e cliente contra consultas exageradas.'),
 'Complete as operações PATCH e DELETE do servidor exportado e adicione um parâmetro de limite à listagem.', ['Implementar as quatro operações básicas.','Tratar ID que não existe.','Limitar a quantidade de itens retornada.']),
 L('api-client','fetch, CORS e integração frontend',20,'Consumir APIs pelo navegador com estados de carregamento e erro.',[
 'fetch devolve uma Promise com a resposta. Um HTTP 404 não necessariamente rejeita a Promise: verifique response.ok e trate status antes de chamar response.json. Faça o usuário entender o que ocorreu com mensagens de erro adequadas.',
 'CORS é uma política do navegador e não substitui autenticação. Não abra Access-Control-Allow-Origin indiscriminadamente para endpoints autenticados. Na integração local, prefira proxy de desenvolvimento ou configure origens explícitas.'],
 `const response=await fetch('/api/tasks');\nif(!response.ok)throw new Error('Não foi possível carregar');\nconst tasks=await response.json();`,Q('fetch rejeita automaticamente quando a API devolve 404?',['Sim, sempre','Não; verifique response.ok','Somente em POST'],1,'A Promise resolve para respostas HTTP; valide status antes de tratar o resultado como sucesso.'),
 'Consuma GET /tasks de uma aplicação frontend local, exibindo carregamento, lista vazia e falha de rede.', ['Mostrar estados de carregamento, vazio e erro.','Verificar response.ok.','Não confundir CORS com controle de autorização.'])
]},
{
 id:'postgres',title:'PostgreSQL e modelagem',short:'Dados persistentes com SQL',level:'Intermediário',duration:'5 h',project:'API com banco relacional',
 description:'Aprenda chaves, restrições, normalização, queries parametrizadas, transações e migrações antes de armazenar dados reais.',
 outcome:'Criar esquema SQL e conectar uma API Node ao PostgreSQL sem SQL injection ou acesso cruzado indevido.',
 lessons:[
 L('db-relational','Tabelas, chaves e relações',19,'Modelar entidades, identificadores e integridade referencial entre tabelas.',[
 'Em bancos relacionais, tabelas representam conjuntos de entidades e colunas representam atributos. Chaves primárias identificam registros; chaves estrangeiras associam tabelas e ajudam a manter consistência quando há exclusão ou alteração.',
 'Comece pelas regras do domínio: uma tarefa pertence a um usuário. Não guarde listas separadas por vírgula numa coluna para evitar a modelagem correta; use tipos e restrições adequados.'],
 `CREATE TABLE users (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email TEXT NOT NULL UNIQUE);\nCREATE TABLE tasks (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, owner_id BIGINT NOT NULL REFERENCES users(id));`,Q('Qual constraint garante que uma tarefa tenha usuário existente?',['CHECK de texto','FOREIGN KEY','ORDER BY'],1,'Uma chave estrangeira impede criar referência para uma linha inexistente.'),
 'Desenhe a relação usuários–tarefas e crie tabelas com identificadores e vínculos explícitos.', ['Escolher chaves primárias.','Definir FOREIGN KEY para dono.','Definir campos obrigatórios e UNIQUE quando necessário.']),
 L('db-normal','Normalização e restrições',23,'Aplicar integridade no banco, não apenas no formulário.',[
 'A 1FN elimina grupos repetidos e exige valores atômicos; 2FN impede dependência parcial de chave composta; 3FN elimina dependências transitivas entre atributos não-chave. O objetivo é reduzir redundância e inconsistência, não gerar tabelas sem necessidade.',
 'Constraints como NOT NULL, UNIQUE, CHECK e FOREIGN KEY protegem os dados mesmo quando o cliente apresenta um bug. Uma validação de frontend não substitui a validação no servidor e no banco.'],
 `CREATE TABLE tasks (\n id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n title TEXT NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 120)\n);`,Q('Onde deve existir a regra de título não vazio?',['Só no frontend','Servidor e banco sempre que possível','Só no CSS'],1,'Camadas independentes precisam proteger invariantes importantes mesmo quando outra camada falha.'),
 'Defina três constraints para impedir tarefas inválidas e explique que problema cada uma evita.', ['Impor NOT NULL e CHECK.','Evitar dados duplicados onde fizer sentido.','Explicar diferença entre validação de UI e integridade.']),
 L('db-queries','SELECT, JOIN e consultas parametrizadas',24,'Buscar dados sem montar SQL por concatenação de entrada.',[
 'SELECT, WHERE, ORDER BY e JOIN permitem consultar dados relacionados. Índices podem reduzir custo de buscas frequentes, mas devem ser criados a partir de padrões reais de consulta, não aleatoriamente.',
 'Nunca concatene valores do usuário ao SQL. No node-postgres, use parâmetros $1, $2 etc. Eles são tratados como dados pelo banco e evitam o caminho clássico de SQL injection na composição de valores.'],
 `const result=await pool.query(\n 'SELECT id,title FROM tasks WHERE owner_id=$1 ORDER BY id DESC LIMIT $2',\n [userId,20]\n);`,Q('Qual forma separa dados do usuário do texto SQL?',['Interpolar ${input}','Usar $1 com array de valores','Juntar strings com +'],1,'Parâmetros evitam interpretar valores como partes da linguagem SQL.'),
 'Implemente uma query para listar somente tarefas do usuário autenticado com limite e ordem.', ['Usar placeholders $1 e $2.','Filtrar pelo owner_id no SQL.','Não interpolar entradas em comandos SQL.']),
 L('db-transactions','Transações e falhas parciais',23,'Agrupar alterações relacionadas de maneira atômica.',[
 'Uma transação aplica todas as alterações ou nenhuma. Use BEGIN, COMMIT e ROLLBACK quando um processo atualiza várias tabelas que precisam ficar consistentes. Não realize passos relacionados em clientes de conexão diferentes.',
 'Com pool, uma transação deve usar um client reservado até terminar. Libere o client num finally; caso contrário, o serviço pode ficar sem conexões ao longo do tempo.'],
 `const client=await pool.connect();\ntry{\n await client.query('BEGIN');\n // operações relacionadas\n await client.query('COMMIT');\n}catch(e){await client.query('ROLLBACK');throw e;}\nfinally{client.release();}`,Q('Qual comando desfaz operações de uma transação que falhou?',['ROLLBACK','ORDER BY','VACUUM'],0,'ROLLBACK devolve a transação ao estado anterior sem confirmar alterações parciais.'),
 'Simule duas escritas que precisam acontecer juntas e garanta rollback quando a segunda falhar.', ['Abrir transação no mesmo client.','Executar rollback no catch.','Liberar conexão em finally.']),
 L('db-migrations','Migrações, índices e ambientes',21,'Controlar versões do esquema sem apagar dados de produção.',[
 'Migrações são scripts versionados que evoluem o esquema. Um deploy novo deve saber quais tabelas e colunas existem; alterações destrutivas exigem plano de compatibilidade e backup antes da execução.',
 'Índices aceleram consultas adequadas, mas adicionam custo às escritas. Para tarefas por usuário, um índice em owner_id e ordenação por data pode ajudar. Nunca coloque DATABASE_URL real no repositório.'],
 `CREATE INDEX IF NOT EXISTS tasks_owner_created_idx\n ON tasks(owner_id, created_at DESC);`,Q('Por que versionar migrações SQL?',['Para alterar dados sem controle','Para reproduzir a evolução do esquema','Para substituir testes'],1,'Scripts versionados permitem reproduzir alterações e revisar impactos no banco.'),
 'Crie uma migração de índice e documente como aplicá-la num PostgreSQL local, sem apagar os dados.', ['Usar migração versionada.','Justificar índice com padrão de consulta.','Documentar backup e configuração por ambiente.'])
]},
{
 id:'auth',title:'Autenticação e autorização',short:'Identidade não é permissão',level:'Avançado',duration:'5 h',project:'API com sessões e usuários',
 description:'Estude armazenamento de senhas, sessões, cookies, controle de acesso por recurso e ameaças comuns sem confundir simulação com segurança real.',
 outcome:'Identificar falhas de autenticação e criar verificações de dono e função no servidor para cada operação protegida.',
 lessons:[
 L('auth-identidade','Autenticação versus autorização',19,'Distinguir quem é o usuário e o que ele pode acessar.',[
 'Autenticação estabelece identidade, por exemplo após verificar uma senha; autorização verifica se a identidade tem permissão para a ação e para aquele recurso específico. Um login válido não permite visualizar os dados de outra pessoa.',
 'Em toda rota protegida, confira sessão e vínculo de propriedade no servidor. Não use apenas um botão oculto no frontend como defesa. Requisitos de permissões fazem parte dos testes e do contrato da API.'],
 `// Regra no backend:\nif(!session) return unauthorized(res);\nif(task.ownerId!==session.userId) return forbidden(res);`,Q('Usuário autenticado pode acessar qualquer /tasks/:id?',['Sim','Não; precisa autorização por recurso','Só se usar React'],1,'A identidade não concede automaticamente permissão sobre recursos de outras contas.'),
 'Crie uma matriz de permissões para convidado, usuário e administrador; teste acesso a tarefas de outro usuário.', ['Distinguir 401 de 403.','Verificar owner_id na consulta.','Não confiar na opção de usuário da interface.']),
 L('auth-password','Hash de senhas e cadastro',23,'Armazenar senhas com função de derivação apropriada e salt.',[
 'Senhas não devem ser armazenadas em texto puro nem criptografadas de forma reversível. Use função de derivação de senha com salt único e parâmetros adequados, como scrypt ou Argon2id; verifique o resultado em tempo constante quando aplicável.',
 'Nunca registre senhas ou hashes em logs. Imponha limites e tratamento de erros de cadastro, proteja contra enumeração de conta e considere rate limiting nas rotas de login em ambientes reais.'],
 `import {scryptSync,randomBytes,timingSafeEqual} from 'node:crypto';\nconst salt=randomBytes(16);\nconst hash=scryptSync(password,salt,64);\n// Guarde salt e hash, nunca a senha.`,Q('Qual opção armazena senhas adequadamente?',['Texto simples','SHA256 sem salt','scrypt/Argon2id com salt'],2,'Funções de derivação de senha com salt resistem melhor a ataques de força bruta do que hashes rápidos.'),
 'Implemente cadastro com hash e teste uma senha correta, uma incorreta e uma tentativa com entrada inválida.', ['Usar salt único por senha.','Não retornar hashes em respostas.','Testar comparação segura e erros.']),
 L('auth-sessions','Sessões e cookies seguros',24,'Entender tokens de sessão e proteção no transporte.',[
 'Uma sessão pode usar token aleatório opaco guardado no navegador como cookie HttpOnly. O banco deve manter uma referência segura, como hash do token, com expiração e possibilidade de revogação.',
 'Cookies em produção devem considerar Secure, SameSite e Path; alterações sensíveis podem exigir proteção contra CSRF e reautenticação. Não insira token de sessão no localStorage só por conveniência: analise o modelo de ameaça.'],
 `Set-Cookie: session=<token>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600\n// Não use <token> literal; emita token aleatório e registre somente hash no banco.`,Q('O que HttpOnly impede diretamente?',['Leitura do cookie por JavaScript','Requisições HTTP','Expiração da sessão'],0,'HttpOnly impede acesso via document.cookie, reduzindo exposição a determinados ataques XSS.'),
 'Desenhe login, emissão, validação, expiração e logout de uma sessão; teste revogação de token.', ['Gerar token opaco criptograficamente aleatório.','Usar cookie HttpOnly, Secure em HTTPS.','Expirar e revogar sessão no servidor.']),
 L('auth-ownership','BOLA e autorização por objeto',25,'Impedir que IDs previsíveis exponham recursos de outras contas.',[
 'A falha BOLA ocorre quando uma API aceita um ID sem verificar se o usuário atual pode acessar aquele objeto. Ter um UUID difícil de adivinhar não substitui autorização; todo ID recebido deve ser verificado contra a identidade autorizada.',
 'Prefira consultas que já incluam o owner_id: UPDATE tasks SET ... WHERE id=$1 AND owner_id=$2 RETURNING *. Assim, não há janela entre buscar o registro e atualizar sem vínculo; trate ausência de linha de modo previsível.'],
 `const result=await pool.query(\n 'DELETE FROM tasks WHERE id=$1 AND owner_id=$2 RETURNING id',\n [taskId,session.userId]\n);`,Q('Qual medida impede alteração de tarefa de outra conta?',['Confiar no ID enviado','Filtrar por id e owner_id no servidor','Ocultar botão no navegador'],1,'A consulta deve aplicar a propriedade do recurso antes de alterá-lo.'),
 'Adicione a uma rota PATCH uma verificação de propriedade e teste usuário A tentando alterar a tarefa do usuário B.', ['Usar owner_id no banco.','Testar acesso de usuário diferente.','Não usar controle apenas visual.']),
 L('auth-threats','Ameaças, limites e defesa em camadas',24,'Identificar riscos comuns e priorizar controles de segurança.',[
 'Segurança é uma propriedade de todo o fluxo: validação de entrada, autenticação, autorização, consultas seguras, limites de requisição, mensagens de erro e logs sem segredos. Um framework não garante segurança por si só.',
 'O OWASP API Security Top 10 destaca falhas de autorização, autenticação e consumo irrestrito de recursos. Rate limiting, tamanho máximo de corpo e testes negativos ajudam, mas não substituem revisão, monitoramento e configuração correta de infraestrutura.'],
 `// Negativo: usuário sem sessão\n// GET /tasks -> 401\n// Outro usuário tenta PATCH /tasks/7 -> 403/404\n// Body enorme -> 413`,Q('Qual cenário representa autorização quebrada?',['404 em rota desconhecida','Usuário alterar tarefa de outra conta','Senha submetida via HTTPS'],1,'Alterar dados de outro usuário demonstra ausência de autorização por recurso.'),
 'Monte um conjunto de testes adversariais com usuário não autenticado, dono diferente e payload excessivo.', ['Testar não autenticado e acesso cruzado.','Aplicar limite ao body.','Evitar expor stack ou credenciais em erros.'])
]},
{
 id:'quality',title:'Testes, deploy e full-stack',short:'Do localhost à entrega',level:'Projeto final',duration:'5 h',project:'TaskAPI documentada e testada',
 description:'Conecte frontend e backend, descreva contratos, escreva testes de integração, monitore erros e planeje deploy com banco de dados.',
 outcome:'Entregar API testada, com documentação reproduzível, variáveis seguras e integração frontend sem mocks na entrega final.',
 lessons:[
 L('quality-unit','Testes unitários e mocks',19,'Testar regras isoladamente sem acoplar casos ao banco.',[
 'Testes unitários verificam funções pequenas sem rede ou banco. Passe dependências como argumentos, em vez de importar um pool global em cada módulo: assim é possível simular falhas e conferir invariantes rapidamente.',
 'Mocks são úteis para substituir dependências numa unidade; não provam que o SQL, a rede ou a configuração real funciona. Combine testes unitários com integração para reduzir lacunas.'],
 `test('título vazio falha',()=>{\n  assert.throws(()=>validarTitulo('   '),/título/i);\n});`,Q('Um mock de banco prova que a query real funciona?',['Sim','Não; requer teste de integração','Só em produção'],1,'Um mock cobre o contrato simulado; a integração real precisa ser verificada separadamente.'),
 'Teste validação e conversão sem abrir uma porta; depois explique quais riscos o mock não cobre.', ['Criar casos positivos e negativos.','Testar invariantes sem rede.','Identificar limites de mocks.']),
 L('quality-integration','Teste HTTP de ponta a ponta',23,'Verificar uma API real por fetch, códigos de status e corpo HTTP.',[
 'Testes de integração iniciam um servidor em porta temporária, enviam requisições e verificam status, headers e corpo. Diferentemente dos testes unitários, eles verificam se as camadas conversam corretamente.',
 'Isole dados entre os testes para evitar dependência de ordem. Os casos importantes incluem POST válido, POST inválido, GET após criar e PATCH/DELETE de IDs inexistentes. O teste não deve depender da disponibilidade de uma API externa.'],
 `const res=await fetch(baseUrl+'/health');\nassert.equal(res.status,200);\nassert.deepEqual(await res.json(),{status:'ok'});`,Q('O teste de integração precisa observar o quê?',['Somente a função utilitária','HTTP e resposta do servidor','Cor do botão'],1,'Ele verifica camadas integradas: rede local, roteamento, validações e resposta.'),
 'Escreva testes que iniciem o servidor temporariamente e chamem GET /health, POST /tasks e GET /tasks.', ['Usar porta temporária.','Verificar status e JSON.','Isolar os dados entre casos.']),
 L('quality-docs','Documentação e contratos de API',18,'Documentar a utilização, erros, variáveis e limites da API.',[
 'Uma API bem documentada mostra o que cada endpoint recebe e retorna, incluindo tipos, status de erro e requisitos de autenticação. O README precisa ser executável por quem não criou o projeto.',
 'Use exemplos curl e arquivos .env.example sem segredos. Uma especificação OpenAPI ajuda equipes a revisar contratos e testar clientes; não trate documentação como substituto de testes automatizados.'],
 `curl -i http://localhost:3001/health\ncurl -i -H 'Content-Type: application/json' -d '{"title":"Estudar SQL"}' http://localhost:3001/tasks`,Q('O que não deve constar no README público?',['Comandos para iniciar','Exemplos de resposta','Senhas e tokens reais'],2,'Credenciais reais não são documentação e podem comprometer serviços e dados.'),
 'Documente cinco endpoints com exemplos curl, status esperado e regras de validação.', ['Incluir comandos reproduzíveis.','Listar status de erro.','Não publicar segredos ou credenciais.']),
 L('quality-deploy','Configuração de deploy e observabilidade',22,'Planejar publicação com variáveis, migrações e logs seguros.',[
 'Deploy não significa somente clicar em publicar. Verifique configurações, variáveis, migrações do banco, health check e comportamentos de falha. O processo precisa escutar a porta do ambiente e encerrar conexões de forma controlada.',
 'Monitore erros e latência sem registrar tokens ou senhas. Deploy de frontend estático e backend com conexão PostgreSQL são processos diferentes; uma API Node persistente exige ambiente de execução compatível, e o DevLab web não hospeda essa API automaticamente.'],
 `const port=Number(process.env.PORT||3001);\nserver.listen(port,'0.0.0.0');\nprocess.on('SIGTERM',()=>server.close());`,Q('Qual sinal é comum ao solicitar encerramento do processo em deploy?',['SIGTERM','onclick','DOMContentLoaded'],0,'SIGTERM permite iniciar um desligamento controlado no ambiente Node.'),
 'Prepare um checklist de implantação incluindo variáveis, banco, testes, health check e rollback.', ['Validar variáveis e migrações.','Executar suíte de testes.','Definir plano de rollback e logs sem segredos.']),
 L('quality-final','Projeto final: TaskAPI full-stack',35,'Integrar interface, API e banco com evidência de qualidade.',[
 'O projeto final consiste em uma aplicação de tarefas com UI própria, endpoints Node, banco PostgreSQL e controle de acesso por usuário. A implementação deve partir de requisitos e testes, não de copiar uma solução pronta.',
 'Critérios de entrega: API real, testes automatizados, SQL versionado, validação no backend, sessões corretas, autorização de objetos e instruções para rodar localmente. O checklist marca sua revisão, mas não substitui uma auditoria externa ou revisão de código.'],
 `// Fluxo da solução:\n// Browser -> fetch -> API Node -> serviço -> PostgreSQL\n// Resposta JSON -> estado de UI -> feedback ao usuário`,Q('Qual evidência indica que o frontend usa o backend de verdade?',['Array fixo no JavaScript','Requisições HTTP reais com estado persistido','Checklist marcado'],1,'O frontend deve realizar requisições reais e mostrar dados que persistem no backend.'),
 'Construa e documente TaskAPI com frontend separado, persistência PostgreSQL e autenticação, entregando testes e instruções.', ['Demonstrar persistência real após reiniciar.','Provar isolamento entre usuários com testes.','Entregar README, migrações e comandos.'])
]}
];
export const backendLessons=backendTracks.flatMap(t=>t.lessons.map((l,index)=>({...l,track:t.id,order:index+1})));
export function findBackendTrack(id){return backendTracks.find(t=>t.id===id)||null;}
export function findBackendLesson(id){return backendLessons.find(l=>l.id===id)||null;}
export function backendTrackProgress(done,track){return track.lessons.filter(l=>done.includes(l.id)).length;}
