// Specialty Display Component
// Handles specialty card generation, animations, and click events
// Extracted from example and adapted to current codebase structure

import { getHospitalSpecialties, createBookingUrl } from '../../data/hospital-specialties.js';

/**
 * Create specialty cards grid for a hospital
 * @param {string} hospitalSlug - Hospital slug identifier
 * @param {HTMLElement} container - Container element to append cards
 * @param {Object} options - Display options
 */
export function createSpecialtyGrid(hospitalSlug, container, options = {}) {
    if (!container) {
        console.error('Container element is required for specialty grid');
        return;
    }

    const config = {
        showHeader: true,
        showBackButton: true,
        animationDelay: 100,
        onSpecialtyClick: null,
        ...options
    };

    // Get hospital specialties data
    const specialties = getHospitalSpecialties(hospitalSlug);
    
    if (!specialties || specialties.length === 0) {
        showNoSpecialtiesMessage(container, hospitalSlug);
        return;
    }

    // Clear container
    container.innerHTML = '';

    // Add header if requested
    if (config.showHeader) {
        const header = createSpecialtyHeader(hospitalSlug, specialties.length);
        container.appendChild(header);
    }

    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'row g-4';
    gridContainer.id = 'specialtiesGrid';

    // Create specialty cards
    specialties.forEach((specialty, index) => {
        const cardElement = createSpecialtyCard(specialty, hospitalSlug, index, config);
        gridContainer.appendChild(cardElement);
    });

    container.appendChild(gridContainer);

    // Initialize animations and event listeners
    initializeSpecialtyCards(gridContainer, config);
}

/**
 * Create individual specialty card
 * @param {Object} specialty - Specialty data object
 * @param {string} hospitalSlug - Hospital slug
 * @param {number} index - Card index for animation delay
 * @param {Object} config - Configuration options
 * @returns {HTMLElement} Card element
 */
function createSpecialtyCard(specialty, hospitalSlug, index, config) {
    // Create column wrapper
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4 col-xl-3 mb-4';
    
    // Create card element
    const card = document.createElement('div');
    card.className = 'card h-100 specialty-card';
    card.style.borderLeft = `4px solid ${specialty.color}`;
    card.setAttribute('data-specialty-id', specialty.id);
    card.setAttribute('data-hospital-slug', hospitalSlug);
    
    // Add animation delay
    card.style.animationDelay = `${index * config.animationDelay}ms`;
    
    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    
    // Create icon and title section
    const iconTitleSection = document.createElement('div');
    iconTitleSection.className = 'specialty-icon-container';
    iconTitleSection.innerHTML = `
        <div class="specialty-icon-circle" style="background-color: ${specialty.color}20;">
            <i class="bi bi-${specialty.icon} specialty-icon" style="color: ${specialty.color};"></i>
        </div>
        <div class="flex-grow-1">
            <h5 class="card-title mb-1">${specialty.title}</h5>
            <small class="text-muted d-block">${specialty.arTitle}</small>
        </div>
    `;
    
    // Create description
    const description = document.createElement('p');
    description.className = 'card-text flex-grow-1';
    description.textContent = specialty.description;
    
    // Create learn more button
    const learnMoreBtn = document.createElement('button');
    learnMoreBtn.className = 'btn btn-outline-primary btn-sm btn-learn-more mt-auto';
    learnMoreBtn.innerHTML = '<i class="bi bi-calendar-check me-1"></i>Book Appointment';
    learnMoreBtn.setAttribute('data-specialty-id', specialty.id);
    learnMoreBtn.setAttribute('data-hospital-slug', hospitalSlug);
    
    // Assemble card
    cardBody.appendChild(iconTitleSection);
    cardBody.appendChild(description);
    cardBody.appendChild(learnMoreBtn);
    card.appendChild(cardBody);
    col.appendChild(card);
    
    return col;
}

/**
 * Create specialty section header
 * @param {string} hospitalSlug - Hospital slug
 * @param {number} count - Number of specialties
 * @returns {HTMLElement} Header element
 */
function createSpecialtyHeader(hospitalSlug, count) {
    const header = document.createElement('div');
    header.className = 'text-center mb-5';
    
    const title = hospitalSlug === 'elhomiat' ? 'Fever & Infectious Disease Specialties' :
                  hospitalSlug === 'elramad' ? 'Eye Care Specialties' :
                  hospitalSlug === 'elkebd' ? 'Liver Care Specialties' :
                  hospitalSlug === 'elgeldia' ? 'Dermatology Specialties' :
                  hospitalSlug === 'elsader' ? 'Respiratory Care Specialties' :
                  'Medical Specialties';
                  
    const titleAr = hospitalSlug === 'elhomiat' ? 'تخصصات الحميات والأمراض المعدية' :
                    hospitalSlug === 'elramad' ? 'تخصصات طب العيون' :
                    hospitalSlug === 'elkebd' ? 'تخصصات طب الكبد' :
                    hospitalSlug === 'elgeldia' ? 'تخصصات الأمراض الجلدية' :
                    hospitalSlug === 'elsader' ? 'تخصصات طب الصدر' :
                    'التخصصات الطبية';
    
    header.innerHTML = `
        <h1 class="mb-3">${title}</h1>
        <h2 class="h4 text-muted mb-4">${titleAr}</h2>
        <p class="text-muted">Choose a specialty to book your appointment • اختر التخصص لحجز موعدك</p>
        <div class="d-flex align-items-center justify-content-center">
            <span class="badge bg-primary me-2">${count} Specialties Available</span>
            <span class="badge bg-info">${count} تخصص متاح</span>
        </div>
    `;
    
    return header;
}

