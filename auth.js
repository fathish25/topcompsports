// ============================================
// TopCompSports Auth System - النسخة المُحسّنة
// ============================================

// ===== Supabase Configuration =====
const SUPABASE_URL = 'https://ngiclnkmbvzjhylwhzyn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naWNsbmttYnZ6amh5bHdoenluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNDg4MzgsImV4cCI6MjEwMzkyNDgzOH0.6ourM74pyo5B4dggygmJI9Ysclumfwh-Xh08cS6qY5w';

// Initialize Supabase client (global)
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// User Management Class
// ============================================
class UserAuth {
    constructor() {
        this.currentUser = null;
        this.userProfile = null;
    }

    // ===== Get current user from Supabase Auth =====
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await window.supabaseClient.auth.getUser();
            if (error) {
                console.error('❌ Get user error:', error);
                throw error;
            }
            this.currentUser = user;
            return user;
        } catch (error) {
            console.error(' getCurrentUser error:', error);
            return null;
        }
    }

    // ===== Get user profile from database =====
    async getUserProfile(userId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('users')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error) {
                console.error('❌ Get profile error:', error);
                throw error;
            }
            
            this.userProfile = data;
            return data;
        } catch (error) {
            console.error('❌ getUserProfile error:', error);
            return null;
        }
    }

    // ===== Check if user is logged in =====
    async isLoggedIn() {
        const user = await this.getCurrentUser();
        return user !== null;
    }

    // ===== Check if profile is complete =====
    isProfileComplete() {
        if (!this.userProfile) return false;
        return this.userProfile.full_name && 
               this.userProfile.date_of_birth && 
               this.userProfile.gender;
    }

    // ===== Get user type =====
    getUserType() {
        if (this.userProfile) {
            return this.userProfile.user_type;
        }
        if (this.currentUser?.user_metadata?.user_type) {
            return this.currentUser.user_metadata.user_type;
        }
        return null;
    }

    // ===== Logout =====
    async logout() {
        try {
            await window.supabaseClient.auth.signOut();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userProfile');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('❌ Logout error:', error);
            alert('Error logging out: ' + error.message);
        }
    }

    // ===== Save user to localStorage =====
    saveToLocalStorage() {
        if (this.currentUser && this.userProfile) {
            const userData = {
                id: this.currentUser.id,
                email: this.currentUser.email,
                full_name: this.userProfile.full_name,
                user_type: this.userProfile.user_type,
                profile_picture_url: this.userProfile.profile_picture_url,
                country: this.userProfile.country,
                phone: this.userProfile.phone
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
            
            console.log('✅ User saved to localStorage:', userData);
        }
    }

    // ===== Load user from localStorage =====
    loadFromLocalStorage() {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            try {
                this.currentUser = JSON.parse(stored);
            } catch (error) {
                console.error('❌ Error parsing currentUser:', error);
                localStorage.removeItem('currentUser');
            }
        }
        
        const profile = localStorage.getItem('userProfile');
        if (profile) {
            try {
                this.userProfile = JSON.parse(profile);
            } catch (error) {
                console.error('❌ Error parsing userProfile:', error);
                localStorage.removeItem('userProfile');
            }
        }
    }

    // ===== Get Dashboard URL based on user type =====
    getDashboardUrl() {
        const userType = this.getUserType();
        
        switch (userType) {
            case 'organizer':
                return 'organizer-dashboard.html';
            case 'coach':
                return 'coach-dashboard.html';
            case 'athlete':
                return 'athlete-dashboard.html';
            default:
                return 'dashboard.html';
        }
    }
}

// Create global instance
window.userAuth = new UserAuth();

