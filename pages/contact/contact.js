// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Header and footer are mounted by the new module system

    // Form submission handler (moved from inline script in contact.html)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const cardNumber = document.getElementById('card number')?.value;
            const message = document.getElementById('message')?.value;

            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, cardNumber, message });

            // Show success message
            form.innerHTML = `
                <div class="alert alert-success text-center" role="alert">
                    <h4 class="alert-heading">Thank you for contacting us!</h4>
                    <p>We will reply as soon as possible.</p>
                    <hr>
                    <p class="mb-0">Your reference number: #${Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
            `;
        });
    }
});