/**
 * Show no specialties message
 * @param {HTMLElement} container - Container element
 * @param {string} hospitalSlug - Hospital slug
 */
function showNoSpecialtiesMessage(container, hospitalSlug) {
    container.innerHTML = `
        <div class="text-center py-5">
            <div class="mb-4">
                <i class="bi bi-info-circle" style="font-size: 4rem; color: var(--bs-info);"></i>
            </div>
            <h3>No Specialties Available</h3>
            <p class="text-muted mb-4">This hospital's specialty information is being updated.</p>
            <a href="hospitals.html" class="btn btn-primary">
                <i class="bi bi-arrow-left me-1"></i>
                Back to Hospitals
            </a>
        </div>
    `;
}

/**
 * Initialize specialty cards with animations and event listeners
 * @param {HTMLElement} gridContainer - Grid container element
 * @param {Object} config - Configuration options
 */
function initializeSpecialtyCards(gridContainer, config) {
    const cards = gridContainer.querySelectorAll('.specialty-card');
    
    // Add click event listeners to cards and buttons
    cards.forEach((card, index) => {
        const specialtyId = card.getAttribute('data-specialty-id');
        const hospitalSlug = card.getAttribute('data-hospital-slug');
        
        // Card click handler
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the button
            if (e.target.closest('.btn-learn-more')) return;
            
            handleSpecialtyClick(hospitalSlug, specialtyId, config);
        });
        
        // Button click handler
        const button = card.querySelector('.btn-learn-more');
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                handleSpecialtyClick(hospitalSlug, specialtyId, config);
            });
        }
        
        // Add staggered animation
        setTimeout(() => {
            card.classList.add('visible');
        }, index * config.animationDelay);
    });
    
    // Add intersection observer for cards that might be off-screen
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => observer.observe(card));
    }
}

/**
 * Handle specialty card click
 * @param {string} hospitalSlug - Hospital slug
 * @param {string} specialtyId - Specialty ID
 * @param {Object} config - Configuration options
 */
function handleSpecialtyClick(hospitalSlug, specialtyId, config) {
    // Call custom handler if provided
    if (config.onSpecialtyClick && typeof config.onSpecialtyClick === 'function') {
        config.onSpecialtyClick(hospitalSlug, specialtyId);
        return;
    }
    
    // Default navigation to booking page
    navigateToBooking(hospitalSlug, specialtyId);
}

/**
 * Navigate to booking page with hospital and specialty parameters
 * @param {string} hospitalSlug - Hospital slug
 * @param {string} specialtyId - Specialty ID
 */
export function navigateToBooking(hospitalSlug, specialtyId) {
    const bookingUrl = createBookingUrl(hospitalSlug, specialtyId);
    window.location.href = bookingUrl;
}

/**
 * Show specialty cards in existing hospital page
 * Integrates with current hospital.html structure
 * @param {string} hospitalSlug - Hospital slug
 */
export function showSpecialtiesInHospitalPage(hospitalSlug) {
    // Find the main content container
    const main = document.querySelector('main .container');
    if (!main) {
        console.error('Main container not found in hospital page');
        return;
    }
    
    // Create back button
    const backButton = document.createElement('div');
    backButton.className = 'mb-4';
    backButton.innerHTML = `
        <a href="hospital.html?name=${hospitalSlug}" class="back-to-hospital">
            <i class="bi bi-arrow-left me-1"></i>
            Back to Hospital Overview
        </a>
    `;
    
    // Clear main content and add back button
    main.innerHTML = '';
    main.appendChild(backButton);
    
    // Create specialties section
    const specialtiesSection = document.createElement('section');
    specialtiesSection.className = 'specialties-section';
    main.appendChild(specialtiesSection);
    
    // Load specialty grid
    createSpecialtyGrid(hospitalSlug, specialtiesSection, {
        showHeader: true,
        showBackButton: false, // Already added above
        animationDelay: 100
    });
}

/**
 * Initialize specialty display based on URL parameters
 * For use with hospital.html page
 */
export function initSpecialtyDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalSlug = urlParams.get('name') || urlParams.get('hospital');
    const showSpecialties = urlParams.get('view') === 'specialties';
    
    if (hospitalSlug && showSpecialties) {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                showSpecialtiesInHospitalPage(hospitalSlug);
            });
        } else {
            showSpecialtiesInHospitalPage(hospitalSlug);
        }
    }
}

// Auto-initialize if loaded directly
if (typeof window !== 'undefined' && window.location.pathname.includes('hospital.html')) {
    initSpecialtyDisplay();
}