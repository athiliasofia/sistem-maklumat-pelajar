// Login function with comprehensive validation
function login() {
    // Clear previous errors and messages
    clearAllErrors();
    
    // Get email value
    const email = document.getElementById("email").value.trim();
    
    // Validate email
    if (!email) {
        showFieldError("email", "Email adalah wajib");
        showMessage("mesej", "Sila isi semua medan yang diperlukan", "error");
        return;
    }
    
    if (!validateEmail(email)) {
        showFieldError("email", "Format email tidak sah. Contoh: pelajar@sekolah.com");
        showMessage("mesej", "Email tidak sah", "error");
        return;
    }
    
    // Clear the error state on successful validation
    clearFieldError("email");
    
    // Disable button to prevent multiple submissions
    const button = event.target;
    button.disabled = true;
    button.textContent = "Sedang Log Masuk...";
    
    // Simulate API call
    setTimeout(() => {
        showMessage("mesej", "✓ Log masuk berjaya! Anda akan diubah hala...", "success");
        
        // Clear form
        document.getElementById("email").value = "";
        
        // Reset button
        button.disabled = false;
        button.textContent = "Log Masuk";
        
        // Simulate redirect
        // window.location.href = "index.html";
    }, 1000);
}

// Real-time validation setup
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        // Validate on blur (when user leaves the field)
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                if (!validateEmail(this.value)) {
                    showFieldError('email', 'Format email tidak sah');
                } else {
                    clearFieldError('email');
                }
            }
        });
        
        // Clear error on focus
        emailInput.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                clearFieldError('email');
            }
        });
    }
    
    // Allow Enter key to submit
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const button = document.querySelector('button');
            if (button && !button.disabled) {
                login();
            }
        }
    });
});