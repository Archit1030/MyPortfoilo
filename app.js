// Global variables
let currentTheme = 'dark';
let typewriterIndex = 0;
let typewriterText = '';
let isDeleting = false;
let typewriterTimeout;

// Role texts for typewriter effect
const roles = [
    'AI/ML Engineer',
    'Full-Stack Developer',
    'Computer Vision Specialist',
    'Data Science Enthusiast'
];

// Project data with images
const projectData = [
    {
        title: 'SmartHairAI – AI-Based Facial Similarity & Hairstyle Recommendation System',
        description: 'Developed facial recognition system processing 13,000+ celebrity images using OpenCV and face_recognition library to extract 128-dimensional encodings. Built full-stack solution with Flask backend and responsive frontend, implementing pickle serialization for 90% faster load times and distance-based similarity matching for salon hairstyle recommendations.',
        fullDescription: 'SmartHairAI is an advanced AI-powered system that revolutionizes the way people choose hairstyles. The system processes over 13,000 celebrity images to build a comprehensive database of facial features and corresponding hairstyles. Using computer vision techniques with OpenCV and the face_recognition library, it extracts 128-dimensional facial encodings that capture unique facial characteristics. The application features a Flask backend with optimized pickle serialization for 90% faster load times and implements sophisticated distance-based similarity matching algorithms to recommend hairstyles that complement individual facial features. The system includes real-time facial analysis, celebrity look-alike matching, and personalized hairstyle recommendations based on facial geometry and structure.',
        techStack: ['Python', 'Flask', 'OpenCV', 'face_recognition', 'HTML', 'CSS', 'JavaScript', 'Machine Learning', 'Computer Vision', 'Pickle Serialization'],
        status: 'Ongoing',
        github: null,
        image: 'SHAI.jpg'
    },
    {
        title: 'Universal Home AI – Real-Time Smart Home Security Dashboard',
        description: 'Built AI-powered security system with YOLOv8 object detection and real-time video streaming via FastAPI backend. Developed responsive React dashboard with WebSocket integration for instant alerts and live camera feed analysis, optimized for low-latency performance across multiple environments.',
        fullDescription: 'Universal Home AI is a comprehensive smart home security solution that leverages cutting-edge AI technology for real-time threat detection and monitoring. The system utilizes YOLOv8, one of the most advanced object detection models, to identify and classify various objects, people, and potential security threats in real-time video feeds. The FastAPI backend ensures high-performance processing and real-time video streaming capabilities, while the React dashboard provides an intuitive and responsive user interface. WebSocket integration enables instant push notifications and real-time updates, ensuring homeowners are immediately alerted to any security events. The system is optimized for low-latency performance and can handle multiple camera feeds simultaneously, making it suitable for comprehensive home security monitoring.',
        techStack: ['Python', 'FastAPI', 'PyTorch', 'YOLOv8', 'OpenCV', 'React', 'TailwindCSS', 'WebSockets', 'Real-time Processing', 'Computer Vision'],
        status: 'Completed',
        github: 'https://github.com/Archit1030/Universal-Home-Organization-AI',
        image: 'UHAI.jpg'
    }
];

// Skills data
const skillsData = {
    'Programming Languages': {
        icon: 'fas fa-code',
        background: 'var(--color-bg-1)',
        skills: [
            { name: 'Python', level: 'Advanced' },
            { name: 'C++', level: 'Intermediate' },
            { name: 'SQL', level: 'Intermediate' },
            { name: 'JavaScript', level: 'Intermediate' }
        ]
    },
    'AI/ML Technologies': {
        icon: 'fas fa-brain',
        background: 'var(--color-bg-2)',
        skills: ['OpenCV', 'PyTorch', 'YOLOv8', 'DeepFace', 'Face Recognition', 'NumPy', 'Pandas', 'Statistics']
    },
    'Web Development': {
        icon: 'fas fa-globe',
        background: 'var(--color-bg-3)',
        skills: ['FastAPI', 'React', 'TailwindCSS', 'WebSockets', 'REST APIs']
    },
    'Tools & Databases': {
        icon: 'fas fa-database',
        background: 'var(--color-bg-4)',
        skills: ['Oracle', 'SQL', 'Database Design', 'Git/GitHub', 'DSA', 'OOP']
    }
};

// Certifications data
const certificationsData = [
    {
        name: 'Database Design',
        issuer: 'Oracle Academy',
        date: '14th November, 2024',
        icon: 'fas fa-database'
    },
    {
        name: 'Database Foundations',
        issuer: 'Oracle Academy',
        date: '16th November, 2024',
        icon: 'fas fa-server'
    },
    {
        name: 'Database Programming with SQL',
        issuer: 'Oracle Academy',
        date: '20th November, 2024',
        icon: 'fas fa-code'
    },
    {
        name: 'Python Essentials 1&2',
        issuer: 'Cisco Academy',
        date: '14th October, 2024',
        icon: 'fab fa-python'
    },
    {
        name: 'Data Structures and Algorithms',
        issuer: 'Codechef',
        date: '19th November, 2024',
        icon: 'fas fa-sitemap'
    }
];

