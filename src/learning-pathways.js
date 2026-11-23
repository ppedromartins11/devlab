/** Trilhas originais do DevLab. Temas e ordem comparados com roadmap.sh;
 * não reproduzem os textos, diagramas ou exercícios daquele site. */
const R = (kind,id) => ({kind,id});
const stage = (id,title,summary,topics,practice,deliverable,lessons,reference) => ({id,title,summary,topics,practice,deliverable,lessons,reference});

export const pathwayTracks = [
  {
    id:'frontend',title:'Desenvolvedor Frontend',subtitle:'Construa a parte do sistema que as pessoas utilizam.',level:'Do início ao intermediário',
    outcome:'Criar uma aplicação responsiva, acessível, testada e publicada.',
    audience:'Para quem quer criar sites, interfaces e aplicações no navegador.',
    reference:'https://roadmap.sh/frontend',
    stages:[
      stage('web','01 · Entenda a Web','Descubra como navegador, servidor e arquivos trabalham juntos.',
        ['HTTP, URLs, DNS e navegador','DevTools e estrutura de um projeto','Git e GitHub como ferramentas de trabalho'],
        'Abra uma página nas ferramentas de desenvolvimento, identifique HTML/CSS/JS e registre uma alteração em Git.',
        'Página simples versionada e explicação do caminho de uma requisição.',[R('js','primeiros-passos'),R('js','debug-console'),R('backend','api-http')],'https://roadmap.sh/frontend'),
      stage('html','02 · Estruture com HTML','Comece pelo significado do conteúdo antes de estilizar.',
        ['HTML semântico e hierarquia','Links, imagens e textos alternativos','Formulários e validação acessível'],
        'Crie uma página de apresentação com navegação, lista de projetos e formulário utilizável somente por teclado.',
        'Página acessível, sem dependência de JavaScript.',[R('frontend','html-documento'),R('frontend','html-semantica'),R('frontend','html-links'),R('frontend','html-formularios'),R('frontend','html-a11y')],'https://roadmap.sh/html'),
      stage('css','03 · Construa layouts responsivos','Aprenda a explicar cada decisão de layout.',
        ['Cascata, box model e unidades','Flexbox e CSS Grid','Media queries e responsividade'],
        'Transforme sua página em um layout que funcione em 390, 768 e 1440 px, com foco visível.',
        'Layout sem rolagem horizontal e três tamanhos testados.',[R('frontend','css-seletores'),R('frontend','css-box'),R('frontend','css-flex'),R('frontend','css-grid'),R('frontend','css-responsive')],'https://roadmap.sh/css'),
      stage('javascript','04 · Dê comportamento às páginas','Domine os fundamentos antes de depender de bibliotecas.',
        ['Variáveis, funções, arrays e objetos','DOM, eventos e formulários','Promises, fetch, JSON e armazenamento'],
        'Crie um gerenciador de tarefas com validação, filtros e persistência no navegador.',
        'Aplicação interativa que funciona sem copiar a solução pronta.',[R('js','variaveis'),R('js','funcoes'),R('js','arrays'),R('js','dom-basico'),R('js','eventos'),R('js','formularios'),R('js','assincrono'),R('js','api-json'),R('js','storage')],'https://roadmap.sh/javascript'),
      stage('typed-react','05 · Componentes e TypeScript','Separe responsabilidades e trabalhe com estados previsíveis.',
        ['TypeScript, tipos e narrowing','React, props, estado e hooks','Formulários, listas e efeitos'],
        'Reconstrua uma aplicação pequena em React, com componentes tipados, estados de erro e carregamento.',
        'Aplicação React executada no VS Code com tipos e componentes testados.',[R('frontend','ts-modelos'),R('frontend','ts-narrowing'),R('frontend','react-componentes'),R('frontend','react-estado'),R('frontend','react-formularios'),R('frontend','react-efeitos')],'https://roadmap.sh/react'),
      stage('quality','06 · Teste e publique','Sua entrega precisa funcionar fora da sua máquina.',
        ['Acessibilidade, performance e SEO','Testes unitários e de interface','GitHub, build, deploy e revisão'],
        'Escreva testes para regras importantes, corrija um bug documentado e publique o projeto.',
        'URL publicada, README, testes e evidências de acessibilidade.',[R('frontend','js-testes'),R('js','acessibilidade'),R('js','testes'),R('js','proximos-passos')],'https://roadmap.sh/frontend-performance')
    ]
  },
  {
    id:'backend',title:'Desenvolvedor Backend',subtitle:'Construa APIs, regras de negócio e dados persistentes.',level:'Do início ao intermediário',
    outcome:'Criar uma API com validação, banco de dados, testes e controles de acesso.',
    audience:'Para quem quer desenvolver o que acontece atrás da interface.',
    reference:'https://roadmap.sh/backend',
    stages:[
      stage('foundations','01 · Fundamentos e linguagem','Entenda HTTP, lógica, terminal e versionamento.',
        ['Internet, HTTP, DNS e servidores','Lógica, funções e assincronia','Terminal, Git e módulos'],
        'Execute um script no Node.js, teste uma função e versione seu primeiro commit.',
        'Script com testes e repositório Git.',[R('js','funcoes'),R('js','assincrono'),R('backend','node-runtime'),R('backend','node-modules')],'https://roadmap.sh/backend'),
      stage('node','02 · Desenvolvimento com Node.js','Organize código em módulos pequenos e com responsabilidade única.',
        ['Node.js, npm e configuração','Promises, erros e módulos ES','Testes nativos e variáveis de ambiente'],
        'Separe uma regra de validação do servidor HTTP e prove seu resultado com testes.',
        'Servidor e funções testáveis sem conexão de rede.',[R('backend','node-env'),R('backend','node-async'),R('backend','node-test')],'https://roadmap.sh/nodejs'),
      stage('apis','03 · APIs REST e integração','Aprenda a definir contratos e respostas previsíveis.',
        ['GET, POST, PATCH e DELETE','Status, JSON, validação e CORS','CRUD, paginação e documentação'],
        'Implemente uma API de tarefas que responda com códigos corretos para dados válidos e inválidos.',
        'API CRUD com documentação dos endpoints e testes HTTP.',[R('backend','api-http'),R('backend','api-routes'),R('backend','api-json'),R('backend','api-crud'),R('backend','api-client')],'https://roadmap.sh/api-design'),
      stage('database','04 · PostgreSQL e persistência','Proteja dados com um modelo relacional coerente.',
        ['SQL, chaves e relacionamentos','Normalização, índices e joins','Queries parametrizadas, transações e migrações'],
        'Substitua o armazenamento em memória por PostgreSQL, com filtros por proprietário.',
        'Schema SQL, migrações e consultas parametrizadas verificadas.',[R('backend','db-relational'),R('backend','db-normal'),R('backend','db-queries'),R('backend','db-transactions'),R('backend','db-migrations')],'https://roadmap.sh/postgresql-dba'),
      stage('security','05 · Identidade e segurança','Autenticar não é o mesmo que autorizar.',
        ['Hash seguro de senhas e sessões','Cookies, autenticação e autorização','OWASP, CORS e proteção de recursos'],
        'Crie testes para impedir que um usuário leia ou altere tarefas pertencentes a outro.',
        'Testes de acesso 401, 403 e propriedade dos dados.',[R('backend','auth-identidade'),R('backend','auth-password'),R('backend','auth-sessions'),R('backend','auth-ownership'),R('backend','auth-threats')],'https://roadmap.sh/backend'),
      stage('production','06 · Qualidade e entrega','Uma API não termina quando responde no seu computador.',
        ['Testes unitários e de integração','CI/CD, deploy e monitoramento','Logs, cache e observabilidade básica'],
        'Prepare README, testes, variáveis seguras e uma implantação com logs verificáveis.',
        'Serviço entregue com testes e instruções reproduzíveis.',[R('backend','quality-unit'),R('backend','quality-integration'),R('backend','quality-docs'),R('backend','quality-deploy'),R('backend','quality-final')],'https://roadmap.sh/backend')
    ]
  },
  {
    id:'fullstack',title:'Desenvolvedor Full-Stack',subtitle:'Integre frontend, backend e banco em um só produto.',level:'Jornada integrada',
    outcome:'Planejar, construir, testar e publicar uma aplicação web completa.',
    audience:'Para quem quer acompanhar todo o caminho de uma aplicação, da tela ao servidor.',
    reference:'https://roadmap.sh/full-stack',
    stages:[
      stage('web','01 · Base da Web','Aprenda como uma interface conversa com o servidor.',
        ['HTML, CSS e JavaScript','HTTP e APIs','Git e versionamento'],
        'Crie uma página simples e faça um diagrama do fluxo navegador → API → dados.',
        'Página publicada e fluxo de dados documentado.',[R('frontend','html-documento'),R('frontend','css-responsive'),R('js','primeiros-passos'),R('backend','api-http')],'https://roadmap.sh/full-stack'),
      stage('frontend','02 · Frontend interativo','Transforme uma página em uma interface responsiva.',
        ['DOM, eventos e formulários','Estado e consumo de APIs','React e TypeScript'],
        'Construa uma lista de tarefas que lida com carregamento, lista vazia e erro de rede.',
        'Aplicação frontend com componentes e tratamento de erros.',[R('js','dom-basico'),R('js','formularios'),R('frontend','js-fetch'),R('frontend','react-componentes'),R('frontend','react-estado'),R('frontend','ts-modelos')],'https://roadmap.sh/frontend'),
      stage('backend','03 · API de verdade','Dê responsabilidades específicas ao servidor.',
        ['Node.js e módulos','Endpoints REST e validação','Testes de contrato HTTP'],
        'Crie uma API CRUD e documente como o frontend deve consumi-la.',
        'Endpoints testados para sucesso, dados inválidos e registros ausentes.',[R('backend','node-runtime'),R('backend','node-modules'),R('backend','api-routes'),R('backend','api-json'),R('backend','api-crud')],'https://roadmap.sh/backend'),
      stage('database','04 · Banco e identidade','Persistência e autorização fazem parte das regras de negócio.',
        ['Modelagem PostgreSQL','SQL parametrizado e transações','Sessões e propriedade dos recursos'],
        'Implemente persistência e verifique que contas diferentes enxergam apenas seus registros.',
        'Schema SQL, migração e testes de isolamento entre usuários.',[R('backend','db-relational'),R('backend','db-queries'),R('backend','db-migrations'),R('backend','auth-sessions'),R('backend','auth-ownership')],'https://roadmap.sh/full-stack'),
      stage('integration','05 · Integre as camadas','Resolva os problemas que só aparecem quando as peças trabalham juntas.',
        ['fetch e contratos API','Loading, errors e validação','Testes end-to-end e segurança'],
        'Ligue os formulários React à API e teste um fluxo completo de criação e edição.',
        'Fluxo navegador → API → banco → navegador comprovado.',[R('backend','api-client'),R('frontend','react-formularios'),R('backend','quality-integration'),R('backend','auth-threats')],'https://roadmap.sh/full-stack'),
      stage('delivery','06 · Projeto final e deploy','Aprender também inclui entregar e manter.',
        ['Git e revisão de código','CI/CD, build e publicação','Logs, monitoramento e documentação'],
        'Publique uma aplicação full-stack de tarefas com README, testes, histórico Git e evidências.',
        'Projeto online, repositório, pipeline e documentação.',[R('backend','quality-docs'),R('backend','quality-deploy'),R('backend','quality-final'),R('js','proximos-passos')],'https://roadmap.sh/full-stack')
    ]
  }
];

