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

// Mobile settings functionality
function toggleMobileSettings() {
    const mobileSettingsMenu = document.getElementById('mobileSettingsMenu');
    mobileSettingsMenu.classList.toggle('show');
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

    // Initialize theme on page load
    initializeTheme();
    
    // Initialize theme page if we're on it
    if (window.location.pathname.includes('theme.html')) {
        initializeThemePage();
    }
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const autoTheme = localStorage.getItem('autoTheme') === 'true';
    
    let theme = 'light';
    
    if (autoTheme) {
        theme = systemPrefersDark ? 'dark' : 'light';
        // Update auto theme checkbox if on account page
        const autoThemeCheckbox = document.getElementById('autoTheme');
        if (autoThemeCheckbox) {
            autoThemeCheckbox.checked = true;
        }
    } else if (savedTheme) {
        theme = savedTheme;
    }
    
    applyTheme(theme);
    updateThemeUI(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Disable auto theme when manually toggling
    localStorage.setItem('autoTheme', 'false');
    const autoThemeCheckbox = document.getElementById('autoTheme');
    if (autoThemeCheckbox) {
        autoThemeCheckbox.checked = false;
    }
    
    applyTheme(newTheme);
    updateThemeUI(newTheme);
    localStorage.setItem('theme', newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeUI(theme) {
    // Update settings dropdown theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const themeIcon = themeToggle?.querySelector('svg');
    
    // Update account page theme toggle
    const accountThemeToggle = document.getElementById('accountThemeToggle');
    const accountThemeText = document.getElementById('accountThemeText');
    const accountThemeIcon = document.getElementById('accountThemeIcon');
    
    if (theme === 'dark') {
        // Update settings dropdown
        if (themeText) themeText.textContent = 'Dark Mode';
        if (themeIcon) {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
        
        // Update account page
        if (accountThemeText) accountThemeText.textContent = 'Switch to Light';
        if (accountThemeIcon) {
            accountThemeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    } else {
        // Update settings dropdown
        if (themeText) themeText.textContent = 'Light Mode';
        if (themeIcon) {
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
        }
        
        // Update account page
        if (accountThemeText) accountThemeText.textContent = 'Switch to Dark';
        if (accountThemeIcon) {
            accountThemeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
        }
    }
}

function toggleAutoTheme() {
    const autoThemeCheckbox = document.getElementById('autoTheme');
    const isAutoTheme = autoThemeCheckbox?.checked || false;
    
    localStorage.setItem('autoTheme', isAutoTheme.toString());
    
    if (isAutoTheme) {
        // Apply system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = systemPrefersDark ? 'dark' : 'light';
        applyTheme(theme);
        updateThemeUI(theme);
        localStorage.setItem('theme', theme);
    }
}

// Listen for system theme changes when auto theme is enabled
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const autoTheme = localStorage.getItem('autoTheme') === 'true';
    if (autoTheme) {
        const theme = e.matches ? 'dark' : 'light';
        applyTheme(theme);
        updateThemeUI(theme);
        localStorage.setItem('theme', theme);
    }
});

// Theme Page Functions
let selectedTheme = null;

function selectTheme(theme) {
    selectedTheme = theme;
    
    // Update visual selection
    document.querySelectorAll('.theme-option').forEach(option => {
        const radio = option.querySelector('.theme-radio');
        const radioInner = option.querySelector('.theme-radio-inner');
        
        if (option.dataset.theme === theme) {
            option.style.border = '2px solid #6366f1';
            option.style.background = 'rgba(99, 102, 241, 0.05)';
            radioInner.style.opacity = '1';
        } else {
            option.style.border = '2px solid transparent';
            option.style.background = 'var(--bg-secondary)';
            radioInner.style.opacity = '0';
        }
    });
    
    // Apply preview
    if (theme === 'auto') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const previewTheme = systemPrefersDark ? 'dark' : 'light';
        applyTheme(previewTheme);
    } else {
        applyTheme(theme);
    }
}

function applySelectedTheme() {
    if (!selectedTheme) {
        alert('Please select a theme first');
        return;
    }
    
    if (selectedTheme === 'auto') {
        localStorage.setItem('autoTheme', 'true');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = systemPrefersDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    } else {
        localStorage.setItem('autoTheme', 'false');
        localStorage.setItem('theme', selectedTheme);
        applyTheme(selectedTheme);
    }
    
    // Show confirmation
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Applied!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#6366f1';
    }, 2000);
}


function initializeThemePage() {
    const savedTheme = localStorage.getItem('theme');
    const autoTheme = localStorage.getItem('autoTheme') === 'true';
    
    let currentSelection = 'light';
    
    if (autoTheme) {
        currentSelection = 'auto';
    } else if (savedTheme) {
        currentSelection = savedTheme;
    }
    
    selectTheme(currentSelection);
}