// DOM Elements
let navbar, navToggle, navMenu, themeToggle, loadingScreen;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    setupTheme();
    setupScrollEffects();
    renderSkills();
    renderCertifications();
    setupProjectModals();
    startTypewriter();
    hideLoadingScreen();
});

function initializeElements() {
    navbar = document.getElementById('navbar');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    themeToggle = document.getElementById('theme-toggle');
    loadingScreen = document.getElementById('loading-screen');
}

function setupEventListeners() {
    // Navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleNavMenu);
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleNavMenu();
                }
            }
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('project-modal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function toggleNavMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function setupTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function setupScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            } else {
                navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            }
        }
    });

    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .project-card, .skill-category, .cert-card').forEach(el => {
        observer.observe(el);
    });
}

function startTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    function type() {
        const currentRole = roles[typewriterIndex % roles.length];

        if (isDeleting) {
            typewriterText = currentRole.substring(0, typewriterText.length - 1);
        } else {
            typewriterText = currentRole.substring(0, typewriterText.length + 1);
        }

        element.textContent = typewriterText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && typewriterText === currentRole) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && typewriterText === '') {
            isDeleting = false;
            typewriterIndex++;
            typeSpeed = 500;
        }

        typewriterTimeout = setTimeout(type, typeSpeed);
    }

    type();
}

function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = '';

    Object.entries(skillsData).forEach(([category, data]) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-category';

        skillCard.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon" style="background: ${data.background}">
                    <i class="${data.icon}"></i>
                </div>
                <h3>${category}</h3>
            </div>
            <div class="skill-items">
                ${data.skills.map(skill => {
                    if (typeof skill === 'object') {
                        return `
                            <div class="skill-item">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level ${skill.level.toLowerCase()}">${skill.level}</span>
                            </div>
                        `;
                    } else {
                        return `<span class="skill-tag">${skill}</span>`;
                    }
                }).join('')}
            </div>
        `;

        skillsGrid.appendChild(skillCard);
    });
}

function renderCertifications() {
    const certificationsGrid = document.getElementById('certifications-grid');
    if (!certificationsGrid) return;

    certificationsGrid.innerHTML = '';

    certificationsData.forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card';

        certCard.innerHTML = `
            <div class="cert-header">
                <div class="cert-icon">
                    <i class="${cert.icon}"></i>
                </div>
                <div class="cert-info">
                    <h3>${cert.name}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                </div>
            </div>
            <p class="cert-date">Issued: ${cert.date}</p>
        `;

        certificationsGrid.appendChild(certCard);
    });
}

function setupProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectIndex = parseInt(this.getAttribute('data-project'));
            openProjectModal(projectIndex);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
}

function openProjectModal(projectIndex) {
    const project = projectData[projectIndex];
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody || !project) return;

    modalBody.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-image">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 15px; margin-bottom: 2rem;">
            </div>
            <div class="project-modal-header">
                <h2 style="color: var(--color-text); margin-bottom: 1rem; font-size: 1.8rem;">${project.title}</h2>
                <span class="project-status ${project.status.toLowerCase()}" style="margin-bottom: 2rem; display: inline-block;">${project.status}</span>
            </div>
            <div class="project-modal-description">
                <p style="color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 2rem; font-size: 1.1rem;">
                    ${project.fullDescription}
                </p>
            </div>
            <div class="project-modal-tech">
                <h3 style="color: var(--color-text); margin-bottom: 1rem;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            ${project.github ? `
                <div class="project-modal-links">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fab fa-github"></i>
                        View on GitHub
                    </a>
                </div>
            ` : ''}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function handleContactForm(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Create mailto link
    const mailtoLink = `mailto:archit.badoni1015@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Reset form
    e.target.reset();

    // Show success message
    alert('Thank you for your message! Your email client should open now.');
}

function hideLoadingScreen() {
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Utility functions
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

// Add some interactive effects
document.addEventListener('mousemove', debounce(function(e) {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && window.innerWidth > 1024) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        heroBackground.style.background = `
            radial-gradient(circle at ${x * 100}% ${y * 100}%, 
            var(--color-bg-1) 0%, 
            var(--color-bg-2) 50%, 
            var(--color-bg-3) 100%)
        `;
    }
}, 100));

// Cleanup function
window.addEventListener('beforeunload', function() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
});