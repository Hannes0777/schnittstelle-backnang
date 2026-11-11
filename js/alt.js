(function () {
  // Burger (optional)
  var b = document.querySelector('.burger'), m = document.getElementById('mnav');
  if (b && m) {
    b.addEventListener('click', function () { var o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
    m.addEventListener('click', function (e) { if (e.target.tagName === 'A') { m.classList.remove('open'); b.setAttribute('aria-expanded', false); } });
  }
  // Geöffnet-Status (Europe/Berlin)
  document.querySelectorAll('[data-status]').forEach(function (st) {
    var txt = st.querySelector('span') || st;
    try {
      var p = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      var wd = g('weekday').replace('.', ''), mins = (+g('hour')) * 60 + (+g('minute'));
      var h = { Mo: [600, 1140], Di: [600, 1140], Mi: [600, 1140], Do: [600, 1140], Fr: [600, 1140], Sa: [540, 1080] }[wd];
      if (h && mins >= h[0] && mins < h[1]) { st.classList.add('on'); txt.textContent = 'Jetzt geöffnet · bis ' + (h[1] / 60) + ' Uhr'; }
      else { txt.textContent = 'Gerade geschlossen'; }
    } catch (e) {}
  });
  // Bonuskarte: zehn antippbare Stempel
  var s = document.getElementById('stamps');
  if (s) {
    var key = 'sb-stamps', saved = 0;
    try { saved = +localStorage.getItem(key) || 0; } catch (e) {}
    for (var i = 1; i <= 10; i++) {
      var c = document.createElement('button');
      c.type = 'button'; c.setAttribute('aria-label', 'Stempel ' + i); c.dataset.n = i;
      c.textContent = i === 10 ? '10 €' : String(i);
      if (i === 10) c.className = 'last';
      if (i <= saved) c.classList.add('on');
      s.appendChild(c);
    }
    s.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      var n = +t.dataset.n, cur = s.querySelectorAll('.on').length, next = (n === cur) ? n - 1 : n;
      s.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', +x.dataset.n <= next); });
      try { localStorage.setItem(key, next); } catch (e) {}
    });
  }
})();
