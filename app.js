// Global variables
let currentTheme = 'dark';
let typewriterIndex = 0;
let typewriterText = '';
let isDeleting = false;
let typewriterTimeout;

// Role texts for typewriter effect
const roles = [
    'AI/ML Engineer',
    'Backend Developer',
    'Computer Vision Specialist',
    'Full-Stack Developer'
];

// Project data with images
const projectData = [
    {
        title: 'Document Summarization & Video Generation API',
        description: 'Built a production-grade REST API for intelligent multi-format document summarization with automated video generation and enterprise-level controls. Features multi-provider LLM pipeline using Groq LLaMA 3.1, Ollama, and Google Gemini with ~95% confidence and automated video generation using Manim animations.',
        fullDescription: 'A comprehensive production-ready AI system that transforms documents into intelligent summaries and automated video content. The system features a multi-provider LLM pipeline using Groq LLaMA 3.1, Ollama, and Google Gemini with intelligent fallback mechanisms achieving ~95% confidence. Automated video generation is powered by Manim animations with Edge TTS and ElevenLabs narration. The FastAPI + PostgreSQL backend includes async workers, API key authentication, rate limiting (120 req/min), and secure video downloads. The entire system is Dockerized with comprehensive logging, pytest-based async testing, and resource cleanup policies for enterprise deployment.',
        techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Groq API', 'Google Gemini', 'Manim', 'Docker', 'LLM Integration', 'Async Processing'],
        status: 'Production-ready',
        github: 'https://github.com/Archit1030/document-summarization-api',
        image: 'doc-api.jpg'
    },
    {
        title: 'Interview Mirror — AI-Powered Interview Coaching Platform',
        description: 'Real-time AI interview coaching system using MediaPipe Holistic to track 543 body landmarks for posture, stress, gesture, and gaze-based integrity analysis. Achieved ~15 FPS processing with <100ms latency and integrated Google Gemini for NLP-driven feedback.',
        fullDescription: 'Interview Mirror is a cutting-edge AI-powered interview coaching platform that provides real-time behavioral analysis and feedback. The system uses MediaPipe Holistic to track 543 body landmarks, enabling comprehensive analysis of posture, stress levels, gestures, and gaze-based integrity. Four specialized behavioral analyzers work with signal smoothing (One Euro Filter) to achieve ~15 FPS processing with <100ms latency. The platform integrates Google Gemini for NLP-driven feedback, fusing vision metrics with text signals into a sophisticated scoring engine. Built as a full-stack application with FastAPI backend featuring async WebSocket streams, React + TypeScript frontend, intelligent caching, and robust error handling. Achieved production-level performance with ≥95% pose detection accuracy and ≥90% gesture recognition while reducing API quota usage by 40% through intelligent caching.',
        techStack: ['Python', 'MediaPipe Holistic', 'OpenCV', 'FastAPI', 'WebSockets', 'React', 'TypeScript', 'TailwindCSS', 'Google Gemini', 'Computer Vision'],
        status: 'Completed',
        github: null,
        image: 'Interview_mirror.mp4'
    },
    {
        title: 'FloatChat AI — Oceanographic Data Intelligence Platform',
        description: 'Built a platform processing 122,000+ ARGO measurements for interactive visualizations and NLP-based scientific queries. Features FastAPI + PostgreSQL backend with normalized NetCDF ingestion and optimized time-series queries, deployed on Railway and Streamlit Cloud.',
        fullDescription: 'FloatChat AI is an advanced oceanographic data intelligence platform that processes over 122,000 ARGO measurements to provide interactive visualizations and NLP-based scientific queries. The system features a robust FastAPI + PostgreSQL backend with normalized NetCDF data ingestion and optimized time-series queries for efficient data retrieval. The platform includes a comprehensive Streamlit dashboard with Plotly visualizations for data exploration and analysis. The system is professionally deployed using Railway for the backend services and Streamlit Cloud for the frontend interface, ensuring reliable access and scalability for scientific research applications.',
        techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Pandas', 'Streamlit', 'Plotly', 'Hugging Face', 'NetCDF', 'Data Science'],
        status: 'Completed',
        github: 'https://github.com/Archit1030/FloatChat-AI',
        liveDemo: 'https://flowchat-ai.streamlit.app',
        image: 'Float_chat.png'
    },
    {
        title: 'Universal Home Organization AI',
        description: 'Developed a real-time home organization system using YOLOv8 and OpenCV for object detection and classification. Features Flask REST API with React frontend for live visualization and spatial categorization.',
        fullDescription: 'Universal Home Organization AI is a sophisticated computer vision system designed for real-time home organization and object management. The system leverages YOLOv8 for accurate object detection and classification, combined with OpenCV for advanced image processing capabilities. The architecture includes a Flask REST API backend that handles real-time video processing and object recognition, paired with a responsive React frontend that provides live visualization and spatial categorization of detected objects. The system enables users to efficiently organize and track household items through intelligent computer vision analysis.',
        techStack: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'React', 'Computer Vision', 'Object Detection'],
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
            { name: 'SQL', level: 'Advanced' },
            { name: 'C++', level: 'Intermediate' },
            { name: 'JavaScript', level: 'Intermediate' }
        ]
    },
    'AI/ML Technologies': {
        icon: 'fas fa-brain',
        background: 'var(--color-bg-2)',
        skills: ['PyTorch', 'Hugging Face', 'OpenCV', 'YOLOv8', 'DeepFace', 'NumPy', 'Pandas', 'Statistics', 'MediaPipe']
    },
    'Backend & Web Development': {
        icon: 'fas fa-server',
        background: 'var(--color-bg-3)',
        skills: ['FastAPI', 'REST APIs', 'WebSockets', 'React', 'TailwindCSS', 'TypeScript', 'Docker']
    },
    'Databases & Tools': {
        icon: 'fas fa-database',
        background: 'var(--color-bg-4)',
        skills: ['PostgreSQL', 'Oracle SQL', 'Database Design', 'Git/GitHub', 'DSA', 'OOP']
    }
};

