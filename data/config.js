// Application Configuration
// Centralized configuration for the healthcare portal

export const APP_CONFIG = {
    // Application Info
    name: 'Government Healthcare Portal',
    title: 'GovHealthcare',
    description: 'Government services portal for healthcare appointments and services in Kafr El-Sheikh, Egypt',
    version: '2.0.0',

    // Branding
    brand: {
        logo: 'hospital',
        primaryColor: '#003366',
        secondaryColor: '#57c5b6',
        accentColor: '#159895'
    },

    // Language Support
    languages: {
        default: 'en',
        supported: ['en', 'ar'],
        rtl: ['ar']
    },

    // Theme Configuration
    theme: {
        default: 'light',
        options: ['light', 'dark']
    },

    // Contact Information
    contact: {
        phone: '+20 123 456 7890',
        email: 'info@govhealthcare.gov.eg',
        address: 'Kafr El-Sheikh, Egypt'
    },

    // Social Media
    social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        whatsapp: '#'
    },

    // API Configuration (for future use)
    api: {
        baseUrl: '/api/v1',
        timeout: 30000
    },

    // Feature Flags
    features: {
        multiLanguage: true,
        darkMode: true,
        notifications: true,
        analytics: false
    },

    // Navigation Configuration
    navigation: {
        main: [
            { text: 'Home', textAr: 'الرئيسية', href: 'home.html', icon: 'house' },
            { text: 'Hospitals', textAr: 'المستشفيات', href: 'hospitals.html', icon: 'hospital' },
            { text: 'Book Appointment', textAr: 'حجز موعد', href: 'book.html', icon: 'calendar-check' },
            { text: 'Ask Question', textAr: 'اسأل سؤال', href: 'ask.html', icon: 'question-circle' },
            { text: 'About', textAr: 'عنا', href: 'about.html', icon: 'info-circle' },
            { text: 'Contact', textAr: 'اتصل بنا', href: 'contact.html', icon: 'envelope' }
        ],
        footer: [
            { text: 'Home', textAr: 'الرئيسية', href: 'home.html', icon: 'house' },
            { text: 'About', textAr: 'عنا', href: 'about.html', icon: 'info' },
            { text: 'Contact', textAr: 'اتصل بنا', href: 'contact.html', icon: 'envelope' },
            { text: 'Policies', textAr: 'السياسات', href: 'policies.html', icon: 'shield-check' },
            { text: 'Privacy', textAr: 'الخصوصية', href: 'privacy.html', icon: 'lock' }
        ]
    }
};

// Booking Configuration
export const BOOKING_CONFIG = {
    // Price Configuration
    prices: {
        consultation: 200,
        tests: 150,
        xray: 300,
        surgery: 1000
    },

    // Payment Methods
    paymentMethods: {
        cash: {
            name: 'Cash on Arrival',
            nameAr: 'الدفع نقداً عند الوصول',
            icon: 'cash-coin',
            enabled: true
        },
        visa: {
            name: 'Credit Card',
            nameAr: 'بطاقة ائتمان',
            icon: 'credit-card',
            number: '1234 5678 9012 3456',
            enabled: true
        },
        mobileWallet: {
            name: 'Mobile Wallet',
            nameAr: 'محفظة إلكترونية',
            icon: 'phone-fill',
            number: '0100 123 4567',
            enabled: true
        },
        bankTransfer: {
            name: 'Bank Transfer',
            nameAr: 'تحويل بنكي',
            icon: 'bank',
            account: 'EG12345678901234567890123456',
            enabled: true
        }
    },

    // Age Groups for Booking
    ageGroups: [
        { id: 'teen', name: 'Teen (13-19)', nameAr: 'مراهق (13-19)', route: 'booking-teen' },
        { id: 'adult', name: 'Adult (20-59)', nameAr: 'بالغ (20-59)', route: 'booking-adult' },
        { id: 'middle', name: 'Middle-aged (40-64)', nameAr: 'متوسط العمر (40-64)', route: 'booking-middle' },
        { id: 'elderly', name: 'Elderly (65+)', nameAr: 'كبار السن (65+)', route: 'booking-old' }
    ],

    // Available Services
    services: [
        { 
            id: 'consultation', 
            name: 'Medical Consultation', 
            nameAr: 'كشف طبي',
            price: 200,
            icon: 'stethoscope',
            default: true
        },
        { 
            id: 'tests', 
            name: 'Medical Tests', 
            nameAr: 'تحاليل طبية',
            price: 150,
            icon: 'clipboard2-pulse'
        },
        { 
            id: 'xray', 
            name: 'X-Ray', 
            nameAr: 'أشعة',
            price: 300,
            icon: 'camera'
        }
    ]
};

// Default export for convenience
export default {
    APP_CONFIG,
    BOOKING_CONFIG
};