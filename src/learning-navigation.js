/** Navegação curricular independente da renderização e do armazenamento. */
export const learningAreas = Object.freeze([
  {id:'learn',label:'Aprender',routes:Object.freeze([
    {route:'trilhas',label:'Trilhas profissionais',note:'Frontend · Backend · Full-Stack'},
    {route:'linguagens',label:'Linguagens',note:'JS, TS, Python, Java e SQL'}
  ])},
  {id:'practice',label:'Praticar',routes:Object.freeze([
    {route:'oficina',label:'Oficina de código',note:'Testes automáticos'},
    {route:'revisao',label:'Revisões',note:'Memorização ativa'},
    {route:'desafios',label:'Desafios',note:'Projetos curtos'}
  ])},
  {id:'build',label:'Construir',routes:Object.freeze([
    {route:'workspace',label:'Workspace',note:'Editor de projetos'},
    {route:'projeto',label:'TaskFlow',note:'Projeto guiado'},
    {route:'carreira',label:'Jornada profissional',note:'Portfólio e Git'}
  ])}
]);

export function searchLearningCatalog(query, items, limit=12){
  const terms=String(query??'').trim().toLocaleLowerCase('pt-BR').split(/\s+/u).filter(Boolean);
  if(!terms.length)return [];
  return items.filter(item=>terms.every(term=>(item.title+' '+(item.summary||'')+' '+(item.area||'')).toLocaleLowerCase('pt-BR').includes(term))).slice(0,limit);
}

export function normalizeStudyStep(value, count=5){
  const step=Number(value);
  return Number.isInteger(step)&&step>=0&&step<count?step:0;
}
