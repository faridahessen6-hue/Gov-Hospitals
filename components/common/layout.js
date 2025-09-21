// Layout Manager - Replaces EJS template functionality
// Provides dynamic content injection for the base template

import { createHeader } from './header.js';
import { createFooter } from './footer.js';

export class LayoutManager {
    constructor() {
        this.pageTitle = 'Hospital System';
        this.styles = [];
        this.scripts = [];
    }

    /**
     * Set the page title
     * @param {string} title - Page title
     */
    setTitle(title) {
        this.pageTitle = title;
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = `${title} | Hospital System`;
        }
        // Also update document title for existing pages
        document.title = `${title} | Hospital System`;
    }

    /**
     * Add CSS styles to the page
     * @param {string|Array} styles - CSS content or array of CSS files
     */
    addStyles(styles) {
        if (typeof styles === 'string') {
            styles = [styles];
        }

        const stylesContainer = document.getElementById('page-styles');
        if (!stylesContainer) return;

        styles.forEach(styleContent => {
            if (styleContent.endsWith('.css')) {
                // It's a CSS file path
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = styleContent;
                stylesContainer.appendChild(link);
            } else {
                // It's inline CSS
                const style = document.createElement('style');
                style.textContent = styleContent;
                stylesContainer.appendChild(style);
            }
        });
    }

    /**
     * Set the main content of the page
     * @param {string|HTMLElement} content - HTML content or DOM element
     */
    setContent(content) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        if (typeof content === 'string') {
            mainContent.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            mainContent.innerHTML = '';
            mainContent.appendChild(content);
        }
    }

    /**
     * Add JavaScript to the page
     * @param {string|Array} scripts - JavaScript code or array of script files
     */
    addScripts(scripts) {
        if (typeof scripts === 'string') {
            scripts = [scripts];
        }

        const scriptsContainer = document.getElementById('page-scripts');
        if (!scriptsContainer) return;

        scripts.forEach(scriptContent => {
            const script = document.createElement('script');
            
            if (scriptContent.endsWith('.js')) {
                // It's a script file path
                script.src = scriptContent;
                script.type = 'module';
            } else {
                // It's inline JavaScript
                script.textContent = scriptContent;
                script.type = 'module';
            }
            
            scriptsContainer.appendChild(script);
        });
    }

    /**
     * Initialize the layout with header and footer
     * @param {Object} headerConfig - Header configuration
     * @param {Object} footerConfig - Footer configuration  
     */
    init(headerConfig = {}, footerConfig = {}) {
        // Initialize header
        const headerContainer = document.getElementById('main-header');
        if (headerContainer && !headerContainer.hasChildNodes()) {
            createHeader(headerContainer, headerConfig);
        }

        // Initialize footer
        const footerContainer = document.getElementById('main-footer');
        if (footerContainer && !footerContainer.hasChildNodes()) {
            import('./footer.js').then(({ createFooter }) => {
                createFooter(footerContainer, footerConfig);
            });
        }
    }

    /**
     * Quick setup method for common page patterns
     * @param {Object} config - Page configuration
     */
    setupPage(config = {}) {
        const {
            title = 'Hospital System',
            styles = [],
            content = '',
            scripts = [],
            headerConfig = {},
            footerConfig = {}
        } = config;

        this.setTitle(title);
        this.addStyles(styles);
        this.setContent(content);
        this.addScripts(scripts);
        this.init(headerConfig, footerConfig);
    }
}

// Global layout manager instance
export const layoutManager = new LayoutManager();

// Auto-initialize for existing pages
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're using the base template structure
    const hasBaseTemplate = document.getElementById('main-header') && 
                           document.getElementById('main-content') && 
                           document.getElementById('main-footer');
                           
    if (hasBaseTemplate) {
        layoutManager.init();
    }
});