/* DevLab 18 — contrato testável para autenticação no cliente estático. */
export const DEVLAB_SUPABASE_SDK_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2/+esm';

export function validateDevLabAuthConfig(config) {
  if (!config || typeof config.url !== 'string' || typeof config.publishableKey !== 'string') return false;
  const key = config.publishableKey.trim();
  if (!key || /^sb_secret_/i.test(key) || /\s/.test(key)) return false;
  // Aceita publishable keys novas e anon keys legadas; nunca a service_role.
  if (!key.startsWith('sb_publishable_') && !/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(key)) return false;
  let parsed;
  try { parsed = new URL(config.url); } catch { return false; }
  const local = ['localhost', '127.0.0.1'].includes(parsed.hostname);
  if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') return false;
  if (!((parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co')) || (local && parsed.protocol === 'http:'))) return false;
  return true;
}

export function devlabAuthRedirect(locationLike) {
  const value = typeof locationLike === 'string' ? locationLike : locationLike?.href;
  const parsed = new URL(value);
  if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Origem de retorno inválida');
  return parsed.origin + parsed.pathname;
}

export function devlabAuthMessage(error) {
  const message = String(error?.message || '').toLowerCase();
  if (/invalid login credentials/.test(message)) return 'E-mail ou senha incorretos.';
  if (/email not confirmed/.test(message)) return 'Confirme o e-mail antes de entrar.';
  if (/user already registered/.test(message)) return 'Este e-mail já está cadastrado.';
  if (/password should be/.test(message)) return 'Utilize uma senha mais forte.';
  if (/rate limit|too many requests/.test(message)) return 'Muitas tentativas. Tente novamente mais tarde.';
  if (/email address|invalid email/.test(message)) return 'Informe um e-mail válido.';
  return 'Não foi possível concluir a operação. Confira sua conexão e tente novamente.';
}

export async function openDevLabAuthClient(config, importModule = (url) => import(url)) {
  if (!validateDevLabAuthConfig(config)) throw new Error('Configuração pública do DevLab Auth inválida');
  const sdk = await importModule(DEVLAB_SUPABASE_SDK_URL);
  if (typeof sdk.createClient !== 'function') throw new Error('SDK de autenticação indisponível');
  return sdk.createClient(config.url.trim(), config.publishableKey.trim(), {
    auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true }
  });
}
