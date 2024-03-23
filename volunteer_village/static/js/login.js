function login() {
    // Get the values from the form
    var role = document.getElementById('role').value;
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    // Create a data object to send with the POST request
    var data = {
        input: {
            email: email,
            password: password
        }
    };

    // Send a POST request to the FastAPI backend
    if(role==='Organiser'){
    fetch('/api/organisation/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the index.html page
            window.location.href = '../static/templates/index.html';
        } else {
            console.error('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });}
    else{
        fetch('/api/volunteer/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the index.html page
            window.location.href = '../static/templates/index.html';
        } else {
            console.error('Login failed');
        }
    })}};