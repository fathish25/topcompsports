// ============================================
// translations.js - نظام الترجمة
// ============================================

const translations = {
    en: {
        // Header
        'nav_home': 'Home',
        'nav_tournaments': 'Tournaments',
        'nav_features': 'Features',
        'nav_organizer': 'Organizer',
        'btn_login': 'Login',
        'btn_logout': 'Logout',
        'btn_profile': 'Profile',
        
        // Signup Page
        'signup_title': 'Create Your Account',
        'signup_left_title': 'Start your journey today.',
        'signup_left_desc': 'Join thousands of athletes, coaches, and organizers building the future of competition.',
        'signup_right_title': 'Make your mark.',
        'signup_right_desc': 'Create your account to get started',
        'user_type_label': 'I am joining as',
        'type_athlete': 'Athlete',
        'type_coach': 'Coach',
        'type_organizer': 'Organizer',
        'label_full_name': 'Full Name *',
        'placeholder_full_name': 'Enter your full name',
        'label_email': 'Email Address *',
        'placeholder_email': 'your.email@example.com',
        'label_password': 'Password *',
        'placeholder_password': 'Minimum 6 characters',
        'label_confirm_password': 'Confirm Password *',
        'placeholder_confirm_password': 'Re-enter password',
        'label_date_of_birth': 'Date of Birth',
        'label_gender': 'Gender',
        'placeholder_gender': 'Select gender',
        'gender_male': 'Male',
        'gender_female': 'Female',
        'label_country': 'Country',
        'placeholder_country': 'Your country',
        'label_phone': 'Phone Number',
        'placeholder_phone': '+1 (234) 567-8900',
        'btn_create_account': 'Create Account →',
        'login_link_text': 'Already have an account?',
        'login_link': 'Sign in',
        
        // Alerts
        'alert_select_type': '⚠️ Please select your user type (Athlete, Coach, or Organizer)',
        'alert_password_mismatch': '⚠️ Passwords do not match',
        'alert_password_short': '⚠️ Password must be at least 6 characters',
        'alert_checking_email': '🔍 Checking if email is available...',
        'alert_email_exists': '⚠️ This email is already registered. Please use a different email or sign in.',
        'alert_creating': 'Creating account...',
        'alert_success': '✅ Account created successfully! Please check your email to confirm your account.',
        'alert_error': '⚠️ Error: ',
        'alert_profile_failed': '️ Failed to create user profile: ',
        'alert_table_error': '⚠️ Account created but profile setup failed. Please contact support.',
        
        // Footer
        'footer_text': '© 2026 TopCompSports - Professional tournament management for Jiu-Jitsu competitions'
    },
    
    ar: {
        // Header
        'nav_home': 'الرئيسية',
        'nav_tournaments': 'البطولات',
        'nav_features': 'المميزات',
        'nav_organizer': 'منظم',
        'btn_login': 'تسجيل الدخول',
        'btn_logout': 'تسجيل الخروج',
        'btn_profile': 'الملف الشخصي',
        
        // Signup Page
        'signup_title': 'إنشاء حسابك',
        'signup_left_title': 'ابدأ رحلتك اليوم.',
        'signup_left_desc': 'انضم إلى آلاف اللاعبين والمدربين والمنظمين الذين يبنون مستقبل المنافسة.',
        'signup_right_title': 'اصنع بصمتك.',
        'signup_right_desc': 'أنشئ حسابك للبدء',
        'user_type_label': 'أنا أنضم كـ',
        'type_athlete': 'لاعب',
        'type_coach': 'مدرب',
        'type_organizer': 'منظم',
        'label_full_name': 'الاسم الكامل *',
        'placeholder_full_name': 'أدخل اسمك الكامل',
        'label_email': 'البريد الإلكتروني *',
        'placeholder_email': 'your.email@example.com',
        'label_password': 'كلمة المرور *',
        'placeholder_password': '6 أحرف على الأقل',
        'label_confirm_password': 'تأكيد كلمة المرور *',
        'placeholder_confirm_password': 'أعد إدخال كلمة المرور',
        'label_date_of_birth': 'تاريخ الميلاد',
        'label_gender': 'الجنس',
        'placeholder_gender': 'اختر الجنس',
        'gender_male': 'ذكر',
        'gender_female': 'أنثى',
        'label_country': 'الدولة',
        'placeholder_country': 'دولتك',
        'label_phone': 'رقم الهاتف',
        'placeholder_phone': '+966 5XX XXX XXXX',
        'btn_create_account': 'إنشاء الحساب ←',
        'login_link_text': 'لديك حساب بالفعل؟',
        'login_link': 'سجل الدخول',
        
        // Alerts
        'alert_select_type': '⚠️ يرجى اختيار نوع المستخدم (لاعب، مدرب، أو منظم)',
        'alert_password_mismatch': '⚠️ كلمات المرور غير متطابقة',
        'alert_password_short': '⚠️ يجب أن تكون كلمة المرور 6 أحرف على الأقل',
        'alert_checking_email': '🔍 جاري التحقق من توفر البريد الإلكتروني...',
        'alert_email_exists': '⚠️ هذا البريد الإلكتروني مسجل مسبقاً. يرجى استخدام بريد آخر أو تسجيل الدخول.',
        'alert_creating': 'جاري إنشاء الحساب...',
        'alert_success': '✅ تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.',
        'alert_error': '⚠️ خطأ: ',
        'alert_profile_failed': '⚠️ فشل إنشاء ملف المستخدم: ',
        'alert_table_error': '⚠️ تم إنشاء الحساب لكن فشل إعداد الملف الشخصي. يرجى التواصل مع الدعم.',
        
        // Footer
        'footer_text': '© 2026 TopCompSports - إدارة احترافية لبطولات الجيو جيتسو'
    }
};

// ============================================
// دوال الترجمة
// ============================================

function setLanguage(lang) {
    // حفظ اللغة المختارة
    localStorage.setItem('selectedLanguage', lang);
    
    // تحديث اتجاه الصفحة
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    }
    
    // ترجمة جميع العناصر
    document.querySelectorAll('[data-en]').forEach(el => {
        const key = el.getAttribute('data-en');
        if (translations[lang] && translations[lang][key]) {
            // إذا كان input أو textarea، ترجم placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.getAttribute(`data-placeholder-${lang}`)) {
                    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
                }
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    // تحديث أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // إعادة تحميل الصفحة إذا لزم الأمر (للعناصر الديناميكية)
    // window.location.reload();
}

function initLanguage() {
    // تحميل اللغة المحفوظة أو استخدام الإنجليزية كافتراضي
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLang);
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initLanguage);
