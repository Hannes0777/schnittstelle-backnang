(function () {
  // Mobile-Vollbild-Menü
  var b = document.querySelector('.burger'), m = document.getElementById('mnav'), root = document.documentElement;
  if (b && m) {
    var setOpen = function (o, focusBack) {
      m.classList.toggle('open', o);
      b.setAttribute('aria-expanded', o);
      root.classList.toggle('menu-open', o);
      if (o) { var c = m.querySelector('.mclose'); if (c) c.focus({ preventScroll: true }); }
      else if (focusBack) b.focus({ preventScroll: true });
    };
    b.addEventListener('click', function () { setOpen(true); });
    m.querySelector('.mclose').addEventListener('click', function () { setOpen(false, true); });
    m.addEventListener('click', function (e) { if (e.target.closest('.mlinks a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && m.classList.contains('open')) setOpen(false, true); });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (q) { if (q.matches) setOpen(false); });
  }

  // "Jetzt geöffnet" (Mo–Fr 10–19, Sa 9–18, Zeitzone Berlin)
  var st = document.getElementById('status');
  if (st) {
    var txt = st.querySelector('span');
    try {
      var p = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      var wd = g('weekday').replace('.', ''), mins = (+g('hour')) * 60 + (+g('minute'));
      var h = { Mo: [600, 1140], Di: [600, 1140], Mi: [600, 1140], Do: [600, 1140], Fr: [600, 1140], Sa: [540, 1080] }[wd];
      if (h && mins >= h[0] && mins < h[1]) {
        st.classList.add('on');
        txt.textContent = 'Jetzt geöffnet · bis ' + (h[1] / 60) + ' Uhr';
      } else {
        txt.textContent = 'Gerade geschlossen';
      }
    } catch (e) {}
  }

  // Nach-oben-Button: erst nach dem Scrollen sichtbar
  var up = document.getElementById('totop');
  if (up) {
    var onScroll = function () { up.classList.toggle('show', window.scrollY > 500); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    up.addEventListener('click', function () { window.scrollTo({ top: 0 }); });
  }
})();
