// Booking Configuration
// This file contains booking form configurations, validation rules, and appointment settings

export const bookingConfig = {
    // Common form fields for all booking types
    commonFields: [
        {
            name: 'firstName',
            type: 'text',
            required: true,
            label: 'First Name',
            labelAr: 'الاسم الأول',
            placeholder: 'Enter your first name',
            placeholderAr: 'ادخل اسمك الأول',
            validation: {
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\u0600-\u06FF\s]+$/,
                errorMessage: 'Please enter a valid first name',
                errorMessageAr: 'يرجى إدخال الاسم الأول بشكل صحيح'
            }
        },
        {
            name: 'lastName',
            type: 'text',
            required: true,
            label: 'Last Name',
            labelAr: 'اسم العائلة',
            placeholder: 'Enter your last name',
            placeholderAr: 'ادخل اسم عائلتك',
            validation: {
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\u0600-\u06FF\s]+$/,
                errorMessage: 'Please enter a valid last name',
                errorMessageAr: 'يرجى إدخال اسم العائلة بشكل صحيح'
            }
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            label: 'Email Address',
            labelAr: 'البريد الإلكتروني',
            placeholder: 'Enter your email',
            placeholderAr: 'ادخل بريدك الإلكتروني',
            validation: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                errorMessage: 'Please enter a valid email address',
                errorMessageAr: 'يرجى إدخال بريد إلكتروني صحيح'
            }
        },
        {
            name: 'phone',
            type: 'tel',
            required: true,
            label: 'Phone Number',
            labelAr: 'رقم الهاتف',
            placeholder: '+20 100 123 4567',
            placeholderAr: '+٢٠ ١٠٠ ١٢٣ ٤٥٦٧',
            validation: {
                pattern: /^(\+20|0020|020)?[0-9]{10}$/,
                errorMessage: 'Please enter a valid Egyptian phone number',
                errorMessageAr: 'يرجى إدخال رقم هاتف مصري صحيح'
            }
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            required: true,
            label: 'Date of Birth',
            labelAr: 'تاريخ الميلاد',
            validation: {
                maxDate: new Date(), // Cannot be in the future
                minDate: new Date(1900, 0, 1), // Reasonable minimum date
                errorMessage: 'Please enter a valid date of birth',
                errorMessageAr: 'يرجى إدخال تاريخ ميلاد صحيح'
            }
        },
        {
            name: 'gender',
            type: 'select',
            required: true,
            label: 'Gender',
            labelAr: 'الجنس',
            options: [
                { value: 'male', label: 'Male', labelAr: 'ذكر' },
                { value: 'female', label: 'Female', labelAr: 'أنثى' }
            ],
            validation: {
                errorMessage: 'Please select your gender',
                errorMessageAr: 'يرجى اختيار الجنس'
            }
        }
    ],

    // Appointment scheduling fields
    appointmentFields: [
        {
            name: 'preferredDate',
            type: 'date',
            required: true,
            label: 'Preferred Date',
            labelAr: 'التاريخ المفضل',
            validation: {
                minDate: new Date(), // Cannot book in the past
                maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Max 90 days ahead
                errorMessage: 'Please select a valid appointment date',
                errorMessageAr: 'يرجى اختيار تاريخ موعد صحيح'
            }
        },
        {
            name: 'preferredTime',
            type: 'select',
            required: true,
            label: 'Preferred Time',
            labelAr: 'الوقت المفضل',
            options: [
                { value: '09:00', label: '9:00 AM', labelAr: '٩:٠٠ صباحًا' },
                { value: '10:00', label: '10:00 AM', labelAr: '١٠:٠٠ صباحًا' },
                { value: '11:00', label: '11:00 AM', labelAr: '١١:٠٠ صباحًا' },
                { value: '12:00', label: '12:00 PM', labelAr: '١٢:٠٠ ظهرًا' },
                { value: '14:00', label: '2:00 PM', labelAr: '٢:٠٠ عصرًا' },
                { value: '15:00', label: '3:00 PM', labelAr: '٣:٠٠ عصرًا' },
                { value: '16:00', label: '4:00 PM', labelAr: '٤:٠٠ عصرًا' },
                { value: '17:00', label: '5:00 PM', labelAr: '٥:٠٠ مساءً' },
                { value: '18:00', label: '6:00 PM', labelAr: '٦:٠٠ مساءً' },
                { value: '19:00', label: '7:00 PM', labelAr: '٧:٠٠ مساءً' }
            ],
            validation: {
                errorMessage: 'Please select a preferred time',
                errorMessageAr: 'يرجى اختيار وقت مفضل'
            }
        },
        {
            name: 'hospital',
            type: 'select',
            required: true,
            label: 'Select Hospital',
            labelAr: 'اختر المستشفى',
            // Options will be populated dynamically from hospitals data
            validation: {
                errorMessage: 'Please select a hospital',
                errorMessageAr: 'يرجى اختيار مستشفى'
            }
        },
        {
            name: 'specialty',
            type: 'select',
            required: true,
            label: 'Medical Specialty',
            labelAr: 'التخصص الطبي',
            // Options will be populated dynamically based on hospital selection
            validation: {
                errorMessage: 'Please select a medical specialty',
                errorMessageAr: 'يرجى اختيار تخصص طبي'
            }
        }
    ],

    // Medical information fields
    medicalFields: [
        {
            name: 'symptoms',
            type: 'textarea',
            required: false,
            label: 'Current Symptoms',
            labelAr: 'الأعراض الحالية',
            placeholder: 'Describe your symptoms (optional)',
            placeholderAr: 'اوصف أعراضك (اختياري)',
            validation: {
                maxLength: 500,
                errorMessage: 'Symptoms description is too long',
                errorMessageAr: 'وصف الأعراض طويل جدًا'
            }
        },
        {
            name: 'allergies',
            type: 'textarea',
            required: false,
            label: 'Allergies',
            labelAr: 'الحساسيات',
            placeholder: 'List any allergies (optional)',
            placeholderAr: 'اذكر أي حساسيات (اختياري)',
            validation: {
                maxLength: 300,
                errorMessage: 'Allergies description is too long',
                errorMessageAr: 'وصف الحساسيات طويل جدًا'
            }
        },
        {
            name: 'currentMedications',
            type: 'textarea',
            required: false,
            label: 'Current Medications',
            labelAr: 'الأدوية الحالية',
            placeholder: 'List current medications (optional)',
            placeholderAr: 'اذكر الأدوية الحالية (اختياري)',
            validation: {
                maxLength: 300,
                errorMessage: 'Medications list is too long',
                errorMessageAr: 'قائمة الأدوية طويلة جدًا'
            }
        }
    ],

    // Emergency and contact fields
    emergencyFields: [
        {
            name: 'emergencyContactName',
            type: 'text',
            required: true,
            label: 'Emergency Contact Name',
            labelAr: 'اسم جهة الاتصال في الطوارئ',
            placeholder: 'Enter emergency contact name',
            placeholderAr: 'ادخل اسم جهة الاتصال في الطوارئ',
            validation: {
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\u0600-\u06FF\s]+$/,
                errorMessage: 'Please enter a valid emergency contact name',
                errorMessageAr: 'يرجى إدخال اسم جهة اتصال صحيح في الطوارئ'
            }
        },
        {
            name: 'emergencyContactPhone',
            type: 'tel',
            required: true,
            label: 'Emergency Contact Phone',
            labelAr: 'هاتف جهة الاتصال في الطوارئ',
            placeholder: '+20 100 123 4567',
            placeholderAr: '+٢٠ ١٠٠ ١٢٣ ٤٥٦٧',
            validation: {
                pattern: /^(\+20|0020|020)?[0-9]{10}$/,
                errorMessage: 'Please enter a valid emergency contact phone',
                errorMessageAr: 'يرجى إدخال رقم هاتف صحيح لجهة الاتصال في الطوارئ'
            }
        },
        {
            name: 'emergencyContactRelation',
            type: 'select',
            required: true,
            label: 'Relationship',
            labelAr: 'العلاقة',
            options: [
                { value: 'spouse', label: 'Spouse', labelAr: 'الزوج/الزوجة' },
                { value: 'parent', label: 'Parent', labelAr: 'والد/والدة' },
                { value: 'child', label: 'Child', labelAr: 'ابن/ابنة' },
                { value: 'sibling', label: 'Sibling', labelAr: 'أخ/أخت' },
                { value: 'friend', label: 'Friend', labelAr: 'صديق' },
                { value: 'other', label: 'Other', labelAr: 'أخرى' }
            ],
            validation: {
                errorMessage: 'Please select relationship',
                errorMessageAr: 'يرجى اختيار العلاقة'
            }
        }
    ],

    // Consent and agreement fields
    consentFields: [
        {
            name: 'privacyConsent',
            type: 'checkbox',
            required: true,
            label: 'I agree to the privacy policy and terms of service',
            labelAr: 'أوافق على سياسة الخصوصية وشروط الخدمة',
            validation: {
                errorMessage: 'You must agree to the privacy policy',
                errorMessageAr: 'يجب أن توافق على سياسة الخصوصية'
            }
        },
        {
            name: 'dataConsent',
            type: 'checkbox',
            required: true,
            label: 'I consent to the processing of my medical data',
            labelAr: 'أوافق على معالجة بياناتي الطبية',
            validation: {
                errorMessage: 'You must consent to medical data processing',
                errorMessageAr: 'يجب أن توافق على معالجة البيانات الطبية'
            }
        },
        {
            name: 'communicationConsent',
            type: 'checkbox',
            required: false,
            label: 'I agree to receive appointment reminders and health information',
            labelAr: 'أوافق على تلقي تذكيرات المواعيد والمعلومات الصحية'
        }
    ],

    // Booking settings and constraints
    settings: {
        // Working hours
        workingHours: {
            start: '09:00',
            end: '19:00',
            breakStart: '13:00',
            breakEnd: '14:00'
        },
        
        // Working days (0 = Sunday, 6 = Saturday)
        workingDays: [0, 1, 2, 3, 4, 5], // Sunday to Friday
        
        // Holidays and closed dates (will be populated dynamically)
        closedDates: [
            // Example: '2024-01-01', '2024-12-25'
        ],
        
        // Booking constraints
        constraints: {
            minAdvanceBooking: 1, // Minimum 1 day advance
            maxAdvanceBooking: 90, // Maximum 90 days advance
            appointmentDuration: 30, // 30 minutes per appointment
            bufferTime: 15, // 15 minutes between appointments
            maxAppointmentsPerDay: 20, // Maximum appointments per day
            cancellationDeadline: 24 // Hours before appointment to cancel
        },
        
        // Reminder settings
        reminders: {
            email: {
                enabled: true,
                times: [24, 2] // Hours before appointment
            },
            sms: {
                enabled: true,
                times: [24] // Hours before appointment
            }
        }
    },

    // Form validation rules
    validation: {
        // Age validation based on age group
        ageValidation: {
            teen: { min: 13, max: 19 },
            middle: { min: 40, max: 65 },
            old: { min: 65, max: 120 },
            general: { min: 0, max: 120 }
        },
        
        // Phone number formats
        phoneFormats: {
            egypt: /^(\+20|0020|020)?[0-9]{10}$/,
            international: /^[+]?[1-9]\d{1,14}$/
        },
        
        // Email validation
        emailFormat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        
        // Name validation (supports Arabic and English)
        nameFormat: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/
    },

    // Error messages
    errorMessages: {
        en: {
            required: 'This field is required',
            invalidEmail: 'Please enter a valid email address',
            invalidPhone: 'Please enter a valid phone number',
            invalidDate: 'Please select a valid date',
            pastDate: 'Date cannot be in the past',
            futureDate: 'Date cannot be more than 90 days in the future',
            invalidTime: 'Please select a valid time',
            nameFormat: 'Name can only contain letters and spaces',
            tooLong: 'Text is too long',
            tooShort: 'Text is too short',
            minAge: 'Age is below minimum requirement',
            maxAge: 'Age is above maximum limit',
            generic: 'Please check your input and try again'
        },
        ar: {
            required: 'هذا الحقل مطلوب',
            invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
            invalidPhone: 'يرجى إدخال رقم هاتف صحيح',
            invalidDate: 'يرجى اختيار تاريخ صحيح',
            pastDate: 'لا يمكن أن يكون التاريخ في الماضي',
            futureDate: 'لا يمكن أن يكون التاريخ أكثر من ٩٠ يومًا في المستقبل',
            invalidTime: 'يرجى اختيار وقت صحيح',
            nameFormat: 'الاسم يمكن أن يحتوي على أحرف ومسافات فقط',
            tooLong: 'النص طويل جدًا',
            tooShort: 'النص قصير جدًا',
            minAge: 'العمر أقل من الحد الأدنى المطلوب',
            maxAge: 'العمر أعلى من الحد الأقصى',
            generic: 'يرجى التحقق من المدخلات والمحاولة مرة أخرى'
        }
    },

    // Success messages
    successMessages: {
        en: {
            bookingSubmitted: 'Booking submitted successfully! You will receive a confirmation email shortly.',
            bookingConfirmed: 'Your appointment has been confirmed.',
            bookingCancelled: 'Your appointment has been cancelled.',
            bookingRescheduled: 'Your appointment has been rescheduled.'
        },
        ar: {
            bookingSubmitted: 'تم إرسال الحجز بنجاح! ستتلقى رسالة تأكيد بالبريد الإلكتروني قريبًا.',
            bookingConfirmed: 'تم تأكيد موعدك.',
            bookingCancelled: 'تم إلغاء موعدك.',
            bookingRescheduled: 'تم إعادة جدولة موعدك.'
        }
    }
};

