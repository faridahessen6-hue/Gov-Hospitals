// Enhanced Signup page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSignupForm();
});

function initializeSignupForm() {
    const form = document.getElementById('signupForm');
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (!form) return;

    // Toggle password visibility
    if (togglePassword && password && confirmPassword) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            confirmPassword.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        });
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateSignupForm()) {
            const formData = getFormData();
            await handleSignup(formData);
        }
    });

    // Real-time validation
    setupRealTimeValidation();
    
    // Password strength indicator
    setupPasswordStrength();
}

// Get form data
function getFormData() {
    return {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value.trim(),
        confirmPassword: document.getElementById('confirmPassword').value.trim(),
        terms: document.getElementById('terms').checked
    };
}

// Setup real-time validation
function setupRealTimeValidation() {
    const fields = ['fullName', 'email', 'username', 'password', 'confirmPassword'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateSingleField(fieldId));
            field.addEventListener('input', () => clearFieldError(field));
        }
    });

    // Special handling for terms checkbox
    const terms = document.getElementById('terms');
    if (terms) {
        terms.addEventListener('change', () => validateSingleField('terms'));
    }
}

// Setup password strength indicator
function setupPasswordStrength() {
    const password = document.getElementById('password');
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('passwordStrengthFill');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (password && strengthContainer) {
        password.addEventListener('input', function() {
            const value = this.value;
            
            if (value.length === 0) {
                strengthContainer.style.display = 'none';
                return;
            }
            
            strengthContainer.style.display = 'block';
            const strength = calculatePasswordStrength(value);
            updatePasswordStrengthUI(strength, strengthFill, strengthText);
        });
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 25;
    else feedback.push('at least 8 characters');
    
    if (/[a-z]/.test(password)) score += 25;
    else feedback.push('lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('uppercase letters');
    
    if (/\d/.test(password)) score += 25;
    else feedback.push('numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    else feedback.push('special characters');
    
    // Bonus points
    if (password.length >= 12) score += 10;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 5;
    
    let level, color, text;
    
    if (score < 50) {
        level = 'weak';
        color = '#dc3545';
        text = `Weak - Add ${feedback.slice(0, 2).join(', ')}`;
    } else if (score < 75) {
        level = 'medium';
        color = '#ffc107';
        text = feedback.length > 0 ? `Good - Add ${feedback[0]}` : 'Good password';
    } else {
        level = 'strong';
        color = '#28a745';
        text = 'Strong password!';
    }
    
    return { score: Math.min(score, 100), level, color, text };
}

// Update password strength UI
function updatePasswordStrengthUI(strength, fillElement, textElement) {
    if (fillElement) {
        fillElement.style.width = `${strength.score}%`;
        fillElement.style.backgroundColor = strength.color;
    }
    
    if (textElement) {
        textElement.textContent = strength.text;
        textElement.style.color = strength.color;
        textElement.className = `form-text small fw-medium`;
    }
}

// Validate entire signup form
function validateSignupForm() {
    const fields = ['fullName', 'email', 'username', 'password', 'confirmPassword', 'terms'];
    let isValid = true;
    
    fields.forEach(fieldId => {
        if (!validateSingleField(fieldId)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate single field
function validateSingleField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return false;
    
    const value = fieldId === 'terms' ? field.checked : field.value.trim();
    let result;
    
    switch (fieldId) {
        case 'fullName':
            result = validateFullName(value);
            break;
        case 'email':
            result = validateEmail(value);
            break;
        case 'username':
            result = validateUsername(value);
            break;
        case 'password':
            result = validatePassword(value);
            break;
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            result = validateConfirmPassword(value, password);
            break;
        case 'terms':
            result = validateTerms(value);
            break;
        default:
            return true;
    }
    
    if (result.isValid) {
        showFieldSuccess(field);
        return true;
    } else {
        showFieldError(field, result.message);
        return false;
    }
}

// Individual validation functions
function validateFullName(name) {
    if (!name || name.length < 2) {
        return { isValid: false, message: 'Please enter your full name (at least 2 characters)' };
    }
    if (name.length > 50) {
        return { isValid: false, message: 'Name must be less than 50 characters' };
    }
    if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true };
}

function validateEmail(email) {
    if (!email) {
        return { isValid: false, message: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    return { isValid: true };
}

function validateUsername(username) {
    if (!username) {
        return { isValid: false, message: 'Username is required' };
    }
    
    if (username.length < 3 || username.length > 20) {
        return { isValid: false, message: 'Username must be 3-20 characters long' };
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
    }
    
    if (/^\d/.test(username)) {
        return { isValid: false, message: 'Username cannot start with a number' };
    }
    
    return { isValid: true };
}

function validatePassword(password) {
    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }
    
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    
    const strength = calculatePasswordStrength(password);
    if (strength.score < 50) {
        return { isValid: false, message: 'Password is too weak. ' + strength.text };
    }
    
    return { isValid: true };
}

function validateConfirmPassword(confirmPassword, password) {
    if (!confirmPassword) {
        return { isValid: false, message: 'Please confirm your password' };
    }
    
    if (confirmPassword !== password) {
        return { isValid: false, message: 'Passwords do not match' };
    }
    
    return { isValid: true };
}

function validateTerms(checked) {
    if (!checked) {
        return { isValid: false, message: 'You must accept the terms and conditions' };
    }
    
    return { isValid: true };
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    let feedback = field.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = field.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = field.closest('.mb-3, .mb-4').querySelector('.invalid-feedback');
        }
    }
    
    if (feedback) {
        feedback.textContent = message;
    }
}

// Show field success
function showFieldSuccess(field) {
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('is-invalid', 'is-valid');
}

// Handle signup process
async function handleSignup(formData) {
    const signupBtn = document.getElementById('signupBtn');
    
    // Show loading state
    setButtonLoading(signupBtn, true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Store user data (in real app, this would be handled by the server)
        const userData = {
            fullName: formData.fullName,
            email: formData.email,
            username: formData.username,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            verified: false
        };
        
        // Store in localStorage for demo purposes
        localStorage.setItem('pendingUser', JSON.stringify(userData));
        
        // Show success message
        showAlert('success', 
            'Account created successfully! Please check your email to verify your account.', 
            'Welcome to GovHealthcare!'
        );
        
        // Redirect to login page after delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
        
    } catch (error) {
        console.error('Signup error:', error);
        showAlert('danger', 
            error.message || 'Failed to create account. Please try again.', 
            'Signup Error'
        );
    } finally {
        setButtonLoading(signupBtn, false);
    }
}

// Set button loading state
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

// Show alert message
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

    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (alert && alert.parentElement) {
            alert.remove();
        }
    }, 8000);
}

// Check if user is already logged in
function checkExistingSession() {
    const userSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    
    if (userSession) {
        try {
            JSON.parse(userSession); // Validate JSON
            showAlert('info', 'You are already logged in. Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } catch (error) {
            // Invalid session data, clear it
            localStorage.removeItem('userSession');
            sessionStorage.removeItem('userSession');
        }
    }
}

// Initialize session check
document.addEventListener('DOMContentLoaded', function() {
    checkExistingSession();
});