
import { $, createElement, on, delegate } from '../../core/dom.js';

// Enhanced header configuration with new design
const defaultHeaderConfig = {
    title: 'GovHealthcare',
    logo: 'hospital',
    showLogo: true,
    showNav: true,
    showThemeToggle: false,
    showLanguageToggle: true,
    transparent: false,
    fixed: true, // Default to fixed for better UX
    navItems: [
            { text: 'Home', href: 'index.html', icon: 'house' },
        { text: 'Hospitals', href: 'hospitals.html', icon: 'hospital' },
        { text: 'Book Appointment', href: 'booking.html', icon: 'calendar-check' },
        { text: 'Ask Question', href: 'ask.html', icon: 'question-circle' },
        { text: 'Contact', href: 'contact.html', icon: 'telephone' }
    ]
};

/**
 * Creates and initializes the header component
 * @param {HTMLElement} container - The container element where the header will be inserted
 * @param {Object} config - Configuration object
 * @param {Function} [config.onLanguageChange] - Callback when language changes
 * @returns {Object} - Public API methods
 */
export function createHeader(container, config = {}) {
    const mergedConfig = { ...defaultHeaderConfig, ...config };
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Create header element with enhanced styling
    const header = createElement('header', {
        id: 'main-header',
        class: `navbar navbar-expand-lg ${mergedConfig.fixed ? 'navbar-fixed-top' : ''} ${mergedConfig.transparent ? 'navbar-transparent' : 'navbar-light bg-white'} shadow-sm`,
        style: mergedConfig.fixed ? 'position: fixed; top: 0; width: 100%; z-index: 1030;' : ''
    });

    // Create header content with enhanced structure
    const headerContent = createElement('div', { class: 'container-fluid px-3' }, [
        // Logo/Brand with enhanced styling
        mergedConfig.showLogo ? createElement('a', { 
            class: 'navbar-brand d-flex align-items-center text-decoration-none',
            href: 'index.html',
            style: 'color: var(--primary-color, #1a5f7a); font-weight: 500;'
        }, [
            createElement('i', { 
                class: `bi bi-${mergedConfig.logo} me-2`,
                style: 'font-size: 1.5rem; color: var(--accent-color, #159895);'
            }),
            createElement('span', { 
                class: 'fw-bold',
                style: 'font-size: 1.25rem;'
            }, [document.createTextNode(mergedConfig.title)])
        ]) : null,
        
        // Mobile menu button with enhanced styling
        createElement('button', { 
            class: 'navbar-toggler border-0',
            type: 'button',
            'data-bs-toggle': 'collapse',
            'data-bs-target': '#navbarNav',
            'aria-controls': 'navbarNav',
            'aria-expanded': 'false',
            'aria-label': 'Toggle navigation',
            style: 'color: var(--primary-color, #1a5f7a);'
        }, [
            createElement('i', { class: 'bi bi-list', style: 'font-size: 1.5rem;' })
        ]),
        
        // Navigation menu with enhanced structure
        createElement('div', { 
            id: 'navbarNav',
            class: 'collapse navbar-collapse'
        }, [
            // Main navigation
            createElement('ul', { class: 'navbar-nav me-auto mb-2 mb-lg-0' }, 
                mergedConfig.navItems.map(item => 
                    createElement('li', { class: 'nav-item mx-1' }, [
                        createElement('a', { 
                            class: `nav-link px-3 py-2 rounded-pill transition-all`,
                            href: item.href,
                            style: `color: var(--dark-color, #212529); 
                                   font-weight: 500;
                                   transition: all 0.3s ease;
                                   position: relative;`
                        }, [
                            createElement('i', { 
                                class: `bi bi-${item.icon} me-2`,
                                style: 'font-size: 1rem;'
                            }),
                            document.createTextNode(item.text)
                        ])
                    ])
                )
            ),
            
            // Right-aligned controls with enhanced styling
            createElement('div', { class: 'd-flex align-items-center gap-2' }, [
                
                // Language toggle with enhanced design
                mergedConfig.showLanguageToggle ? createElement('button', { 
                    class: 'btn btn-link nav-link px-3 py-2 rounded-pill',
                    'aria-label': 'Toggle language',
                    'data-language-toggle': '',
                    style: `color: var(--primary-color, #1a5f7a);
                           font-weight: 500;
                           border: 1px solid var(--light-color, #f8f9fa);
                           transition: all 0.3s ease;
                           min-width: 60px;`
                }, [
                    document.createTextNode(currentLanguage === 'en' ? 'عربي' : 'EN')
                ]) : null,
                
                // Login/Signup button
                createElement('a', {
                    class: 'btn btn-primary px-4 py-2 rounded-pill ms-2',
                    href: 'login.html',
                    style: `background-color: var(--primary-color, #1a5f7a);
                           border-color: var(--primary-color, #1a5f7a);
                           font-weight: 500;
                           transition: all 0.3s ease;`
                }, [
                    createElement('i', { class: 'bi bi-person-circle me-2' }),
                    document.createTextNode('Sign In')
                ])
            ])
        ])
    ]);

    // Append content to header
    header.appendChild(headerContent);
    
    // Clear container and append header
    container.innerHTML = '';
    container.appendChild(header);
    
    // Initialize event listeners
    const cleanupFns = [
        
        // Language toggle
        delegate(header, '[data-language-toggle]', 'click', () => {
            const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
            setLanguage(newLanguage);
            if (typeof mergedConfig.onLanguageChange === 'function') {
                mergedConfig.onLanguageChange(newLanguage);
            }
        })
    ];
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Public API
    return {
        setLanguage,
        destroy: () => {
            cleanupFns.forEach(cleanup => cleanup());
            header.remove();
        }
    };
    
    // Helper functions
    
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update language toggle text
        const langToggle = header.querySelector('[data-language-toggle]');
        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'عربي' : 'EN';
        }
    }
}

// Initialize header automatically if data-header attribute is present
document.addEventListener('DOMContentLoaded', () => {
    const headerContainers = document.querySelectorAll('[data-header]');
    headerContainers.forEach(container => {
        const config = {
            title: container.dataset.headerTitle,
            logo: container.dataset.headerLogo,
            showLogo: container.dataset.headerShowLogo !== 'false',
            showNav: container.dataset.headerShowNav !== 'false',
            showThemeToggle: false,
            showLanguageToggle: container.dataset.headerShowLanguageToggle !== 'false',
            transparent: container.dataset.headerTransparent === 'true',
            fixed: container.dataset.headerFixed === 'true'
        };
        
        createHeader(container, config);
    });
});