// ============================================
// Header Rendering - مع الشعار الجديد
// ============================================
function renderHeader(options = {}) {
    const {
        showNav = true,
        showUserSection = true,
        currentPage = ''
    } = options;

    const headerHTML = `
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-section">
                    <div class="logo-icon">
                        <img src="logo2.png" alt="TopCompSports Logo">
                    </div>
                    <div class="logo-text">TopCompSports</div>
                </a>
                
                ${showNav ? `
                <nav class="nav-menu">
                    <a href="index.html" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Home</a>
                    <a href="events.html" class="nav-link ${currentPage === 'tournaments' ? 'active' : ''}">Tournaments</a>
                    <a href="index.html#features" class="nav-link">Features</a>
                    <a href="organizer-register.html" class="nav-link">Organizer</a>
                </nav>
                ` : ''}
                
                <div class="auth-buttons">
                    <!-- Language Switcher -->
                    <div class="language-switcher">
                        <button class="lang-btn" data-lang="ar" onclick="setLanguage('ar')">عربي</button>
                        <button class="lang-btn active" data-lang="en" onclick="setLanguage('en')">English</button>
                    </div>
                    
                    <!-- User Section (shown when logged in) -->
                    <div id="userSection" style="display: none; align-items: center; gap: 15px;">
                        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.location.href='my-profile.html'">
                            <div id="userProfilePic" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #FFB800; background: #2A2A2A; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                                👤
                            </div>
                            <span id="userName" style="font-weight: 600; color: #FFB800;"></span>
                        </div>
                        <button onclick="userAuth.logout()" class="btn-logout">Logout</button>
                    </div>
                    
                    <!-- Login Button (shown when not logged in) -->
                    <a href="login.html" id="loginBtn" class="btn-login">Login</a>
                </div>
            </div>
        </header>
    `;
    
    // Insert header at the beginning of body
    if (!document.querySelector('.main-header')) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // Check user status and update header
    checkUserStatus();
}

// ============================================
// Check User Status and Update Header
// ============================================
async function checkUserStatus() {
    try {
        const user = await window.userAuth.getCurrentUser();
        
        if (user) {
            // User is logged in - fetch profile
            const profile = await window.userAuth.getUserProfile(user.id);
            window.userAuth.saveToLocalStorage();
            
            // Show user section, hide login button
            const userSection = document.getElementById('userSection');
            const loginBtn = document.getElementById('loginBtn');
            
            if (userSection) userSection.style.display = 'flex';
            if (loginBtn) loginBtn.style.display = 'none';
            
            // Update user name
            const userNameEl = document.getElementById('userName');
            if (userNameEl) {
                userNameEl.textContent = profile?.full_name || user.email.split('@')[0];
            }
            
            // Update profile picture
            const profilePicEl = document.getElementById('userProfilePic');
            if (profilePicEl) {
                if (profile?.profile_picture_url) {
                    profilePicEl.innerHTML = `<img src="${profile.profile_picture_url}" style="width: 100%; height: 100%; object-fit: cover;">`;
                } else {
                    // Generate initials avatar
                    const initials = (profile?.full_name || user.email).split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                    profilePicEl.innerHTML = `<span style="color: white; font-weight: bold;">${initials}</span>`;
                }
            }
            
            console.log('✅ User status checked:', user.email);
            
        } else {
            // User is not logged in
            const userSection = document.getElementById('userSection');
            const loginBtn = document.getElementById('loginBtn');
            
            if (userSection) userSection.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'inline-block';
            
            console.log('ℹ️ No user logged in');
        }
    } catch (error) {
        console.error('❌ checkUserStatus error:', error);
    }
}

// ============================================
// Protected Route Check
// ============================================
async function requireAuth(redirectTo = 'login.html') {
    const user = await window.userAuth.getCurrentUser();
    if (!user) {
        console.log('⚠️ User not authenticated, redirecting to:', redirectTo);
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// ============================================
// Require Profile Completion
// ============================================
async function requireProfileComplete(redirectTo = 'my-profile.html') {
    const user = await window.userAuth.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    
    const profile = await window.userAuth.getUserProfile(user.id);
    if (!profile || !window.userAuth.isProfileComplete()) {
        console.log('⚠️ Profile incomplete, redirecting to:', redirectTo);
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// ============================================
// Require Specific User Type
// ============================================
async function requireUserType(requiredType, redirectTo = 'index.html') {
    const user = await window.userAuth.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    
    const profile = await window.userAuth.getUserProfile(user.id);
    const userType = profile?.user_type || user.user_metadata?.user_type;
    
    if (userType !== requiredType) {
        console.log(`⚠️ User type ${userType} doesn't match required ${requiredType}`);
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load language preference from translations.js system
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Apply language settings
    if (typeof setLanguage === 'function') {
        setLanguage(savedLang);
    } else {
        document.documentElement.lang = savedLang;
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }
    
    console.log('✅ Auth system initialized');
});
