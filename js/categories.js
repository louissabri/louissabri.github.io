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
    }
};

// Project-specific category assignments
const PROJECT_CATEGORIES = {
    '3d-printed-table': ['parametric', 'furniture', 'robotic', 'fabrication'],
    'robotic-rammed-earth': ['robotic', 'sustainable', 'fabrication'],
    'grasshopper-web-app': ['web', 'parametric']
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
        } else {
            console.warn(`No categories found for project: ${projectId}`);
        }
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCategories();
}); 