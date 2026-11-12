const toggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('iconMoon');
const sunIcon = document.getElementById('iconSun');

if (toggle) {
    const saved = localStorage.getItem('theme');
    if (saved !== 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'block';
    }
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIcon) sunIcon.style.display = 'none';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'block';
        }
    });
}

const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        drawer.classList.toggle('open');
        drawerOverlay.classList.toggle('visible');
    });
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => {
            hamburger.classList.remove('open');
            drawer.classList.remove('open');
            drawerOverlay.classList.remove('visible');
        });
    }
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            drawer.classList.remove('open');
            drawerOverlay.classList.remove('visible');
        });
    });
}

// About Me: each letter flies to the nearest matching letter in the bio,
// then the rest of the bio fades in. Clicking the end chevron reverses it.
(() => {
    const root = document.getElementById('about');
    const bio = document.getElementById('aboutBio');
    const btn = document.getElementById('aboutToggle');
    if (!root || !bio || !btn) return;

    const FLY = 700, STAGGER = 45, FADE_SPAN = 650, FADE = 450;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const wait = ms => new Promise(r => setTimeout(r, ms));

    // Split "About Me" into letter spans.
    const label = btn.querySelector('.about-label');
    const word = label.textContent;
    label.textContent = '';
    label.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-label', word);
    const flyers = [];
    for (const ch of word) {
        const s = document.createElement('span');
        s.className = 'about-l';
        s.textContent = ch;
        label.appendChild(s);
        if (ch.trim()) flyers.push(s);
    }

    // Split the bio into character spans; words stay unbreakable so wrapping is unchanged.
    const text = bio.textContent.trim().replace(/\s+/g, ' ');
    bio.textContent = '';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    const visual = document.createElement('span');
    const chars = [];
    text.split(' ').forEach((w, i) => {
        if (i) visual.appendChild(document.createTextNode(' '));
        const ws = document.createElement('span');
        ws.className = 'bio-w';
        ws.setAttribute('aria-hidden', 'true');
        for (const ch of w) {
            const c = document.createElement('span');
            c.className = 'bio-c';
            c.textContent = ch;
            ws.appendChild(c);
            chars.push(c);
        }
        visual.appendChild(ws);
    });
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'about-close';
    closeBtn.setAttribute('aria-label', 'Collapse about me');
    closeBtn.tabIndex = -1;
    closeBtn.innerHTML = btn.querySelector('.about-chev').outerHTML.replace('class="about-chev"', '');
    // Keep the chevron on the same line as the last word.
    const end = document.createElement('span');
    end.className = 'bio-w';
    end.append(visual.lastChild, closeBtn);
    visual.appendChild(end);
    bio.append(sr, visual);

    let state = 'closed';
    let pairs = [];

    // Each letter takes the next matching bio character (any case), so they land in reading order.
    // Layout position of an element, ignoring any transform currently applied to it.
    function homeRect(el) {
        const r = el.getBoundingClientRect();
        const t = getComputedStyle(el).transform;
        if (!t || t === 'none') return { left: r.left, top: r.top };
        const m = new DOMMatrixReadOnly(t);
        return { left: r.left - m.m41, top: r.top - m.m42 };
    }

    function matchTargets() {
        const cand = chars.map(c => ({ el: c, ch: c.textContent.toLowerCase(), r: homeRect(c) }));
        let from = 0;
        return flyers.map(f => {
            const fr = homeRect(f);
            const want = f.textContent.toLowerCase();
            const idx = cand.findIndex((k, i) => i >= from && k.ch === want);
            if (idx < 0) return null;
            from = idx + 1;
            const best = cand[idx];
            return { flyer: f, target: best.el, dx: best.r.left - fr.left, dy: best.r.top - fr.top };
        }).filter(Boolean);
    }

    function setInstant(el, on) { el.style.transition = on ? 'none' : ''; }

    function animateHeight(to) {
        root.style.height = root.offsetHeight + 'px';
        root.offsetHeight; // reflow so the transition starts from the current height
        root.style.height = to + 'px';
    }

    async function open() {
        state = 'busy';
        btn.setAttribute('aria-expanded', 'true');
        const fast = reduceMotion.matches;
        root.style.height = root.offsetHeight + 'px';
        root.classList.remove('about--closed');
        root.classList.add('about--busy');
        animateHeight(bio.offsetHeight);

        pairs = [];
        if (!fast) {
            pairs = matchTargets();
            label.classList.add('flying');
            pairs.forEach((p, i) => {
                p.flyer.style.transitionDelay = (i * STAGGER) + 'ms';
                p.flyer.style.transform = `translate(${p.dx}px, ${p.dy}px)`;
            });
            await wait(FLY + STAGGER * pairs.length);
            // Snap: hand each letter off to its spot in the bio.
            pairs.forEach(p => {
                setInstant(p.target, true);
                p.target.classList.add('on');
                p.flyer.style.opacity = '0';
            });
            await nextFrame();
            pairs.forEach(p => setInstant(p.target, false));
        }

        root.classList.add('about--open');
        const landed = new Set(pairs.map(p => p.target));
        chars.forEach((c, i) => {
            if (landed.has(c)) return;
            c.style.transitionDelay = fast ? '0ms' : Math.round(i / chars.length * FADE_SPAN) + 'ms';
            c.classList.add('on');
        });
        closeBtn.style.transitionDelay = fast ? '0ms' : FADE_SPAN + 'ms';
        closeBtn.classList.add('on');
        closeBtn.tabIndex = 0;
        if (document.activeElement === btn) closeBtn.focus({ preventScroll: true });

        await wait(fast ? 50 : FADE_SPAN + FADE);
        root.style.height = '';
        root.classList.remove('about--busy');
        state = 'open';
    }

    async function close() {
        state = 'busy';
        btn.setAttribute('aria-expanded', 'false');
        const fast = reduceMotion.matches;
        root.classList.add('about--busy');

        // Re-aim the hidden letters at their bio spots (layout may have changed since opening).
        flyers.forEach(f => { setInstant(f, true); f.style.transform = ''; f.style.transitionDelay = ''; f.style.opacity = '0'; });
        pairs = fast ? [] : matchTargets();
        pairs.forEach(p => { p.flyer.style.transform = `translate(${p.dx}px, ${p.dy}px)`; });
        label.classList.add('flying');
        label.offsetHeight;
        flyers.forEach(f => setInstant(f, false));

        // Fade out everything except the letters that will fly home.
        const landed = new Set(pairs.map(p => p.target));
        closeBtn.style.transitionDelay = '0ms';
        closeBtn.classList.remove('on');
        closeBtn.tabIndex = -1;
        chars.forEach((c, i) => {
            if (landed.has(c)) return;
            c.style.transitionDelay = fast ? '0ms' : Math.round((1 - i / chars.length) * FADE_SPAN * 0.5) + 'ms';
            c.classList.remove('on');
        });
        await wait(fast ? 50 : FADE_SPAN * 0.5 + FADE);

        // Swap the bio letters back for the flying ones, then send them home.
        root.classList.remove('about--open');
        pairs.forEach(p => setInstant(p.target, true));
        chars.forEach(c => c.classList.remove('on'));
        flyers.forEach(f => { setInstant(f, true); f.style.opacity = ''; });
        await nextFrame();
        pairs.forEach(p => setInstant(p.target, false));
        flyers.forEach(f => setInstant(f, false));
        label.classList.remove('flying');
        pairs.forEach((p, i) => {
            p.flyer.style.transitionDelay = ((pairs.length - 1 - i) * STAGGER) + 'ms';
            p.flyer.style.transform = '';
        });
        animateHeight(btn.getBoundingClientRect().height);
        if (document.activeElement === closeBtn || document.activeElement === document.body) btn.focus({ preventScroll: true });

        await wait(fast ? 50 : FLY + STAGGER * pairs.length);
        flyers.forEach(f => { f.style.transitionDelay = ''; });
        root.classList.add('about--closed');
        root.classList.remove('about--busy');
        root.style.height = '';
        state = 'closed';
    }

    btn.addEventListener('click', () => { if (state === 'closed') open(); });
    closeBtn.addEventListener('click', () => { if (state === 'open') close(); });
})();

