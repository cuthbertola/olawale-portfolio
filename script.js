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
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth reveal animations on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

// Add reveal animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = [
        '.hero-label',
        '.hero-title .title-line',
        '.hero-subtitle',
        '.section-label',
        '.about-image',
        '.about-text',
        '.about-cta',
        '.expertise-list',
        '.project-card',
        '.experience-item',
        '.contact-title',
        '.contact-text',
        '.contact-email',
        '.contact-cta'
    ];
    
    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            revealObserver.observe(el);
        });
    });
});

// Add revealed class styles
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero decoration
const heroDecoration = document.querySelector('.hero-decoration');

if (heroDecoration) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroDecoration.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// Magnetic effect on buttons - only for non-touch devices
if (!('ontouchstart' in window)) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Project card tilt effect - only for non-touch devices
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Nav background opacity on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 11, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 11, 0.8)';
    }
});

// Console Easter egg
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cInterested in working together? Reach out!', 'font-size: 14px; color: #00d4aa;');

// Mobile Hamburger Menu with Touch Support
(function() {
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-links');
    
    if (!hamburger || !navMenu) return;
    
    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
    }
    
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        overlay.classList.add('active');
    }
    
    // Toggle menu on hamburger click/touch
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close on overlay click/touch
    overlay.addEventListener('click', closeMenu);
    
    // Handle link clicks with BOTH click and touchend
    var links = navMenu.querySelectorAll('a');
    
    links.forEach(function(link) {
        // Function to handle navigation
        function navigateToSection(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var targetId = link.getAttribute('href');
            var targetSection = document.querySelector(targetId);
            
            // Close menu first
            closeMenu();
            
            // Navigate after menu closes
            if (targetSection) {
                setTimeout(function() {
                    var yOffset = -80; // Account for fixed nav
                    var y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 300);
            }
        }
        
        // Add both click and touchend listeners
        link.addEventListener('click', navigateToSection);
        link.addEventListener('touchend', navigateToSection);
    });
})();
