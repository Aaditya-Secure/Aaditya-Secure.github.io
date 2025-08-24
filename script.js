document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initCursor();
    initNavigation();
    initTypedText();
    initParticleBackground();
    initScrollAnimations();
    initMagneticElements();
    initTiltElements();
    initFormAnimations();
    initProjectLinks();
    initExperienceLinks();
    initEasterEgg();
});

// Custom Cursor
function initCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth outline following
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-hover], [data-magnetic], [data-tilt]');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    });
}

// Typed Text Animation
function initTypedText() {
    const typedElement = document.querySelector('.typed-text');

    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'Cybersecurity Engineer',
                'Ethical Hacker',
                'Bug Bounty Hunter',
                'Security Researcher',
                'Penetration Tester'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Particle Background with Three.js
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');

    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create material with orange/cyan colors
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xFF6B35,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add some cyan particles
    const cyanGeometry = new THREE.BufferGeometry();
    const cyanPosArray = new Float32Array(100 * 3);

    for (let i = 0; i < 100 * 3; i++) {
        cyanPosArray[i] = (Math.random() - 0.5) * 8;
    }

    cyanGeometry.setAttribute('position', new THREE.BufferAttribute(cyanPosArray, 3));

    const cyanMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x00FFFF,
        transparent: true,
        opacity: 0.6
    });

    const cyanMesh = new THREE.Points(cyanGeometry, cyanMaterial);
    scene.add(cyanMesh);

    camera.position.z = 3;

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;

        cyanMesh.rotation.x -= 0.0003;
        cyanMesh.rotation.y -= 0.0008;

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// GSAP Scroll Animations
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate skill categories
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.fromTo(category, {
            opacity: 0,
            y: 80,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate experience cards
    gsap.utils.toArray('.experience-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100
        }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 100,
            rotationX: -15
        }, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate contact cards
    gsap.utils.toArray('.contact-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Parallax effect for hero image
    gsap.to('.hero-image', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Magnetic Elements
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Tilt Elements
function initTiltElements() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Form Animations + Web3Forms Submission
function initFormAnimations() {
    const form = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-input');
    const formMessage = document.getElementById('form-message');

    // Input focus animations
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;

            // Animate submission
            btnText.textContent = 'Sending...';
            submitBtn.style.background = 'linear-gradient(135deg, #00FFFF, #FF6B35)';

            const formData = new FormData(form);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (response.ok) {
                    btnText.textContent = 'Message Sent! ✅';
                    formMessage.style.color = 'green';
                    formMessage.innerText = 'Message sent successfully! ✅';

                    setTimeout(() => {
                        btnText.textContent = originalText;
                        submitBtn.style.background = '';
                        form.reset();
                        formMessage.innerText = '';
                    }, 2500);
                } else {
                    throw new Error(result.message || "Form submission failed");
                }
            } catch (error) {
                console.error("Web3Forms error:", error);
                btnText.textContent = 'Failed ❌';
                formMessage.style.color = 'red';
                formMessage.innerText = 'Failed to send message ❌. Try again.';

                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.style.background = '';
                    formMessage.innerText = '';
                }, 3000);
            }
        });
    }
}

// Projects → open detail page, remember where to return
function initProjectLinks() {
    const projectCards = document.querySelectorAll('[data-link^="project"]');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                try {
                    sessionStorage.setItem('returnSection', 'projects');
                } catch (e) {}
                window.location.href = link;
            }
        });
    });
}


// Experience → open detail page, remember where to return
function initExperienceLinks() {
    const experienceCards = document.querySelectorAll('[data-link^="experience"]');
    experienceCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                try {
                    sessionStorage.setItem('returnSection', 'experience');
                } catch (e) {}
                window.location.href = link;
            }
        });
    });
}
// Scroll to experience section if URL has ?scroll=experience
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scroll') === 'experience') {
        const experienceSection = document.getElementById('experience');
        if (experienceSection) {
            // Use smooth scroll
            experienceSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initProjectLinks();
    initExperienceLinks();

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // or .show, depending on your CSS
            navToggle.classList.toggle('open'); // for animating hamburger to X
        });
    }
});


function scrollToSectionIfNeeded() {
    // 1) sessionStorage (set before navigating to detail pages)
    let sectionId = null;
    try {
        sectionId = sessionStorage.getItem('returnSection');
    } catch (e) {}

    // 2) URL ?scroll=... fallback
    if (!sectionId) {
        const params = new URLSearchParams(window.location.search);
        sectionId = params.get('scroll');
    }

    // 3) Hash fallback: index.html#experience or #projects
    if (!sectionId && window.location.hash) {
        const h = window.location.hash.replace('#', '');
        if (h === 'experience' || h === 'projects') sectionId = h;
    }

    if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        try {
            sessionStorage.removeItem('returnSection');
        } catch (e) {}
        // Clean the URL (?scroll=...) without reload
        if (window.history && window.history.replaceState) {
            const cleanUrl = window.location.pathname + (window.location.hash ? window.location.hash : '');
            history.replaceState({}, '', cleanUrl);
        }
    }
}

// Run on normal load AND on BFCache restore
window.addEventListener('load', scrollToSectionIfNeeded);
window.addEventListener('pageshow', scrollToSectionIfNeeded);

// Easter Egg - Console Hack
function initEasterEgg() {
    let hackSequence = '';
    const targetSequence = 'hack';

    document.addEventListener('keydown', (e) => {
        hackSequence += e.key.toLowerCase();

        if (hackSequence.length > targetSequence.length) {
            hackSequence = hackSequence.slice(-targetSequence.length);
        }

        if (hackSequence === targetSequence) {
            triggerGlitchEffect();
            hackSequence = '';
        }
    });
}

function triggerGlitchEffect() {
    console.log('🔥 HACK MODE ACTIVATED! 🔥');

    // Create glitch overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255, 107, 53, 0.1) 2px,
            rgba(255, 107, 53, 0.1) 4px
        );
        z-index: 9999;
        pointer-events: none;
        animation: glitch 0.3s ease-in-out;
    `;

    // Add glitch keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0%, 100% { opacity: 0; transform: translateX(0); }
            10% { opacity: 1; transform: translateX(-2px); }
            20% { opacity: 1; transform: translateX(2px); }
            30% { opacity: 1; transform: translateX(-1px); }
            40% { opacity: 1; transform: translateX(1px); }
            50% { opacity: 1; transform: translateX(-2px); }
            60% { opacity: 1; transform: translateX(2px); }
            70% { opacity: 1; transform: translateX(-1px); }
            80% { opacity: 1; transform: translateX(1px); }
            90% { opacity: 1; transform: translateX(0); }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(glitchOverlay);

    // Glitch text elements
    const textElements = document.querySelectorAll('h1, h2, h3, .hero-subtitle');
    textElements.forEach(el => {
        el.style.animation = 'glitch 0.3s ease-in-out';
        el.style.color = '#FF6B35';

        setTimeout(() => {
            el.style.animation = '';
            el.style.color = '';
        }, 300);
    });

    // Remove overlay after animation
    setTimeout(() => {
        document.body.removeChild(glitchOverlay);
        document.head.removeChild(style);
    }, 300);

    // Console message
    console.log('%c System compromised! 😈', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
    console.log('%c Just kidding! This is just a cool easter egg. 🎉', 'color: #00FFFF; font-size: 14px;');
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth performance for scroll events
window.addEventListener('scroll', debounce(() => {
    // Handle scroll-based animations here if needed
}, 10));