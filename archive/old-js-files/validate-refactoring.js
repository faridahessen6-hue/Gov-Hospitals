// Validation Script for Refactoring
// This script validates that the refactoring was successful

import fs from 'fs';
import path from 'path';

const REQUIRED_STRUCTURE = {
    'assets/css/global.css': 'Global CSS variables and styles',
    'assets/css/components.css': 'Component-specific styles',
    'components/common/header.js': 'Main header component',
    'components/common/footer.js': 'Footer component',
    'components/common/layout.js': 'Layout manager',
    'components/ui/typewriter.js': 'Typewriter effect utility',
    'components/ui/chat-core.js': 'Chat interface',
    'core/dom.js': 'DOM utilities',
    'data/age-groups.js': 'Age group configurations',
    'data/config.js': 'App configuration',
    'pages/home/home.js': 'Home page logic',
    'pages/hospitals/hospitals.js': 'Hospitals page logic',
    'pages/hospitals/animation.js': 'Hospital animation',
    'pages/booking/booking-core.js': 'Unified booking logic',
    'pages/contact/contact.js': 'Contact page logic',
    'pages/auth/login.js': 'Login page logic',
    'templates/base.html': 'Base HTML template',
    'js/header.js': 'Legacy header wrapper',
    'js/footer.js': 'Legacy footer wrapper',
    'src/bootstrap.js': 'Main app router'
};

const REMOVED_FILES = [
    'src/layouts/main.html',
    'src/core/dom.js',
    'src/data/age-groups.js',
    'src/ui/header.js',
    'src/ui/footer.js'
];

console.log('🔍 Validating Refactoring Results...\n');

// Check required files exist
let allExists = true;
console.log('📁 Checking Required Files:');
for (const [filePath, description] of Object.entries(REQUIRED_STRUCTURE)) {
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${filePath} - ${description}`);
    } else {
        console.log(`❌ MISSING: ${filePath} - ${description}`);
        allExists = false;
    }
}

console.log('\n🗑️ Checking Removed Files:');
let allRemoved = true;
for (const filePath of REMOVED_FILES) {
    if (!fs.existsSync(filePath)) {
        console.log(`✅ REMOVED: ${filePath}`);
    } else {
        console.log(`❌ STILL EXISTS: ${filePath}`);
        allRemoved = false;
    }
}

// Check import path consistency
console.log('\n🔗 Checking Import Path Updates:');

// Check src/bootstrap.js
const bootstrapContent = fs.readFileSync('src/bootstrap.js', 'utf8');
const hasCorrectHeaderImport = bootstrapContent.includes("from '../components/common/header.js'");
const hasCorrectFooterImport = bootstrapContent.includes("from '../components/common/footer.js'");
const hasCorrectBookingImport = bootstrapContent.includes("from '../pages/booking/booking-core.js'");

console.log(`${hasCorrectHeaderImport ? '✅' : '❌'} Bootstrap.js header import`);
console.log(`${hasCorrectFooterImport ? '✅' : '❌'} Bootstrap.js footer import`);
console.log(`${hasCorrectBookingImport ? '✅' : '❌'} Bootstrap.js booking import`);

// Final Summary
console.log('\n📊 Refactoring Summary:');
console.log(`Required files: ${allExists ? '✅ All present' : '❌ Some missing'}`);
console.log(`Old files cleaned: ${allRemoved ? '✅ All removed' : '❌ Some remain'}`);
console.log(`Import paths: ${hasCorrectHeaderImport && hasCorrectFooterImport && hasCorrectBookingImport ? '✅ Updated correctly' : '❌ Need fixes'}`);

if (allExists && allRemoved && hasCorrectHeaderImport && hasCorrectFooterImport && hasCorrectBookingImport) {
    console.log('\n🎉 REFACTORING SUCCESSFUL! All requirements met.');
    process.exit(0);
} else {
    console.log('\n⚠️ REFACTORING ISSUES FOUND. Please review above errors.');
    process.exit(1);
}