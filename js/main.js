// Main.js - Handles animations and interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation on scroll
    initializeScrollAnimation();
    
    // Initialize navbar scroll effect
    initializeNavbarEffect();
    
    // Initialize skill bars animation
    initializeSkillBars();
    
    // Sync project categories if we're on the index page
    syncProjectCategories();
    
    // Initialize project filtering
    initializeProjectFilter();
    
    // Initialize email copy button
    initializeEmailCopy();
});

// Handle animations when elements come into view
function initializeScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Change navbar style on scroll
function initializeNavbarEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animate skill bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize the project filter system with dynamic buttons
function initializeProjectFilter() {
    const projectCards = document.querySelectorAll('.project-card');
    const filterContainer = document.getElementById('projects-filter');
    
    if (!filterContainer || projectCards.length === 0) return;
    
    // Clear existing filter buttons
    filterContainer.innerHTML = '';
    
    // Use the centralized CATEGORIES object to create filter buttons
    // Start with 'All' category
    createFilterButton('all', CATEGORIES['all'].displayName, true);
    
    // Create a Set to track which categories are actually in use
    const usedCategories = new Set();
    
    // Find all categories in use from project cards
    projectCards.forEach(card => {
        if (card.hasAttribute('data-category')) {
            const categoriesString = card.getAttribute('data-category');
            const categoryList = categoriesString.split(' ');
            
            categoryList.forEach(category => {
                if (category && category !== 'all') {
                    usedCategories.add(category);
                }
            });
        }
    });
    
    // Create buttons for each used category
    usedCategories.forEach(category => {
        if (CATEGORIES[category]) {
            createFilterButton(category, CATEGORIES[category].displayName, false);
        } else {
            // Fallback for any categories not in the central config
            const displayName = category
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            createFilterButton(category, displayName, false);
        }
    });
    
    // Add event listeners to the buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show all projects if filter is 'all'
            if (filter === 'all') {
                projectCards.forEach(card => {
                    showProjectCard(card);
                });
                return;
            }
            
            // Filter projects based on category
            projectCards.forEach(card => {
                const categoryList = card.getAttribute('data-category').split(' ');
                
                if (categoryList.includes(filter)) {
                    showProjectCard(card);
                } else {
                    hideProjectCard(card);
                }
            });
        });
    });

    // Helper function to create filter buttons
    function createFilterButton(category, displayName, isActive) {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        if (isActive) button.classList.add('active');
        button.setAttribute('data-filter', category);
        button.textContent = displayName;
        filterContainer.appendChild(button);
    }
    
    // Helper functions for showing/hiding project cards with animation
    function showProjectCard(card) {
        card.style.display = 'block';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    }
    
    function hideProjectCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }
}

// Create a simple lightbox for project images
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox when close button is clicked
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Create a function to create a typed text effect
function typeText(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Initialize typed text if the element exists
const typedElement = document.querySelector('.typed-text');
if (typedElement) {
    const text = typedElement.getAttribute('data-text');
    typeText(typedElement, text, 100);
}

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            contactForm.submit();
        }
    });
}

// Helper function to show error messages
function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    input.parentElement.appendChild(errorElement);
    input.classList.add('error');
}

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

// Email copy functionality
function initializeEmailCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    const tooltip = document.getElementById('copy-tooltip');
    
    if (copyBtn && tooltip) {
        copyBtn.addEventListener('click', async () => {
            const email = 'louis.sabri@gmail.com';
            
            try {
                // Use the modern Clipboard API
                await navigator.clipboard.writeText(email);
                
                // Show tooltip
                tooltip.classList.add('visible');
                
                // Hide tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.classList.remove('visible');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                
                // Fallback for older browsers
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // Show tooltip
                tooltip.classList.add('visible');
                
                // Hide tooltip after 2 seconds
                setTimeout(() => {
                    tooltip.classList.remove('visible');
                }, 2000);
            }
        });
    }
}

// Synchronize project categories from project pages to index page
function syncProjectCategories() {
    // Only run on index page
    if (!window.location.pathname.endsWith('index.html') && 
        !window.location.pathname.endsWith('/') && 
        !window.location.pathname.endsWith('/louissabri.github.io/')) {
        return;
    }
    
    // Get all project cards on the index page
    const projectCards = document.querySelectorAll('.project-card');
    
    // For each project card, fetch its linked project page and extract categories
    projectCards.forEach(card => {
        const projectLink = card.querySelector('.project-link');
        if (!projectLink) return;
        
        const projectPageUrl = projectLink.getAttribute('href');
        
        // Fetch the project page HTML
        fetch(projectPageUrl)
            .then(response => response.text())
            .then(html => {
                // Create a temporary element to parse the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Extract categories from the body tag
                const body = doc.querySelector('body');
                if (body && body.hasAttribute('data-categories')) {
                    const categories = body.getAttribute('data-categories');
                    
                    // Update the project card's categories
                    card.setAttribute('data-category', categories);
                    
                    // If all cards are processed, reinitialize the filter
                    const allCardsUpdated = document.querySelectorAll('.project-card[data-category]').length === projectCards.length;
                    if (allCardsUpdated) {
                        // Clear existing buttons and reinitialize
                        const filterContainer = document.getElementById('projects-filter');
                        if (filterContainer) {
                            filterContainer.innerHTML = '';
                            initializeProjectFilter();
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching project page:', error);
            });
    });
} 