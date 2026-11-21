/** Navegação curricular independente da renderização e do armazenamento. */
export const learningAreas = Object.freeze([
  {id:'learn', label:'Aprender', routes:Object.freeze([
    {route:'curso/javascript',label:'JavaScript',note:'24 aulas'},
    {route:'curso/typescript',label:'TypeScript',note:'5 aulas'},
    {route:'frontend',label:'Formação frontend',note:'25 aulas'},
    {route:'backend',label:'Formação backend',note:'25 aulas'}
  ])},
  {id:'practice',label:'Praticar',routes:Object.freeze([
    {route:'oficina',label:'Oficina de código',note:'6 missões'},
    {route:'revisao',label:'Revisões',note:'Memorização'},
    {route:'desafios',label:'Desafios',note:'3 desafios'}
  ])},
  {id:'build',label:'Construir',routes:Object.freeze([
    {route:'workspace',label:'Workspace',note:'Projetos'},
    {route:'projeto',label:'TaskFlow',note:'Projeto guiado'},
    {route:'carreira',label:'Jornada profissional',note:'Portfólio'}
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
