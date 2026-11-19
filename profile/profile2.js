document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 0. ЛОГІКА БУРГЕР-МЕНЮ
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
    // 1. ЗАВАНТАЖЕННЯ ДАНИХ ПІСЛЯ РЕЄСТРАЦІЇ
    // ==========================================
    const rawUserData = localStorage.getItem('registeredUserProfile');
    let userData = rawUserData ? JSON.parse(rawUserData) : null;

    if (userData) {
        if (userData.name) document.getElementById('profileName').innerText = userData.name;
        if (userData.city) document.getElementById('profileCity').innerText = userData.city;
        if (userData.age !== undefined) document.getElementById('profileAge').innerText = userData.age;
        if (userData.moon) document.getElementById('profileMoon').innerText = userData.moon;
        if (userData.looking) document.getElementById('profileLooking').innerText = userData.looking;
        if (userData.about) document.getElementById('profileAbout').innerText = userData.about;

        // Підставляємо два перших завантажених зображення
        const avatarDefault = document.getElementById('avatarDefault');
        const avatarHover = document.getElementById('avatarHover');

        if (userData.photo1) {
            avatarDefault.src = userData.photo1;
            avatarHover.src = userData.photo2 ? userData.photo2 : userData.photo1;
        } else if (userData.photo2) {
            avatarDefault.src = userData.photo2;
            avatarHover.src = userData.photo2;
        }
    }

    // ==========================================
    // 2. ЛОГІКА РЕДАГУВАННЯ ПРОФІЛЮ
    // ==========================================
    const editBtn = document.getElementById('editBtn');
    const editableFields = [
        { id: 'profileName', key: 'name', type: 'input' },
        { id: 'profileCity', key: 'city', type: 'input' },
        { id: 'profileAge', key: 'age', type: 'input' },
        { id: 'profileMoon', key: 'moon', type: 'input' },
        { id: 'profileLooking', key: 'looking', type: 'textarea' },
        { id: 'profileAbout', key: 'about', type: 'textarea' }
    ];

    let isEditing = false;

    if (editBtn) {
        editBtn.addEventListener('click', function() {
            if (!isEditing) {
                editableFields.forEach(field => {
                    const element = document.getElementById(field.id);
                    const currentText = element.innerText;

                    let inputElement;
                    if (field.type === 'textarea') {
                        inputElement = document.createElement('textarea');
                        inputElement.rows = 4;
                        inputElement.style.cssText = 'width:100%; background:transparent; border:1px dashed rgba(255,255,255,0.5); border-radius:8px; padding:5px; color:#fff; font-family:inherit; font-size:inherit; line-height:inherit; resize:none; outline:none;';
                    } else {
                        inputElement = document.createElement('input');
                        inputElement.type = 'text';
                        inputElement.style.cssText = 'width:100%; background:transparent; border-bottom:1px dashed rgba(255,255,255,0.5); color:#fff; font-family:inherit; font-size:inherit; font-weight:inherit; outline:none;';
                    }

                    inputElement.value = currentText;
                    inputElement.id = field.id + '_input';

                    element.innerHTML = '';
                    element.appendChild(inputElement);
                });

                editBtn.innerText = 'Зберегти';
                isEditing = true;
            } else {
                if (!userData) userData = {};

                editableFields.forEach(field => {
                    const inputElement = document.getElementById(field.id + '_input');
                    const newValue = inputElement.value;

                    document.getElementById(field.id).innerText = newValue;
                    userData[field.key] = newValue;
                });

                localStorage.setItem('registeredUserProfile', JSON.stringify(userData));

                editBtn.innerText = 'Редагувати';
                isEditing = false;
            }
        });
    }

    // ==========================================
    // 3. ЛОГІКА ВИХОДУ З АКАУНТУ
    // ==========================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Очищаємо лише стан сесії, а створений профіль залишаємо у localStorage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('activeProfileType');
            window.location.href = "../main/index.html";
        });
    }

    // ==========================================
    // 4. ЛОГІКА ПЕРЕМИКАННЯ АВАТАРА (ДЛЯ ТЕЛЕФОНІВ)
    // ==========================================
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    if (avatarWrapper) {
        avatarWrapper.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});