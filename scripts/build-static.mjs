/** Publicação da versão testada e independente de npm. */
import { copyFileSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '..');
// O artefato estático é sempre recompilado para incorporar o Auth e a configuração pública.
execFileSync(process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3'), [join(root, 'offline/build_standalone.py')], {cwd: root, stdio: 'inherit'});
const out = join(root, 'dist');
rmSync(out, {recursive:true,force:true});
mkdirSync(join(out,'vendor'), {recursive:true});
mkdirSync(join(out,'downloads'), {recursive:true});
for (const [src,dst] of [
 ['offline/index.html','index.html'],
 ['offline/vendor/LICENSE-typescript.txt','vendor/LICENSE-typescript.txt'],
 ['offline/downloads/php-pizzaria-prova.zip','downloads/php-pizzaria-prova.zip']
]) copyFileSync(join(root,src),join(out,dst));
console.log(`DevLab estático pronto: ${statSync(join(out,'index.html')).size} bytes de HTML`);
