import { setValue, getValue, onClick } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/element.js';
        import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.8/api.js';

        async function registerUser(event) {
            event.preventDefault(); // Prevent default form submission

            const name = getValue('register-name');
            const phone = getValue('register-phone');
            const email = getValue('register-email');
            const password = getValue('register-password');

            // Simple validation
            if (!name || !phone || !email || !password) {
                alert('Please fill in all fields');
                return;
            }

            const userData = {
                Name: name,
                PhoneNumber: phone,
                Email: email,
                Password: password
            };

            try {
                const response = await postJSON('https://asia-southeast2-awangga.cloudfunctions.net/logiccoffee/auth/register', userData);
                if (response.Status === "OK") {
                    alert('Registration Successful');
                    setValue('register-name', '');
                    setValue('register-phone', '');
                    setValue('register-email', '');
                    setValue('register-password', '');
                } else {
                    alert('Registration Failed: ' + response.Response);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration. Please try again later.');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            onClick('register-button', registerUser);
        });
