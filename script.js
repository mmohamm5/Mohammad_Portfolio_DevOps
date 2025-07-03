// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeFormHandling();
    initializeSmoothScrolling();
    initializeScrollToTop();
    initializeProfilePhoto();
    initializeDownloadResume();
    initializeTypingEffect();
});

// Navigation Toggle Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // Add scroll animation class to elements
    const elementsToAnimate = document.querySelectorAll('.project-card, .certification-card, .achievement-card, .skill-category, .stat');
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#00ff88';
            notification.style.color = '#0a0a0a';
            break;
        case 'error':
            notification.style.backgroundColor = '#ff4757';
            break;
        default:
            notification.style.backgroundColor = '#00d4ff';
            notification.style.color = '#0a0a0a';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.transform = 'translateY(0)';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Profile Photo Functionality (disabled for static portfolio)
function initializeProfilePhoto() {
    const profilePhoto = document.getElementById('profile-photo');
    
    // Remove any click functionality - this is a static portfolio
    profilePhoto.style.cursor = 'default';
    profilePhoto.removeAttribute('title');
    
    // Apply the correct positioning class if not already set
    if (!profilePhoto.classList.contains('pos-upper')) {
        profilePhoto.classList.add('pos-upper');
    }
}

// Photo positioning is now handled by CSS classes (pos-upper, pos-top, etc.)

// Download Resume Functionality
function initializeDownloadResume() {
    const downloadButton = document.getElementById('download-resume');
    
    downloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a sample resume content (replace with actual resume file)
        const resumeContent = `
DevOps Engineer Resume

Name: [Your Name]
Email: your-email@example.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA

PROFESSIONAL SUMMARY
Experienced DevOps Engineer with 5+ years of expertise in cloud infrastructure, 
automation, and continuous integration/deployment. Proven track record of reducing 
deployment time by 75% and achieving 99.9% uptime across production services.

TECHNICAL SKILLS
• Cloud Platforms: AWS, Azure, Google Cloud, DigitalOcean
• Containerization: Docker, Kubernetes, OpenShift, Podman
• CI/CD Tools: Jenkins, GitLab CI, GitHub Actions, Azure DevOps
• Infrastructure as Code: Terraform, Ansible, CloudFormation, Helm
• Monitoring: Prometheus, Grafana, ELK Stack, Datadog
• Programming: Python, Bash, Go, JavaScript

PROFESSIONAL EXPERIENCE
Senior DevOps Engineer | Tech Company | 2021 - Present
• Implemented automated CI/CD pipelines reducing deployment time by 75%
• Managed multi-cloud Kubernetes clusters serving 1M+ users
• Achieved 99.9% uptime through proactive monitoring and incident response

DevOps Engineer | StartupXYZ | 2019 - 2021
• Built Infrastructure as Code framework reducing provisioning time by 60%
• Implemented comprehensive monitoring solution with Prometheus and Grafana
• Led cloud migration project resulting in 40% cost reduction

CERTIFICATIONS
• AWS Certified DevOps Engineer - Professional
• Azure DevOps Engineer Expert
• Certified Kubernetes Administrator (CKA)
• Docker Certified Associate (DCA)
• HashiCorp Terraform Associate
• Google Cloud Professional Cloud DevOps Engineer

EDUCATION
Bachelor of Science in Computer Science | University Name | 2018
        `;
        
        // Create and download the resume file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'DevOps_Engineer_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Resume downloaded successfully!', 'success');
    });
}

// Typing Effect for Hero Section
function initializeTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    
    // Clear text initially
    heroSubtitle.textContent = '';
    
    // Typing effect
    let i = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Scroll-related optimizations can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Social links functionality
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click tracking or analytics here if needed
            console.log('Social link clicked:', this.href);
        });
    });
}

// Initialize social links
document.addEventListener('DOMContentLoaded', initializeSocialLinks);

// Project links functionality
function initializeProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href === '#' || this.href.endsWith('#')) {
                e.preventDefault();
                showNotification('Project link will be available soon!', 'info');
            }
        });
    });
}

// Initialize project links
document.addEventListener('DOMContentLoaded', initializeProjectLinks);

// Certificate verification functionality
function initializeCertificateVerification() {
    const certVerifyLinks = document.querySelectorAll('.cert-verify');
    
    certVerifyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Certificate verification link will be available soon!', 'info');
        });
    });
}

// Initialize certificate verification
document.addEventListener('DOMContentLoaded', initializeCertificateVerification);

// Accessibility improvements
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Dark mode toggle (optional feature)
function initializeDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        border: 2px solid var(--border-color);
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Initialize dark mode toggle
document.addEventListener('DOMContentLoaded', initializeDarkModeToggle);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, eventData);
}

// Export functions for testing or external use
window.portfolioFunctions = {
    showNotification,
    isValidEmail,
    debounce,
    throttle,
    trackEvent
};
