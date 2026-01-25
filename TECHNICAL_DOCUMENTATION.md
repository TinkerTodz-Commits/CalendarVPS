# Technical Documentation: Vimala Public School Calendar (v1.0)

## 1. Project Overview
The **Vimala Public School Calendar** is a lightweight, responsive web application designed to simulate a physical vertical desk calendar. It features a custom "roll-up" page transition animation, full-screen immersive design, and zoom capabilities. The application is built using vanilla web technologies and is optimized for deployment on static hosting platforms like Cloudflare Pages.

## 2. Technology Stack
*   **HTML5**: Semantic structure for the application container.
*   **CSS3**:
    *   **Layout**: Flexbox and CSS Grid (via absolute stacking) for centering and responsiveness.
    *   **Animation**: Hardware-accelerated 3D transforms (`rotateX`, `translateY`, `perspective`) for the custom flip animation.
    *   **Styling**: Variables and responsive media queries for mobile compatibility.
*   **JavaScript (ES6+)**:
    *   **State Management**: Tracks current page index and zoom level.
    *   **DOM Manipulation**: Dynamic injection of calendar pages and event handling.
    *   **No Dependencies**: The project is entirely dependency-free (no external libraries like jQuery or React), ensuring maximum performance and zero build overhead.

## 3. Directory Structure
```
CalendarVPS/
│
├── css/
│   └── styles.css          # Main stylesheet covering layout, animations, and the "Powered by" branding
│
├── js/
│   └── flipbook.js         # Core logic for page injection, stacking, animation control, and zoom
│
├── textures/
│   ├── clean_bg.png        # Main background image (Gate of Wisdom)
│   └── tinkertodz.png      # "Powered by Tinkertodz" logo
│
├── calendar_pages/         # Calendar assets
│   ├── 01_jan_feb.png
│   ├── 02_mar_apr.png
│   ├── ...
│
├── index.html              # Entry point application shell
├── _headers                # Cloudflare Pages header configuration (Caching rules)
├── .gitignore              # Git ignore rules
└── TECHNICAL_DOCUMENTATION.md
```

## 4. Key Features & Implementation Details

### 4.1. Vertical Roll-Up Animation
The core feature is the custom page transition. Unlike standard book flips, this mimics tearing a page off a pad or flipping it over a top binding.
*   **Mechanism**: CSS Transform on `.calendar-page.flipped`.
*   **Physics**: 
    1.  `translateY(-150vh)`: Moves the page strictly upwards off-screen.
    2.  `rotateX(100deg)`: Rotates the page backward to simulate the arc of viewing.
    3.  `transform-origin: 50% -200px`: Sets the pivot point high above the screen to create a wide, realistic swinging arc.

### 4.2. Responsive Design
*   **Fit-to-Screen**: The calendar wrapper uses `100vw` / `100vh` to ensure it always fills the available viewport.
*   **Mobile Optimization**: 
    *   Calendar images scale to `98%` width on small screens.
    *   Title is hidden on mobile to maximize space.
    *   The "Powered by" logo relocates to the top-right on mobile to avoid overlapping bottom controls.

### 4.3. Zoom Functionality
*   **Logic**: A simple variable `zoomLevel` tracks the scale state (0.5x to 3.0x).
*   **Application**: The scale is applied to the `.calendar-stack` container using `transform: scale(N)`. This allows the user to inspect fine details on the calendar images without breaking the layout flow.

## 5. Deployment Guide (Cloudflare Pages)

### 5.1. Prerequisites
*   A Cloudflare account.
*   The project pushed to a Git repository (GitHub/GitLab).

### 5.2. Deployment Steps
1.  Log in to the Cloudflare Dashboard and navigate to **Workers & Pages** > **Pages**.
2.  Click **Connect to Git** and select this repository.
3.  **Build Configuration**:
    *   **Project Name**: `vimala-public-school-calendar` (or similar).
    *   **Production Branch**: `main`.
    *   **Framework Preset**: `None` (Static HTML).
    *   **Build Command**: Leave empty.
    *   **Output Directory**: Leave empty (defaults to root).
4.  Click **Save and Deploy**.

### 5.3. Caching
The project includes a `_headers` file to instruct Cloudflare to cache static assets, improving load performance for repeat visitors.

## 6. Maintenance & Updates
*   **Updating Calendar Pages**: Replace files in the `calendar_pages/` directory. Ensure they follow the naming convention or update the `images` array in `js/flipbook.js`.
*   **Changing Background**: Replace `textures/clean_bg.png` or update the URL in `css/styles.css`.
