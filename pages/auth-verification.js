// Verification Code functionality
document.addEventListener('DOMContentLoaded', function() {
    initVerificationCode();
});

function initVerificationCode() {
    // Display phone number from session storage
    displayPhoneNumber();
    
    // Setup code inputs
    setupCodeInputs();
    
    // Form submission
    const form = document.getElementById('verificationForm');
    if (form) {
        form.addEventListener('submit', handleVerificationSubmit);
    }
    
    // Resend code functionality
    const resendLink = document.getElementById('resendCode');
    if (resendLink) {
        resendLink.addEventListener('click', handleResendCode);
    }
    
    // Start resend timer
    startResendTimer();
}

function displayPhoneNumber() {
    const phoneNumber = sessionStorage.getItem('recoveryPhone');
    const phoneDisplay = document.getElementById('phoneNumberDisplay');
    
    if (phoneDisplay && phoneNumber) {
        phoneDisplay.textContent = maskPhoneNumber(phoneNumber);
    } else if (phoneDisplay) {
        phoneDisplay.textContent = '*** *** ****';
    }
}

function setupCodeInputs() {
    const codeInputs = document.querySelectorAll('.code-input');
    
    codeInputs.forEach((input, index) => {
        // Auto-focus next input on digit entry
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Only allow digits
            if (!/^\d$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Move to next input
            if (value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
            
            // Auto-submit when all fields are filled
            if (index === codeInputs.length - 1 && value) {
                checkAutoSubmit();
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
                codeInputs[index - 1].value = '';
            }
        });
        
        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text');
            const digits = pasteData.replace(/\D/g, '').slice(0, 5);
            
            digits.split('').forEach((digit, i) => {
                if (codeInputs[i]) {
                    codeInputs[i].value = digit;
                }
            });
            
            // Focus last filled input or next empty one
            const lastIndex = Math.min(digits.length - 1, codeInputs.length - 1);
            if (lastIndex >= 0) {
                codeInputs[lastIndex].focus();
                if (digits.length === 5) {
                    checkAutoSubmit();
                }
            }
        });
        
        // Remove non-digits on blur
        input.addEventListener('blur', function() {
            if (!/^\d$/.test(this.value)) {
                this.value = '';
            }
        });
    });
}

function checkAutoSubmit() {
    const codeInputs = document.querySelectorAll('.code-input');
    const code = Array.from(codeInputs).map(input => input.value).join('');
    
    if (code.length === 5 && /^\d{5}$/.test(code)) {
        // Small delay for better UX
        setTimeout(() => {
            handleVerificationSubmit();
        }, 500);
    }
}

async function handleVerificationSubmit(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    const codeInputs = document.querySelectorAll('.code-input');
    const code = Array.from(codeInputs).map(input => input.value).join('');
    
    // Validate code
    if (!validateVerificationCode(code)) {
        return;
    }
    
    const submitBtn = document.querySelector('#verificationForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Verifying...';
    
    try {
        // Simulate API verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Demo codes for testing
        const validCodes = ['12345', '54321', '00000'];
        
        if (validCodes.includes(code)) {
            showSuccessMessage();
        } else {
            throw new Error('Invalid verification code');
        }
        
    } catch (error) {
        console.error('Verification error:', error);
        showVerificationError();
        
        // Clear inputs and focus first
        clearCodeInputs();
        codeInputs[0].focus();
        
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function validateVerificationCode(code) {
    const codeInputs = document.querySelectorAll('.code-input');
    
    if (code.length !== 5) {
        showAlert('warning', 'Please enter the complete 5-digit code.', 'Incomplete Code');
        codeInputs[0].focus();
        return false;
    }
    
    if (!/^\d{5}$/.test(code)) {
        showAlert('warning', 'Code must contain only numbers.', 'Invalid Format');
        clearCodeInputs();
        codeInputs[0].focus();
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    const container = document.querySelector('.verification-container .card-body');
    
    container.innerHTML = `
        <div class="text-center">
            <div class="success-icon mb-4">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h3 class="text-success mb-3">Code Verified Successfully!</h3>
            <div class="alert alert-success">
                <h5 class="alert-heading">Verification Complete</h5>
                <p>Your identity has been verified. You can now create a new password.</p>
                <hr>
                <p class="mb-0">You will be redirected to set your new password.</p>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <button class="btn btn-primary" onclick="redirectToNewPassword()">
                    <i class="bi bi-arrow-right me-2"></i>Set New Password
                </button>
                <a href="login.html" class="btn btn-outline-secondary">
                    <i class="bi bi-arrow-left me-2"></i>Back to Login
                </a>
            </div>
        </div>
    `;
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
        redirectToNewPassword();
    }, 3000);
}

function redirectToNewPassword() {
    // In a real app, this would redirect to a password reset form
    // For demo, we'll redirect to login with success message
    sessionStorage.setItem('passwordResetSuccess', 'true');
    window.location.href = 'login.html';
}

function showVerificationError() {
    const codeInputs = document.querySelectorAll('.code-input');
    
    // Add error styling to inputs
    codeInputs.forEach(input => {
        input.classList.add('is-invalid');
        setTimeout(() => {
            input.classList.remove('is-invalid');
        }, 2000);
    });
    
    showAlert('danger', 'Invalid verification code. Please try again.', 'Verification Failed');
}

function clearCodeInputs() {
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach(input => {
        input.value = '';
        input.classList.remove('is-invalid');
    });
}

async function handleResendCode(e) {
    e.preventDefault();
    
    const phoneNumber = sessionStorage.getItem('recoveryPhone');
    if (!phoneNumber) {
        window.location.href = 'password.html';
        return;
    }
    
    try {
        // Simulate resend API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showAlert('success', 'A new verification code has been sent to your phone.', 'Code Resent');
        
        // Restart timer
        startResendTimer();
        
    } catch (error) {
        showAlert('danger', 'Failed to resend code. Please try again.', 'Error');
    }
}

function startResendTimer() {
    const resendLink = document.getElementById('resendCode');
    if (!resendLink) return;
    
    let timeLeft = 60; // 60 seconds
    resendLink.style.pointerEvents = 'none';
    resendLink.style.opacity = '0.5';
    
    const originalText = resendLink.textContent;
    
    const timer = setInterval(() => {
        resendLink.textContent = `Resend Code (${timeLeft}s)`;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            resendLink.textContent = originalText;
            resendLink.style.pointerEvents = 'auto';
            resendLink.style.opacity = '1';
        }
    }, 1000);
}

// Utility functions
function maskPhoneNumber(phone) {
    if (phone.startsWith('+20')) {
        return phone.substring(0, 7) + ' *** ****';
    } else if (phone.startsWith('0')) {
        return phone.substring(0, 4) + ' *** ****';
    }
    return '*** *** ****';
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

// Check for login success message from password reset
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('passwordResetSuccess')) {
        sessionStorage.removeItem('passwordResetSuccess');
        showAlert('success', 'Password reset completed! Please login with your new password.', 'Success');
    }
});