document.addEventListener("DOMContentLoaded", function() {
    // Function to handle user login
    function loginUser(username) {
        const loggedInUser = username; // Replace with actual logged-in user's name
        const loginSignupLink = document.querySelector('.navbar a[href="/access-account"]');
        loginSignupLink.innerHTML = `<i class="ph ph-user"></i>${loggedInUser}`;

        // Create dropdown menu for user actions
        const userDropdown = document.createElement('div');
        userDropdown.classList.add('dropdown');
        userDropdown.innerHTML = `
            <a class="dropbtn" href="#">${loggedInUser}</a>
            <div class="dropdown-content">
                <a href="#show-profile">Show Profile</a>
                <a href="#" id="sign-out">Sign Out</a>
            </div>
        `;

        // Replace Log In/SignUp with user's dropdown menu
        document.querySelector('.navbar div').replaceChild(userDropdown, loginSignupLink);

        // Add event listener for sign-out button
        document.getElementById('sign-out').addEventListener('click', function(event) {
            event.preventDefault();
            // Clear tokens and revert navbar to initial state
            localStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
            revertNavbar();
        });
    }

    // Function to revert navbar to initial state (showing Log In/SignUp link)
    function revertNavbar() {
        const loginSignupLink = document.createElement('a');
        loginSignupLink.href = '/access-account';
        loginSignupLink.textContent = 'Log In/SignUp';
        document.querySelector('.navbar div').replaceChildren(loginSignupLink);
    }

    // Function to handle saving access token and refresh token
    function saveTokens(access_token, refresh_token) {
        // Save access token in local storage for 120 days
        localStorage.setItem('access_token', access_token);
        // Save refresh token in session storage for 15 minutes
        sessionStorage.setItem('refresh_token', refresh_token);

        // Simulate user login with saved access token
        fetch('/get-username', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                loginUser(data.username);
            }
        })
        .catch(error => console.error('Error fetching username:', error));
    }

    // Make a POST request to the login endpoint
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // Add any necessary login credentials (e.g., username, password)
            // For example:
            // username: 'your_username',
            // password: 'your_password'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        return response.json();
    })
    .then(data => {
        // Extract access token and refresh token from the response
        const { access_token, refresh_token } = data;
        if (access_token && refresh_token) {
            saveTokens(access_token, refresh_token);
        } else {
            throw new Error('Access token or refresh token missing in response');
        }
    })
    .catch(error => console.error('Login failed:', error));
});