// Certifications data
const certificationsData = [
    {
        name: 'Database Design',
        issuer: 'Oracle Academy',
        date: 'November 2024',
        icon: 'fas fa-database'
    },
    {
        name: 'Database Programming with SQL',
        issuer: 'Oracle Academy',
        date: 'November 2024',
        icon: 'fas fa-code'
    },
    {
        name: 'Data Structures and Algorithms',
        issuer: 'CodeChef',
        date: 'November 2024',
        icon: 'fas fa-sitemap'
    },
    {
        name: 'Python Essentials 1 & 2',
        issuer: 'Cisco Academy',
        date: 'October 2024',
        icon: 'fab fa-python'
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

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});


// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleNavMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            toggleNavMenu();
        }
    }
});

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

    const linksHtml = [];
    if (project.liveDemo) {
        linksHtml.push(`
            <a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
            </a>
        `);
    }
    if (project.github) {
        linksHtml.push(`
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fab fa-github"></i>
                View on GitHub
            </a>
        `);
    }

    // Check if the media is a video or image
    const isVideo = project.image.endsWith('.mp4');
    const mediaHtml = isVideo 
        ? `<video src="${project.image}" controls style="width: 100%; border-radius: 15px; margin-bottom: 2rem;">Your browser does not support the video tag.</video>`
        : `<img src="${project.image}" alt="${project.title}" style="width: 100%; border-radius: 15px; margin-bottom: 2rem;">`;

    modalBody.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-image">
                ${mediaHtml}
            </div>
            <div class="project-modal-header">
                <h2 style="color: var(--color-text); margin-bottom: 1rem; font-size: 1.8rem;">${project.title}</h2>
                <span class="project-status ${project.status.toLowerCase().replace(/[^a-z]/g, '')}" style="margin-bottom: 2rem; display: inline-block;">${project.status}</span>
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
            ${linksHtml.length > 0 ? `
                <div class="project-modal-links" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    ${linksHtml.join('')}
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