// Helper functions for booking configuration
export function getFieldsByType(fieldType) {
    return bookingConfig[fieldType] || [];
}

export function getAllBookingFields() {
    return [
        ...bookingConfig.commonFields,
        ...bookingConfig.appointmentFields,
        ...bookingConfig.medicalFields,
        ...bookingConfig.emergencyFields,
        ...bookingConfig.consentFields
    ];
}

export function getFieldsForAgeGroup(ageGroupSlug) {
    const baseFields = [
        ...bookingConfig.commonFields,
        ...bookingConfig.appointmentFields,
        ...bookingConfig.medicalFields,
        ...bookingConfig.consentFields
    ];

    // Add age-specific fields
    if (ageGroupSlug === 'teen') {
        // Add parent consent field for teens
        baseFields.push({
            name: 'parentConsent',
            type: 'checkbox',
            required: true,
            label: 'Parent/Guardian consent (required for patients under 18)',
            labelAr: 'موافقة ولي الأمر (مطلوبة للمرضى تحت سن 18)'
        });
        baseFields.push(...bookingConfig.emergencyFields);
    } else if (ageGroupSlug === 'old') {
        // Add medication fields for seniors
        baseFields.push(...bookingConfig.emergencyFields);
    } else if (ageGroupSlug === 'middle') {
        // Add family history fields for middle-aged
        baseFields.push({
            name: 'familyHistory',
            type: 'textarea',
            required: false,
            label: 'Family Medical History',
            labelAr: 'التاريخ الطبي للعائلة'
        });
    }

    return baseFields;
}

