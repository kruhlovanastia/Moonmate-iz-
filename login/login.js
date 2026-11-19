document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const DEFAULT_USERNAME = "max95";
    const DEFAULT_PASSWORD = "123456";

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const enteredUsername = usernameInput.value.trim();
            const enteredPassword = passwordInput.value;

            if (!enteredUsername || !enteredPassword) {
                alert("Будь ласка, заповніть всі поля!");
                return;
            }

            // Перевіряємо, чи є зареєстрований користувач у localStorage
            const rawRegisteredUser = localStorage.getItem('registeredUserProfile');
            const registeredUser = rawRegisteredUser ? JSON.parse(rawRegisteredUser) : null;

            if (
                registeredUser &&
                enteredUsername === registeredUser.username &&
                enteredPassword === registeredUser.password
            ) {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('activeProfileType', 'registered');
                window.location.href = "../profile/profile2.html";
                return;
            }
            if (enteredUsername === DEFAULT_USERNAME && enteredPassword === DEFAULT_PASSWORD) {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('activeProfileType', 'default');
                window.location.href = "../profile/profile.html";
            } else {
                alert("Неправильне ім'я користувача або пароль!");
                passwordInput.value = "";
                passwordInput.focus();
            }
        });
    }
});