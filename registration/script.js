const uploadedPhotos = {
    1: '',
    2: '',
    3: ''
};

function previewImage(event, inputElement) {
    const file = event.target.files[0];
    
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Будь ласка, виберіть файл зображення (jpg, png, тощо).');
            return;
        }

        const reader = new FileReader();
        const box = inputElement.closest('.upload-box');
        const img = box.querySelector('.preview-img');
        const boxNumber = inputElement.id.split('-')[1];
        
        reader.onload = function(e) {
            img.src = e.target.result;
            box.classList.add('has-image');
            uploadedPhotos[boxNumber] = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
}

function calculateAge(birthDateString) {
    if (!birthDateString) return 'Не вказано';
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = form.querySelector('input[name="firstName"]').value.trim();
            const lastName = form.querySelector('input[name="lastName"]').value.trim();
            const fullName = `${firstName} ${lastName}`.trim();
            
            const birthDate = form.querySelector('input[name="birthDate"]').value;
            const age = calculateAge(birthDate);
            
            const location = form.querySelector('input[name="location"]').value.trim() || 'Не вказано';
            
            const moonSelect = form.querySelector('select[name="moonPhase"]');
            const moonPhase = moonSelect.selectedIndex > 0 
                ? moonSelect.options[moonSelect.selectedIndex].text 
                : 'Не обрано';
            
            const genderInput = form.querySelector('input[name="gender"]:checked');
            const gender = genderInput ? genderInput.value : 'other';
            
            const relationshipType = form.querySelector('input[name="relationshipType"]').value.trim() || 'Не вказано';
            const about = form.querySelector('textarea[name="about"]').value.trim() || 'Інформація відсутня';

            // Зберігаємо логін і пароль для подальшого входу
            const username = form.querySelector('input[name="username"]').value.trim();
            const password = form.querySelector('input[name="password"]').value;

            const userData = {
                username: username,
                password: password,
                name: fullName || firstName,
                age: age,
                city: location,
                moon: moonPhase,
                gender: gender,
                looking: relationshipType,
                about: about,
                photo1: uploadedPhotos[1],
                photo2: uploadedPhotos[2]
            };

            try {
                localStorage.setItem('registeredUserProfile', JSON.stringify(userData));
                
                // Позначаємо в поточній сесії, що ми увійшли у створений профіль
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('activeProfileType', 'registered');
                
                alert('Реєстрація успішна! Ласкаво просимо до зграї!');
                window.location.href = '../profile/profile2.html'; 
            } catch (error) {
                alert('Завантажені фото занадто великі для збереження у браузері. Спробуйте обрати легші файли.');
                console.error(error);
            }
        });
    }
});