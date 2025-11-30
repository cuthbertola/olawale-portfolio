// Navigation active state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Reveal animations
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    var animateElements = [
        '.hero-label', '.hero-title .title-line', '.hero-subtitle',
        '.section-label', '.about-image', '.about-text', '.about-cta',
        '.expertise-list', '.project-card', '.experience-item',
        '.contact-title', '.contact-text', '.contact-email', '.contact-cta'
    ];
    animateElements.forEach(function(selector) {
        document.querySelectorAll(selector).forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease ' + (index * 0.1) + 's, transform 0.8s ease ' + (index * 0.1) + 's';
            revealObserver.observe(el);
        });
    });
});

// Revealed class
var style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Nav background
var nav = document.querySelector('nav');
window.addEventListener('scroll', function() {
    nav.style.background = window.scrollY > 100 ? 'rgba(10, 10, 11, 0.95)' : 'rgba(10, 10, 11, 0.8)';
});

// MOBILE MENU - Mojisola Style
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-links');
    
    if (!hamburger || !navMenu) return;

    // Toggle menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Make links work - use touchstart for mobile
    var links = document.querySelectorAll('.nav-links a');
    
    links.forEach(function(link) {
        // For touch devices
        link.addEventListener('touchstart', function(e) {
            var href = this.getAttribute('href');
            
            // Close menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Small delay then navigate
            var target = document.querySelector(href);
            if (target) {
                setTimeout(function() {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
            
            e.preventDefault();
        }, { passive: false });
        
        // For mouse clicks (desktop)
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            
            // Close menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Navigate
            var target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            e.preventDefault();
        });
    });
});
