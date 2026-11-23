/* DevLab 18 — entrada real, cadastro, recuperação e sessão, sem tocar no progresso local. */
(() => {
  'use strict';
  const config = window.DEVLAB_AUTH_CONFIG || {};
  const configured = validateDevLabAuthConfig(config);
  const appRoot = document.getElementById('root');
  if (!appRoot) return;
  const portal = document.createElement('div');
  portal.id = 'dl-auth-portal';
  document.body.append(portal);
  const guestKey = 'devlab-v18-guest';
  let client = null;
  let session = null;
  let ready = !configured;
  let failed = false;
  let guest = false;
  let visible = false;
  let mode = 'login';
  let busy = false;
  let reveal = false;
  let notice = '';

  try { guest = sessionStorage.getItem(guestKey) === '1'; } catch {}
  const setGuest = value => {
    guest = value;
    try { if (value) sessionStorage.setItem(guestKey, '1'); else sessionStorage.removeItem(guestKey); } catch {}
  };
  const escapeText = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  function updateAccount() {
    const area = appRoot.querySelector('.topbar-right');
    if (!area) return;
    let button = area.querySelector('#dl-auth-account');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.id = 'dl-auth-account';
      button.className = 'dl-auth-account';
      button.addEventListener('click', () => {
        notice = '';
        mode = session?.user ? 'account' : 'login';
        visible = true;
        paint();
      });
      area.append(button);
    }
    button.textContent = session?.user ? 'Minha conta' : 'Entrar';
    button.title = session?.user?.email || 'Autenticação e acesso visitante';
    button.setAttribute('aria-label', session?.user ? 'Minha conta DevLab' : 'Entrar ou continuar como visitante');
  }
  new MutationObserver(updateAccount).observe(appRoot, { childList: true });

  function setVisible(next) {
    visible = next;
    paint();
  }
  function setNotice(value) {
    notice = value;
    const element = portal.querySelector('#dl-auth-status');
    if (element) element.textContent = notice;
  }
  function content() {
    const title = {
      login: 'Entre no DevLab',
      signup: 'Crie sua conta',
      recover: 'Recuperar senha',
      reset: 'Definir nova senha',
      account: 'Minha conta'
    }[mode] || 'DevLab';
    if (mode === 'account') {
      return '<h1 id="dl-auth-title">Minha conta</h1><p class="dl-auth-subtitle">Seu acesso está conectado ao DevLab.</p>' +
        '<p class="dl-auth-user" id="dl-auth-email"></p>' +
        '<button type="button" class="dl-auth-primary" data-auth-action="signout">Sair da conta</button>' +
        '<button type="button" class="dl-auth-secondary" data-auth-action="close">Voltar aos estudos</button>';
    }
    const reset = mode === 'reset';
    const recover = mode === 'recover';
    const signup = mode === 'signup';
    return '<h1 id="dl-auth-title">' + title + '</h1>' +
      '<p class="dl-auth-subtitle">' +
        (reset ? 'Escolha uma senha nova para sua conta.' :
         recover ? 'Enviaremos um link de recuperação para seu e-mail.' :
         signup ? 'Salve seu acesso para voltar aos seus estudos.' :
         'Acesse sua conta ou continue estudando como visitante.') + '</p>' +
      (!configured || failed ? '<p class="dl-auth-warning" role="note">Login temporariamente indisponível. É possível continuar sem conta.</p>' : '') +
      '<form id="dl-auth-form">' +
        (!reset ? '<label for="dl-auth-email-input">E-mail</label><input id="dl-auth-email-input" name="email" type="email" autocomplete="email" placeholder="seu@email.com" required ' + (busy ? 'disabled' : '') + '>' : '') +
        (!recover ? '<label for="dl-auth-password">Senha</label><div class="dl-auth-password-wrap"><input id="dl-auth-password" name="password" type="' + (reveal ? 'text' : 'password') + '" autocomplete="' + (signup || reset ? 'new-password' : 'current-password') + '" minlength="6" required ' + (busy ? 'disabled' : '') + '><button type="button" class="dl-auth-reveal" data-auth-action="reveal" aria-label="' + (reveal ? 'Ocultar senha' : 'Mostrar senha') + '">' + (reveal ? 'Ocultar' : 'Mostrar') + '</button></div>' : '') +
        '<button class="dl-auth-primary" type="submit" ' + ((!configured || failed || !ready || busy) ? 'disabled' : '') + '>' +
          (busy ? 'Aguarde...' : reset ? 'Atualizar senha' : recover ? 'Enviar link' : signup ? 'Criar conta' : 'Entrar') + '</button>' +
      '</form>' +
      (mode === 'login' ? '<button class="dl-auth-link" type="button" data-auth-mode="recover">Esqueci minha senha</button>' : '') +
      (mode === 'signup' || recover ? '<button class="dl-auth-link" type="button" data-auth-mode="login">Já tenho conta</button>' : '') +
      (mode === 'login' ? '<div class="dl-auth-divider"><span>ou</span></div><button type="button" class="dl-auth-google" data-auth-action="google" ' + ((!configured || failed || !ready || busy) ? 'disabled' : '') + '>Continuar com Google</button>' +
        '<p class="dl-auth-switch">Ainda não tem conta? <button type="button" data-auth-mode="signup">Cadastre-se</button></p>' : '') +
      '<button type="button" class="dl-auth-secondary" data-auth-action="guest">Continuar sem conta</button>';
  }
  function paint() {
    updateAccount();
    portal.hidden = !visible;
    appRoot.inert = visible;
    if (!visible) { portal.textContent = ''; return; }
    portal.innerHTML = '<div class="dl-auth-backdrop"><section class="dl-auth-card" role="dialog" aria-modal="true" aria-labelledby="dl-auth-title">' +
      '<div class="dl-auth-brand"><span aria-hidden="true">&lt;/&gt;</span><strong>DevLab</strong></div>' +
      content() + '<p id="dl-auth-status" class="dl-auth-status" role="status" aria-live="polite"></p>' +
      '<p class="dl-auth-footnote">Seu progresso atual continua salvo neste navegador. Não há sincronização entre dispositivos nesta versão.</p>' +
      '</section></div>';
    const email = portal.querySelector('#dl-auth-email');
    if (email) email.textContent = session?.user?.email || '';
    setNotice(notice);
    portal.querySelector('input:not([disabled]),button:not([disabled])')?.focus({preventScroll: true});
  }
  function show(modeNext) {
    mode = modeNext;
    reveal = false;
    notice = '';
    setVisible(true);
  }
  portal.addEventListener('click', async event => {
    const choice = event.target.closest('[data-auth-mode],[data-auth-action]');
    if (!choice || busy) return;
    if (choice.dataset.authMode) { show(choice.dataset.authMode); return; }
    const action = choice.dataset.authAction;
    if (action === 'reveal') { reveal = !reveal; const field = portal.querySelector('#dl-auth-password'); if (field) field.type = reveal ? 'text' : 'password'; choice.textContent = reveal ? 'Ocultar' : 'Mostrar'; choice.setAttribute('aria-label', reveal ? 'Ocultar senha' : 'Mostrar senha'); return; }
    if (action === 'close') { setVisible(false); return; }
    if (action === 'guest') { setGuest(true); setVisible(false); return; }
    if (!client) return;
    if (action === 'google') {
      busy = true; paint();
      try {
        const { error } = await client.auth.signInWithOAuth({provider: 'google', options: {redirectTo: devlabAuthRedirect(location)}});
        if (error) throw error;
      } catch (error) { setNotice(devlabAuthMessage(error)); }
      finally { busy = false; paint(); }
    }
    if (action === 'signout') {
      busy = true; paint();
      try {
        const { error } = await client.auth.signOut();
        if (error) throw error;
        session = null;
        setGuest(false);
        mode = 'login';
        setVisible(true);
      } catch (error) { setNotice(devlabAuthMessage(error)); }
      finally { busy = false; paint(); }
    }
  });
  portal.addEventListener('submit', async event => {
    if (event.target.id !== 'dl-auth-form') return;
    event.preventDefault();
    if (!client || busy) return;
    const data = new FormData(event.target);
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');
    busy = true; setNotice(''); paint();
    try {
      let result;
      const redirectTo = devlabAuthRedirect(location);
      if (mode === 'signup') {
        result = await client.auth.signUp({email, password, options: {emailRedirectTo: redirectTo}});
      } else if (mode === 'recover') {
        result = await client.auth.resetPasswordForEmail(email, {redirectTo});
      } else if (mode === 'reset') {
        result = await client.auth.updateUser({password});
      } else {
        result = await client.auth.signInWithPassword({email, password});
      }
      if (result.error) throw result.error;
      if (mode === 'signup') setNotice('Cadastro enviado. Se necessário, confirme sua conta no e-mail.');
      else if (mode === 'recover') setNotice('Se este e-mail estiver cadastrado, você receberá um link.');
      else if (mode === 'reset') { mode = 'login'; setNotice('Senha atualizada. Entre novamente se necessário.'); }
      else { session = result.data?.session || session; if (session) { setGuest(false); visible = false; } }
    } catch (error) { setNotice(devlabAuthMessage(error)); }
    finally { busy = false; paint(); }
  });
  document.addEventListener('keydown', event => {
    if (!visible || event.key !== 'Escape' || mode !== 'account') return;
    setVisible(false);
  });
  async function start() {
    if (!configured) { updateAccount(); return; }
    visible = !guest;
    mode = 'login';
    paint();
    try {
      client = await openDevLabAuthClient(config);
      const { data: { subscription } } = client.auth.onAuthStateChange((type, current) => {
        if (type === 'PASSWORD_RECOVERY') { session = current; setGuest(false); show('reset'); return; }
        session = current || null;
        if (session?.user && mode !== 'reset') { setGuest(false); visible = false; }
        else if (type === 'SIGNED_OUT' && !guest) { mode = 'login'; visible = true; }
        paint();
      });
      void subscription;
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      session = data.session || null;
      ready = true;
      if (session?.user && mode !== 'reset') { setGuest(false); visible = false; }
      else if (!guest && mode !== 'reset') visible = true;
      paint();
    } catch (error) {
      failed = true;
      ready = true;
      setNotice('A autenticação não está disponível no momento. Continue sem conta.');
      paint();
    }
  }
  start();
})();
