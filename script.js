// Header Shadow on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    // Add shadow to header when scrolling
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('.header').offsetHeight;
        const totalOffset = headerHeight + 20; // 20px extra padding
        
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - totalOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// CTA Button Click Handlers
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        // Scroll to contact section or open modal
        const contactSection = document.querySelector('#section10');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const navHeight = document.getElementById('navigation').offsetHeight;
        const totalOffset = headerHeight + navHeight;
        
        if (contactSection) {
            const targetPosition = contactSection.offsetTop - totalOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate children with stagger effect (excluding testimonial cards)
            const children = entry.target.querySelectorAll('.feature-card, .timeline-item, .instructor-card, .project-card, .benefit-card, .faq-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('slide-up');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    .slide-up {
        animation: slideUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .content-section {
        opacity: 0;
    }
    
    .feature-card, .timeline-item, .instructor-card, 
    .project-card, .benefit-card, .faq-item {
        opacity: 0;
    }
    
    .testimonial-card {
        opacity: 1;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Update active navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.content-section, #hero');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const totalOffset = headerHeight + 20; // 20px extra padding
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - totalOffset - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Define section ranges for each navigation menu item
    const sectionRanges = {
        '#section1': ['hero', 'section1', 'section2', 'section2-1'], // 교육 소개
        '#section6': ['section6', 'section4'], // 수강생 후기
        '#section5': ['section5', 'section3'], // 커리큘럼
        '#section7': ['section7'], // 강사진
        '#section9': ['section8', 'section9', 'section10'] // 신청 정보 (비용, 신청정보, FAQ)
    };
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Check if current section is within the range of this navigation item
        if (sectionRanges[linkHref] && sectionRanges[linkHref].includes(current)) {
            link.classList.add('active');
        }
    });
});

// Countdown Timer Functionality
function initCountdown() {
    // Set target date: August 18, 2025 23:59:59 (based on MD file: 8월 18일(월) 자정까지)
    const targetDate = new Date('2025-08-18T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Update countdown display
            document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
            document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Countdown expired
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
            
            // Optionally disable the button or show "모집 마감" message
            const ctaButton = document.querySelector('.bottom-cta .cta-button');
            if (ctaButton) {
                ctaButton.textContent = '모집 마감';
                ctaButton.disabled = true;
                ctaButton.style.opacity = '0.5';
                ctaButton.style.cursor = 'not-allowed';
            }
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', initCountdown);

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const phrases = [
        '타이머 만들어 줘',
        '회사 소개 랜딩페이지 만들어 줘',
        '뱀파이어 서바이벌 게임 만들어 줘'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero lines with delay
    const animatedLines = document.querySelectorAll('.animated-line');
    
    animatedLines.forEach((line, index) => {
        const delay = line.getAttribute('data-delay') || index * 200;
        setTimeout(() => {
            line.classList.add('animated');
        }, parseInt(delay) + 500); // Add 500ms initial delay
    });
    
    // Add interactive effects to CTA button
    const ctaButton = document.querySelector('.hero-cta');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});


// Mobile menu toggle (if needed in future)
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-toggle';
mobileMenuButton.innerHTML = '☰';
mobileMenuButton.style.display = 'none';

// Add mobile menu functionality
if (window.innerWidth <= 768) {
    // Mobile menu logic can be added here
}

// Fix testimonial slider touch behavior on mobile only
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        // Only add event listeners for touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            // Mobile/Touch devices - handle touch events to prevent sticky hover
            testimonialSlider.addEventListener('touchstart', function(e) {
                this.style.animationPlayState = 'paused';
            }, { passive: true });
            
            testimonialSlider.addEventListener('touchend', function(e) {
                // Force resume animation after touch
                setTimeout(() => {
                    this.style.animationPlayState = 'running';
                }, 10);
            }, { passive: true });
            
            testimonialSlider.addEventListener('touchcancel', function(e) {
                this.style.animationPlayState = 'running';
            }, { passive: true });
        }
        // Desktop will rely entirely on CSS :hover pseudo-class
    }
});