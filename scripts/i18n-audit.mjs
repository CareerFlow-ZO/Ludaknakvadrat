#!/usr/bin/env node
// LNK DIGITAL: validate every homepage translation against actual selector behavior.
// No external test dependencies or production browser access needed.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('index.html', 'utf8');
const script = readFileSync('assets/js/lnk-home.js', 'utf8');
const translationBoundary = script.indexOf("let activeLanguage='en';");
assert(translationBoundary > 0, 'Cannot locate translation definitions');
const translations = JSON.parse(vm.runInNewContext(
  script.slice(0, translationBoundary) + '\nJSON.stringify(LNK_TRANSLATIONS)', {},
  { timeout: 2000 }
));
const expectedLanguages = ['en', 'sl', 'de', 'hr', 'bs', 'sr', 'it', 'fr', 'es', 'sq'];
assert.deepEqual(Object.keys(translations), expectedLanguages, 'Language selector and translation locales drifted');
const selectMarkup = html.match(/<select\b[^>]*id="languageSelect"[^>]*>([\s\S]*?)<\/select>/);
assert(selectMarkup, 'Missing language selector');
const optionLocales = [...selectMarkup[1].matchAll(/<option\s+value="([^"]+)"/g)].map(m => m[1]);
assert.deepEqual(optionLocales, expectedLanguages, 'Language dropdown does not match available locales');

const textKeys = [...html.matchAll(/\bdata-i18n="([^"]+)"/g)].map(m => m[1]);
const ariaKeys = [...html.matchAll(/\bdata-i18n-aria="([^"]+)"/g)].map(m => m[1]);
const usedKeys = [...new Set([...textKeys, ...ariaKeys, 'heroTitle', 'contactTitle', 'menuOpen', 'menuClose', 'whatsappHello', 'whatsappBusiness'])];
for (const lang of expectedLanguages) {
  for (const key of usedKeys) {
    assert(typeof translations[lang][key] === 'string' && translations[lang][key].trim(),
      'Missing translation in ' + lang + ': ' + key);
  }
  const extra = Object.keys(translations.en).filter(key => !translations[lang][key]);
  assert.deepEqual(extra, [], 'Incomplete dictionary for ' + lang);
}

// Check all 15 business cards: services, portfolio, steps, benefits and mini-cards.
const cards = [...html.matchAll(/<(article|a|div)\b([^>]*\bclass="[^"]*\b(?:card|step|work-card|mini-card)\b[^"]*"[^>]*)>([\s\S]*?)<\/\1>/gi)];
assert.equal(cards.length, 15, 'Homepage card count changed; review test coverage');
const allCardKeys = new Set();
for (const card of cards) {
  const keys = [...card[3].matchAll(/\bdata-i18n="([^"]+)"/g)].map(m => m[1]);
  assert(keys.length >= 2, 'Card is not fully marked for translation: ' + card[2]);
  for (const key of keys) allCardKeys.add(key);
  for (const match of card[3].matchAll(/<(h3|p)\b([^>]*)>[\s\S]*?<\/\1>/gi)) {
    assert(match[2].includes('data-i18n='), 'Untranslated card heading or paragraph: ' + match[0].slice(0, 100));
  }
}