// Elevator music: loops site-wide. Browsers only allow sound after the visitor
// interacts, so it starts on the first click/tap/key unless they've muted it.
(() => {
    const btn = document.getElementById('musicToggle');
    if (!btn) return;
    const audio = new Audio('/audio/elevator.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'none';

    const store = {
        get: (k, s = localStorage) => { try { return s.getItem(k); } catch { return null; } },
        set: (k, v, s = localStorage) => { try { s.setItem(k, v); } catch {} },
    };
    const muted = () => store.get('music') === 'off';

    function render() {
        const on = !audio.paused;
        btn.classList.toggle('playing', on);
        btn.setAttribute('aria-pressed', String(on));
        btn.title = on ? 'Mute music' : 'Play music';
    }
    audio.addEventListener('play', render);
    audio.addEventListener('pause', render);

    function play() {
        const t = parseFloat(store.get('musicTime', sessionStorage));
        if (t && !audio.currentTime) audio.currentTime = t;
        return audio.play().then(() => true, () => false);
    }

    // Keep the song going across page loads within the same visit.
    addEventListener('pagehide', () => store.set('musicTime', String(audio.currentTime), sessionStorage));

    function firstInteraction(e) {
        if (btn.contains(e.target)) return;
        const done = () => UNLOCK_EVENTS.forEach(t => document.removeEventListener(t, firstInteraction, true));
        if (muted() || !audio.paused) return done();
        play().then(ok => { if (ok) done(); }); // keep listening until the browser allows it
    }
    // Any of these count as the interaction browsers require before sound can play.
    const UNLOCK_EVENTS = ['pointerdown', 'mousedown', 'touchend', 'click', 'keydown'];
    UNLOCK_EVENTS.forEach(t => document.addEventListener(t, firstInteraction, true));
    // Try right away: browsers allow this for sites the visitor already plays media on often.
    if (!muted()) play().then(ok => { if (ok) UNLOCK_EVENTS.forEach(t => document.removeEventListener(t, firstInteraction, true)); });

    btn.addEventListener('click', () => {
        if (audio.paused) { store.set('music', 'on'); play(); }
        else { store.set('music', 'off'); audio.pause(); }
    });
    render();
})();
