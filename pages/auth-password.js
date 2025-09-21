// Password Recovery functionality
document.addEventListener('DOMContentLoaded', function() {
    initPasswordRecovery();
});

function initPasswordRecovery() {
    const form = document.getElementById('recoveryForm');
    if (!form) return;

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateRecoveryForm()) {
            await submitRecoveryForm();
        }
    });

    // Real-time phone number validation
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
        phoneInput.addEventListener('blur', () => validatePhoneNumber());
    }
}

// Validate phone number format
function validatePhoneNumber() {
    const phoneInput = document.getElementById('phoneNumber');
    const phone = phoneInput.value.trim();
    
    // Egyptian phone number regex (accepts both formats: +20 and 0)
    const phoneRegex = /^(\+20|0)?1[0-2|5]\d{8}$/;
    
    if (!phone) {
        showFieldError(phoneInput, 'Phone number is required');
        return false;
    } else if (!phoneRegex.test(phone.replace(/\s|-/g, ''))) {
        showFieldError(phoneInput, 'Please enter a valid Egyptian phone number');
        return false;
    } else {
        showFieldSuccess(phoneInput);
        return true;
    }
}

// Format phone number as user types
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Handle Egyptian phone numbers
    if (value.startsWith('20')) {
        value = '+20 ' + value.slice(2);
    } else if (value.startsWith('0')) {
        value = value;
    }
    
    // Add formatting
    if (value.length > 3) {
        if (value.startsWith('+20')) {
            value = value.replace(/(\+20)\s?(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4');
        } else if (value.startsWith('0')) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        }
    }
    
    e.target.value = value;
}

// Validate recovery form
function validateRecoveryForm() {
    return validatePhoneNumber();
}

// Submit recovery form
async function submitRecoveryForm() {
    const submitBtn = document.querySelector('#recoveryForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store phone number for verification page
        sessionStorage.setItem('recoveryPhone', phoneNumber);
        
        // Show success message
        showSuccessMessage(phoneNumber);
        
    } catch (error) {
        console.error('Password recovery error:', error);
        showAlert('danger', 'Failed to send verification code. Please try again.', 'Error');
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Show success message and redirect option
function showSuccessMessage(phoneNumber) {
    const container = document.querySelector('.recovery-container .card-body');
    
    container.innerHTML = `
        <div class="text-center">
            <div class="success-icon mb-4">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h3 class="text-success mb-3">Verification Code Sent!</h3>
            <div class="alert alert-success">
                <h5 class="alert-heading">Check your phone</h5>
                <p>We've sent a 5-digit verification code to:</p>
                <p class="fw-bold">${maskPhoneNumber(phoneNumber)}</p>
                <hr>
                <p class="mb-0">The code will expire in 10 minutes.</p>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <a href="code.html" class="btn btn-primary">
                    <i class="bi bi-arrow-right me-2"></i>Enter Verification Code
                </a>
                <button class="btn btn-outline-secondary" onclick="resendCode()">
                    <i class="bi bi-arrow-clockwise me-2"></i>Resend Code
                </button>
            </div>
            <div class="mt-3">
                <a href="login.html" class="text-decoration-none">
                    <i class="bi bi-arrow-left me-1"></i>Back to Login
                </a>
            </div>
        </div>
    `;
}

// Mask phone number for privacy
function maskPhoneNumber(phone) {
    if (phone.startsWith('+20')) {
        return phone.substring(0, 7) + ' *** ****';
    } else if (phone.startsWith('0')) {
        return phone.substring(0, 4) + ' *** ****';
    }
    return '*** *** ****';
}

// Resend verification code
async function resendCode() {
    const phone = sessionStorage.getItem('recoveryPhone');
    if (!phone) {
        location.reload();
        return;
    }
    
    try {
        // Simulate resend API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showAlert('success', 'Verification code has been resent to your phone.', 'Code Resent');
    } catch (error) {
        showAlert('danger', 'Failed to resend code. Please try again.', 'Error');
    }
}

// Utility functions
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    let feedback = field.parentElement.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentElement.parentElement.appendChild(feedback);
    }
    
    feedback.textContent = message;
}

function showFieldSuccess(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
    
    const feedback = field.parentElement.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.remove();
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