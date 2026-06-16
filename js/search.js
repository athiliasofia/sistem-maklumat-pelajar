let users = [];

// Load user data on page load
window.onload = async function() {
    try {
        console.log("Memuatkan data pelajar dari API...");
        users = await apiService.getUsers();
        
        // Show loading message
        const outputDiv = document.getElementById("output");
        if (outputDiv) {
            outputDiv.innerHTML = `<div class="message success show">✓ Data pelajar berjaya dimuat (${users.length} rekod tersedia)</div>`;
        }
    } catch (error) {
        const outputDiv = document.getElementById("output");
        if (outputDiv) {
            outputDiv.innerHTML = `<div class="message error show">⚠ Ralat mendapatkan data: ${error.message}</div>`;
        }
        console.error("Error loading users:", error);
    }
};

// Search function with comprehensive validation
function cariData() {
    // Clear previous errors
    clearAllErrors();
    
    // Get search keyword
    const keyword = document.getElementById("keyword").value.trim();
    
    // Validate keyword
    const keywordValidation = validateKeyword(keyword);
    if (!keywordValidation.valid) {
        showFieldError("keyword", keywordValidation.error);
        showMessage("output", "⚠ " + keywordValidation.error, "error");
        return;
    }
    
    clearFieldError("keyword");
    
    // Check if data is loaded
    if (users.length === 0) {
        showMessage("output", "⚠ Sila tunggu data pelajar selesai dimuatkan", "warning");
        return;
    }
    
    // Search for matching users
    const lowerKeyword = keyword.toLowerCase();
    const hasil = users.filter(user =>
        user.name.toLowerCase().includes(lowerKeyword) ||
        user.email.toLowerCase().includes(lowerKeyword) ||
        user.username.toLowerCase().includes(lowerKeyword) ||
        (user.phone && user.phone.includes(keyword)) ||
        (user.company && user.company.name.toLowerCase().includes(lowerKeyword))
    );
    
    // Display results
    const outputDiv = document.getElementById("output");
    
    if (hasil.length === 0) {
        outputDiv.innerHTML = `<div class="message warning show">ℹ Tiada hasil carian untuk "${keyword}". Sila cuba kata kunci lain.</div>`;
        return;
    }
    
    let output = `<div class="message success show">✓ Dijumpai ${hasil.length} hasil untuk "${keyword}"</div>`;
    
    hasil.forEach((user, index) => {
        output += `
        <div class="user-card">
            <h3>${index + 1}. ${user.name}</h3>
            <p><strong>📧 Email:</strong> ${user.email}</p>
            <p><strong>👤 Username:</strong> @${user.username}</p>
            <p><strong>📱 Telefon:</strong> ${user.phone || "Tiada"}</p>
            <p><strong>🏢 Syarikat:</strong> ${user.company?.name || "Tiada"}</p>
            <p><strong>🌐 Website:</strong> ${user.website || "Tiada"}</p>
            <p><strong>📍 Lokasi:</strong> ${user.address?.city || "Tiada"}, ${user.address?.country || ""}</p>
        </div>
        `;
    });
    
    outputDiv.innerHTML = output;
}

// Real-time validation setup
document.addEventListener('DOMContentLoaded', function() {
    const keywordInput = document.getElementById('keyword');
    
    if (keywordInput) {
        // Validate on blur
        keywordInput.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                const result = validateKeyword(this.value);
                if (!result.valid) {
                    showFieldError('keyword', result.error);
                } else {
                    clearFieldError('keyword');
                }
            }
        });
        
        // Clear error on focus
        keywordInput.addEventListener('focus', function() {
            if (this.classList.contains('error')) {
                clearFieldError('keyword');
            }
        });
        
        // Allow Enter key to search
        keywordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                cariData();
            }
        });
    }
    
    // Also allow Enter on button
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const button = document.querySelector('button');
            if (button && !button.disabled) {
                cariData();
            }
        }
    });
});