// Enhanced Review page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewForm();
    loadRecentReviews();
});

let ratings = {
    overall: 0,
    staff: 0,
    wait: 0,
    clean: 0,
    facilities: 0
};

function initializeReviewForm() {
    const form = document.getElementById('reviewForm');
    if (!form) return;

    // Initialize star ratings
    initializeStarRatings();
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateReviewForm()) {
            const reviewData = getReviewFormData();
            await submitReview(reviewData);
        }
    });

    // Real-time validation
    setupReviewValidation();
}

// Initialize star rating systems
function initializeStarRatings() {
    // Main rating system
    const mainRating = document.querySelector('.star-rating');
    if (mainRating) {
        setupStarRating(mainRating, 'overall');
    }

    // Category ratings
    const miniRatings = document.querySelectorAll('.mini-rating');
    miniRatings.forEach(rating => {
        const category = rating.dataset.category;
        setupStarRating(rating, category);
    });
}

// Setup individual star rating
function setupStarRating(container, category) {
    const stars = container.querySelectorAll('.rating-star, .mini-star');
    
    stars.forEach((star, index) => {
        // Hover effect
        star.addEventListener('mouseenter', () => {
            highlightStars(stars, index + 1);
        });

        // Click to rate
        star.addEventListener('click', () => {
            const rating = index + 1;
            setRating(stars, rating, category);
            ratings[category] = rating;
            
            if (category === 'overall') {
                updateRatingText(rating);
                document.getElementById('rating').value = rating;
            }
        });
    });

    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
        const currentRating = ratings[category];
        highlightStars(stars, currentRating);
    });
}

// Highlight stars up to the given number
function highlightStars(stars, count) {
    stars.forEach((star, index) => {
        if (index < count) {
            star.classList.remove('bi-star');
            star.classList.add('bi-star-fill');
            star.style.color = '#ffc107';
        } else {
            star.classList.remove('bi-star-fill');
            star.classList.add('bi-star');
            star.style.color = '#dee2e6';
        }
    });
}

// Set rating permanently
function setRating(stars, rating, category) {
    highlightStars(stars, rating);
    
    // Store the rating
    ratings[category] = rating;
}

// Update rating text
function updateRatingText(rating) {
    const ratingText = document.getElementById('ratingText');
    const texts = [
        '', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'
    ];
    
    if (ratingText && rating >= 1 && rating <= 5) {
        ratingText.textContent = `${rating}/5 - ${texts[rating]}`;
        ratingText.style.color = getRatingColor(rating);
    }
}

// Get color based on rating
function getRatingColor(rating) {
    if (rating <= 2) return '#dc3545'; // Red
    if (rating <= 3) return '#ffc107'; // Yellow
    if (rating <= 4) return '#20c997'; // Teal
    return '#28a745'; // Green
}

// Setup form validation
function setupReviewValidation() {
    const serviceTypes = document.querySelectorAll('input[name="serviceType"]');
    const hospitalSelect = document.getElementById('hospitalSelect');
    const reviewText = document.getElementById('reviewText');
    const reviewerEmail = document.getElementById('reviewerEmail');

    // Service type validation
    serviceTypes.forEach(radio => {
        radio.addEventListener('change', () => clearFieldError(radio.closest('.mb-4')));
    });

    // Hospital selection validation
    if (hospitalSelect) {
        hospitalSelect.addEventListener('change', () => {
            if (hospitalSelect.value) {
                showFieldSuccess(hospitalSelect);
            } else {
                clearFieldError(hospitalSelect);
            }
        });
    }

    // Review text validation
    if (reviewText) {
        reviewText.addEventListener('input', () => {
            const value = reviewText.value.trim();
            if (value.length >= 10) {
                showFieldSuccess(reviewText);
            } else if (value.length > 0) {
                clearFieldError(reviewText);
            }
        });
    }

    // Email validation (optional)
    if (reviewerEmail) {
        reviewerEmail.addEventListener('blur', () => {
            const value = reviewerEmail.value.trim();
            if (value && !isValidEmail(value)) {
                showFieldError(reviewerEmail, 'Please enter a valid email address');
            } else {
                clearFieldError(reviewerEmail);
            }
        });
    }
}

// Get review form data
function getReviewFormData() {
    const serviceType = document.querySelector('input[name="serviceType"]:checked')?.value;
    const hospital = document.getElementById('hospitalSelect').value;
    const reviewText = document.getElementById('reviewText').value.trim();
    const reviewerName = document.getElementById('reviewerName').value.trim();
    const reviewerEmail = document.getElementById('reviewerEmail').value.trim();

    return {
        serviceType,
        hospital,
        overallRating: ratings.overall,
        categoryRatings: {
            staff: ratings.staff,
            wait: ratings.wait,
            clean: ratings.clean,
            facilities: ratings.facilities
        },
        reviewText,
        reviewerName: reviewerName || 'Anonymous',
        reviewerEmail,
        timestamp: new Date().toISOString()
    };
}

// Validate review form
function validateReviewForm() {
    let isValid = true;

    // Service type validation
    const serviceType = document.querySelector('input[name="serviceType"]:checked');
    if (!serviceType) {
        showFieldError(document.querySelector('.mb-4'), 'Please select which service you used');
        isValid = false;
    }

    // Hospital validation
    const hospital = document.getElementById('hospitalSelect');
    if (!hospital.value) {
        showFieldError(hospital, 'Please select a hospital');
        isValid = false;
    }

    // Rating validation
    const ratingInput = document.getElementById('rating');
    if (!ratings.overall || ratings.overall < 1) {
        showFieldError(ratingInput.closest('.mb-4'), 'Please provide an overall rating');
        isValid = false;
    }

    // Review text validation
    const reviewText = document.getElementById('reviewText');
    const text = reviewText.value.trim();
    if (!text || text.length < 10) {
        showFieldError(reviewText, 'Please provide at least 10 characters of feedback');
        isValid = false;
    }

    // Email validation (if provided)
    const reviewerEmail = document.getElementById('reviewerEmail');
    if (reviewerEmail.value.trim() && !isValidEmail(reviewerEmail.value.trim())) {
        showFieldError(reviewerEmail, 'Please enter a valid email address');
        isValid = false;
    }

    return isValid;
}