class Element {
  constructor(data = {}, isContact = false) {
    this.dataset = data; this.isContact = isContact;
    this.attrs = {}; this.listeners = {}; this.value = '';
    this.textContent = ''; this.innerHTML = ''; this.href = '';
    const classes = new Set();
    this.classList = {
      toggle: (name, active) => active ? classes.add(name) : classes.delete(name),
      contains: (name) => classes.has(name)
    };
  }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  getAttribute(name) { return this.attrs[name] ?? null; }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  closest(selector) { return selector === '#contact' && this.isContact ? {} : null; }
  querySelectorAll() { return []; }
  focus() {}
}
const textNodes = textKeys.map(i18n => new Element({ i18n }));
const ariaNodes = ariaKeys.map(i18nAria => new Element({ i18nAria }));
const brand = ariaNodes.find(n => n.dataset.i18nAria === 'homeLabel');
assert(brand, 'Missing localized brand home link');
const select = new Element();
const button = new Element();
button.setAttribute('aria-expanded', 'false');
const nav = new Element();
const hero = new Element(), contact = new Element();
const whatsappButtons = [new Element({}, false), new Element({}, true)];
const metaDescription = { content: '' }, metaOgTitle = { content: '' }, metaOgDescription = { content: '' };
const storage = new Map();
const document = {
  documentElement: { lang: '' }, title: '',
  querySelectorAll(selector) {
    if (selector === '[data-i18n]') return textNodes;
    if (selector === '[data-i18n-aria]') return ariaNodes;
    if (selector === 'a[href^="https://wa.me/"]') return whatsappButtons;
    throw Error('Unexpected querySelectorAll: ' + selector);
  },
  querySelector(selector) {
    const values = { '.brand': brand, 'meta[name="description"]': metaDescription,
      'meta[property="og:title"]': metaOgTitle,
      'meta[property="og:description"]': metaOgDescription };
    assert(Object.hasOwn(values, selector), 'Unexpected querySelector ' + selector);
    return values[selector];
  },
  getElementById(id) {
    const values = { heroTitle: hero, contactTitle: contact, languageSelect: select,
      menuBtn: button, mobileNav: nav };
    assert(Object.hasOwn(values, id), 'Unexpected element ID ' + id);
    return values[id];
  },
  addEventListener() {}
};
const context = vm.createContext({
  document, navigator: { language: 'en-US' },
  localStorage: { setItem: (key, value) => storage.set(key, value),
    getItem: key => storage.get(key) ?? null }
});
vm.runInContext(script, context, { filename: 'assets/js/lnk-home.js', timeout: 2000 });
for (const lang of expectedLanguages) {
  vm.runInContext('applyLanguage(' + JSON.stringify(lang) + ')', context, { timeout: 2000 });
  assert.equal(document.documentElement.lang, lang);
  assert.equal(select.value, lang);
  for (const node of textNodes) assert.equal(node.textContent, translations[lang][node.dataset.i18n],
    'Text did not switch: ' + lang + ' / ' + node.dataset.i18n);
  for (const node of ariaNodes) {
    const expected = node === brand ? 'LNK DIGITAL · ' + translations[lang].homeLabel :
      translations[lang][node.dataset.i18nAria];
    assert.equal(node.getAttribute('aria-label'), expected,
      'Accessibility label did not switch: ' + lang + ' / ' + node.dataset.i18nAria);
  }
  assert.equal(hero.innerHTML, translations[lang].heroTitle, 'Hero heading: ' + lang);
  assert.equal(contact.innerHTML, translations[lang].contactTitle, 'Contact heading: ' + lang);
  assert(metaDescription.content && metaOgDescription.content, 'Description missing for ' + lang);
  assert(document.title.startsWith('LNK DIGITAL'), 'Wrong document title for ' + lang);
  for (const link of whatsappButtons) {
    const message = decodeURIComponent(link.href.split('?text=')[1] || '');
    assert(message.startsWith(translations[lang].whatsappHello), 'WhatsApp message did not switch: ' + lang);
    assert.equal(message.includes(translations[lang].whatsappBusiness), link.isContact,
      'WhatsApp business prompt wrong: ' + lang);
  }
  button.listeners.click();
  assert.equal(button.getAttribute('aria-expanded'), 'true', 'Mobile menu cannot open');
  assert.equal(button.getAttribute('aria-label'), translations[lang].menuClose, 'Open menu label is not localized');
  button.listeners.click();
  assert.equal(button.getAttribute('aria-expanded'), 'false', 'Mobile menu cannot close');
  assert.equal(button.getAttribute('aria-label'), translations[lang].menuOpen, 'Close menu label is not localized');
}
// Test the real language selector change callback, not only applyLanguage().
select.value = 'de';
select.listeners.change({ target: select });
assert.equal(document.documentElement.lang, 'de', 'Language selector change callback failed');
assert.equal(storage.get('lnk-language'), 'de', 'Selected language was not persisted');
console.log('LNK i18n QA PASS: ' + expectedLanguages.length + ' languages, ' +
  new Set(usedKeys).size + ' translation keys, ' + cards.length +
  ' cards, mobile menu, titles, accessibility labels, selector and WhatsApp CTAs.');
