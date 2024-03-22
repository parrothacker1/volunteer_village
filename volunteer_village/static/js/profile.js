document.addEventListener('DOMContentLoaded', function () {
    const userDetailsDiv = document.getElementById('user-details');
    const editButton = document.getElementById('edit-button');
    const deleteButton = document.getElementById('delete-button');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');

    // Fetch user details from the backend
    fetch('/api/user')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            return response.json();
        })
        .then(data => {
            displayUserDetails(data);
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            userDetailsDiv.innerHTML = 'Error fetching user details';
        });

    // Function to display user details on the page
    function displayUserDetails(user) {
        userDetailsDiv.innerHTML = `
            <div class="detail">
                <label>Name:</label>
                <span id="name">${user.name}</span>
            </div>
            <div class="detail">
                <label>Email:</label>
                <span id="email">${user.email}</span>
            </div>
            <div class="detail">
                <label>State:</label>
                <span id="state">${user.state}</span>
            </div>
            <div class="detail">
                <label>City:</label>
                <span id="city">${user.city}</span>
            </div>
            <div class="detail">
                <label>Phone:</label>
                <span id="phone">${user.phone}</span>
            </div>
        `;
    }

    // Add event listeners for edit and delete buttons
    editButton.addEventListener('click', function () {
        editModal.style.display = 'block';
    });

    // Function to delete access token and refresh token from localStorage and sessionStorage
function deleteTokens() {
    // Delete access token from localStorage
    localStorage.removeItem('access_token');
    
    // Delete refresh token from sessionStorage
    sessionStorage.removeItem('refresh_token');
}

// Function to delete user account and redirect to home page
function deleteUserAccount(email) {
    // Send DELETE request to backend to delete user account
    fetch('/api/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }) // Include email in the request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete user account');
        }
        // Delete tokens on successful deletion
        deleteTokens();
        console.log('User account deleted successfully');
        // Redirect to home page after successful deletion
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error deleting user account:', error);
        // Display error message or perform other error handling actions
    });
}

// Add event listener for delete button
deleteButton.addEventListener('click', function () {
    // Get user email from user details (assuming email is displayed on the page)
    const userEmail = document.getElementById('email').textContent.trim();

    // Call deleteUserAccount with user email
    deleteUserAccount(userEmail);
});


    // Close the modal when the user clicks on the close button
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    // Function to edit user details and redirect to home page
function editUserDetails(email, editedDetails) {
    // Send PUT request to backend to update user details
    fetch('/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            // Include edited details in the request body
            name: editedDetails.name,
            state: editedDetails.state,
            city: editedDetails.city,
            phone: editedDetails.phone
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user details');
        }
        console.log('User details updated successfully');
        // Redirect to home page after successful update
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error updating user details:', error);
        // Display error message or perform other error handling actions
    });
}

// Add event listener for submit button in the edit modal
editForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get user email from user details (assuming email is displayed on the page)
    const userEmail = document.getElementById('email').textContent.trim();

    // Get edited details from the form
    const editedDetails = {
        name: document.getElementById('name').value.trim(),
        state: document.getElementById('state').value.trim(),
        city: document.getElementById('city').value.trim(),
        phone: document.getElementById('phone').value.trim()
    };

    // Call editUserDetails with user email and edited details
    editUserDetails(userEmail, editedDetails);
});

});

