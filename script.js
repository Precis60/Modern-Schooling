// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default and scroll if it's a valid anchor (not just '#')
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar scrolled state
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add active state to current page
const currentLocation = location.pathname;
const menuItems = document.querySelectorAll('.nav-link');
menuItems.forEach(item => {
    if(item.getAttribute('href') === currentLocation.split('/').pop()) {
        item.classList.add('active');
    }
});

// Settings dropdown functionality
function toggleSettings() {
    const settingsMenu = document.getElementById('settingsMenu');
    settingsMenu.classList.toggle('show');
}

// Close settings dropdown when clicking outside
document.addEventListener('click', function(event) {
    const settingsDropdown = document.querySelector('.settings-dropdown');
    const settingsMenu = document.getElementById('settingsMenu');
    
    if (!settingsDropdown.contains(event.target)) {
        settingsMenu.classList.remove('show');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .post-card, .blog-post');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
