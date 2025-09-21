// Medical Specialties Configuration
// This file contains all medical specialty and disease data for dynamic specialty pages

export const specialties = {
    // General Medical Specialties
    'cardiology': {
        id: 1,
        slug: 'cardiology',
        name: 'Cardiology',
        nameAr: 'أمراض القلب',
        description: 'Heart and cardiovascular system diseases',
        descriptionAr: 'أمراض القلب والأوعية الدموية',
        icon: 'bi-heart-pulse',
        color: '#e74c3c',
        category: 'general',
        symptoms: ['chest pain', 'shortness of breath', 'heart palpitations', 'dizziness'],
        symptomsAr: ['ألم في الصدر', 'ضيق في التنفس', 'خفقان القلب', 'دوخة'],
        commonConditions: ['heart attack', 'arrhythmia', 'heart failure', 'coronary artery disease']
    },
    'neurology': {
        id: 2,
        slug: 'neurology',
        name: 'Neurology',
        nameAr: 'أمراض الأعصاب',
        description: 'Nervous system and brain disorders',
        descriptionAr: 'اضطرابات الجهاز العصبي والدماغ',
        icon: 'bi-cpu',
        color: '#9b59b6',
        category: 'general',
        symptoms: ['headache', 'seizures', 'memory loss', 'numbness'],
        symptomsAr: ['صداع', 'نوبات صرع', 'فقدان الذاكرة', 'خدر'],
        commonConditions: ['stroke', 'epilepsy', 'migraine', 'parkinsons disease']
    },
    'pediatrics': {
        id: 3,
        slug: 'pediatrics',
        name: 'Pediatrics',
        nameAr: 'طب الأطفال',
        description: 'Medical care for infants, children, and adolescents',
        descriptionAr: 'الرعاية الطبية للرضع والأطفال والمراهقين',
        icon: 'bi-heart',
        color: '#f39c12',
        category: 'general',
        symptoms: ['fever', 'growth issues', 'behavioral problems', 'developmental delays'],
        symptomsAr: ['حمى', 'مشاكل النمو', 'مشاكل سلوكية', 'تأخر في النمو'],
        commonConditions: ['common cold', 'ear infections', 'asthma', 'allergies']
    },
    'orthopedics': {
        id: 4,
        slug: 'orthopedics',
        name: 'Orthopedics',
        nameAr: 'جراحة العظام',
        description: 'Bone, joint, and musculoskeletal system disorders',
        descriptionAr: 'اضطرابات العظام والمفاصل والجهاز العضلي الهيكلي',
        icon: 'bi-bandaid',
        color: '#16a085',
        category: 'general',
        symptoms: ['joint pain', 'bone fractures', 'muscle weakness', 'limited mobility'],
        symptomsAr: ['ألم المفاصل', 'كسور العظام', 'ضعف العضلات', 'محدودية الحركة'],
        commonConditions: ['fractures', 'arthritis', 'osteoporosis', 'sports injuries']
    },
    'dermatology': {
        id: 5,
        slug: 'dermatology',
        name: 'Dermatology',
        nameAr: 'الأمراض الجلدية',
        description: 'Skin, hair, and nail disorders',
        descriptionAr: 'اضطرابات الجلد والشعر والأظافر',
        icon: 'bi-bandaid-fill',
        color: '#e67e22',
        category: 'specialized',
        symptoms: ['skin rash', 'itching', 'acne', 'hair loss'],
        symptomsAr: ['طفح جلدي', 'حكة', 'حب الشباب', 'تساقط الشعر'],
        commonConditions: ['eczema', 'psoriasis', 'acne', 'skin cancer']
    },

    // Eye-related specialties
    'conjunctivitis': {
        id: 6,
        slug: 'conjunctivitis',
        name: 'Conjunctivitis',
        nameAr: 'التهاب الملتحمة',
        description: 'Inflammation of the conjunctiva (pink eye)',
        descriptionAr: 'التهاب الملتحمة (العين الوردية)',
        icon: 'bi-eye',
        color: '#3498db',
        category: 'eye',
        symptoms: ['red eyes', 'itchy eyes', 'discharge', 'tearing'],
        symptomsAr: ['احمرار العيون', 'حكة العيون', 'إفرازات', 'دموع'],
        commonConditions: ['viral conjunctivitis', 'bacterial conjunctivitis', 'allergic conjunctivitis']
    },
    'keratitis': {
        id: 7,
        slug: 'keratitis',
        name: 'Keratitis',
        nameAr: 'التهاب القرنية',
        description: 'Inflammation of the cornea',
        descriptionAr: 'التهاب القرنية',
        icon: 'bi-eye-fill',
        color: '#2980b9',
        category: 'eye',
        symptoms: ['eye pain', 'blurred vision', 'light sensitivity', 'foreign body sensation'],
        symptomsAr: ['ألم العين', 'رؤية ضبابية', 'حساسية للضوء', 'إحساس بجسم غريب'],
        commonConditions: ['infectious keratitis', 'dry eye keratitis', 'exposure keratitis']
    },
    'blepharitis': {
        id: 8,
        slug: 'blepharitis',
        name: 'Blepharitis',
        nameAr: 'التهاب الجفن',
        description: 'Inflammation of the eyelids',
        descriptionAr: 'التهاب الجفون',
        icon: 'bi-eye',
        color: '#1f618d',
        category: 'eye',
        symptoms: ['swollen eyelids', 'crusty eyelashes', 'burning sensation', 'excessive tearing'],
        symptomsAr: ['تورم الجفون', 'رموش متقشرة', 'إحساس بالحرقة', 'دموع مفرطة'],
        commonConditions: ['anterior blepharitis', 'posterior blepharitis', 'mixed blepharitis']
    },
    'stye': {
        id: 9,
        slug: 'stye',
        name: 'Stye (Hordeolum)',
        nameAr: 'دمل الجفن',
        description: 'Infection of the eyelid glands',
        descriptionAr: 'عدوى غدد الجفن',
        icon: 'bi-circle-fill',
        color: '#5dade2',
        category: 'eye',
        symptoms: ['painful lump', 'swelling', 'tenderness', 'discharge'],
        symptomsAr: ['كتلة مؤلمة', 'تورم', 'حساسية', 'إفرازات'],
        commonConditions: ['external stye', 'internal stye', 'recurrent stye']
    },
    'dry-eye': {
        id: 10,
        slug: 'dry-eye',
        name: 'Dry Eye Syndrome',
        nameAr: 'متلازمة جفاف العين',
        description: 'Insufficient tear production or poor tear quality',
        descriptionAr: 'نقص إنتاج الدموع أو جودة الدموع الضعيفة',
        icon: 'bi-droplet',
        color: '#85c1e9',
        category: 'eye',
        symptoms: ['dry sensation', 'burning', 'foreign body feeling', 'blurred vision'],
        symptomsAr: ['إحساس بالجفاف', 'حرقة', 'شعور بجسم غريب', 'رؤية ضبابية'],
        commonConditions: ['aqueous tear deficiency', 'evaporative dry eye', 'mixed dry eye']
    },
    'cataracts': {
        id: 11,
        slug: 'cataracts',
        name: 'Cataracts',
        nameAr: 'الماء الأبيض',
        description: 'Clouding of the lens in the eye',
        descriptionAr: 'تعكر عدسة العين',
        icon: 'bi-cloud',
        color: '#aed6f1',
        category: 'eye',
        symptoms: ['cloudy vision', 'glare sensitivity', 'poor night vision', 'fading colors'],
        symptomsAr: ['رؤية ضبابية', 'حساسية للوهج', 'رؤية ليلية ضعيفة', 'ألوان باهتة'],
        commonConditions: ['age-related cataracts', 'congenital cataracts', 'traumatic cataracts']
    },
    'glaucoma': {
        id: 12,
        slug: 'glaucoma',
        name: 'Glaucoma',
        nameAr: 'الجلوكوما (الماء الأزرق)',
        description: 'Increased eye pressure damaging optic nerve',
        descriptionAr: 'زيادة ضغط العين وتلف العصب البصري',
        icon: 'bi-bullseye',
        color: '#7fb3d3',
        category: 'eye',
        symptoms: ['peripheral vision loss', 'eye pain', 'headache', 'nausea'],
        symptomsAr: ['فقدان الرؤية الجانبية', 'ألم العين', 'صداع', 'غثيان'],
        commonConditions: ['primary open-angle glaucoma', 'angle-closure glaucoma', 'secondary glaucoma']
    },
    'retinal-diseases': {
        id: 13,
        slug: 'retinal-diseases',
        name: 'Retinal Diseases',
        nameAr: 'أمراض الشبكية',
        description: 'Disorders affecting the retina',
        descriptionAr: 'اضطرابات تؤثر على الشبكية',
        icon: 'bi-camera',
        color: '#5499c7',
        category: 'eye',
        symptoms: ['vision loss', 'floaters', 'flashing lights', 'distorted vision'],
        symptomsAr: ['فقدان البصر', 'عوامات', 'أضواء وامضة', 'رؤية مشوهة'],
        commonConditions: ['diabetic retinopathy', 'macular degeneration', 'retinal detachment']
    },
    'refractive-errors': {
        id: 14,
        slug: 'refractive-errors',
        name: 'Refractive Errors',
        nameAr: 'عيوب الانكسار',
        description: 'Vision problems due to eye shape irregularities',
        descriptionAr: 'مشاكل الرؤية بسبب عدم انتظام شكل العين',
        icon: 'bi-eyeglasses',
        color: '#2e86c1',
        category: 'eye',
        symptoms: ['blurred vision', 'eye strain', 'headaches', 'squinting'],
        symptomsAr: ['رؤية ضبابية', 'إجهاد العين', 'صداع', 'حول'],
        commonConditions: ['myopia', 'hyperopia', 'astigmatism', 'presbyopia']
    },

    // Liver-related specialties
    'hepatitis': {
        id: 15,
        slug: 'hepatitis',
        name: 'Hepatitis',
        nameAr: 'التهاب الكبد',
        description: 'Liver inflammation caused by various factors',
        descriptionAr: 'التهاب الكبد الناجم عن عوامل مختلفة',
        icon: 'bi-heart-pulse',
        color: '#f39c12',
        category: 'liver',
        symptoms: ['jaundice', 'fatigue', 'abdominal pain', 'nausea'],
        symptomsAr: ['اليرقان', 'إعياء', 'ألم في البطن', 'غثيان'],
        commonConditions: ['hepatitis A', 'hepatitis B', 'hepatitis C', 'autoimmune hepatitis']
    },
    'cirrhosis': {
        id: 16,
        slug: 'cirrhosis',
        name: 'Liver Cirrhosis',
        nameAr: 'تليف الكبد',
        description: 'Scarring of the liver tissue',
        descriptionAr: 'تندب أنسجة الكبد',
        icon: 'bi-heart-half',
        color: '#d68910',
        category: 'liver',
        symptoms: ['ascites', 'swelling', 'confusion', 'bleeding'],
        symptomsAr: ['الاستسقاء', 'تورم', 'ارتباك', 'نزيف'],
        commonConditions: ['alcoholic cirrhosis', 'viral cirrhosis', 'cryptogenic cirrhosis']
    },
    'fatty-liver': {
        id: 17,
        slug: 'fatty-liver',
        name: 'Fatty Liver Disease',
        nameAr: 'مرض الكبد الدهني',
        description: 'Accumulation of fat in liver cells',
        descriptionAr: 'تراكم الدهون في خلايا الكبد',
        icon: 'bi-droplet-fill',
        color: '#f5b041',
        category: 'liver',
        symptoms: ['fatigue', 'right upper abdominal pain', 'weight loss'],
        symptomsAr: ['إعياء', 'ألم في الجانب الأيمن العلوي من البطن', 'فقدان الوزن'],
        commonConditions: ['non-alcoholic fatty liver', 'alcoholic fatty liver', 'NASH']
    },
    'liver-cancer': {
        id: 18,
        slug: 'liver-cancer',
        name: 'Liver Cancer',
        nameAr: 'سرطان الكبد',
        description: 'Malignant tumors in the liver',
        descriptionAr: 'أورام خبيثة في الكبد',
        icon: 'bi-exclamation-triangle',
        color: '#dc7633',
        category: 'liver',
        symptoms: ['unexplained weight loss', 'loss of appetite', 'upper abdominal pain'],
        symptomsAr: ['فقدان وزن غير مبرر', 'فقدان الشهية', 'ألم في البطن العلوي'],
        commonConditions: ['hepatocellular carcinoma', 'cholangiocarcinoma', 'metastatic liver cancer']
    },
    'liver-failure': {
        id: 19,
        slug: 'liver-failure',
        name: 'Liver Failure',
        nameAr: 'فشل الكبد',
        description: 'Severe decline in liver function',
        descriptionAr: 'انخفاض شديد في وظائف الكبد',
        icon: 'bi-heart-break',
        color: '#cb4335',
        category: 'liver',
        symptoms: ['jaundice', 'mental confusion', 'bleeding', 'fluid retention'],
        symptomsAr: ['اليرقان', 'ارتباك ذهني', 'نزيف', 'احتباس السوائل'],
        commonConditions: ['acute liver failure', 'chronic liver failure', 'fulminant hepatitis']
    },

    // Respiratory specialties
    'respiratory': {
        id: 20,
        slug: 'respiratory',
        name: 'Respiratory Diseases',
        nameAr: 'أمراض الجهاز التنفسي',
        description: 'Disorders of the lungs and respiratory system',
        descriptionAr: 'اضطرابات الرئتين والجهاز التنفسي',
        icon: 'bi-lungs',
        color: '#16a085',
        category: 'respiratory',
        symptoms: ['cough', 'shortness of breath', 'chest pain', 'wheezing'],
        symptomsAr: ['سعال', 'ضيق في التنفس', 'ألم في الصدر', 'أزيز'],
        commonConditions: ['asthma', 'COPD', 'pneumonia', 'bronchitis']
    },
    'asthma': {
        id: 21,
        slug: 'asthma',
        name: 'Asthma',
        nameAr: 'الربو',
        description: 'Chronic respiratory condition with airway inflammation',
        descriptionAr: 'حالة تنفسية مزمنة مع التهاب المجاري الهوائية',
        icon: 'bi-lungs-fill',
        color: '#138d75',
        category: 'respiratory',
        symptoms: ['wheezing', 'coughing', 'chest tightness', 'breathing difficulty'],
        symptomsAr: ['أزيز', 'سعال', 'ضيق في الصدر', 'صعوبة في التنفس'],
        commonConditions: ['allergic asthma', 'non-allergic asthma', 'exercise-induced asthma']
    },
    'copd': {
        id: 22,
        slug: 'copd',
        name: 'COPD',
        nameAr: 'مرض الانسداد الرئوي المزمن',
        description: 'Chronic obstructive pulmonary disease',
        descriptionAr: 'مرض الانسداد الرئوي المزمن',
        icon: 'bi-wind',
        color: '#48c9b0',
        category: 'respiratory',
        symptoms: ['chronic cough', 'sputum production', 'dyspnea', 'fatigue'],
        symptomsAr: ['سعال مزمن', 'إنتاج البلغم', 'ضيق التنفس', 'إعياء'],
        commonConditions: ['emphysema', 'chronic bronchitis', 'alpha-1 antitrypsin deficiency']
    },
    'pneumonia': {
        id: 23,
        slug: 'pneumonia',
        name: 'Pneumonia',
        nameAr: 'الالتهاب الرئوي',
        description: 'Infection that causes inflammation in lung air sacs',
        descriptionAr: 'عدوى تسبب التهاب في الحويصلات الهوائية للرئة',
        icon: 'bi-thermometer-half',
        color: '#5dade2',
        category: 'respiratory',
        symptoms: ['fever', 'chills', 'cough with phlegm', 'difficulty breathing'],
        symptomsAr: ['حمى', 'قشعريرة', 'سعال مع بلغم', 'صعوبة في التنفس'],
        commonConditions: ['bacterial pneumonia', 'viral pneumonia', 'fungal pneumonia']
    },
    'tuberculosis': {
        id: 24,
        slug: 'tuberculosis',
        name: 'Tuberculosis',
        nameAr: 'السل',
        description: 'Bacterial infection primarily affecting the lungs',
        descriptionAr: 'عدوى بكتيرية تؤثر في المقام الأول على الرئتين',
        icon: 'bi-bug',
        color: '#85c1e9',
        category: 'respiratory',
        symptoms: ['persistent cough', 'blood in sputum', 'weight loss', 'night sweats'],
        symptomsAr: ['سعال مستمر', 'دم في البلغم', 'فقدان الوزن', 'تعرق ليلي'],
        commonConditions: ['pulmonary TB', 'extrapulmonary TB', 'latent TB']
    },

    // Infectious diseases
    'infectious-diseases': {
        id: 25,
        slug: 'infectious-diseases',
        name: 'Infectious Diseases',
        nameAr: 'الأمراض المعدية',
        description: 'Diseases caused by microorganisms',
        descriptionAr: 'أمراض تسببها الكائنات الحية الدقيقة',
        icon: 'bi-virus',
        color: '#9b59b6',
        category: 'infectious',
        symptoms: ['fever', 'fatigue', 'body aches', 'chills'],
        symptomsAr: ['حمى', 'إعياء', 'آلام الجسم', 'قشعريرة'],
        commonConditions: ['viral infections', 'bacterial infections', 'parasitic infections']
    },
    'fever': {
        id: 26,
        slug: 'fever',
        name: 'Fever',
        nameAr: 'الحمى',
        description: 'Elevated body temperature response to infection',
        descriptionAr: 'ارتفاع درجة حرارة الجسم استجابة للعدوى',
        icon: 'bi-thermometer',
        color: '#bb8fce',
        category: 'infectious',
        symptoms: ['high temperature', 'sweating', 'chills', 'headache'],
        symptomsAr: ['درجة حرارة مرتفعة', 'تعرق', 'قشعريرة', 'صداع'],
        commonConditions: ['viral fever', 'bacterial fever', 'unknown origin fever']
    },
    'viral-infections': {
        id: 27,
        slug: 'viral-infections',
        name: 'Viral Infections',
        nameAr: 'العدوى الفيروسية',
        description: 'Infections caused by viruses',
        descriptionAr: 'عدوى تسببها الفيروسات',
        icon: 'bi-shield-x',
        color: '#8e44ad',
        category: 'infectious',
        symptoms: ['fever', 'fatigue', 'muscle aches', 'respiratory symptoms'],
        symptomsAr: ['حمى', 'إعياء', 'آلام العضلات', 'أعراض تنفسية'],
        commonConditions: ['common cold', 'flu', 'COVID-19', 'viral gastroenteritis']
    },
    'bacterial-infections': {
        id: 28,
        slug: 'bacterial-infections',
        name: 'Bacterial Infections',
        nameAr: 'العدوى البكتيرية',
        description: 'Infections caused by bacteria',
        descriptionAr: 'عدوى تسببها البكتيريا',
        icon: 'bi-bug-fill',
        color: '#a569bd',
        category: 'infectious',
        symptoms: ['fever', 'localized pain', 'swelling', 'pus formation'],
        symptomsAr: ['حمى', 'ألم موضعي', 'تورم', 'تكوين صديد'],
        commonConditions: ['strep throat', 'urinary tract infection', 'skin infections', 'pneumonia']
    },

    // Skin conditions (additional to general dermatology)
    'eczema': {
        id: 29,
        slug: 'eczema',
        name: 'Eczema',
        nameAr: 'الأكزيما',
        description: 'Inflammatory skin condition causing itchy rashes',
        descriptionAr: 'حالة جلدية التهابية تسبب طفح جلدي مثير للحكة',
        icon: 'bi-bandaid',
        color: '#e74c3c',
        category: 'skin',
        symptoms: ['itchy skin', 'red patches', 'dry skin', 'blisters'],
        symptomsAr: ['حكة في الجلد', 'بقع حمراء', 'جلد جاف', 'بثور'],
        commonConditions: ['atopic dermatitis', 'contact dermatitis', 'seborrheic dermatitis']
    },
    'psoriasis': {
        id: 30,
        slug: 'psoriasis',
        name: 'Psoriasis',
        nameAr: 'الصدفية',
        description: 'Autoimmune skin condition with scaly patches',
        descriptionAr: 'حالة جلدية مناعية ذاتية مع بقع متقشرة',
        icon: 'bi-layers',
        color: '#ec7063',
        category: 'skin',
        symptoms: ['scaly patches', 'itching', 'burning', 'joint pain'],
        symptomsAr: ['بقع متقشرة', 'حكة', 'حرقة', 'ألم المفاصل'],
        commonConditions: ['plaque psoriasis', 'guttate psoriasis', 'psoriatic arthritis']
    },
    'acne': {
        id: 31,
        slug: 'acne',
        name: 'Acne',
        nameAr: 'حب الشباب',
        description: 'Common skin condition affecting hair follicles',
        descriptionAr: 'حالة جلدية شائعة تؤثر على بصيلات الشعر',
        icon: 'bi-circle-fill',
        color: '#c0392b',
        category: 'skin',
        symptoms: ['pimples', 'blackheads', 'whiteheads', 'oily skin'],
        symptomsAr: ['بثور', 'رؤوس سوداء', 'رؤوس بيضاء', 'بشرة دهنية'],
        commonConditions: ['comedonal acne', 'inflammatory acne', 'cystic acne']
    },
    'skin-cancer': {
        id: 32,
        slug: 'skin-cancer',
        name: 'Skin Cancer',
        nameAr: 'سرطان الجلد',
        description: 'Malignant tumors in skin tissue',
        descriptionAr: 'أورام خبيثة في أنسجة الجلد',
        icon: 'bi-exclamation-triangle-fill',
        color: '#922b21',
        category: 'skin',
        symptoms: ['unusual moles', 'skin changes', 'sores that dont heal'],
        symptomsAr: ['شامات غير طبيعية', 'تغيرات الجلد', 'قروح لا تشفى'],
        commonConditions: ['basal cell carcinoma', 'squamous cell carcinoma', 'melanoma']
    },

    // General medicine
    'general-medicine': {
        id: 33,
        slug: 'general-medicine',
        name: 'General Medicine',
        nameAr: 'الطب العام',
        description: 'Comprehensive healthcare for common medical conditions',
        descriptionAr: 'رعاية صحية شاملة للحالات الطبية الشائعة',
        icon: 'bi-hospital',
        color: '#34495e',
        category: 'general',
        symptoms: ['various symptoms depending on condition'],
        symptomsAr: ['أعراض متنوعة حسب الحالة'],
        commonConditions: ['hypertension', 'diabetes', 'common cold', 'headaches']
    },
    'internal-medicine': {
        id: 34,
        slug: 'internal-medicine',
        name: 'Internal Medicine',
        nameAr: 'الباطنية',
        description: 'Medical care of adults with internal organ diseases',
        descriptionAr: 'الرعاية الطبية للبالغين مع أمراض الأعضاء الداخلية',
        icon: 'bi-heart',
        color: '#5d6d7e',
        category: 'general',
        symptoms: ['chest pain', 'abdominal pain', 'fatigue', 'shortness of breath'],
        symptomsAr: ['ألم في الصدر', 'ألم في البطن', 'إعياء', 'ضيق في التنفس'],
        commonConditions: ['heart disease', 'kidney disease', 'liver disease', 'endocrine disorders']
    },
    'family-medicine': {
        id: 35,
        slug: 'family-medicine',
        name: 'Family Medicine',
        nameAr: 'طب الأسرة',
        description: 'Comprehensive healthcare for all family members',
        descriptionAr: 'رعاية صحية شاملة لجميع أفراد الأسرة',
        icon: 'bi-people',
        color: '#2c3e50',
        category: 'general',
        symptoms: ['preventive care', 'routine checkups', 'chronic disease management'],
        symptomsAr: ['رعاية وقائية', 'فحوصات روتينية', 'إدارة الأمراض المزمنة'],
        commonConditions: ['preventive care', 'chronic conditions', 'acute illnesses', 'health maintenance']
    }
};

