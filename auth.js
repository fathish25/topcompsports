// ===== TopCompSports Auth System =====
// Shared authentication and user management for all pages

const SUPABASE_URL = 'https://ngiclnkmbvzjhylwhzyn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naWNsbmttYnZ6amh5bHdoenluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNDg4MzgsImV4cCI6MjEwMzkyNDgzOH0.6ourM74pyo5B4dggygmJI9Ysclumfwh-Xh08cS6qY5w';

// Initialize Supabase client (global)
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== User Management =====
class UserAuth {
    constructor() {
        this.currentUser = null;
        this.userProfile = null;
    }

    // Get current user from Supabase
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await window.supabaseClient.auth.getUser();
            if (error) throw error;
            this.currentUser = user;
            return user;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    }

    // Get user profile from database
    async getUserProfile(userId) {
        try {
            const { data, error } = await window.supabaseClient
                .from('users')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error) throw error;
            this.userProfile = data;
            return data;
        } catch (error) {
            console.error('Get profile error:', error);
            return null;
        }
    }

    // Check if user is logged in
    async isLoggedIn() {
        const user = await this.getCurrentUser();
        return user !== null;
    }

    // Check if profile is complete
    isProfileComplete() {
        if (!this.userProfile) return false;
        return this.userProfile.full_name && 
               this.userProfile.date_of_birth && 
               this.userProfile.gender;
    }

    // Logout
    async logout() {
        try {
            await window.supabaseClient.auth.signOut();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userProfile');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    // Save user to localStorage
    saveToLocalStorage() {
        if (this.currentUser && this.userProfile) {
            localStorage.setItem('currentUser', JSON.stringify({
                id: this.currentUser.id,
                email: this.currentUser.email,
                full_name: this.userProfile.full_name,
                user_type: this.userProfile.user_type,
                profile_picture_url: this.userProfile.profile_picture_url
            }));
            localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
        }
    }

    // Load user from localStorage
    loadFromLocalStorage() {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        }
        const profile = localStorage.getItem('userProfile');
        if (profile) {
            this.userProfile = JSON.parse(profile);
        }
    }
}

// Create global instance
window.userAuth = new UserAuth();

// ===== Header Rendering =====
function renderHeader() {
    const headerHTML = `
        <header class="site-header">
            <div class="logo" onclick="window.location.href='index.html'">
                <svg class="logo-svg" width="50" height="50" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#0066CC;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#003366;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" stroke="#FFB800" stroke-width="3"/>
                    <text x="50" y="62" font-family="Arial Black" font-size="42" font-weight="900" fill="#FFB800" text-anchor="middle">T</text>
                    <path d="M 20 72 Q 50 82 80 72" stroke="#FFB800" stroke-width="2.5" fill="none"/>
                </svg>
                <div class="logo-text">TopCompSports</div>
            </div>
            
            <nav class="site-nav">
                <a href="index.html#tournaments">Tournaments</a>
                <a href="index.html#features">Features</a>
                <a href="organizer-dashboard.html">Organizer</a>
                
                <!-- User Section (shown when logged in) -->
                <div id="userSection" style="display: none; align-items: center; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.location.href='profile.html'">
                        <div id="userProfilePic" style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid #FFB800; background: #2A2A2A; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                            👤
                        </div>
                        <span id="userName" style="font-weight: 600; color: #FFB800;"></span>
                    </div>
                    <button onclick="userAuth.logout()" class="btn-logout">Logout</button>
                </div>
                
                <!-- Login Button (shown when not logged in) -->
                <a href="login.html" id="loginBtn" class="btn-login">Login</a>
                
                <div class="lang-switcher">
                    <button class="lang-btn" onclick="changeLanguage('ar')">عربي</button>
                    <button class="lang-btn active" onclick="changeLanguage('en')">English</button>
                </div>
            </nav>
        </header>
    `;
    
    // Insert header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Check user status and update header
    checkUserStatus();
}

// ===== Check User Status and Update Header =====
async function checkUserStatus() {
    const user = await window.userAuth.getCurrentUser();
    
    if (user) {
        // User is logged in
        const profile = await window.userAuth.getUserProfile(user.id);
        window.userAuth.saveToLocalStorage();
        
        // Show user section
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
        if (profilePicEl && profile?.profile_picture_url) {
            profilePicEl.innerHTML = `<img src="${profile.profile_picture_url}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
    } else {
        // User is not logged in
        const userSection = document.getElementById('userSection');
        const loginBtn = document.getElementById('loginBtn');
        
        if (userSection) userSection.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'inline-block';
    }
}

// ===== Language Switcher =====
function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((lang === 'ar' && btn.textContent === 'عربي') || 
            (lang === 'en' && btn.textContent === 'English')) {
            btn.classList.add('active');
        }
    });
    
    // Reload page to apply translations
    window.location.reload();
}

// ===== Protected Route Check =====
async function requireAuth(redirectTo = 'login.html') {
    const user = await window.userAuth.getCurrentUser();
    if (!user) {
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// ===== Require Profile Completion =====
async function requireProfileComplete(redirectTo = 'profile.html') {
    const user = await window.userAuth.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    
    const profile = await window.userAuth.getUserProfile(user.id);
    if (!profile || !window.userAuth.isProfileComplete()) {
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', function() {
    // Render header if not already present
    if (!document.querySelector('.site-header')) {
        renderHeader();
    }
    
    // Load language preference
    const savedLang = localStorage.getItem('lang') || 'en';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
});
