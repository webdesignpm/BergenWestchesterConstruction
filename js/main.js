/*===== MOBILE NAVIGATION =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu mobile
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL HEADER =====*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*===== HERO VIDEO CONTROLS =====*/
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video__video');
    const playPauseBtn = document.getElementById('videoPlayPause');
    const muteBtn = document.getElementById('videoMute');
    
    if (video && playPauseBtn && muteBtn) {
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // Mute/Unmute functionality
        muteBtn.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
        
        // Auto-pause video when out of view (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (video.paused) {
                        video.play();
                        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
        
        // Handle video load error - show fallback
        video.addEventListener('error', function() {
            const fallback = document.querySelector('.hero-video__fallback');
            if (fallback) {
                fallback.style.display = 'block';
                video.style.display = 'none';
                // Hide video controls if video fails to load
                document.querySelector('.hero-video__controls').style.display = 'none';
            }
        });
        
        // Smooth scroll for scroll indicator
        const scrollIndicator = document.querySelector('.hero-video__scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
});;

/*===== ACTIVE LINK HIGHLIGHTING =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SMOOTH SCROLLING =====*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: false
});

// Hero animations
sr.reveal('.hero__badges', { delay: 200 });
sr.reveal('.hero__title', { delay: 400 });
sr.reveal('.hero__subtitle', { delay: 600 });
sr.reveal('.hero__cta', { delay: 800 });
sr.reveal('.hero__trust', { delay: 1000 });
sr.reveal('.hero__image', { origin: 'right', delay: 600 });

// About animations
sr.reveal('.about__content', { origin: 'left' });
sr.reveal('.about__image', { origin: 'right' });

// Section headers
sr.reveal('.section__header', { delay: 200 });

/*===== CONTACT FORM HANDLING =====*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show success message (in a real implementation, you'd send this to a server)
        showNotification('Thank you! Your message has been sent. We\'ll contact you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

/*===== NOTIFICATION SYSTEM =====*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/*===== LAZY LOADING IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*===== PERFORMANCE OPTIMIZATION =====*/
// Debounce function for scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
const optimizedScrollHeader = debounce(scrollHeader, 10);
const optimizedScrollActive = debounce(scrollActive, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);
window.addEventListener('scroll', optimizedScrollHeader);
window.addEventListener('scroll', optimizedScrollActive);

/*===== ACCESSIBILITY ENHANCEMENTS =====*/
// Keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        navMenu.classList.remove('show-menu');
    }
});

// Focus management for mobile menu
navToggle?.addEventListener('click', () => {
    setTimeout(() => {
        const firstLink = navMenu.querySelector('.nav__link');
        firstLink?.focus();
    }, 100);
});

/*===== LOADING ANIMATION =====*/
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

/*===== TESTIMONIALS CAROUSEL =====*/
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-nav.prev');
const nextBtn = document.querySelector('.testimonial-nav.next');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Activate current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Event listeners for testimonial navigation
if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials every 5 seconds
if (testimonials.length > 1) {
    setInterval(nextTestimonial, 5000);
}

/*===== PORTFOLIO FILTER (for future portfolio page) =====*/
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    });
});

/*===== BEFORE/AFTER TOGGLE =====*/
const beforeAfterToggles = document.querySelectorAll('.before-after-toggle');

beforeAfterToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
        const portfolioItem = this.closest('.portfolio-item');
        const beforeImg = portfolioItem.querySelector('.portfolio-img.before');
        const afterImg = portfolioItem.querySelector('.portfolio-img.after');
        
        if (this.checked) {
            beforeImg.style.opacity = '0';
            afterImg.style.opacity = '1';
        } else {
            beforeImg.style.opacity = '1';
            afterImg.style.opacity = '0';
        }
    });
});

/*===== SCROLL ANIMATIONS =====*/
if (typeof ScrollReveal !== 'undefined') {
    // Services animations
    sr.reveal('.service-card', { 
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        delay: 200,
        interval: 100
    });
    
    // Process animations
    sr.reveal('.process-step', {
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        delay: 200,
        interval: 200
    });
    
    // Testimonials animations
    sr.reveal('.testimonials__container', {
        origin: 'bottom',
        distance: '30px',
        duration: 1000
    });
    
    // Contact animations
    sr.reveal('.contact__info', { origin: 'left' });
    sr.reveal('.contact__form', { origin: 'right' });
    
    // Footer animation
    sr.reveal('.footer__content', {
        origin: 'bottom',
        distance: '30px',
        duration: 1000
    });
}

/*===== FORM VALIDATION ENHANCEMENTS =====*/
const formInputs = document.querySelectorAll('.form__input, .form__textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styles
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = errorMessage;
        field.parentNode.appendChild(errorElement);
    }
    
    return isValid;
}

/*===== ENHANCED CONTACT FORM =====*/
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showNotification('Please correct the errors in the form.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent. We\'ll contact you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/*===== PHONE NUMBER FORMATTING =====*/
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            if (value.length <= 3) {
                formattedValue = `(${value}`;
            } else if (value.length <= 6) {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        
        e.target.value = formattedValue;
    });
}

console.log('Bergen Westchester Construction website loaded successfully!');
