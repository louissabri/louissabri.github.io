/**
 * Central configuration for project categories
 * 
 * This file contains the definitions and display names for all project categories.
 * Change categories here to update them throughout the website.
 */

// Central configuration for categories
const CATEGORIES = {
    'all': { 
        displayName: 'All', 
        description: 'All projects'
    },
    'parametric': { 
        displayName: 'Parametric Design', 
        description: 'Projects featuring parametric and computational design techniques'
    },
    'furniture': { 
        displayName: 'Furniture', 
        description: 'Furniture design projects'
    },
    'robotic': { 
        displayName: 'Robotic Fabrication', 
        description: 'Projects utilizing robotic fabrication techniques'
    },
    'fabrication': { 
        displayName: 'Digital Fabrication', 
        description: 'Projects showcasing digital fabrication methods'
    },
    'sustainable': { 
        displayName: 'Sustainable Design', 
        description: 'Projects with a focus on sustainability and environmental considerations'
    },
    'web': { 
        displayName: 'Web Development', 
        description: 'Web development and interactive online projects'
    },
    'ai': {
        displayName: 'Artificial Intelligence',
        description: 'Projects leveraging AI and machine learning technologies'
    },
    'data': {
        displayName: 'Data Science',
        description: 'Projects involving data analysis and visualization'
    }
};

// Project-specific category assignments
const PROJECT_CATEGORIES = {
    '3d-printed-table': ['parametric', 'furniture', 'robotic', 'fabrication'],
    'robotic-rammed-earth': ['robotic', 'sustainable', 'fabrication'],
    'grasshopper-web-app': ['web', 'parametric'],
    'citypulse': ['web', 'ai', 'data']
};

// Project information for related projects section
const PROJECT_INFO = {
    '3d-printed-table': {
        title: '3D Printed Table',
        description: 'A parametrically designed table created using growth algorithms and KUKA robotic 3D printing.',
        image: '../img/table-1.png',
        url: '../projects/3d-printed-table.html'
    },
    'robotic-rammed-earth': {
        title: 'Robotic Rammed Earth',
        description: '3D printed formworks for a rammed earth structure.',
        image: '../img/rammed-earth-1.png',
        url: '../projects/robotic-rammed-earth.html'
    },
    'grasshopper-web-app': {
        title: 'Grasshopper Web App',
        description: 'A node.js web app to interact with grasshopper definitions via the browser.',
        image: '../img/website-1.png',
        url: '../construction.html'
    },
    'citypulse': {
        title: 'CityPulse',
        description: 'AI-driven urban exploration through natural language conversation.',
        image: '../img/citypulse-1.png',
        url: '../projects/citypulse.html'
    }
};

// Function to initialize categories on project pages
function initializeCategories() {
    // Check if we're on a project page (has data-project-id)
    const body = document.body;
    const projectId = body.getAttribute('data-project-id');
    
    if (projectId) {
        // Get categories for this project
        const categories = PROJECT_CATEGORIES[projectId];
        
        if (categories && categories.length > 0) {
            // Set the data-categories attribute
            body.setAttribute('data-categories', categories.join(' '));
            console.log(`Initialized categories for project: ${projectId}`);
            
            // Render category hashtags
            renderCategoryHashtags(projectId);
            
            // Render related projects
            renderRelatedProjects(projectId);
        } else {
            console.warn(`No categories found for project: ${projectId}`);
        }
    }
}

// Function to render category hashtags at the top of project pages
function renderCategoryHashtags(projectId) {
    const categories = PROJECT_CATEGORIES[projectId];
    if (!categories || categories.length === 0) return;
    
    // Create container for hashtags
    const hashtagsContainer = document.createElement('div');
    hashtagsContainer.className = 'project-categories';
    
    // Add each category as a hashtag
    categories.forEach(category => {
        if (CATEGORIES[category]) {
            const hashtag = document.createElement('span');
            hashtag.className = 'category-hashtag';
            hashtag.textContent = '#' + CATEGORIES[category].displayName.toLowerCase().replace(/\s+/g, '');
            hashtagsContainer.appendChild(hashtag);
        }
    });
    
    // Insert after project header
    const projectHeader = document.querySelector('.project-header');
    if (projectHeader) {
        projectHeader.parentNode.insertBefore(hashtagsContainer, projectHeader.nextSibling);
    }
}

// Function to render related projects section
function renderRelatedProjects(currentProjectId) {
    const categories = PROJECT_CATEGORIES[currentProjectId];
    if (!categories || categories.length === 0) return;
    
    // Find related projects based on shared categories
    const relatedProjectIds = new Set();
    
    // For each project in PROJECT_CATEGORIES
    for (const projectId in PROJECT_CATEGORIES) {
        // Skip current project
        if (projectId === currentProjectId) continue;
        
        // Check if project shares any categories with current project
        const projectCategories = PROJECT_CATEGORIES[projectId];
        const hasCommonCategory = projectCategories.some(category => categories.includes(category));
        
        if (hasCommonCategory) {
            relatedProjectIds.add(projectId);
        }
    }
    
    // If no related projects found, return
    if (relatedProjectIds.size === 0) return;
    
    // Create related projects section
    const relatedSection = document.createElement('section');
    relatedSection.className = 'related-projects';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Related Projects';
    container.appendChild(heading);
    
    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid';
    
    // Add each related project
    relatedProjectIds.forEach(projectId => {
        const projectInfo = PROJECT_INFO[projectId];
        if (!projectInfo) return;
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-on-scroll';
        projectCard.setAttribute('data-project-id', projectId);
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'project-img';
        
        const image = document.createElement('img');
        image.src = projectInfo.image;
        image.alt = projectInfo.title;
        imageContainer.appendChild(image);
        
        const contentContainer = document.createElement('div');
        contentContainer.className = 'project-content';
        
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = projectInfo.title;
        
        const description = document.createElement('p');
        description.className = 'project-desc';
        description.textContent = projectInfo.description;
        
        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = projectInfo.url;
        link.textContent = 'View Project';
        
        contentContainer.appendChild(title);
        contentContainer.appendChild(description);
        contentContainer.appendChild(link);
        
        projectCard.appendChild(imageContainer);
        projectCard.appendChild(contentContainer);
        
        projectsGrid.appendChild(projectCard);
    });
    
    container.appendChild(projectsGrid);
    relatedSection.appendChild(container);
    
    // Insert before footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.parentNode.insertBefore(relatedSection, footer);
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCategories();
}); 