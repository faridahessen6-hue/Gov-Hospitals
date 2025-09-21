// Base Template Module
// This module consolidates all the duplicate header/footer initialization code
// that appears in every HTML file across the application

/**
 * Initialize the enhanced base template components (header/footer)
 * This replaces ~50 lines of duplicate code in each HTML file
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.title - Header title (default: 'GovHealthcare')
 * @param {string} options.logo - Header logo icon (default: 'hospital')
 * @param {boolean} options.fixed - Whether header is fixed (default: true)
 * @param {boolean} options.showLanguageToggle - Show language toggle (default: true)
 * @param {Array} options.navItems - Custom navigation items
 * @param {boolean} options.loadHeaderCSS - Load enhanced header CSS (default: true)
 * @param {Function} options.onLanguageChange - Custom language change handler
 * @param {Function} options.onInitComplete - Callback after initialization
 */
export async function initBaseTemplate(options = {}) {
    // Enhanced default configuration
    const config = {
        title: 'GovHealthcare',
        logo: 'hospital',
        fixed: true,
        showThemeToggle: false,
        showLanguageToggle: true,
        loadHeaderCSS: true,
        navItems: [
        { text: 'Home', href: 'index.html', icon: 'house', active: isHome },
            { text: 'Hospitals', href: 'hospitals.html', icon: 'hospital' },
            { text: 'Book Appointment', href: 'booking.html', icon: 'calendar-check' },
            { text: 'Ask Question', href: 'ask.html', icon: 'question-circle' },
            { text: 'Contact', href: 'contact.html', icon: 'telephone' }
        ],
        onLanguageChange: defaultLanguageChangeHandler,
        onInitComplete: null,
        ...options
    };

    try {
        // Load enhanced header CSS if requested
        if (config.loadHeaderCSS) {
            loadHeaderCSS();
        }

        // Dynamic imports to avoid loading unused modules
        const { createHeader } = await import('../components/common/header.js');
        const { createFooter } = await import('../components/common/footer.js');

        // Initialize when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => initComponents(config, createHeader, createFooter));
        } else {
            // DOM already loaded
            initComponents(config, createHeader, createFooter);
        }

    } catch (error) {
        console.error('Error initializing base template:', error);
        showFallbackError(error);
    }
}

/**
 * Initialize header and footer components
 * @private
 */
function initComponents(config, createHeader, createFooter) {
    try {
        // Initialize header with enhanced configuration
        const headerContainer = document.getElementById('header');
        if (headerContainer) {
            createHeader(headerContainer, {
                title: config.title,
                logo: config.logo,
                fixed: config.fixed,
                showThemeToggle: false,
                showLanguageToggle: config.showLanguageToggle,
                navItems: config.navItems,
                onLanguageChange: config.onLanguageChange
            });
        }

        // Initialize footer
        const footerContainer = document.getElementById('footer');
        if (footerContainer) {
            createFooter(footerContainer);
        }

        // Call legacy initApp function if it exists
        if (typeof window.initApp === 'function') {
            window.initApp();
        }

        // Call completion callback if provided
        if (config.onInitComplete && typeof config.onInitComplete === 'function') {
            config.onInitComplete();
        }

        console.log('Base template initialized successfully');

    } catch (error) {
        console.error('Error initializing components:', error);
        showFallbackError(error);
    }
}


/**
 * Default language change handler
 * @private
 */
function defaultLanguageChangeHandler(lang) {
    try {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', lang);
        
        // Dispatch custom event for components that need to respond to language changes
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    } catch (error) {
        console.warn('Error handling language change:', error);
    }
}

/**
 * Show fallback error UI when initialization fails
 * @private
 */
function showFallbackError(error) {
    const app = document.getElementById('app') || document.body;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'container mt-5';
    errorDiv.innerHTML = `
        <div class="alert alert-warning text-center">
            <h4 class="alert-heading">
                <i class="bi bi-exclamation-triangle"></i>
                Loading Issue
            </h4>
            <p>Some page components may not load correctly. Please refresh the page.</p>
            <button class="btn btn-primary" onclick="location.reload()">
                <i class="bi bi-arrow-clockwise"></i> Refresh Page
            </button>
        </div>
    `;
    
    app.appendChild(errorDiv);
}

/**
 * Create standard import map configuration
 * This can be used to generate the import map script tag
 */
export function getStandardImportMap() {
    return {
        "imports": {
            "@/core/dom": "./core/dom.js",
            "@/ui/header": "./components/common/header.js",
            "@/ui/footer": "./components/common/footer.js",
            "@/ui/loading": "./components/ui/loading.js",
            "@/data/age-groups": "./data/age-groups.js",
            "@/data/hospitals": "./data/hospitals.js",
            "@/data/specialties": "./data/specialties.js",
            "@/data/booking-config": "./data/booking-config.js",
            "@/templates/base": "./templates/base-template.js"
        }
    };
}

/**
 * Generate the import map script tag HTML
 */
export function generateImportMapScript() {
    return `
    <!-- Import maps for module resolution -->
    <script type="importmap">
    ${JSON.stringify(getStandardImportMap(), null, 4)}
    </script>`;
}

/**
 * Simple initialization for pages that just need basic header/footer
 * This is the most common use case
 */
export function initSimplePage(title = 'GovHealthcare') {
    initBaseTemplate({ title });
}

/**
 * Initialize page with custom configuration
 * For pages that need specific settings
 */
export function initCustomPage(config) {
    initBaseTemplate(config);
}

// Export common configurations for different page types
/**
 * Load enhanced header CSS
 * @private
 */
function loadHeaderCSS() {
    // Check if header CSS is already loaded
    if (document.querySelector('link[href*="header.css"]')) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './assets/css/components/header.css';
    link.onload = () => {
        console.log('Enhanced header CSS loaded successfully');
    };
    link.onerror = () => {
        console.warn('Failed to load enhanced header CSS, falling back to default styles');
    };
    
    document.head.appendChild(link);
}

export const PAGE_CONFIGS = {
    home: {
        title: 'GovHealthcare',
        logo: 'hospital',
        fixed: true
    },
    
    hospital: {
        title: 'GovHealthcare', 
        logo: 'hospital',
        fixed: true
    },
    
    booking: {
        title: 'GovHealthcare',
        logo: 'calendar-check',
        fixed: true
    },
    
    auth: {
        title: 'GovHealthcare',
        logo: 'shield-check',
        fixed: false,
        showThemeToggle: false
    }
};

// Auto-initialize if loaded as a script (not module)
if (typeof window !== 'undefined' && !window.moduleMode) {
    // Simple auto-initialization for non-module usage
    initSimplePage();
}