document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // DOM elements
    const logoPreview = document.getElementById('logo-preview');
    const shapeElement = document.getElementById('shape-element');
    const iconElement = document.getElementById('icon-element');
    const logoTextElement = document.getElementById('logo-text-element');
    const loadingElement = document.getElementById('loading');
    const templatesGrid = document.getElementById('templates-grid');
    const templatesSection = document.getElementById('templates-section');
    
    // Form elements
    const logoTextInput = document.getElementById('logo-text');
    const gradientSelect = document.getElementById('gradient-select');
    const shapeSelect = document.getElementById('shape-select');
    const iconSelect = document.getElementById('icon-select');
    const fontSelect = document.getElementById('font-select');
    const bgOpacityInput = document.getElementById('bg-opacity');
    const textSizeInput = document.getElementById('text-size');
    const toggleAdvancedBtn = document.querySelector('.toggle-advanced');
    const advancedOptions = document.querySelector('.advanced-options');
    
    // Button elements
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const saveBtn = document.getElementById('save-btn');
    
    // Data
    const gradients = [
        'linear-gradient(135deg, #8A2BE2, #E6E6FA)',
        'linear-gradient(135deg, #8A2BE2, #20B2AA)',
        'linear-gradient(135deg, #8A2BE2, #FF6B6B)',
        'linear-gradient(135deg, #8A2BE2, #FFD93D)',
        'linear-gradient(135deg, #8A2BE2, #6BCB77)',
        'linear-gradient(135deg, #FF6B6B, #FFD93D)',
        'linear-gradient(135deg, #6BCB77, #4D96FF)',
        'linear-gradient(135deg, #F46036, #8D6AFF)',
        'linear-gradient(135deg, #00B8D9, #9D4EDD)',
        'linear-gradient(135deg, #43AA8B, #F25F5C)'
    ];
    
    const shapes = ['circle', 'square', 'triangle', 'hexagon', 'star'];
    const fonts = [
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        "Georgia, 'Times New Roman', Times, serif",
        "'Courier New', Courier, monospace",
        "'Brush Script MT', cursive",
        "Impact, Haettenschweiler, sans-serif"
    ];
    
    const icons = ['star', 'smile', 'rocket', 'heart', 'camera', 'zap', 'palette', 'globe', 'code', 'music'];
    
    let savedTemplates = JSON.parse(localStorage.getItem('logo-templates')) || [];
    
    // Toggle advanced options
    toggleAdvancedBtn.addEventListener('click', function() {
        advancedOptions.classList.toggle('hidden');
        this.textContent = advancedOptions.classList.contains('hidden') ? 
            'Advanced Options' : 'Hide Options';
    });
    
    // Generate random logo
    function generateRandomLogo() {
        const logoText = logoTextInput.value || 'Swift';
        const gradient = gradientSelect.value === 'random' ? 
            gradients[Math.floor(Math.random() * gradients.length)] : 
            gradientSelect.value;
        
        const shape = shapeSelect.value === 'random' ? 
            shapes[Math.floor(Math.random() * shapes.length)] : 
            shapeSelect.value;
        
        const icon = iconSelect.value === 'random' ? 
            icons[Math.floor(Math.random() * icons.length)] : 
            iconSelect.value;
        
        const font = fontSelect.value === 'random' ? 
            fonts[Math.floor(Math.random() * fonts.length)] : 
            fontSelect.value;
        
        const bgOpacity = parseFloat(bgOpacityInput.value);
        const textSize = parseFloat(textSizeInput.value);
        
        return {
            text: logoText,
            gradient,
            shape,
            icon,
            font,
            bgOpacity,
            textSize
        };
    }
    
    // Update logo preview
    function updateLogo(logo) {
        // Update background
        logoPreview.style.backgroundImage = logo.gradient;
        logoPreview.style.opacity = logo.bgOpacity;
        
        // Update shape
        shapeElement.className = 'shape ' + logo.shape;
        
        // Update icon
        const iconSvg = document.querySelector('#icon-element svg');
        if (iconSvg) {
            iconSvg.remove();
        }
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', logo.icon);
        iconElement.appendChild(newIcon);
        lucide.createIcons();
        
        // Update text
        logoTextElement.textContent = logo.text;
        logoTextElement.style.fontFamily = logo.font;
        logoTextElement.style.fontSize = `${logo.textSize}rem`;
    }
    
    // Generate button click
    generateBtn.addEventListener('click', function() {
        const newLogo = generateRandomLogo();
        updateLogo(newLogo);
    });
    
    // Save template
    saveBtn.addEventListener('click', function() {
        const currentLogo = {
            text: logoTextInput.value || 'Swift',
            gradient: logoPreview.style.backgroundImage,
            shape: shapeSelect.value === 'random' ? 
                shapes[Math.floor(Math.random() * shapes.length)] : 
                shapeSelect.value,
            icon: iconSelect.value === 'random' ? 
                icons[Math.floor(Math.random() * icons.length)] : 
                iconSelect.value,
            font: fontSelect.value === 'random' ? 
                fonts[Math.floor(Math.random() * fonts.length)] : 
                fontSelect.value,
            bgOpacity: parseFloat(bgOpacityInput.value),
            textSize: parseFloat(textSizeInput.value)
        };
        
        savedTemplates.push(currentLogo);
        localStorage.setItem('logo-templates', JSON.stringify(savedTemplates));
        renderTemplates();
        
        // Show notification
        alert('Template saved successfully!');
    });
    
    // Download logo
    downloadBtn.addEventListener('click', function() {
        loadingElement.classList.remove('hidden');
        
        setTimeout(() => {
            html2canvas(logoPreview).then(canvas => {
                const link = document.createElement('a');
                const logoText = logoTextInput.value || 'logo';
                link.download = `${logoText.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                loadingElement.classList.add('hidden');
            });
        }, 100);
    });
    
    // Render saved templates
    function renderTemplates() {
        templatesGrid.innerHTML = '';
        
        if (savedTemplates.length === 0) {
            templatesSection.style.display = 'none';
            return;
        }
        
        templatesSection.style.display = 'block';
        
        savedTemplates.forEach((template, index) => {
            const templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            templateItem.style.backgroundImage = template.gradient;
            templateItem.style.opacity = template.bgOpacity || 1;
            templateItem.style.fontFamily = template.font;
            
            const templateIcon = document.createElement('div');
            templateIcon.innerHTML = `<i data-lucide="${template.icon}"></i>`;
            
            const templateText = document.createElement('div');
            templateText.className = 'template-text';
            templateText.textContent = template.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-template';
            deleteBtn.innerHTML = '×';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                savedTemplates.splice(index, 1);
                localStorage.setItem('logo-templates', JSON.stringify(savedTemplates));
                renderTemplates();
            });
            
            templateItem.appendChild(templateIcon);
            templateItem.appendChild(templateText);
            templateItem.appendChild(deleteBtn);
            templateItem.addEventListener('click', () => {
                updateLogo(template);
                logoTextInput.value = template.text;
            });
            
            templatesGrid.appendChild(templateItem);
        });
        
        lucide.createIcons();
    }
    
    // Initial render
    updateLogo(generateRandomLogo());
    renderTemplates();
});
