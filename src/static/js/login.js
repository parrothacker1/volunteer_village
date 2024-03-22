
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = new FormData(this);
        var email = formData.get('Email');
        var password = formData.get('password');

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            return response.json();
        })
        .then(data => {
            // Store access token in local storage
            localStorage.setItem('access_token', data.access_token);
            // Store refresh token in session storage
            sessionStorage.setItem('refresh_token', data.refresh_token);
            console.log('Login successful');
        })
        .catch(error => {
            console.error('Login failed:', error.message);
        });
    });