/** Simulador pedagógico determinístico HTTP. Não é uma API nem sistema de autenticação. */
export const backendLabInitial=()=>({items:[{id:1,title:'Organizar a API',completed:false,owner:'alice'},{id:2,title:'Revisar SQL',completed:false,owner:'bob'}],nextId:3});
const result=(state,status,body,headers={})=>({state,status,body,headers:{'Content-Type':'application/json',...headers}});
export function simulateBackendRequest(state,{method='GET',path='/health',body='',role='guest'}={}){
 if(!state || !Array.isArray(state.items) || !Number.isInteger(state.nextId))throw Error('Estado do laboratório inválido.');
 const current={items:state.items.map(x=>({...x})),nextId:state.nextId};
 const allowedRoles=['guest','alice','bob','admin'];if(!allowedRoles.includes(role))throw Error('Perfil inválido.');
 const verb=String(method).toUpperCase();let url;
 try{url=new URL(String(path),'https://simulador.devlab.invalid');}catch{return result(current,400,{error:'URL inválida.'});}
 if(url.origin!=='https://simulador.devlab.invalid')return result(current,400,{error:'Use um caminho local como /tasks.'});
 const pathname=url.pathname;
 if(pathname==='/health')return verb==='GET'?result(current,200,{status:'ok'}):result(current,405,{error:'Método não permitido.'},{Allow:'GET'});
 if(!['/tasks','/admin/users'].includes(pathname)&&!/^\/tasks\/\d+$/.test(pathname))return result(current,404,{error:'Rota não encontrada.'});
 if(role==='guest')return result(current,401,{error:'Autenticação necessária.'});
 if(pathname==='/admin/users')return role!=='admin'?result(current,403,{error:'Permissão insuficiente.'}):verb!=='GET'?result(current,405,{error:'Método não permitido.'}):result(current,200,{users:['alice','bob','admin']});
 let payload={};if(['POST','PATCH','PUT'].includes(verb)){
  try{payload=JSON.parse(body||'{}');}catch{return result(current,400,{error:'JSON inválido.'});}
  if(!payload || Array.isArray(payload)||typeof payload!=='object')return result(current,422,{error:'O corpo deve ser objeto.'});
 }
 if(pathname==='/tasks'){
  if(verb==='GET')return result(current,200,{items:current.items.filter(t=>role==='admin'||t.owner===role)});
  if(verb==='POST'){
   if(typeof payload.title!=='string'||!payload.title.trim()||payload.title.trim().length>120)return result(current,422,{error:'Título deve ter de 1 a 120 caracteres.'});
   const task={id:current.nextId++,title:payload.title.trim(),completed:false,owner:role};current.items.push(task);return result(current,201,task);
  }
  return result(current,405,{error:'Método não permitido.'},{Allow:'GET, POST'});
 }
 const id=Number(pathname.split('/')[2]);const task=current.items.find(t=>t.id===id && (role==='admin'||t.owner===role));
 if(!task)return result(current,404,{error:'Tarefa não encontrada.'});
 if(verb==='GET')return result(current,200,task);
 if(verb==='PATCH'){
  if(typeof payload.completed!=='boolean')return result(current,422,{error:'completed deve ser booleano.'});
  task.completed=payload.completed;return result(current,200,task);
 }
 if(verb==='DELETE'){current.items=current.items.filter(t=>t.id!==id);return result(current,204,null);}
 return result(current,405,{error:'Método não permitido.'},{Allow:'GET, PATCH, DELETE'});
}
