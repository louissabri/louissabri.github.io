// Components.js - Handles reusable components across the site

class Component {
    constructor(selector) {
        this.container = document.querySelector(selector);
    }

    render(content) {
        if (this.container) {
            this.container.innerHTML = content;
            this.afterRender();
        }
    }

    afterRender() {
        // Hook for post-render actions
    }
}

class Navbar extends Component {
    constructor() {
        super('header');
    }

    render() {
        // Determine if we're in a project page (sub-directory)
        const isProjectPage = window.location.pathname.includes('/projects/');
        const rootPath = isProjectPage ? '../' : '';
        
        const content = `
            <div class="container navbar-container">
                <div class="logo">
                    <a href="${rootPath}index.html">Louis Sabri</a>
                </div>
                <nav>
                    <div class="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul class="nav-menu">
                        <li><a href="${rootPath}index.html"><i class="fa-solid fa-house"></i> Home</a></li>
                        <li><a href="${rootPath}index.html#projects"><i class="fa-solid fa-code"></i> Projects</a></li>
                        <li><a href="${rootPath}index.html#about"><i class="fa-solid fa-user"></i> About</a></li>
                        <li><a href="${rootPath}index.html#contact"><i class="fa-solid fa-envelope"></i> Contact</a></li>
                        <li><a href="https://www.linkedin.com/in/louissabri/" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></li>
                        <li><a href="https://github.com/louissabri" target="_blank"><i class="fa-brands fa-github"></i> Github</a></li>
                    </ul>
                </nav>
            </div>
        `;
        super.render(content);
    }

    afterRender() {
        // Add mobile navigation toggle functionality
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }
}

class Footer extends Component {
    constructor() {
        super('footer');
    }

    render() {
        const currentYear = new Date().getFullYear();
        // Determine if we're in a project page (sub-directory)
        const isProjectPage = window.location.pathname.includes('/projects/');
        const rootPath = isProjectPage ? '../' : '';
        
        const content = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Louis Sabri</h3>
                        <p>Computational design student blending creativity and technology.</p>
                        <div class="social-icons">
                            <a href="https://www.linkedin.com/in/louissabri/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://github.com/louissabri" target="_blank"><i class="fa-brands fa-github"></i></a>
                            <a href="mailto:louis.sabri@gmail.com"><i class="fa-solid fa-envelope"></i></a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul class="footer-links">
                            <li><a href="${rootPath}index.html"><i class="fa-solid fa-chevron-right"></i> Home</a></li>
                            <li><a href="${rootPath}index.html#projects"><i class="fa-solid fa-chevron-right"></i> Projects</a></li>
                            <li><a href="${rootPath}index.html#about"><i class="fa-solid fa-chevron-right"></i> About</a></li>
                            <li><a href="${rootPath}index.html#contact"><i class="fa-solid fa-chevron-right"></i> Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Louis Sabri. All rights reserved.</p>
                    <p>Built with <i class="fa-solid fa-code"></i> and <i class="fa-solid fa-heart"></i></p>
                </div>
            </div>
        `;
        super.render(content);
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navbar
    const navbar = new Navbar();
    navbar.render();
    
    // Initialize footer
    const footer = new Footer();
    footer.render();
    
    // Initialize animations
    initializeAnimations();
});

// Animation functions
function initializeAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Target elements to animate
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScroll.observe(element);
    });
}

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    }
}); 