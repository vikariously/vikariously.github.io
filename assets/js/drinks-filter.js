// Recipes listing: "Show Cocktails & Syrups" toggle (off by default, remembered per device)
(function() {
  'use strict';

  var KEY = 'showDrinks';

  function init() {
    var grid = document.querySelector('.drinks-filterable');
    if (!grid || !grid.querySelector('[data-drink]')) return;

    var wrap = document.createElement('div');
    wrap.className = 'drinks-filter';
    wrap.innerHTML =
      '<label class="recipe-mode-toggle">' +
        '<input type="checkbox" id="drinks-filter-toggle" />' +
        '<span class="recipe-mode-slider"></span>' +
        '<span class="recipe-mode-label">Show Cocktails &amp; Syrups</span>' +
      '</label>';
    grid.parentNode.insertBefore(wrap, grid);

    var toggle = wrap.querySelector('input');
    var saved = false;
    try { saved = localStorage.getItem(KEY) === 'true'; } catch (e) {}

    function apply(show) {
      toggle.checked = show;
      grid.classList.toggle('show-drinks', show);
    }
    apply(saved);

    toggle.addEventListener('change', function() {
      apply(this.checked);
      try { localStorage.setItem(KEY, this.checked); } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
