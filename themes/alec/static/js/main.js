// ── PARTICLE SYSTEM ───────────────────────────────────────
if (document.getElementById('canvas-container')) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    camera.position.z = 50;

    const particleCount = 12000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const initialPositions = new Float32Array(particleCount * 3);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 200;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 70px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ALEC OHANESIAN', canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const textPixels = [];
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            if (imageData.data[index] > 128) textPixels.push({ x, y });
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        if (textPixels.length > 0) {
            const pixel = textPixels[Math.floor(Math.random() * textPixels.length)];
            positions[i3]     = (pixel.x - canvas.width / 2) * 0.08;
            positions[i3 + 1] = -(pixel.y - canvas.height / 2) * 0.08;
            positions[i3 + 2] = (Math.random() - 0.5) * 1;
        }
        initialPositions[i3]     = positions[i3];
        initialPositions[i3 + 1] = positions[i3 + 1];
        initialPositions[i3 + 2] = positions[i3 + 2];
        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // ── STATE ─────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let clickState = 0;
    let navigationEnabled = false;

    document.addEventListener('mousemove', (e) => {
        if (!navigationEnabled) {
            target.x = (e.clientX / window.innerWidth) * 2 - 1;
            target.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }
    });

    document.getElementById('landing').addEventListener('click', (e) => {
        if (!e.target.classList.contains('quadrant-label')) {
            clickState = (clickState + 1) % 3;
            const hint  = document.getElementById('clickHint');
            const hint2 = document.getElementById('clickHint2');
            const labels = document.getElementById('quadrantLabels');
            const resetButton = document.getElementById('resetButton');

            if (clickState === 0) {
                hint.classList.remove('hidden');
                hint2.classList.remove('visible');
                labels.classList.remove('visible');
                resetButton.classList.remove('visible');
            } else if (clickState === 1) {
                hint.classList.add('hidden');
                hint2.classList.add('visible');
                resetButton.classList.remove('visible');
            } else {
                hint2.classList.remove('visible');
                labels.classList.add('visible');
                resetButton.classList.add('visible');
            }
        }
    });

    document.querySelectorAll('.quadrant-label').forEach(label => {
        label.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            navigationEnabled = true;
            document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
        });
    });

    const backToTop = document.getElementById('backToTop');
    const resetButton = document.getElementById('resetButton');

    function resetToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigationEnabled = false;
        clickState = 0;
        document.getElementById('clickHint').classList.remove('hidden');
        document.getElementById('clickHint2').classList.remove('visible');
        document.getElementById('quadrantLabels').classList.remove('visible');
        resetButton.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            backToTop.classList.add('visible');
            resetButton.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
            if (clickState === 2) resetButton.classList.add('visible');
            else resetButton.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', resetToTop);
    resetButton.addEventListener('click', resetToTop);

    // ── MENU ──────────────────────────────────────────────
    const menuButton = document.getElementById('menuButton');
    const sideMenu   = document.getElementById('sideMenu');
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        sideMenu.classList.toggle('open');
    });
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            sideMenu.classList.remove('open');
        });
    });

    // ── ANIMATION LOOP ────────────────────────────────────
    function animate() {
        requestAnimationFrame(animate);

        mouse.x += (target.x - mouse.x) * 0.05;
        mouse.y += (target.y - mouse.y) * 0.05;

        const pos = particles.attributes.position.array;
        const time = Date.now() * 0.001;
        const mouseInfluence = { x: mouse.x * 30, y: mouse.y * 30, z: 0 };

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            if (clickState === 1) {
                pos[i3]     += (initialPositions[i3]     - pos[i3])     * 0.2;
                pos[i3 + 1] += (initialPositions[i3 + 1] - pos[i3 + 1]) * 0.2;
                pos[i3 + 2] += (initialPositions[i3 + 2] - pos[i3 + 2]) * 0.2;
            } else if (clickState === 2) {
                const pi = i / particleCount;
                let tx, ty;
                if (pi < 0.5) { tx = (pi * 2 - 0.5) * 100; ty = 0; }
                else          { tx = 0; ty = ((pi - 0.5) * 2 - 0.5) * 60; }
                pos[i3]     += (tx - pos[i3])     * 0.1;
                pos[i3 + 1] += (ty - pos[i3 + 1]) * 0.1;
                pos[i3 + 2] += (0  - pos[i3 + 2]) * 0.1;
            } else {
                const dx = pos[i3]     - mouseInfluence.x;
                const dy = pos[i3 + 1] - mouseInfluence.y;
                const dz = pos[i3 + 2] - mouseInfluence.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                if (dist < 15) {
                    const force = (15 - dist) / 15;
                    pos[i3]     += (dx / dist) * force * 0.5;
                    pos[i3 + 1] += (dy / dist) * force * 0.5;
                    pos[i3 + 2] += (dz / dist) * force * 0.5;
                }
                pos[i3]     += (initialPositions[i3]     - pos[i3])     * 0.01;
                pos[i3 + 1] += (initialPositions[i3 + 1] - pos[i3 + 1]) * 0.01;
                pos[i3 + 2] += (initialPositions[i3 + 2] - pos[i3 + 2]) * 0.01;
                pos[i3]     += velocities[i].x;
                pos[i3 + 1] += velocities[i].y + Math.sin(time + i * 0.01) * 0.01;
                pos[i3 + 2] += velocities[i].z;
            }
        }
        particles.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}
