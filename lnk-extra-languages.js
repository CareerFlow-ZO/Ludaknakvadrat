(() => {
  'use strict';

  const NATIVE = new Set(['sr','bs','hr','sl','en','de','fr','es','it','sq','tr','mk']);
  const LANGUAGES = [
    ['sr','🇷🇸 Srpski'],['bs','🇧🇦 Bosanski'],['hr','🇭🇷 Hrvatski'],['sl','🇸🇮 Slovenščina'],
    ['en','🇬🇧 English'],['de','🇩🇪 Deutsch'],['fr','🇫🇷 Français'],['es','🇪🇸 Español'],
    ['it','🇮🇹 Italiano'],['sq','🇦🇱 Shqip'],['tr','🇹🇷 Türkçe'],['mk','🇲🇰 Македонски'],
    ['pt','🇵🇹 Português'],['nl','🇳🇱 Nederlands'],['pl','🇵🇱 Polski'],['ro','🇷🇴 Română'],
    ['cs','🇨🇿 Čeština'],['sk','🇸🇰 Slovenčina'],['hu','🇭🇺 Magyar'],['sv','🇸🇪 Svenska'],
    ['no','🇳🇴 Norsk'],['da','🇩🇰 Dansk'],['fi','🇫🇮 Suomi'],['el','🇬🇷 Ελληνικά'],
    ['bg','🇧🇬 Български'],['uk','🇺🇦 Українська'],['ru','🇷🇺 Русский'],['ar','🇸🇦 العربية'],
    ['ja','🇯🇵 日本語'],['ko','🇰🇷 한국어'],['zh-CN','🇨🇳 中文']
  ];
  const EXTRA = LANGUAGES.filter(([code]) => !NATIVE.has(code)).map(([code]) => code);

  function cookieDomain() {
    const host = location.hostname;
    if (!host || host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return '';
    const parts = host.split('.');
    return parts.length > 1 ? '.' + parts.slice(-2).join('.') : '';
  }

  function setTranslateCookie(value) {
    document.cookie = `googtrans=${value};path=/;max-age=31536000;SameSite=Lax`;
    const domain = cookieDomain();
    if (domain) document.cookie = `googtrans=${value};path=/;domain=${domain};max-age=31536000;SameSite=Lax`;
  }

  function clearTranslateCookie() {
    document.cookie = 'googtrans=;path=/;max-age=0';
    const domain = cookieDomain();
    if (domain) document.cookie = `googtrans=;path=/;domain=${domain};max-age=0`;
  }

  function selectedLanguage() {
    return localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr';
  }

  function prepareSelector() {
    const select = document.getElementById('language');
    if (!select) return;
    const selected = selectedLanguage();
    select.classList.add('notranslate');
    select.innerHTML = LANGUAGES.map(([code,label]) => `<option value="${code}">${label}</option>`).join('');
    select.value = LANGUAGES.some(([code]) => code === selected) ? selected : 'sr';
    select.setAttribute('aria-label','Language / Jezik');
    select.dataset.expandedLanguages = '1';

    select.addEventListener('change', () => {
      const target = select.value;
      localStorage.setItem('lnkDisplayLang', target);
      if (NATIVE.has(target)) {
        localStorage.setItem('ludakLang', target);
        clearTranslateCookie();
      } else {
        localStorage.setItem('ludakLang', 'sr');
        setTranslateCookie(`/sr/${target}`);
      }
      location.reload();
    });
  }

  function updateLanguageCount() {
    const first = document.querySelector('.stats strong');
    if (first) first.textContent = `${LANGUAGES.length}+`;
  }

  function protectBrand() {
    document.querySelectorAll('.brand,.brand *, .hero-logo, .footer-brand, .footer-brand *').forEach(el => el.classList.add('notranslate'));
  }

  window.googleTranslateElementInit = function() {
    const target = selectedLanguage();
    if (NATIVE.has(target)) return;
    try {
      new google.translate.TranslateElement({
        pageLanguage: 'sr',
        includedLanguages: EXTRA.join(','),
        autoDisplay: false,
        multilanguagePage: true
      }, 'lnk-google-translate');
      let tries = 0;
      const apply = () => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
          combo.value = target;
          combo.dispatchEvent(new Event('change'));
          return;
        }
        if (++tries < 30) setTimeout(apply, 200);
      };
      setTimeout(apply, 250);
    } catch (e) {
      console.warn('LNK translation could not start', e);
    }
  };

  function startAutomaticTranslation(target) {
    if (NATIVE.has(target)) {
      window.__LNK_PAUSE_SITE_OBSERVERS = false;
      if (window.__LNK_NATIVE_MUTATION_OBSERVER) window.MutationObserver = window.__LNK_NATIVE_MUTATION_OBSERVER;
      return;
    }

    // Extra languages always translate from the complete Serbian version so every section has one source language.
    if ((localStorage.getItem('ludakLang') || 'sr') !== 'sr') {
      localStorage.setItem('ludakLang','sr');
      setTranslateCookie(`/sr/${target}`);
      location.reload();
      return;
    }

    // Pause only observers created by the LNK runtime; restore the native constructor for Google Translate itself.
    window.__LNK_PAUSE_SITE_OBSERVERS = true;
    if (window.__LNK_NATIVE_MUTATION_OBSERVER) window.MutationObserver = window.__LNK_NATIVE_MUTATION_OBSERVER;

    let holder = document.getElementById('lnk-google-translate');
    if (!holder) {
      holder = document.createElement('div');
      holder.id = 'lnk-google-translate';
      holder.setAttribute('aria-hidden','true');
      holder.style.display = 'none';
      document.body.appendChild(holder);
    }
    if (!document.getElementById('lnk-google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'lnk-google-translate-script';
      script.async = true;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(script);
    }
  }

  function boot() {
    protectBrand();
    prepareSelector();
    updateLanguageCount();
    const target = selectedLanguage();
    startAutomaticTranslation(target);
    setTimeout(() => { protectBrand(); updateLanguageCount(); }, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
