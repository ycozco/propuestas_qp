// Core application initialization logic
window.initApp = function () {
    // 1. Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Re-initialize AOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // 3. Re-select sections for scroll spy
    window.sections = document.querySelectorAll('section[id]');
    window.navLinks = document.querySelectorAll('.nav-link');
};

// Scroll Spy (Global listener, define once)
window.addEventListener('scroll', () => {
    let current = '';
    const sections = window.sections || document.querySelectorAll('section[id]');
    const navLinks = window.navLinks || document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // const sectionHeight = section.clientHeight; // Unused
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        // Only modify links that are anchors
        if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        }
    });
});

// Parallax (Global listener)
window.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    if (cards.length === 0) return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Header background (Global listener)
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// Initial call
document.addEventListener('DOMContentLoaded', () => {
    window.initApp();
});
