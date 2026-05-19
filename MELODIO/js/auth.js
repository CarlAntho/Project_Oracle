// User Authentication
let currentUser = null;

// Initialize authentication
function initAuth() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
        currentUser = JSON.parse(stored);
        updateAuthUI();
    }
}

// Register user
function registerUser(name, email, password) {
    // Normalize inputs
    email = (email || '').trim().toLowerCase();
    password = (password || '').trim();
    name = (name || '').trim();

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered' };
    }

    const user = {
        id: Date.now(),
        name,
        email,
        password, // In production, use bcrypt
        orders: []
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateAuthUI();
    
    return { success: true, message: 'Registration successful!' };
}

// Login user
function loginUser(email, password) {
    // Normalize inputs
    email = (email || '').trim().toLowerCase();
    password = (password || '').trim();

    console.log('[auth] loginUser called for:', email);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { success: false, message: 'Invalid email or password' };
    }

    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    try { updateAuthUI(); } catch (e) { console.error('[auth] updateAuthUI error', e); }
    
    console.log('[auth] loginUser success for:', email);
    // Provide a consistent success message
    return { success: true, message: 'Login successful!' };
}

// Logout user
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
        showSection('home');
        alert('You have been logged out successfully!');
    }
}

// Update UI based on auth status
function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (currentUser) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        updateProfileUI();
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Update profile section
function updateProfileUI() {
    if (currentUser) {
        const profileNameEl = document.getElementById('profile-name');
        const profileEmailEl = document.getElementById('profile-email');
        if (profileNameEl) profileNameEl.textContent = `Name: ${currentUser.name}`;
        if (profileEmailEl) profileEmailEl.textContent = `Email: ${currentUser.email}`;

        const profileContent = document.getElementById('profile-content');
        if (!profileContent) return;

        // Render an editable profile form with Save and Delete actions
        profileContent.innerHTML = `
            <div class="profile-info">
                <form id="profile-edit-form" onsubmit="event.preventDefault(); updateAccount();">
                    <div class="form-group">
                        <label for="profile-name-input"><strong>Name</strong></label>
                        <input type="text" id="profile-name-input" value="${escapeHtml(currentUser.name)}" required />
                    </div>
                    <div class="form-group">
                        <label for="profile-email-input"><strong>Email</strong></label>
                        <input type="email" id="profile-email-input" value="${escapeHtml(currentUser.email)}" required />
                    </div>
                    <div class="form-group">
                        <label for="profile-password-input"><strong>New Password (leave blank to keep)</strong></label>
                        <input type="password" id="profile-password-input" placeholder="New password" />
                    </div>
                    <div class="profile-actions">
                        <button type="submit" id="profile-save-btn" class="btn-primary">Save Changes</button>
                        <button type="button" id="profile-cancel-btn" class="btn-secondary" onclick="updateProfileUI()">Cancel</button>
                        <button type="button" id="profile-delete-btn" class="btn-danger" onclick="deleteAccount()">Delete Account</button>
                    </div>
                </form>
                <div class="profile-meta">
                    <p><strong>Member Since:</strong> ${new Date(currentUser.id).toLocaleDateString()}</p>
                    <p><strong>Total Orders:</strong> ${currentUser.orders?.length || 0}</p>
                </div>
            </div>
        `;
    }
}

// Simple HTML escape to avoid injecting quotes
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Update current user's account details
function updateAccount() {
    try {
        if (!currentUser) return alert('No user logged in');

        const nameEl = document.getElementById('profile-name-input');
        const emailEl = document.getElementById('profile-email-input');
        const passEl = document.getElementById('profile-password-input');

        if (!nameEl || !emailEl) return alert('Profile form not available');

        const newName = (nameEl.value || '').trim();
        const newEmail = (emailEl.value || '').trim().toLowerCase();
        const newPass = (passEl && passEl.value) ? passEl.value.trim() : '';

        if (!newName || !newEmail) return alert('Name and email are required');

        let users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email is taken by another user
        const existing = users.find(u => u.email === newEmail && u.id !== currentUser.id);
        if (existing) return alert('This email is already in use by another account');

        // Find and update user in storage
        users = users.map(u => {
            if (u.id === currentUser.id) {
                return {
                    ...u,
                    name: newName,
                    email: newEmail,
                    password: newPass && newPass.length > 0 ? newPass : u.password
                };
            }
            return u;
        });

        // Persist
        localStorage.setItem('users', JSON.stringify(users));

        // Update currentUser and UI
        currentUser = users.find(u => u.id === currentUser.id);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        try { updateAuthUI(); } catch (e) {}
        alert('Account updated successfully');
        updateProfileUI();
    } catch (e) {
        console.error('[auth] updateAccount error', e);
        alert('Could not update account. See console for details.');
    }
}

