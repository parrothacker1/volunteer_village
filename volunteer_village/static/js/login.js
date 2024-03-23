function login() {
    // Get the values from the form
    var role = document.getElementById('role').value;
    var email = document.getElementById('Email').value;
    var password = document.getElementById('password').value;

    // Create a data object to send with the POST request
    var data = {
        email: email,
        password: password
    };

    // Determine the endpoint based on the role
    var endpoint = role === 'Organiser' ? '/api/organiser/login' : '/api/volunteer/login';

    // Send a POST request to the FastAPI backend
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the index.html page
            window.location.href = '/';
        } else {
            console.error('Login failed');
            // Handle other types of responses (e.g., display error messages)
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle network errors or other exceptions
    });
}

    
    