export function validateField(fieldName, value, ageGroup = 'general', language = 'en') {
    const field = getAllBookingFields().find(f => f.name === fieldName);
    if (!field) return { isValid: true };

    const errors = [];
    
    // Check required fields
    if (field.required && (!value || value.trim() === '')) {
        errors.push(bookingConfig.errorMessages[language].required);
    }

    // Check field-specific validation
    if (value && field.validation) {
        const validation = field.validation;
        
        if (validation.pattern && !validation.pattern.test(value)) {
            errors.push(validation.errorMessage || bookingConfig.errorMessages[language].generic);
        }
        
        if (validation.minLength && value.length < validation.minLength) {
            errors.push(bookingConfig.errorMessages[language].tooShort);
        }
        
        if (validation.maxLength && value.length > validation.maxLength) {
            errors.push(bookingConfig.errorMessages[language].tooLong);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

export function getAvailableTimeSlots(date, hospitalId, specialtyId) {
    // This would normally query a database or API
    // For now, return default time slots
    const allSlots = bookingConfig.appointmentFields
        .find(f => f.name === 'preferredTime')
        .options.map(opt => opt.value);
    
    // Filter out booked slots (placeholder logic)
    // In a real implementation, this would check against a booking database
    return allSlots;
}

export function isDateAvailable(date) {
    const dayOfWeek = new Date(date).getDay();
    const dateString = new Date(date).toISOString().split('T')[0];
    
    // Check if it's a working day
    if (!bookingConfig.settings.workingDays.includes(dayOfWeek)) {
        return false;
    }
    
    // Check if it's a closed date
    if (bookingConfig.settings.closedDates.includes(dateString)) {
        return false;
    }
    
    // Check booking constraints
    const today = new Date();
    const minDate = new Date(today.getTime() + bookingConfig.settings.constraints.minAdvanceBooking * 24 * 60 * 60 * 1000);
    const maxDate = new Date(today.getTime() + bookingConfig.settings.constraints.maxAdvanceBooking * 24 * 60 * 60 * 1000);
    
    const bookingDate = new Date(date);
    return bookingDate >= minDate && bookingDate <= maxDate;
}