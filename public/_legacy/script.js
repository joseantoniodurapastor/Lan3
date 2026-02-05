/* ============================================
   PARALLAX SCROLL ENGINE
   Multi-layer parallax with controlled intensity
   ============================================ */

// Parallax configuration
const parallaxConfig = {
    hero: {
        background: 0.5,
        lamp: 0.3,
        foreground: 1.0
    },
    descenso: {
        background: 0.4,
        midground: 0.7,
        foreground: 1.0,
        deep: 1.2
    },
    tension: {
        background: 0.3,
        midground: 0.6,
        foreground: 1.0
    },
    nucleo: {
        background: 0.6,
        foreground: 1.0
    },
    resultado: {
        background: 0.8,
        foreground: 1.0
    },
    cierre: {
        background: 0.9,
        foreground: 1.0
    }
};

// Throttle function for performance
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

// Main parallax scroll handler
function handleParallax() {
    const scrolled = window.pageYOffset;

    // Section 1: IMPACTO
    const impacto = document.querySelector('#impacto');
    if (impacto) {
        const impactoOffset = impacto.offsetTop;
        const impactoHeight = impacto.offsetHeight;

        if (scrolled < impactoHeight) {
            const bgWall = impacto.querySelector('.background-wall');
            const lamp = impacto.querySelector('.lamp-light');
            const fg = impacto.querySelector('.foreground');

            if (bgWall) bgWall.style.transform = `translateY(${scrolled * parallaxConfig.hero.background}px)`;
            if (lamp) lamp.style.transform = `translateY(${scrolled * parallaxConfig.hero.lamp}px)`;
            if (fg) fg.style.transform = `translateY(${scrolled * parallaxConfig.hero.foreground * 0.2}px)`;
        }
    }

    // Section 2: DESCENSO
    const descenso = document.querySelector('#descenso');
    if (descenso) {
        const descensoOffset = descenso.offsetTop;
        const descensoHeight = descenso.offsetHeight;
        const relativeScroll = scrolled - descensoOffset;

        if (relativeScroll > -window.innerHeight && relativeScroll < descensoHeight) {
            const bgWall = descenso.querySelector('.background-wall');
            const mg = descenso.querySelector('.midground');
            const fg = descenso.querySelector('.foreground');
            const deep = descenso.querySelector('.deep-foreground');

            if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.background}px)`;
            if (mg) mg.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.midground}px)`;
            if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.foreground}px)`;
            if (deep) deep.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.deep}px)`;

            // Stagger fade-in for statements
            const statements = descenso.querySelectorAll('.statement');
            statements.forEach((stmt, index) => {
                const delay = index * 200;
                const triggerPoint = descensoHeight * 0.3 + delay;
                if (relativeScroll > triggerPoint) {
                    stmt.style.animationDelay = `${delay}ms`;
                }
            });
        }
    }

    // Section 3: TENSIÓN
    const tension = document.querySelector('#tension');
    if (tension) {
        const tensionOffset = tension.offsetTop;
        const tensionHeight = tension.offsetHeight;
        const relativeScroll = scrolled - tensionOffset;

        if (relativeScroll > -window.innerHeight && relativeScroll < tensionHeight) {
            const bgWall = tension.querySelector('.background-wall');
            const mg = tension.querySelector('.midground');
            const fg = tension.querySelector('.foreground');

            if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.tension.background}px)`;
            if (mg) mg.style.transform = `translateY(${relativeScroll * parallaxConfig.tension.midground}px)`;
            if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.tension.foreground}px)`;
        }
    }

    // Section 4: NÚCLEO (calmer parallax)
    const nucleo = document.querySelector('#nucleo');
    if (nucleo) {
        const nucleoOffset = nucleo.offsetTop;
        const nucleoHeight = nucleo.offsetHeight;
        const relativeScroll = scrolled - nucleoOffset;

        if (relativeScroll > -window.innerHeight && relativeScroll < nucleoHeight) {
            const bgWall = nucleo.querySelector('.background-wall');
            const fg = nucleo.querySelector('.foreground');

            if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.nucleo.background}px)`;
            if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.nucleo.foreground * 0.3}px)`;
        }
    }

    // Section 5: RESULTADO (minimal movement)
    const resultado = document.querySelector('#resultado');
    if (resultado) {
        const resultadoOffset = resultado.offsetTop;
        const resultadoHeight = resultado.offsetHeight;
        const relativeScroll = scrolled - resultadoOffset;

        if (relativeScroll > -window.innerHeight && relativeScroll < resultadoHeight) {
            const bgWall = resultado.querySelector('.background-wall');
            const fg = resultado.querySelector('.foreground');

            if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.resultado.background}px)`;
            if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.resultado.foreground * 0.2}px)`;
        }
    }

    // Section 6: CIERRE (almost static)
    const cierre = document.querySelector('#cierre');
    if (cierre) {
        const cierreOffset = cierre.offsetTop;
        const cierreHeight = cierre.offsetHeight;
        const relativeScroll = scrolled - cierreOffset;

        if (relativeScroll > -window.innerHeight && relativeScroll < cierreHeight) {
            const bgWall = cierre.querySelector('.background-wall');
            const fg = cierre.querySelector('.foreground');

            if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.cierre.background}px)`;
            if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.cierre.foreground * 0.1}px)`;
        }
    }
}

// Optimized scroll handler with RAF
let rafId = null;
function onScroll() {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(handleParallax);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initial parallax calculation
    handleParallax();

    // Attach scroll listener with RAF
    window.addEventListener('scroll', onScroll, { passive: true });

    // CTA button click handler
    const ctaButton = document.getElementById('cta-main');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            // This will trigger the chat-closer to open
            if (window.openChatCloser) {
                window.openChatCloser();
            }
        });
    }

    // Cookie Banner Logic
    initCookieBanner();

    console.log('ZUNCHOS parallax engine initialized');
});

/* ============================================
   COOKIE BANNER & MODAL LOGIC
   ============================================ */

function initCookieBanner() {
    const consent = localStorage.getItem('zunchos_cookie_consent');
    const banner = document.getElementById('cookie-banner');

    if (!consent && banner) {
        // Show after a small delay
        setTimeout(() => {
            banner.classList.add('visible');
        }, 1500);
    }
}

function acceptCookies() {
    localStorage.setItem('zunchos_cookie_consent', 'accepted');
    hideCookieBanner();
    // Here you would trigger analytics loading
    console.log('Cookies accepted');
}

function rejectCookies() {
    localStorage.setItem('zunchos_cookie_consent', 'rejected');
    hideCookieBanner();
    console.log('Cookies rejected');
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.remove('visible');
    }
}

/* ============================================
   MODAL SYSTEM
   ============================================ */
// Global modal functions
window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById('modal-backdrop');

    if (modal && backdrop) {
        backdrop.classList.add('active');
        // Close any currently open modals first (if any)
        document.querySelectorAll('.legal-modal.active').forEach(m => m.classList.remove('active'));

        // Slight delay for transition smoothness
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    return false; // Prevent default link behavior
};

window.closeAllModals = function () {
    const backdrop = document.getElementById('modal-backdrop');
    const modals = document.querySelectorAll('.legal-modal');

    if (backdrop) backdrop.classList.remove('active');
    modals.forEach(m => m.classList.remove('active'));

    // Restore body scroll
    document.body.style.overflow = '';
};

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeAllModals();
        if (window.closeChat) window.closeChat();
    }
});
