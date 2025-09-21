# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Government Healthcare Portal** - a static, buildless web application for booking hospital appointments and accessing medical services in Kafr El-Sheikh, Egypt. The application serves both Arabic and English speakers and provides a comprehensive interface for hospital services.

### Key Features
- Hospital directory and speciality booking system
- Multi-language support (Arabic/English)
- Age-based booking flows (Adult, Teen, Middle-aged, Elderly)
- Medical chat/consultation interface
- Responsive Bootstrap-based UI with dark/light theme support

## Architecture & Structure

### Current State
The project is in **active refactoring** (see `REFACTORING_PLAN.md` and `refactor-plan-approved-draft.md`). It's transitioning from a mixed legacy/modern structure to a clean, organized architecture while maintaining buildless/static approach.

### Core Technologies
- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3
- **CSS Framework**: Bootstrap 5.3.0 with Bootstrap Icons
- **Module System**: Native ES6 imports with import maps
- **No Build Process**: Static files served directly (buildless approach)
- **Fonts**: Google Fonts (Roboto, Tajawal for Arabic)

### Directory Structure
```
/
├── src/                           # Modern organized modules
│   ├── bootstrap.js               # Main app router/initializer
│   ├── core/
│   │   ├── dom.js                 # DOM utilities and helpers
│   │   └── init.js                # App initialization utilities
│   ├── data/
│   │   └── age-groups.js          # Age group configurations
│   ├── ui/                        # Reusable UI components
│   │   ├── header.js              # Main header component
│   │   ├── footer.js              # Footer component
│   │   ├── header.css             # Header-specific styles
│   │   ├── theme.js               # Theme management
│   │   ├── loading.js             # Loading states
│   │   ├── typewriter.js          # Typewriter effect utility
│   │   └── chat-core.js           # Chat/consultation interface
│   └── pages/
│       ├── hospitals/
│       │   └── animation.js       # Hospital network circle animation
│       └── booking/
│           └── booking-core.js    # Unified booking logic (planned)
├── js/                            # Legacy compatibility wrappers
│   ├── header.js                  # Legacy wrapper for header
│   └── footer.js                  # Legacy wrapper for footer
├── [page].html                    # Individual page files
├── [page].js                      # Page-specific logic
└── generate_hospitals.bat         # Hospital page generator script
```

### Component Architecture

#### Header/Footer System
- **Modern**: `src/ui/header.js` and `src/ui/footer.js` (ES6 modules)
- **Legacy Wrappers**: `js/header.js` and `js/footer.js` (compatibility)
- **Auto-initialization**: Headers detect `data-header` attributes for configuration
- **Features**: Theme toggle, language switch, responsive navigation

#### Page Routing
- **Router**: `src/bootstrap.js` routes pages based on `data-page` attribute on `<body>`
- **Page Identification**: Each HTML file has `<body data-page="pagename">`
- **Dynamic Loading**: Route-specific modules loaded lazily

#### Theming & Language
- **Theme**: Dark/Light mode with localStorage persistence
- **Language**: Arabic/English with RTL/LTR direction handling
- **CSS Variables**: Consistent color scheme using CSS custom properties

## Common Development Commands

### Running the Application
```bash
# Serve locally (requires a local server)
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if available)
npx serve .

# Then visit: http://localhost:8000
```

### Testing Pages
```bash
# Test individual pages by navigating to:
# http://localhost:8000/home.html
# http://localhost:8000/hospitals.html
# http://localhost:8000/book.html
# etc.
```

### Batch Hospital Generation
```bash
# Windows - Generate hospital pages
./generate_hospitals.bat
```

## Development Patterns

### Adding New Pages
1. Create `[page].html` with proper `data-page` attribute on `<body>`
2. Include standard imports:
   ```html
   <script src="js/header.js"></script>
   <script src="js/footer.js"></script>
   <script type="module" src="src/bootstrap.js"></script>
   ```
3. Add route handler in `src/bootstrap.js` if needed
4. Create page-specific JS file for additional logic

### Component Creation
- Place reusable components in `src/ui/`
- Use ES6 module exports
- Follow existing DOM utility patterns from `src/core/dom.js`
- Include proper cleanup functions for event listeners

### Styling Guidelines
- Use Bootstrap classes primarily
- CSS custom properties (variables) for theming
- Component-specific styles in separate files when needed
- RTL support for Arabic content

### Import Patterns
```javascript
// Modern approach (preferred)
import { createHeader } from './src/ui/header.js';
import { $, createElement } from './src/core/dom.js';

// Import maps available for shorter paths
import { createHeader } from '@/ui/header';
```

## Specialized Functionality

### Hospital System
- **Animation**: Circle-based hospital network visualization in `src/pages/hospitals/animation.js`
- **Individual Hospitals**: Template-based pages with configuration objects
- **Specialties**: Each hospital can have multiple specialty pages

### Booking System
- **Age Groups**: Different booking flows for different age demographics
- **Unified Logic**: Being refactored to single booking core
- **Form Validation**: Bootstrap validation with custom patterns

### Chat/Consultation
- **Chat Interface**: `src/ui/chat-core.js` handles both ask and review chat
- **Language Support**: Bilingual chat responses
- **Suggestions**: Pre-defined quick response options

## File Relationships

### Critical Dependencies
- `src/bootstrap.js` → Main app entry point, depends on header/footer
- `src/ui/header.js` → Depends on `src/core/dom.js`
- Page JS files → May depend on `src/ui/*` components
- HTML files → Include legacy wrappers which load modern modules

### Data Flow
1. HTML pages load with `data-page` attribute
2. Legacy wrappers (`js/*.js`) load and initialize modern components
3. `src/bootstrap.js` reads `data-page` and routes accordingly  
4. Page-specific modules initialize as needed

## Important Notes

### Refactoring Status
- Project is actively being refactored (see planning documents)
- Avoid creating new legacy patterns
- Use modern ES6 module structure for new code
- Header/footer duplication being eliminated

### Browser Compatibility  
- Modern browsers with ES6 module support required
- Import maps used for cleaner imports
- No transpilation/bundling step

### Multi-language Considerations
- Arabic content uses RTL direction
- Text content often has both English and Arabic versions
- Theme and language preferences stored in localStorage

### Development Workflow
- Changes are immediate (no build step)
- Test in both Arabic and English modes
- Verify both light and dark themes
- Check responsive behavior on mobile devices

This codebase prioritizes maintainability and clean architecture while preserving the buildless approach for simplicity.