// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    createLoginContent();
    initializeLoginForm();
    checkPasswordResetSuccess();
});

// Create the main login content
function createLoginContent() {
    const main = document.querySelector('main');
    if (!main) return;

    main.innerHTML = `
        <div class="container-fluid min-vh-100 d-flex align-items-center">
            <div class="row w-100 justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="auth-container">
                        <div class="card shadow-lg border-0">
                            <div class="card-body p-5">
                                <!-- Logo and Title -->
                                <div class="text-center mb-4">
                                    <div class="auth-logo mb-3">
                                        <i class="bi bi-hospital" style="font-size: 3rem; color: var(--primary-color);"></i>
                                    </div>
                                    <h2 class="fw-bold mb-2">Welcome Back</h2>
                                    <p class="text-muted mb-0">Sign in to access your account</p>
                                    <p class="text-muted small">أهلاً بك مرة أخرى - سجل دخولك للوصول لحسابك</p>
                                </div>

                                <!-- Login Form -->
                                <form id="loginForm" novalidate>
                                    <!-- Email Field -->
                                    <div class="mb-3">
                                        <label for="email" class="form-label fw-medium">
                                            <i class="bi bi-envelope me-2"></i>Email Address
                                        </label>
                                        <input type="email" class="form-control form-control-lg" id="email" 
                                               placeholder="Enter your email" required>
                                        <div class="invalid-feedback"></div>
                                    </div>

                                    <!-- Password Field -->
                                    <div class="mb-3">
                                        <label for="password" class="form-label fw-medium">
                                            <i class="bi bi-lock me-2"></i>Password
                                        </label>
                                        <div class="input-group">
                                            <input type="password" class="form-control form-control-lg" id="password" 
                                                   placeholder="Enter your password" required>
                                            <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                                                <i class="bi bi-eye"></i>
                                            </button>
                                        </div>
                                        <div class="invalid-feedback"></div>
                                    </div>

                                    <!-- Remember Me & Forgot Password -->
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="rememberMe">
                                            <label class="form-check-label" for="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="password.html" class="text-decoration-none small">
                                            Forgot password?
                                        </a>
                                    </div>

                                    <!-- Login Button -->
                                    <button type="submit" class="btn btn-primary btn-lg w-100 mb-3" id="loginBtn">
                                        <span class="btn-text">
                                            <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                                        </span>
                                        <span class="btn-loading d-none">
                                            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Signing in...
                                        </span>
                                    </button>

                                    <!-- Demo Credentials -->
                                    <div class="alert alert-info small mb-3">
                                        <strong>Demo Credentials:</strong><br>
                                        Email: demo@hospital.gov<br>
                                        Password: Demo123!
                                    </div>
                                </form>

                                <!-- Divider -->
                                <div class="text-center my-4">
                                    <span class="text-muted small">or</span>
                                </div>

                                <!-- Social Login Options -->
                                <div class="d-grid gap-2 mb-4">
                                    <button class="btn btn-outline-danger" type="button">
                                        <i class="bi bi-google me-2"></i>Continue with Google
                                    </button>
                                    <button class="btn btn-outline-primary" type="button">
                                        <i class="bi bi-facebook me-2"></i>Continue with Facebook
                                    </button>
                                </div>

                                <!-- Sign Up Link -->
                                <div class="text-center">
                                    <p class="mb-0 text-muted">
                                        Don't have an account? 
                                        <a href="sign.html" class="text-decoration-none fw-bold">Create one</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize login form functionality
function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    
    if (!form) return;

    // Toggle password visibility
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function() {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm()) {
            handleLogin();
        }
    });

    // Real-time validation
    const emailField = document.getElementById('email');
    const passwordField2 = document.getElementById('password');

    if (emailField) {
        emailField.addEventListener('blur', () => validateField(emailField, validateEmail));
        emailField.addEventListener('input', () => clearFieldError(emailField));
    }

    if (passwordField2) {
        passwordField2.addEventListener('blur', () => validateField(passwordField2, validatePassword));
        passwordField2.addEventListener('input', () => clearFieldError(passwordField2));
    }
}

// Validate login form
function validateLoginForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let isValid = true;

    // Validate email
    if (!validateField(email, validateEmail)) {
        isValid = false;
    }

    // Validate password
    if (!validateField(password, validatePassword)) {
        isValid = false;
    }

    return isValid;
}

// Generic field validation
function validateField(field, validationFunction) {
    if (!field) return false;

    const value = field.value.trim();
    const result = validationFunction(value);
    
    if (result.isValid) {
        showFieldSuccess(field);
        return true;
    } else {
        showFieldError(field, result.message);
        return false;
    }
}

// Email validation
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

// Password validation
function validatePassword(password) {
    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }

    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }

    return { isValid: true };
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    const feedback = field.parentElement.querySelector('.invalid-feedback') || 
                    field.nextElementSibling?.classList.contains('invalid-feedback') && field.nextElementSibling;
    
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

// Handle login process
async function handleLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Show loading state
    setButtonLoading(loginBtn, true);

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Demo authentication logic
        if (email === 'demo@hospital.gov' && password === 'Demo123!') {
            // Store user session
            const userData = {
                email: email,
                name: 'Demo User',
                role: 'patient',
                loginTime: new Date().toISOString()
            };

            if (rememberMe) {
                localStorage.setItem('userSession', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('userSession', JSON.stringify(userData));
            }

            // Show success message
            showAlert('success', 'Login successful! Redirecting...', 'Welcome back!');
            
            // Redirect to dashboard or home page
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);

        } else {
            // Authentication failed
            throw new Error('Invalid email or password');
        }

    } catch (error) {
        console.error('Login error:', error);
        showAlert('danger', error.message || 'Login failed. Please try again.', 'Login Error');
        
        // Focus back to email field
        document.getElementById('email').focus();
        
    } finally {
        // Hide loading state
        setButtonLoading(loginBtn, false);
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

// Check if user is already logged in
function checkExistingSession() {
    const userSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    
    if (userSession) {
        try {
            const userData = JSON.parse(userSession);
            // If valid session exists, redirect to dashboard
            showAlert('info', 'You are already logged in. Redirecting...');
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

// Initialize session check when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkExistingSession();
});

// Check for password reset success message
function checkPasswordResetSuccess() {
    if (sessionStorage.getItem('passwordResetSuccess')) {
        sessionStorage.removeItem('passwordResetSuccess');
        showAlert('success', 'Password reset completed successfully! Please login with your new password.', 'Password Reset Complete');
    }
}
