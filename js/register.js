// Register function with comprehensive validation
function daftar() {
    // Clear previous errors and messages
    clearAllErrors();
    
    // Get form values
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    
    let isValid = true;
    
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
    
    // Validate Password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        showFieldError("password", passwordValidation.error);
        isValid = false;
    } else {
        clearFieldError("password");
    }
    
    // Validate Password Match
    const passwordMatchValidation = validatePasswordMatch(password, passwordConfirm);
    if (!passwordMatchValidation.valid) {
        showFieldError("passwordConfirm", passwordMatchValidation.error);
        isValid = false;
    } else {
        clearFieldError("passwordConfirm");
    }
    
    // If validation fails, show error message
    if (!isValid) {
        showMessage("mesej", "Sila betulkan ralat-ralat di atas", "error");
        return;
    }
    
    // All validations passed
    const button = event.target;
    button.disabled = true;
    button.textContent = "Sedang Mendaftar...";
    
    // Simulate API call
    setTimeout(() => {
        showMessage("mesej", "✓ Pendaftaran berjaya! Log masuk dengan akaun anda.", "success");
        
        // Clear form
        document.getElementById("nama").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("passwordConfirm").value = "";
        
        // Reset button
        button.disabled = false;
        button.textContent = "Daftar";
        
        // Simulate redirect after 2 seconds
        // setTimeout(() => {
        //     window.location.href = "login.html";
        // }, 2000);
    }, 1000);
}

// Real-time validation setup
document.addEventListener('DOMContentLoaded', function() {
    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('passwordConfirm');
    
    // Real-time validation on blur
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
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            if (this.value !== '') {
                const result = validatePassword(this.value);
                if (!result.valid) {
                    showFieldError('password', result.error);
                } else {
                    clearFieldError('password');
                }
            }
        });
        
        passwordInput.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                clearFieldError('password');
            }
        });
    }
    
    if (passwordConfirmInput) {
        passwordConfirmInput.addEventListener('blur', function() {
            if (this.value !== '' && passwordInput.value !== '') {
                const result = validatePasswordMatch(passwordInput.value, this.value);
                if (!result.valid) {
                    showFieldError('passwordConfirm', result.error);
                } else {
                    clearFieldError('passwordConfirm');
                }
            }
        });
        
        passwordConfirmInput.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                clearFieldError('passwordConfirm');
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