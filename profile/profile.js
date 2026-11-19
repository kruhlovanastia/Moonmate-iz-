document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 0. ЛОГІКА БУРГЕР-МЕНЮ (ДОДАНО)
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('is-active');
        });
    }

    // ==========================================
    // 1. ЛОГІКА РЕДАГУВАННЯ ПРОФІЛЮ
    // ==========================================
    const editBtn = document.getElementById('editBtn');
    
    // Масив об'єктів, що описують поля для редагування
    const editableFields = [
        { id: 'profileName', type: 'input', label: 'Ім\'я' },
        { id: 'profileCity', type: 'input', label: 'Місто' },
        { id: 'profileAge', type: 'input', label: 'Вік' },
        { id: 'profileMoon', type: 'input', label: 'Фаза місяця' },
        { id: 'profileLooking', type: 'textarea', label: 'Шукаю' },
        { id: 'profileAbout', type: 'textarea', label: 'Про себе' }
    ];

    let isEditing = false;

    // --- ЗАВАНТАЖЕННЯ ДАНИХ ПРИ ВІДКРИТТІ СТОРІНКИ ---
    editableFields.forEach(field => {
        const savedValue = sessionStorage.getItem('profile_' + field.id);
        if (savedValue) {
            document.getElementById(field.id).innerText = savedValue;
        }
    });

    // --- РЕДАГУВАННЯ / ЗБЕРЕЖЕННЯ ---
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            if (!isEditing) {
                // --- РЕЖИМ РЕДАГУВАННЯ ---
                editableFields.forEach(field => {
                    const element = document.getElementById(field.id);
                    const currentText = element.innerText;
                    
                    let inputElement;
                    if (field.type === 'textarea') {
                        inputElement = document.createElement('textarea');
                        inputElement.rows = 4;
                        inputElement.style.width = '100%';
                        inputElement.style.background = 'transparent';
                        inputElement.style.border = 'none';
                        inputElement.style.color = '#fff';
                        inputElement.style.fontFamily = 'inherit';
                        inputElement.style.fontSize = 'inherit';
                        inputElement.style.lineHeight = 'inherit';
                        inputElement.style.resize = 'none';
                        inputElement.style.outline = 'none';
                    } else {
                        inputElement = document.createElement('input');
                        inputElement.type = 'text';
                        inputElement.style.width = '100%';
                        inputElement.style.background = 'transparent';
                        inputElement.style.border = 'none';
                        inputElement.style.color = '#fff';
                        inputElement.style.fontFamily = 'inherit';
                        inputElement.style.fontSize = 'inherit';
                        inputElement.style.fontWeight = 'inherit';
                        inputElement.style.outline = 'none';
                    }
                    
                    inputElement.value = currentText;
                    inputElement.id = field.id + '_input'; 
                    
                    element.innerHTML = '';
                    element.appendChild(inputElement);
                });

                editBtn.innerText = 'Зберегти';
                isEditing = true;

            } else {
                // --- РЕЖИМ ЗБЕРЕЖЕННЯ ---
                editableFields.forEach(field => {
                    const inputElement = document.getElementById(field.id + '_input');
                    const newValue = inputElement.value;
                    
                    const element = document.getElementById(field.id);
                    element.innerText = newValue; 
                    
                    sessionStorage.setItem('profile_' + field.id, newValue);
                });

                editBtn.innerText = 'Редагувати';
                isEditing = false;
            }
        });
    }

    // ==========================================
    // 2. ЛОГІКА ВИХОДУ З АКАУНТУ
    // ==========================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = "../main/index.html";
        });
    }

    // ==========================================
    // 3. ЛОГІКА ПЕРЕМИКАННЯ АВАТАРА (ДЛЯ ТЕЛЕФОНІВ)
    // ==========================================
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    if (avatarWrapper) {
        avatarWrapper.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});