/** Publicação da versão testada e independente de npm. */
import { copyFileSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const out = join(root, 'dist');
rmSync(out, {recursive:true,force:true});
mkdirSync(join(out,'vendor'), {recursive:true});
for (const [src,dst] of [
 ['offline/index.html','index.html'],
 ['offline/vendor/LICENSE-typescript.txt','vendor/LICENSE-typescript.txt']
]) copyFileSync(join(root,src),join(out,dst));
console.log(`DevLab estático pronto: ${statSync(join(out,'index.html')).size} bytes de HTML`);