// Helper functions for specialty data
export function getSpecialtyBySlug(slug) {
    return specialties[slug];
}

export function getSpecialtiesByCategory(category) {
    return Object.values(specialties).filter(specialty => specialty.category === category);
}

export function getAllSpecialties() {
    return Object.values(specialties);
}

export function searchSpecialtiesBySymptom(symptomKeyword) {
    return Object.values(specialties).filter(specialty =>
        specialty.symptoms.some(symptom => 
            symptom.toLowerCase().includes(symptomKeyword.toLowerCase())
        ) ||
        specialty.symptomsAr.some(symptom => 
            symptom.includes(symptomKeyword)
        )
    );
}

export function getSpecialtyUrl(hospitalSlug, specialtySlug) {
    return `specialty.html?hospital=${hospitalSlug}&type=${specialtySlug}`;
}

export const specialtyCategories = {
    'general': {
        name: 'General Specialties',
        nameAr: 'التخصصات العامة',
        color: '#34495e',
        icon: 'bi-hospital'
    },
    'eye': {
        name: 'Eye Care',
        nameAr: 'طب العيون',
        color: '#3498db',
        icon: 'bi-eye'
    },
    'liver': {
        name: 'Liver Care',
        nameAr: 'طب الكبد',
        color: '#f39c12',
        icon: 'bi-heart-pulse'
    },
    'respiratory': {
        name: 'Respiratory Care',
        nameAr: 'طب الجهاز التنفسي',
        color: '#16a085',
        icon: 'bi-lungs'
    },
    'infectious': {
        name: 'Infectious Diseases',
        nameAr: 'الأمراض المعدية',
        color: '#9b59b6',
        icon: 'bi-virus'
    },
    'skin': {
        name: 'Skin Care',
        nameAr: 'طب الجلد',
        color: '#e74c3c',
        icon: 'bi-bandaid'
    },
    'specialized': {
        name: 'Specialized Care',
        nameAr: 'الرعاية المتخصصة',
        color: '#e67e22',
        icon: 'bi-star'
    }
};