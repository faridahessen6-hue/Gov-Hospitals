# Header Features Extraction from New HTML

## 🎨 **Styling Features to Extract:**

### **1. New CSS Variables:**
```css
:root {
    --primary-color: #1a5f7a;
    --secondary-color: #57c5b6;
    --accent-color: #159895;
    --light-color: #f8f9fa;
    --dark-color: #212529;
}
```

### **2. Typography Enhancement:**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### **3. Body Styling Updates:**
```css
body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--dark-color);
    padding-top: 76px; /* Account for fixed header */
}
```

## 🔧 **Technical Features to Add:**

### **1. Data Attribute Support:**
```html
<div id="header" data-header data-header-title="GovHealthcare" data-header-logo="hospital" data-header-fixed="true"></div>
```

### **2. Auto-initialization Logic:**
Support for automatic initialization when `data-header` attribute is detected.

### **3. Enhanced Configuration:**
- `data-header-title`: Header title
- `data-header-logo`: Header logo icon
- `data-header-fixed`: Fixed positioning
- `data-header-show-theme-toggle`: Theme toggle visibility
- `data-header-show-language-toggle`: Language toggle visibility

## 📱 **Design Requirements:**

### **Header Structure:**
- Professional government portal design
- Fixed position with proper spacing
- Bootstrap-based responsive navigation
- Theme and language toggles
- Mobile hamburger menu
- Clean, modern typography

### **Color Scheme:**
- Primary: #1a5f7a (Dark teal)
- Secondary: #57c5b6 (Light teal) 
- Accent: #159895 (Medium teal)
- Professional, government-appropriate colors

## 🚀 **Implementation Strategy:**

1. **Update `components/common/header.js`** with new design and data attribute support
2. **Create enhanced CSS** with new color variables and Roboto font
3. **Update `templates/base-template.js`** to support new features
4. **Maintain backward compatibility** with current initialization methods