// Submit review
async function submitReview(reviewData) {
    const submitBtn = document.getElementById('submitReview');
    setButtonLoading(submitBtn, true);

    try {
        // Simulate API submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Store review locally for demo
        const reviews = getStoredReviews();
        reviewData.id = Date.now();
        reviews.unshift(reviewData);
        localStorage.setItem('hospitalReviews', JSON.stringify(reviews.slice(0, 20))); // Keep only last 20

        // Show success message
        showAlert('success', 
            'Thank you for your feedback! Your review has been submitted successfully.',
            'Review Submitted'
        );

        // Reset form
        resetReviewForm();

        // Reload recent reviews
        loadRecentReviews();

    } catch (error) {
        console.error('Review submission error:', error);
        showAlert('danger',
            'Failed to submit your review. Please try again.',
            'Submission Error'
        );
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

// Reset review form
function resetReviewForm() {
    const form = document.getElementById('reviewForm');
    form.reset();

    // Reset ratings
    Object.keys(ratings).forEach(key => {
        ratings[key] = 0;
    });

    // Reset star displays
    const allStars = document.querySelectorAll('.rating-star, .mini-star');
    allStars.forEach(star => {
        star.classList.remove('bi-star-fill');
        star.classList.add('bi-star');
        star.style.color = '#dee2e6';
    });

    // Reset rating text
    const ratingText = document.getElementById('ratingText');
    if (ratingText) {
        ratingText.textContent = 'Click to rate';
        ratingText.style.color = '';
    }

    // Clear validation states
    clearAllFieldErrors();
}

// Load and display recent reviews
function loadRecentReviews() {
    const container = document.getElementById('recentReviews');
    if (!container) return;

    const reviews = getStoredReviews();
    
    if (reviews.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-chat-square-text-fill" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0">No reviews yet. Be the first to share your experience!</p>
            </div>
        `;
        return;
    }

    const reviewsHtml = reviews.slice(0, 5).map(review => createReviewHtml(review)).join('');
    container.innerHTML = reviewsHtml;
}

// Create HTML for a single review
function createReviewHtml(review) {
    const timeAgo = getTimeAgo(new Date(review.timestamp));
    const hospitalNames = {
        'al3am': 'Al-3am Hospital',
        'elgeldia': 'El-Geldia Hospital',
        'elkebd': 'El-Kebd Hospital',
        'elramad': 'El-Ramad Hospital',
        'elhomiat': 'El-Homiat Hospital',
        'elsader': 'El-Sader Hospital'
    };

    return `
        <div class="review-item mb-3 p-3 border rounded">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <div class="fw-bold">${review.reviewerName}</div>
                    <div class="text-muted small">${hospitalNames[review.hospital] || review.hospital} • ${review.serviceType}</div>
                </div>
                <div class="text-end">
                    <div class="rating-display">
                        ${generateStarDisplay(review.overallRating)}
                    </div>
                    <div class="text-muted small">${timeAgo}</div>
                </div>
            </div>
            <p class="mb-0">${review.reviewText}</p>
        </div>
    `;
}

// Generate star display for reviews
function generateStarDisplay(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill text-warning"></i>';
        } else {
            stars += '<i class="bi bi-star text-muted"></i>';
        }
    }
    return stars;
}

// Get stored reviews
function getStoredReviews() {
    try {
        return JSON.parse(localStorage.getItem('hospitalReviews')) || [];
    } catch (error) {
        return [];
    }
}

// Utility functions
function getTimeAgo(date) {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
    if (field.classList.contains('mb-4') || field.classList.contains('mb-3')) {
        // Container element
        const feedback = field.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.style.display = 'block';
        }
    } else {
        // Input element
        field.classList.add('is-invalid');
        const feedback = field.parentElement.querySelector('.invalid-feedback') ||
                        field.nextElementSibling?.classList.contains('invalid-feedback') && field.nextElementSibling;
        if (feedback) {
            feedback.textContent = message;
        }
    }
}

function showFieldSuccess(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
}

function clearFieldError(field) {
    if (field.classList.contains('mb-4') || field.classList.contains('mb-3')) {
        // Container element
        const feedback = field.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    } else {
        // Input element
        field.classList.remove('is-invalid', 'is-valid');
    }
}

function clearAllFieldErrors() {
    document.querySelectorAll('.is-invalid, .is-valid').forEach(element => {
        element.classList.remove('is-invalid', 'is-valid');
    });
    
    document.querySelectorAll('.invalid-feedback').forEach(feedback => {
        feedback.style.display = 'none';
    });
}

function setButtonLoading(button, isLoading) {
    if (!button) return;

    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');

    if (isLoading) {
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        button.disabled = true;
    } else {
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        button.disabled = false;
    }
}

function showAlert(type, message, title = '') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert-custom');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-custom`;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '350px';
    alert.style.maxWidth = '500px';

    alert.innerHTML = `
        ${title ? `<strong>${title}</strong><br>` : ''}
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto-remove after 6 seconds
    setTimeout(() => {
        if (alert && alert.parentElement) {
            alert.remove();
        }
    }, 6000);
}