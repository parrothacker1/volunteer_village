document.addEventListener('DOMContentLoaded', function() {
    // Function to show/hide fields based on the selected signup type
    function toggleFields() {
      var signupType = document.getElementById('signup_type').value;
      var organiserFields = document.getElementById('organiser_fields');
      var volunteerFields = document.getElementById('volunteer_fields');
  
      if (signupType === 'organiser') {
        organiserFields.style.display = 'block';
        volunteerFields.style.display = 'none';
      } else if (signupType === 'volunteer') {
        organiserFields.style.display = 'none';
        volunteerFields.style.display = 'block';
      }
    }
  
    // Add event listener to the signup type dropdown
    document.getElementById('signup_type').addEventListener('change', toggleFields);
  
    document.getElementById('signupForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the form data
      var formData = new FormData(this);
  
      // Convert form data to JSON object
      var jsonObject = {};
      formData.forEach(function(value, key) {
        jsonObject[key] = value;
      });
  
      // Define the URL for the signup endpoint
      var signupUrl = '/api/signup';
  
      // Define the request body
      var requestBody = JSON.stringify(jsonObject);
  
      // Send POST request to the server
      fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })
      .then(response => {
        // Check if the response is successful (status code 200)
        if (response.ok) {
          // Parse the JSON response
          return response.json();
        } else {
          // Handle errors here
          throw new Error('Failed to signup');
        }
      })
      .then(data => {
        // Extract access tokens from the response
        var accessToken = data.accessToken;
        var refreshToken = data.refreshToken;
  
        // Save access token to local storage for 120 days
        localStorage.setItem('accessToken', accessToken);
  
        // Save refresh token to session storage for 15 minutes
        sessionStorage.setItem('refreshToken', refreshToken);
  
        // Display the form data (you can send it to the server instead)
        console.log(jsonObject);
  
        // Submit the form data to the server
        // You can replace this with actual code to send form data to the server
        // Example:
        // sendDataToServer(jsonObject);
        // After sending data to the server, you might redirect the user or show a success message
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
    });
  });