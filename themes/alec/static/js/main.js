const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        drawer.classList.toggle('open');
        drawerOverlay.classList.toggle('visible');
    });
    drawerOverlay.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        drawerOverlay.classList.remove('visible');
    });
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            drawer.classList.remove('open');
            drawerOverlay.classList.remove('visible');
        });
    });
}
