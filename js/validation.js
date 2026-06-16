// Email Validation
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Nama/Name Validation
function validateNama(nama) {
    if (!nama || nama.trim() === '') {
        return { valid: false, error: 'Nama adalah wajib' };
    }
    if (nama.trim().length < 3) {
        return { valid: false, error: 'Nama mesti sekurang-kurangnya 3 karakter' };
    }
    if (!/^[a-zA-Z\s\-']+$/i.test(nama)) {
        return { valid: false, error: 'Nama hanya boleh mengandungi huruf, ruang, "-" dan "\'"' };
    }
    return { valid: true, error: '' };
}

// Password Validation
function validatePassword(password) {
    if (!password || password === '') {
        return { valid: false, error: 'Kata laluan adalah wajib' };
    }
    if (password.length < 6) {
        return { valid: false, error: 'Kata laluan mesti sekurang-kurangnya 6 karakter' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, error: 'Kata laluan mesti mengandungi huruf kecil' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, error: 'Kata laluan mesti mengandungi huruf besar' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, error: 'Kata laluan mesti mengandungi angka' };
    }
    return { valid: true, error: '' };
}

// Password Match Validation
function validatePasswordMatch(password, passwordConfirm) {
    if (password !== passwordConfirm) {
        return { valid: false, error: 'Kata laluan tidak sepadan' };
    }
    return { valid: true, error: '' };
}

// Keyword/Search Validation
function validateKeyword(keyword) {
    if (!keyword || keyword.trim() === '') {
        return { valid: false, error: 'Sila masukkan kata kunci pencarian' };
    }
    if (keyword.trim().length < 2) {
        return { valid: false, error: 'Kata kunci mesti sekurang-kurangnya 2 karakter' };
    }
    return { valid: true, error: '' };
}

// Helper function to show error message on input field
function showFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
}

// Helper function to clear error message on input field
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Helper function to show message
function showMessage(elementId, message, type) {
    const msgElement = document.getElementById(elementId);
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.className = 'message show ' + type;
        
        // Auto hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                msgElement.classList.remove('show');
            }, 5000);
        }
    }
}

// Clear all field errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-text');
    const errorInputs = document.querySelectorAll('input.error');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Real-time validation on input
function setupRealtimeValidation(fieldId, validationFunction) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', function() {
            const result = validationFunction(this.value);
            if (result.valid) {
                clearFieldError(fieldId);
            } else {
                showFieldError(fieldId, result.error);
            }
        });
    }
}

// Export for Node.js/Jest testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validateNama,
        validatePassword,
        validatePasswordMatch,
        validateKeyword,
        showFieldError,
        clearFieldError,
        showMessage,
        clearAllErrors,
        setupRealtimeValidation
    };
}