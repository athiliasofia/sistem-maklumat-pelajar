// Login function with API verification
async function login() {
    // Clear previous errors and messages
    clearAllErrors();
    
    // Get form values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    
    let isValid = true;
    
    // Validate Username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
        showFieldError("username", usernameValidation.error);
        isValid = false;
    } else {
        clearFieldError("username");
    }
    
    // Validate Email
    if (!email) {
        showFieldError("email", "Email adalah wajib");
        isValid = false;
    } else if (!validateEmail(email)) {
        showFieldError("email", "Format email tidak sah");
        isValid = false;
    } else {
        clearFieldError("email");
    }
    
    // If validation fails, show error message
    if (!isValid) {
        showMessage("mesej", "⚠ Sila betulkan ralat-ralat di atas", "error");
        return;
    }
    
    // All validations passed - verify with API
    const button = document.querySelector('button');
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Sedang Log Masuk...";
    
    try {
        // Verify login credentials against API
        const result = await apiService.verifyLogin(username, email);
        
        if (result.success) {
            showMessage("mesej", "✓ Log masuk berjaya! Anda akan diubah hala...", "success");
            console.log("Login successful for user:", result.user);
            
            // Clear form
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            
            // Reset button
            button.disabled = false;
            button.textContent = originalText;
            
            // Redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = "search.html";
            }, 1500);
        } else {
            showMessage("mesej", "❌ " + result.error, "error");
            
            // Reset button
            button.disabled = false;
            button.textContent = originalText;
        }
    } catch (error) {
        showMessage("mesej", "❌ Ralat semasa pengesahan: " + error.message, "error");
        console.error("Login error:", error);
        
        // Reset button
        button.disabled = false;
        button.textContent = originalText;
    }
}

// Real-time validation setup
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    
    // Username validation
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                const result = validateUsername(this.value);
                if (!result.valid) {
                    showFieldError('username', result.error);
                } else {
                    clearFieldError('username');
                }
            }
        });
        
        usernameInput.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                clearFieldError('username');
            }
        });
    }
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                if (!validateEmail(this.value)) {
                    showFieldError('email', 'Format email tidak sah');
                } else {
                    clearFieldError('email');
                }
            }
        });
        
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