// Delete current user's account
function deleteAccount() {
    if (!currentUser) return alert('No user logged in');
    if (!confirm('Are you sure you want to permanently delete your account? This cannot be undone.')) return;

    try {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.id !== currentUser.id);
        localStorage.setItem('users', JSON.stringify(users));

        // Clear current user
        currentUser = null;
        localStorage.removeItem('currentUser');
        try { updateAuthUI(); } catch (e) {}

        alert('Your account has been deleted.');
        // Go to home
        try { if (typeof showSection === 'function') showSection('home'); } catch (e) {}
        updateProfileUI();
    } catch (e) {
        console.error('[auth] deleteAccount error', e);
        alert('Could not delete account. See console for details.');
    }
}

// Handle login form submission
function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const result = loginUser(email, password);
    if (result.success) {
        processLoginSuccess(result.message);
    } else {
        alert(result.message);
    }
}

// Handle register form submission
function handleRegisterSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    const result = registerUser(name, email, password);
    if (result.success) {
        alert(result.message);
        document.getElementById('register-name').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
        document.getElementById('register-confirm').value = '';
        toggleForms();
        // Navigate to home after successful registration
        navigateToHome();
    } else {
        alert(result.message);
    }
}

// Centralized post-login flow
function processLoginSuccess(message) {
    try {
        alert(message || 'Login successful!');
    } catch (e) {}

    const emailEl = document.getElementById('login-email');
    const passEl = document.getElementById('login-password');
    if (emailEl) emailEl.value = '';
    if (passEl) passEl.value = '';

    // Ensure UI updates
    try { updateAuthUI(); } catch (e) {}

    // Try several navigation fallbacks to ensure the home section becomes active
    try {
        if (typeof showSection === 'function') showSection('home');
    } catch (e) {}

    // Additional fallback attempts
    setTimeout(() => {
        try { if (typeof showSection === 'function') showSection('home'); } catch (e) {}
        try { window.location.hash = '#home'; } catch (e) {}
    }, 120);
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        // If an inline onsubmit handler is present (backup), avoid attaching a second listener
        if (!loginForm.hasAttribute('onsubmit')) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                const result = loginUser(email, password);
                if (result.success) {
                    processLoginSuccess(result.message);
                } else {
                    alert(result.message);
                }
            });
        }
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        // If inline onsubmit is present, skip adding duplicate listener
        if (!registerForm.hasAttribute('onsubmit')) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirm = document.getElementById('register-confirm').value;
                
                if (password !== confirm) {
                    alert('Passwords do not match');
                    return;
                }
                
                const result = registerUser(name, email, password);
                if (result.success) {
                    alert(result.message);
                    document.getElementById('register-name').value = '';
                    document.getElementById('register-email').value = '';
                    document.getElementById('register-password').value = '';
                    document.getElementById('register-confirm').value = '';
                    toggleForms();
                    // Navigate to home after successful registration
                    navigateToHome();
                } else {
                    alert(result.message);
                }
            });
        }
    }

    initAuth();
});

// Toggle between login and register forms
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Navigate to home after auth
function navigateToHome() {
    if (typeof showSection === 'function') {
        showSection('home');
    } else {
        // Fallback: try again in a moment
        setTimeout(() => {
            if (typeof showSection === 'function') {
                showSection('home');
            }
        }, 50);
    }
}
