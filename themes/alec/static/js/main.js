// Dark mode toggle
const toggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('iconMoon');
const sunIcon = document.getElementById('iconSun');

if (toggle) {
    // Restore saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
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

// Mobile drawer
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
