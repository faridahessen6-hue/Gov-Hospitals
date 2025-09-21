// Age Groups Configuration
// This file contains age group data for dynamic booking pages and healthcare targeting

// Age Groups as Object (for lookup by key)
export const ageGroups = {
    'teen': {
        id: 1,
        slug: 'teen',
        name: 'Teen Health',
        nameAr: 'صحة المراهقين',
        description: 'Healthcare services for teenagers (13-19 years)',
        descriptionAr: 'خدمات الرعاية الصحية للمراهقين (13-19 سنة)',
        ageRange: '13-19',
        ageRangeAr: '13-19 سنة',
        icon: 'bi-person-badge',
        color: '#e74c3c',
        primaryColor: '#e74c3c',
        secondaryColor: '#ec7063',
        accentColor: '#c0392b',
        link: 'booking.html?age=teen',
        commonIssues: [
            'Acne and skin problems',
            'Mental health and anxiety',
            'Growth and development concerns',
            'Sports injuries',
            'Nutrition and eating disorders',
            'Sleep disorders',
            'Sexual health education',
            'Substance abuse prevention'
        ],
        commonIssuesAr: [
            'حب الشباب ومشاكل الجلد',
            'الصحة النفسية والقلق',
            'مشاكل النمو والتطور',
            'إصابات رياضية',
            'التغذية واضطرابات الأكل',
            'اضطرابات النوم',
            'التثقيف الجنسي',
            'الوقاية من تعاطي المواد'
        ],
        recommendedSpecialties: [
            'dermatology',
            'orthopedics',
            'general-medicine',
            'family-medicine'
        ],
        bookingFields: [
            {
                name: 'parentConsent',
                type: 'checkbox',
                required: true,
                label: 'Parent/Guardian consent required for patients under 18',
                labelAr: 'موافقة ولي الأمر مطلوبة للمرضى تحت سن 18'
            },
            {
                name: 'emergencyContact',
                type: 'text',
                required: true,
                label: 'Emergency Contact Phone',
                labelAr: 'هاتف الاتصال في حالات الطوارئ'
            }
        ],
        healthTips: [
            'Maintain regular sleep schedule (8-10 hours)',
            'Stay physically active with sports or exercise',
            'Eat balanced meals with fruits and vegetables',
            'Manage stress through healthy coping mechanisms'
        ],
        healthTipsAr: [
            'حافظ على جدول نوم منتظم (8-10 ساعات)',
            'ابق نشيطًا بدنيًا بالرياضة أو التمارين',
            'تناول وجبات متوازنة مع الفواكه والخضروات',
            'إدارة التوتر من خلال آليات التكيف الصحية'
        ]
    },
    'middle': {
        id: 2,
        slug: 'middle',
        name: 'Middle-Aged Health',
        nameAr: 'صحة متوسطي العمر',
        description: 'Healthcare services for middle-aged adults (40-65 years)',
        descriptionAr: 'خدمات الرعاية الصحية للبالغين متوسطي العمر (40-65 سنة)',
        ageRange: '40-65',
        ageRangeAr: '40-65 سنة',
        icon: 'bi-person-check',
        color: '#3498db',
        primaryColor: '#3498db',
        secondaryColor: '#5dade2',
        accentColor: '#1f618d',
        link: 'booking.html?age=middle',
        commonIssues: [
            'Cardiovascular health monitoring',
            'Diabetes prevention and management',
            'Cancer screening programs',
            'Joint health and arthritis',
            'Mental health and stress management',
            'Hormonal changes (menopause/andropause)'
        ],
        commonIssuesAr: [
            'مراقبة صحة القلب والأوعية الدموية',
            'الوقاية من السكري وإدارته',
            'برامج فحص السرطان',
            'صحة المفاصل والتهاب المفاصل',
            'الصحة النفسية وإدارة التوتر',
            'التغييرات الهرمونية (سن اليأس/سن اليأس الذكري)'
        ],
        recommendedSpecialties: [
            'cardiology',
            'internal-medicine',
            'general-medicine',
            'dermatology',
            'orthopedics'
        ],
        bookingFields: [
            {
                name: 'chronicConditions',
                type: 'textarea',
                required: false,
                label: 'List any chronic conditions or medications',
                labelAr: 'اذكر أي حالات مزمنة أو أدوية'
            },
            {
                name: 'familyHistory',
                type: 'textarea',
                required: false,
                label: 'Family medical history',
                labelAr: 'التاريخ الطبي للعائلة'
            }
        ],
        healthTips: [
            'Schedule regular health screenings and checkups',
            'Maintain healthy weight through diet and exercise',
            'Monitor blood pressure and cholesterol levels',
            'Stay up to date with preventive care'
        ],
        healthTipsAr: [
            'حدد مواعيد للفحوصات الصحية والفحوصات المنتظمة',
            'حافظ على وزن صحي من خلال النظام الغذائي والتمارين',
            'راقب ضغط الدم ومستويات الكوليسترول',
            'ابق محدثًا مع الرعاية الوقائية'
        ]
    },
    'old': {
        id: 3,
        slug: 'old',
        name: 'Senior Health',
        nameAr: 'صحة كبار السن',
        description: 'Healthcare services for seniors (65+ years)',
        descriptionAr: 'خدمات الرعاية الصحية لكبار السن (65+ سنة)',
        ageRange: '65+',
        ageRangeAr: '65+ سنة',
        icon: 'bi-person-hearts',
        color: '#9b59b6',
        primaryColor: '#9b59b6',
        secondaryColor: '#bb8fce',
        accentColor: '#8e44ad',
        link: 'booking.html?age=old',
        commonIssues: [
            'Chronic disease management',
            'Medication management and interactions',
            'Mobility and fall prevention',
            'Cognitive health and memory',
            'Social isolation and depression',
            'Nutrition and digestive health'
        ],
        commonIssuesAr: [
            'إدارة الأمراض المزمنة',
            'إدارة الأدوية والتفاعلات',
            'الحركة والوقاية من السقوط',
            'الصحة المعرفية والذاكرة',
            'العزلة الاجتماعية والاكتئاب',
            'التغذية وصحة الجهاز الهضمي'
        ],
        recommendedSpecialties: [
            'internal-medicine',
            'cardiology',
            'neurology',
            'general-medicine',
            'family-medicine'
        ],
        bookingFields: [
            {
                name: 'medicationList',
                type: 'textarea',
                required: true,
                label: 'Complete list of current medications',
                labelAr: 'قائمة كاملة بالأدوية الحالية'
            },
            {
                name: 'emergencyContact',
                type: 'text',
                required: true,
                label: 'Emergency Contact (Family/Caregiver)',
                labelAr: 'جهة الاتصال في حالات الطوارئ (عائلة/مقدم رعاية)'
            }
        ],
        healthTips: [
            'Stay physically active within your capabilities',
            'Maintain social connections and community involvement',
            'Follow medication schedules strictly',
            'Eat nutrient-rich foods and stay hydrated'
        ],
        healthTipsAr: [
            'ابق نشيطًا بدنيًا ضمن قدراتك',
            'حافظ على الروابط الاجتماعية والمشاركة المجتمعية',
            'اتبع جداول الأدوية بدقة',
            'تناول أطعمة غنية بالعناصر الغذائية وابق رطبًا'
        ]
    },
    'general': {
        id: 4,
        slug: 'general',
        name: 'General Booking',
        nameAr: 'حجز عام',
        description: 'General healthcare booking for all ages',
        descriptionAr: 'حجز رعاية صحية عامة لجميع الأعمار',
        ageRange: 'All Ages',
        ageRangeAr: 'جميع الأعمار',
        icon: 'bi-calendar-plus',
        color: '#16a085',
        primaryColor: '#16a085',
        secondaryColor: '#48c9b0',
        accentColor: '#138d75',
        link: 'booking.html?age=general',
        commonIssues: [
            'Routine checkups and preventive care',
            'Acute illness treatment',
            'Chronic condition management',
            'Health screenings',
            'Vaccination services'
        ],
        commonIssuesAr: [
            'الفحوصات الروتينية والرعاية الوقائية',
            'علاج الأمراض الحادة',
            'إدارة الحالات المزمنة',
            'فحوصات صحية',
            'خدمات التطعيم'
        ],
        recommendedSpecialties: [
            'general-medicine',
            'family-medicine',
            'internal-medicine'
        ],
        bookingFields: [
            {
                name: 'appointmentType',
                type: 'select',
                required: true,
                label: 'Type of appointment',
                labelAr: 'نوع الموعد',
                options: ['Routine Checkup', 'Follow-up', 'New Consultation', 'Emergency']
            },
            {
                name: 'reasonForVisit',
                type: 'textarea',
                required: true,
                label: 'Reason for visit',
                labelAr: 'سبب الزيارة'
            }
        ],
        healthTips: [
            'Schedule regular preventive care appointments',
            'Keep track of your medical history and medications',
            'Maintain a healthy lifestyle with good nutrition and exercise',
            'Stay current with recommended vaccinations'
        ],
        healthTipsAr: [
            'حدد مواعيد منتظمة للرعاية الوقائية',
            'تتبع تاريخك الطبي وأدويتك',
            'حافظ على نمط حياة صحي مع تغذية جيدة وتمارين',
            'ابق محدثًا مع التطعيمات الموصى بها'
        ]
    },
    // Legacy compatibility - keeping old structure for existing links
    'children': {
        id: 'children',
        name: 'Children',
        nameAr: 'أطفال',
        range: '1-12',
        icon: 'emoji-smile',
        link: 'booking.html?age=general' // Redirect children to general booking
    },
    'teenager': {
        id: 'teenager',
        name: 'Teenager',
        nameAr: 'المراهقين',
        range: '12-20',
        icon: 'person',
        link: 'booking.html?age=teen'
    },
    'adult': {
        id: 'adult',
        name: 'Middle Age',
        nameAr: 'الشباب',
        range: '20-50',
        icon: 'person-badge',
        link: 'booking.html?age=middle'
    },
    'senior': {
        id: 'senior',
        name: 'Old Age',
        nameAr: 'كبار السن',
        range: '50+',
        icon: 'person-plus',
        link: 'booking.html?age=old'
    }
};

// Helper functions for age groups
export function getAgeGroupBySlug(slug) {
    return ageGroups[slug];
}

export function getAllAgeGroups() {
    return Object.values(ageGroups);
}

export function getAgeGroupRecommendedSpecialties(ageGroupSlug) {
    const ageGroup = ageGroups[ageGroupSlug];
    return ageGroup && ageGroup.recommendedSpecialties ? ageGroup.recommendedSpecialties : [];
}

export function getBookingUrl(ageGroupSlug) {
    return `booking.html?age=${ageGroupSlug}`;
}

export function getAgeGroupByAge(age) {
    const numericAge = parseInt(age);
    
    if (numericAge >= 13 && numericAge <= 19) {
        return ageGroups.teen;
    } else if (numericAge >= 40 && numericAge <= 65) {
        return ageGroups.middle;
    } else if (numericAge >= 65) {
        return ageGroups.old;
    } else {
        return ageGroups.general;
    }
}

// Age Groups as Array (for iterations/mapping)
// Uses getAllAgeGroups() to ensure we get the complete data from the ageGroups object
export const ageGroupsArray = getAllAgeGroups();
