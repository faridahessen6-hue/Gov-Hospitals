// Hospital Data Configuration
// This file contains all hospital data for dynamic page generation

export const hospitals = [
    {
        id: 1,
        urlSlug: 'al3am',
        name: 'Al-3am Hospital',
        nameAr: 'مستشفى العام',
        description: 'Specialized Healthcare Services',
        descriptionAr: 'خدمات رعاية صحية متخصصة',
        primaryColor: '#1a5f7a',
        secondaryColor: '#57c5b6',
        accentColor: '#159895',
        icon: 'hospital',
        logo: 'bi-hospital',
        phone: '+20 100 123 4567',
        address: '123 Main St, Cairo, Egypt',
        addressAr: '123 شارع رئيسي، القاهرة، مصر',
        specialties: ['cardiology', 'neurology', 'pediatrics', 'orthopedics', 'dermatology']
    },
    {
        id: 2,
        urlSlug: 'elkebd',
        name: 'El Kebd Hospital',
        nameAr: 'مستشفى الكبد',
        description: 'Specialized Liver and Digestive Diseases Care',
        descriptionAr: 'رعاية متخصصة لأمراض الكبد والجهاز الهضمي',
        primaryColor: '#f39c12',
        secondaryColor: '#f5b041',
        accentColor: '#d68910',
        icon: 'activity',
        logo: 'bi-activity',
        phone: '+20 100 123 4572',
        address: '303 Liver St, Cairo, Egypt',
        addressAr: '303 شارع الكبد، القاهرة، مصر',
        specialties: ['hepatitis', 'cirrhosis', 'fatty-liver', 'liver-cancer', 'liver-failure']
    },
    {
        id: 3,
        urlSlug: 'elramad',
        name: 'El Ramad Hospital',
        nameAr: 'مستشفى الرمد',
        description: 'Specialized Eye Care Services',
        descriptionAr: 'خدمات رعاية العيون المتخصصة',
        primaryColor: '#3498db',
        secondaryColor: '#5dade2',
        accentColor: '#1f618d',
        icon: 'eye',
        logo: 'bi-eye',
        phone: '+20 100 123 4568',
        address: '456 Vision St, Cairo, Egypt',
        addressAr: '456 شارع الرؤية، القاهرة، مصر',
        specialties: ['conjunctivitis', 'keratitis', 'blepharitis', 'stye', 'dry-eye', 'cataracts', 'glaucoma', 'retinal-diseases', 'refractive-errors']
    },
    {
        id: 4,
        urlSlug: 'elgeldia',
        name: 'El Geldia Hospital',
        nameAr: 'مستشفى الجلدية',
        description: 'Specialized Dermatology and Skin Care',
        descriptionAr: 'رعاية متخصصة للأمراض الجلدية',
        primaryColor: '#e74c3c',
        secondaryColor: '#ec7063',
        accentColor: '#c0392b',
        icon: 'bandaid',
        logo: 'bi-bandaid',
        phone: '+20 100 123 4569',
        address: '789 Skin Care Blvd, Cairo, Egypt',
        addressAr: '789 شارع العناية بالبشرة، القاهرة، مصر',
        specialties: ['dermatology', 'eczema', 'psoriasis', 'acne', 'skin-cancer']
    },
    {
        id: 5,
        urlSlug: 'elhomiat',
        name: 'El Homiat Hospital',
        nameAr: 'مستشفى الحميات',
        description: 'Infectious Diseases and Fever Care',
        descriptionAr: 'رعاية الأمراض المعدية والحميات',
        primaryColor: '#9b59b6',
        secondaryColor: '#bb8fce',
        accentColor: '#8e44ad',
        icon: 'thermometer',
        logo: 'bi-thermometer',
        phone: '+20 100 123 4570',
        address: '101 Fever Ave, Cairo, Egypt',
        addressAr: '101 شارع الحمى، القاهرة، مصر',
        specialties: ['infectious-diseases', 'fever', 'viral-infections', 'bacterial-infections']
    },
    {
        id: 6,
        urlSlug: 'elsader',
        name: 'El Sader Hospital',
        nameAr: 'مستشفى الصدر',
        description: 'Chest and Respiratory Diseases',
        descriptionAr: 'أمراض الصدر والجهاز التنفسي',
        primaryColor: '#16a085',
        secondaryColor: '#48c9b0',
        accentColor: '#138d75',
        icon: 'lungs',
        logo: 'bi-lungs',
        phone: '+20 100 123 4571',
        address: '202 Chest St, Cairo, Egypt',
        addressAr: '202 شارع الصدر، القاهرة، مصر',
        specialties: ['respiratory', 'asthma', 'copd', 'pneumonia', 'tuberculosis']
    },
    {
        id: 7,
        urlSlug: 'elramed',
        name: 'El Ramed Hospital',
        nameAr: 'مستشفى الراميد',
        description: 'General Medical Services',
        descriptionAr: 'خدمات طبية عامة',
        primaryColor: '#34495e',
        secondaryColor: '#5d6d7e',
        accentColor: '#2c3e50',
        icon: 'hospital',
        logo: 'bi-hospital',
        phone: '+20 100 123 4573',
        address: '404 Medical Center, Cairo, Egypt',
        addressAr: '404 المركز الطبي، القاهرة، مصر',
        specialties: ['general-medicine', 'internal-medicine', 'family-medicine']
    }
];

// Helper functions for hospital data
export function getHospitalBySlug(slug) {
    return hospitals.find(hospital => hospital.urlSlug === slug);
}

export function getHospitalById(id) {
    return hospitals.find(hospital => hospital.id === parseInt(id));
}

export function getAllHospitals() {
    return hospitals;
}

export function getHospitalsBySpecialty(specialtySlug) {
    return hospitals.filter(hospital => 
        hospital.specialties.includes(specialtySlug)
    );
}

// Generate hospital URLs for navigation
export function getHospitalUrl(hospital) {
    return `hospital.html?name=${hospital.urlSlug}`;
}

export function getSpecialtyUrl(hospitalSlug, specialtySlug) {
    return `specialty.html?hospital=${hospitalSlug}&type=${specialtySlug}`;
}