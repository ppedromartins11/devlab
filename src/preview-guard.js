/** Bloqueia alguns padrões de loops sem condição de saída antes de montar a prévia.
 * Não é prova formal de terminação: loops gerais exigem isolamento de processo.
 */
function codeOnly(source) {
  const input=String(source||'');let result='',i=0,state='code';
  while(i<input.length){const ch=input[i],next=input[i+1];
    if(state==='code'){
      if(ch==='/'&&next==='/'){state='line';result+='  ';i+=2;continue;}
      if(ch==='/'&&next==='*'){state='block';result+='  ';i+=2;continue;}
      if(ch==='\''||ch==='"'||ch==='`'){state=ch;result+=' ';i++;continue;}
      result+=ch;i++;continue;
    }
    if(state==='line'){if(ch==='\n'){state='code';result+='\n';}else result+=' ';i++;continue;}
    if(state==='block'){if(ch==='*'&&next==='/'){state='code';result+='  ';i+=2;}else{result+=ch==='\n'?'\n':' ';i++;}continue;}
    if(ch==='\\'){result+='  ';i+=Math.min(2,input.length-i);continue;}
    if(ch===state)state='code';result+=ch==='\n'?'\n':' ';i++;
  }
  return result;
}
export function previewSafetyWarning(script){
  if(String(script||'').length>35000)return 'A prévia ultrapassa 35 mil caracteres de JavaScript. Divida o projeto em arquivos menores.';
  const code=codeOnly(script);
  if(/\bwhile\s*\(\s*(?:true|1)\s*\)/.test(code)||/\bfor\s*\(\s*;\s*;\s*\)/.test(code))
    return 'A prévia bloqueou um laço sem condição explícita (while(true) ou for(;;)). Reescreva com uma condição de saída verificável.';
  return null;
}
