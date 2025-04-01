# Project Template

This template provides the structure for creating new project pages for your portfolio. It's designed to be AI-friendly - you can provide this template along with your project details to an AI assistant to generate a complete project page.

## Basic Information

```
Title: [Project Title]
Short Description: [1-2 sentence summary, appears in project cards and headers]
Categories: [Space-separated list of categories, choose from: parametric, robotic, web, sustainable, furniture, etc.]
Featured Image: [Image path - this will be the main header image, 1200x800px recommended]
```

## HTML Structure

The HTML page should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Project Title] - Louis Sabri</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto:wght@400;700&family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body data-categories="[categories from Basic Information section]">
    <header>
        <!-- Header content will be added by components.js -->
    </header>

    <div class="project-header">
        <img class="project-header-img" src="../img/[featured-image-filename]" alt="[Project Title]">
        <div class="project-header-content">
            <h1>[Project Title]</h1>
            <p>[Short Description]</p>
        </div>
    </div>

    <section class="project-details">
        <div class="container">
            <!-- Content sections go here -->
            
            <div class="text-center mt-5">
                <a href="#" class="btn">[Primary Button Text]</a>
                <a href="#" class="btn" style="margin-left: 10px;">[Secondary Button Text]</a>
            </div>
        </div>
    </section>

    <footer>
        <!-- Footer content will be added by components.js -->
    </footer>

    <script src="../js/components.js"></script>
    <script src="../js/main.js"></script>
</body>
</html>
```

## Content Sections

Replace the `<!-- Content sections go here -->` comment with sections from below as needed for your project. Each section has specific content requirements.

### Project Overview (Required)

```html
<h2>Project Overview</h2>
<p>
    [Provide a 2-3 paragraph overview of the project. Include:
    - The problem or opportunity addressed
    - Your approach to solving it
    - The main technologies/methodologies used
    - The key outcome or innovation]
</p>
```

### Technologies Used (Recommended)

```html
<h3 class="mt-4">Technologies Used</h3>
<ul>
    <li>[Technology/Tool 1 with brief description if needed]</li>
    <li>[Technology/Tool 2 with brief description if needed]</li>
    <li>[Technology/Tool 3 with brief description if needed]</li>
    <li>[Add as many as needed]</li>
</ul>
```

### Design Process / Research & Development (Recommended)

```html
<h3 class="mt-4">[Design Process/Research & Development]</h3>
<p>
    [Describe the process you followed to create this project. Include:
    - Initial research or inspiration
    - Methodologies used
    - Iterations and developments
    - Key design decisions]
</p>
<p>
    [Additional paragraph if needed]
</p>
```

### Fabrication / Implementation (For physical or development projects)

```html
<h3 class="mt-4">[Fabrication/Implementation]</h3>
<p>
    [Detail how the project was actually built/implemented. Include:
    - Specific techniques or tools used
    - Materials and their properties
    - Challenges and solutions
    - Timeline or key stages]
</p>
<p>
    [Additional paragraph if needed]
</p>
```

### Project Gallery (Required)

```html
<div class="project-gallery mt-5">
    <div class="gallery-item">
        <img src="../img/[image-filename-1]" alt="[Project Title] - [Brief description of image 1]">
    </div>
    <div class="gallery-item">
        <img src="../img/[image-filename-2]" alt="[Project Title] - [Brief description of image 2]">
    </div>
    <div class="gallery-item">
        <img src="../img/[image-filename-3]" alt="[Project Title] - [Brief description of image 3]">
    </div>
    <!-- Add more gallery items as needed -->
</div>
```

> **Image Requirements:**
> - Gallery images should be 800x600px or 4:3 ratio
> - Ensure images are optimized for web (compressed, <300KB)
> - Include at least 3 images showing different aspects of the project
> - Header image should be 1200x800px (feature image)

### Results & Impact / Outcomes (Recommended)

```html
<h3 class="mt-4">[Results & Impact/Outcomes]</h3>
<p>
    [Describe the results of the project. Include:
    - How the project met its objectives
    - Any metrics or feedback received
    - Impact on users/community/industry
    - What you learned from the project]
</p>
<p>
    [Additional paragraph if needed]
</p>
```

### Future Developments / Next Steps (Optional)

```html
<h3 class="mt-4">[Future Developments/Next Steps]</h3>
<p>
    [Describe how this project might evolve. Include:
    - Potential improvements or features
    - Related projects or research
    - How you might approach it differently in the future]
</p>
```

### Call to Action Buttons (Required)

```html
<div class="text-center mt-5">
    <a href="[primary link]" class="btn">[Primary Button Text - e.g., View Demo/Live Project]</a>
    <a href="[secondary link]" class="btn" style="margin-left: 10px;">[Secondary Button Text - e.g., View Code/Process]</a>
</div>
```

## Using This Template with AI

When asking an AI to generate a project page:

1. Provide this template along with your specific project details
2. Specify which sections you want to include
3. Provide details for each required field in brackets [like this]
4. Be specific about technologies, processes, and outcomes
5. Describe the images you plan to use, even if you don't have them yet
6. Mention the categories you want to use for filtering

Example prompt:

"Using this template, create a project page for my 'Interactive Light Installation' project. It's a parametric light sculpture that responds to movement. Include the Overview, Technologies, Design Process, Fabrication, Gallery, and Results sections. For technologies, include Arduino, custom PCB design, and parametric modeling. I have photos showing the installation, close-up details, and the design process."

## Adding to Your Portfolio

1. Save the generated HTML as a new file in the `projects/` directory
2. Add images to the `img/` directory
3. Add a new project card to `index.html` with the appropriate categories
4. Update the link in the project card to point to your new project page 