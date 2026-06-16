// Register function with comprehensive validation
async function daftar() {
    // Clear previous errors and messages
    clearAllErrors();
    
    // Get form values
    const username = document.getElementById("username").value.trim();
    const nama = document.getElementById("nama").value.trim();
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
    
    // Validate Nama
    const namaValidation = validateNama(nama);
    if (!namaValidation.valid) {
        showFieldError("nama", namaValidation.error);
        isValid = false;
    } else {
        clearFieldError("nama");
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
    
    // All validations passed - POST to API
    const button = document.querySelector('button');
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Sedang Mendaftar...";
    
    try {
        // Prepare user data
        const userData = {
            username: username,
            name: nama,
            email: email
        };
        
        // POST to API
        const response = await apiService.createUser(userData);
        console.log("User created on API:", response);
        
        // Save to localStorage as well (for persistence in this browser)
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        registeredUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        console.log("User saved to localStorage:", userData);
        
        showMessage("mesej", "✓ Pendaftaran berjaya! Data disimpan ke sistem.", "success");
        
        // Clear form
        document.getElementById("username").value = "";
        document.getElementById("nama").value = "";
        document.getElementById("email").value = "";
        
        // Reset button
        button.disabled = false;
        button.textContent = originalText;
        
        // Optional: Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
        
    } catch (error) {
        showMessage("mesej", "❌ Ralat mendaftar: " + error.message, "error");
        console.error("Registration error:", error);
        
        // Reset button
        button.disabled = false;
        button.textContent = originalText;
    }
}

// Real-time validation setup
document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const namaInput = document.getElementById('nama');
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
    
    // Nama validation
    if (namaInput) {
        namaInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                const result = validateNama(this.value);
                if (!result.valid) {
                    showFieldError('nama', result.error);
                } else {
                    clearFieldError('nama');
                }
            }
        });
        
        namaInput.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                clearFieldError('nama');
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
                daftar();
            }
        }
    });
});