export const languageCatalog = [
 {id:'javascript',name:'JavaScript',label:'Linguagem da web',description:'Do primeiro script à arquitetura, assincronia, segurança e projetos. 24 aulas com editor e 9 aprofundamentos práticos.',roadmap:'https://roadmap.sh/javascript',kind:'hybrid',route:'curso/javascript',count:33},
 {id:'typescript',name:'TypeScript',label:'JavaScript tipado',description:'Fundamentos com editor, strict, modelagem de tipos, runtime e projeto aplicado em 15 aulas.',roadmap:'https://roadmap.sh/typescript',kind:'hybrid',route:'curso/typescript',count:15},
 {id:'python',name:'Python',label:'Fundamentos de programação',description:'17 aulas: fundamentos, estruturas, arquivos, classes, HTTP, asyncio, SQLite e projeto modular.',roadmap:'https://roadmap.sh/python',kind:'guided',count:17},
 {id:'java',name:'Java',label:'Orientação a objetos',description:'17 aulas: JDK, classes, generics, Streams, concorrência, HTTP, JDBC e projeto testado.',roadmap:'https://roadmap.sh/java',kind:'guided',count:17},
 {id:'php',name:'PHP',label:'Do básico ao avançado',description:'32 aulas em 8 módulos com formulários, PDO/MySQL, orientação a objetos, segurança e projeto integrador.',roadmap:'https://roadmap.sh/php',kind:'guided',count:32},
 {id:'sql',name:'SQL',label:'PostgreSQL do zero ao avançado',description:'15 aulas práticas de consultas, joins, modelagem, transações, índices, janelas e segurança.',roadmap:'https://roadmap.sh/sql',kind:'guided',count:15}
];

export const findPathway = id => pathwayTracks.find(t=>t.id===id);
export const findLanguage = id => languageCatalog.find(t=>t.id===id);
export function pathwayLessonRoute(item){
 const prefix={js:'aula/',frontend:'frontend/aula/',backend:'backend/aula/',ts:'aula/'}[item.kind];
 return prefix?prefix+item.id:null;
}
export function pathwayLessonIds(pathway){
 return [...new Set((pathway?.stages||[]).flatMap(s=>s.lessons.map(l=>l.kind+':'+l.id)))];
}
