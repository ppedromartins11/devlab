import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {DEVLAB_SUPABASE_SDK_URL, validateDevLabAuthConfig, devlabAuthRedirect, devlabAuthMessage, openDevLabAuthClient} from '../src/auth-client.js';

const config = {url:'https://abc123.supabase.co', publishableKey:'sb_publishable_ABC_123-xyz'};

test('aceita apenas URL de projeto e chave publicável', () => {
  assert.equal(validateDevLabAuthConfig(config), true);
  for (const value of [
    {...config, url:'http://abc123.supabase.co'},
    {...config, url:'https://abc123.supabase.co/path'},
    {...config, url:'https://example.com'},
    {...config, publishableKey:'sb_secret_NEVER'},
    {...config, publishableKey:'eyJhbGciOi...'},
    {...config, publishableKey:''},
    {...config, url:'https://abc123.supabase.co/?redirect=https://evil.example'}
  ]) assert.equal(validateDevLabAuthConfig(value), false);
});

test('retorno de OAuth não inclui query/hash de terceiros', () => {
  assert.equal(devlabAuthRedirect('https://devlab-zeta.vercel.app/?code=abc#/linguagens'), 'https://devlab-zeta.vercel.app/');
  assert.equal(devlabAuthRedirect({href:'http://localhost:5173/test?token=abc'}), 'http://localhost:5173/test');
  assert.throws(() => devlabAuthRedirect('javascript:alert(1)'));
});

test('SDK é carregado apenas após validação e com PKCE', async () => {
  let called = 0;
  let captured = null;
  const fakeImport = async url => {
    called++;
    assert.equal(url, DEVLAB_SUPABASE_SDK_URL);
    return {createClient(url, key, options) {
      captured = {url,key,options};
      return {auth:{}};
    }};
  };
  await assert.rejects(() => openDevLabAuthClient({...config, publishableKey:'sb_secret_bad'}, fakeImport));
  assert.equal(called, 0);
  await openDevLabAuthClient(config, fakeImport);
  assert.equal(called, 1);
  assert.equal(captured.options.auth.flowType, 'pkce');
  assert.equal(captured.options.auth.persistSession, true);
  assert.equal(captured.options.auth.detectSessionInUrl, true);
});

test('traduz erros comuns sem exibir mensagens sensíveis brutas', () => {
  assert.match(devlabAuthMessage({message:'Invalid login credentials'}), /incorretos/);
  assert.doesNotMatch(devlabAuthMessage({message:'SECRET-USER-DATA-123'}), /SECRET-USER-DATA-123/);
});

test('build deve integrar a UI real sem alterar chaves de progresso', () => {
  const html = readFileSync(new URL('../offline/index.html', import.meta.url), 'utf8');
  assert.match(html, /DEVLAB_AUTH_CONFIG/);
  assert.match(html, /dl-auth-portal/);
  assert.match(html, /signInWithPassword/);
  assert.match(html, /signInWithOAuth/);
  assert.match(html, /resetPasswordForEmail/);
  assert.match(html, /devlab-offline-v1:/);
  assert.ok(html.includes('sb_publishable_'));
});
