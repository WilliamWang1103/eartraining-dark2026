/* ==========================================================================
   音乐艺术感首页 · 交互脚本
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 浮动音符背景 ---------- */
  var canvas = document.getElementById('notes-canvas');
  var ctx = canvas && canvas.getContext('2d');
  var notes = [];
  var symbols = ['♪', '♫', '♬', '♩', '♭', '♯', '𝄞', '♮'];

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function spawn(count) {
    if (!canvas || !ctx) return;
    for (var i = 0; i < count; i++) {
      notes.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 40,
        s: 14 + Math.random() * 26,
        sp: 0.25 + Math.random() * 0.7,
        sway: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        o: 0.06 + Math.random() * 0.22,
        sym: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }
  }
  spawn(26);

  function draw() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      n.y -= n.sp;
      n.phase += 0.012;
      var x = n.x + Math.sin(n.phase) * 22 * n.sway;
      ctx.save();
      ctx.globalAlpha = n.o;
      ctx.fillStyle = '#e6c66a';
      ctx.font = n.s + 'px "Noto Serif SC", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(n.sym, x, n.y);
      ctx.restore();
      if (n.y < -60) { notes.splice(i, 1); i--; }
    }
    if (notes.length < 40 && Math.random() < 0.02) spawn(1);
    requestAnimationFrame(draw);
  }
  if (!reduceMotion) draw();

  /* ---------- 2. 导航滚动状态 ---------- */
  var nav = document.getElementById('topnav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    highlightNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 高亮当前区块 */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function highlightNav() {
    var pos = window.scrollY + 120;
    var currentId = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= pos) currentId = sections[i].id;
    }
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  /* ---------- 3. 移动端菜单 ---------- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });
    links.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  /* ---------- 4. 滚动显现 ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 5. 减少动效偏好 ---------- */
  if (reduceMotion) document.documentElement.classList.add('no-motion');

  /* ---------- 6. 留言板（localStorage） ---------- */
  var STORE_KEY = 'music_site_guestbook_v1';
  var form = document.getElementById('gb-form');
  var list = document.getElementById('gb-list');
  var nameInput = document.getElementById('gb-name');
  var msgInput = document.getElementById('gb-msg');
  var empty = document.getElementById('gb-empty');
  var countEl = document.getElementById('gb-count');

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { return []; }
  }
  function save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtTime(ts) {
    var d = new Date(ts);
    var p = function (n) { return n < 10 ? '0' + n : '' + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function render() {
    var data = load();
    if (!list) return;
    list.innerHTML = '';
    if (countEl) countEl.textContent = data.length;
    if (!data.length) { if (empty) empty.style.display = 'block'; return; }
    if (empty) empty.style.display = 'none';
    data.slice().reverse().forEach(function (m) {
      var el = document.createElement('div');
      el.className = 'gb-item';
      el.innerHTML =
        '<div class="gb-avatar">' + escapeHtml((m.name || '匿').trim().charAt(0)) + '</div>' +
        '<div class="gb-body">' +
          '<div class="gb-meta"><strong>' + escapeHtml(m.name || '匿名') + '</strong><span>' + escapeHtml(fmtTime(m.time)) + '</span></div>' +
          '<p class="gb-text">' + escapeHtml(m.msg) + '</p>' +
        '</div>' +
        '<button class="gb-del" data-id="' + m.id + '" title="删除">×</button>';
      list.appendChild(el);
    });
  }
  function addMessage(e) {
    if (e) e.preventDefault();
    var name = (nameInput && nameInput.value || '').trim();
    var msg = (msgInput && msgInput.value || '').trim();
    if (!msg) { alert('请先写点什么再提交哦～'); return; }
    var data = load();
    data.push({ id: Date.now() + '' + Math.random().toString(16).slice(2, 6), name: name, msg: msg, time: Date.now() });
    save(data);
    if (nameInput) nameInput.value = '';
    if (msgInput) msgInput.value = '';
    render();
  }
  if (form) form.addEventListener('submit', addMessage);
  if (list) list.addEventListener('click', function (e) {
    var btn = e.target.closest('.gb-del');
    if (!btn) return;
    if (!window.confirm('确定删除这条留言吗？')) return;
    var id = btn.getAttribute('data-id');
    var data = load().filter(function (m) { return m.id !== id; });
    save(data);
    render();
  });
  render();

  /* ---------- 7. 音乐盒（点击播放轻柔旋律） ---------- */
  var playBtn = document.getElementById('music-toggle');
  var playing = false;
  var audioCtx = null;
  var melodyTimer = null;
  var melody = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 659.25];
  var labelEl = playBtn && playBtn.querySelector('span');

  function tone(freq, t, dur) {
    if (!audioCtx) return;
    var o = audioCtx.createOscillator();
    var g = audioCtx.createGain();
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function step(i) {
    if (!audioCtx) return;
    var now = audioCtx.currentTime + 0.02;
    tone(melody[i % melody.length], now, 0.9);
  }
  function startMusic() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    var i = 0;
    step(0);
    melodyTimer = setInterval(function () { step(++i); }, 520);
  }
  function stopMusic() {
    if (melodyTimer) { clearInterval(melodyTimer); melodyTimer = null; }
  }
  if (playBtn) playBtn.addEventListener('click', function () {
    playing = !playing;
    if (playing) {
      startMusic();
      playBtn.classList.add('playing');
      if (labelEl) labelEl.textContent = '暂停音乐';
    } else {
      stopMusic();
      playBtn.classList.remove('playing');
      if (labelEl) labelEl.textContent = '播放音乐';
    }
  });

  /* ---------- 8. 页脚年份 ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
