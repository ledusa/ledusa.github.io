// virenzo.com: offers the page in the visitor's language (made by scripts/make-site.mjs)
(function () {
  var KEY = 'virenzo-lang', T = {"en":{"text":"This page is also in English.","go":"Open in English","close":"Close"},"tr":{"text":"Bu sayfa Türkçe de var.","go":"Türkçe aç","close":"Kapat"},"es":{"text":"Esta página también está en español.","go":"Ver en español","close":"Cerrar"},"pt":{"text":"Esta página também está em português.","go":"Ver em português","close":"Fechar"}};
  var page = document.documentElement.lang, alt = {};
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (l) { alt[l.hreflang] = l.getAttribute('href'); });
  function remember(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }
  document.querySelectorAll('a[data-lang]').forEach(function (a) { a.addEventListener('click', function () { remember(a.dataset.lang); }); });
  // the language menu closes when you tap elsewhere
  document.addEventListener('click', function (e) { document.querySelectorAll('details.lang[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); }); });
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved) return;
  var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''], want = null;
  for (var i = 0; i < langs.length; i++) { var c = String(langs[i]).slice(0, 2).toLowerCase(); if (T[c] && alt[c]) { want = c; break; } }
  if (!want || want === page) return;
  var t = T[want], bar = document.createElement('div');
  bar.className = 'suggest'; bar.lang = want;
  bar.innerHTML = '<div class="wrap"><span></span><a></a><button type="button">&times;</button></div>';
  bar.querySelector('span').textContent = t.text;
  var go = bar.querySelector('a'); go.textContent = t.go; go.href = alt[want];
  go.addEventListener('click', function () { remember(want); });
  var close = bar.querySelector('button'); close.setAttribute('aria-label', t.close);
  close.addEventListener('click', function () { remember(page); bar.remove(); });
  document.body.insertBefore(bar, document.body.firstChild);
})();
