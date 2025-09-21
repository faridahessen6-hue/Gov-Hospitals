// Enhanced Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Form submission handler with validation
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            await submitContactForm();
        }
    });

    // Real-time validation
    setupContactValidation();
}

// Setup real-time form validation
function setupContactValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldId));
            field.addEventListener('input', () => clearFieldError(field));
        }
    });
}

// Validate individual field
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return false;
    
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch (fieldId) {
        case 'name':
            if (!value) {
                isValid = false;
                message = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                message = 'Email is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
            
        case 'subject':
            if (!value) {
                isValid = false;
                message = 'Please select a subject';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                message = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters';
            }
            break;
    }
    
    if (isValid) {
        showFieldSuccess(field);
    } else {
        showFieldError(field, message);
    }
    
    return isValid;
}

// Validate entire contact form
function validateContactForm() {
    const fields = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    
    fields.forEach(fieldId => {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Submit contact form
async function submitContactForm() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
    
    try {
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store message locally for demo
        storeContactMessage(formData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
        clearAllFieldErrors();
        
    } catch (error) {
        console.error('Contact form submission error:', error);
        showAlert('danger', 'Failed to send message. Please try again.', 'Error');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const referenceNumber = Math.floor(100000 + Math.random() * 900000);
    
    form.innerHTML = `
        <div class="text-center">
            <div class="success-icon mb-4">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h3 class="text-success mb-3">Message Sent Successfully!</h3>
            <div class="alert alert-success">
                <h5 class="alert-heading">Thank you for contacting us!</h5>
                <p>We have received your message and will respond within 24 hours.</p>
                <hr>
                <p class="mb-0"><strong>Reference Number:</strong> #${referenceNumber}</p>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <button class="btn btn-primary" onclick="resetContactForm()">
                    <i class="bi bi-arrow-left me-2"></i>Send Another Message
                </button>
                <a href="home.html" class="btn btn-outline-primary">
                    <i class="bi bi-house me-2"></i>Back to Home
                </a>
            </div>
        </div>
    `;
    
    // Scroll to top of form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reset contact form to original state
function resetContactForm() {
    location.reload();
}

// Store contact message locally for demo
function storeContactMessage(formData) {
    try {
        const messages = getStoredMessages();
        formData.id = Date.now();
        messages.unshift(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages.slice(0, 50))); // Keep last 50
    } catch (error) {
        console.warn('Failed to store contact message locally:', error);
    }
}

// Get stored messages
function getStoredMessages() {
    try {
        return JSON.parse(localStorage.getItem('contactMessages')) || [];
    } catch (error) {
        return [];
    }
}

// Utility functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    let feedback = field.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentElement.appendChild(feedback);
    }
    
    feedback.textContent = message;
}

function showFieldSuccess(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
}

function clearFieldError(field) {
    field.classList.remove('is-invalid', 'is-valid');
    
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

function clearAllFieldErrors() {
    document.querySelectorAll('.is-invalid, .is-valid').forEach(element => {
        element.classList.remove('is-invalid', 'is-valid');
    });
    
    document.querySelectorAll('.invalid-feedback').forEach(feedback => {
        feedback.remove();
    });
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
    alert.style.minWidth = '300px';

    alert.innerHTML = `
        ${title ? `<strong>${title}</strong><br>` : ''}
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert && alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Initialize smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to FAQ items
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
        // Add a small delay to allow Bootstrap to handle the collapse
        setTimeout(() => {
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 150);
    });
});