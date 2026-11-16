// DECO site — copy buttons. No dependencies, works offline.
(function () {
  'use strict';

  function copyText(text, btn) {
    function done() {
      var original = btn.textContent;
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1800);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* leave button as-is */ }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-copy]');
    if (!btn) return;
    copyText(btn.getAttribute('data-copy'), btn);
  });
})();
