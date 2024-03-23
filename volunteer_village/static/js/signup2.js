// Function to gather form data based on login type
function updateData(loginType) {
    var divData = {};

    if (loginType === "organiser") {
        divData = {
            signup_type: loginType,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone_num: document.getElementById("number").value,
            password: document.getElementById("organisation_password").value
        };
    } else if (loginType === "volunteer") {
        divData = {
            signup_type: loginType,
            name: document.getElementById("volunteer_name").value,
            email: document.getElementById("volunteer_email").value,
            phone_num: document.getElementById("volunteer_number").value,
            state: document.getElementById("indian_state").value,
            city: document.getElementById("volunteer_city").value,
            password: document.getElementById("volunteer_password").value
        };
    }

    return JSON.stringify(divData);
}

document.addEventListener('DOMContentLoaded', function() {
  // Function to gather form data based on login type
  function updateData(loginType) {
      var divData = {};

      if (loginType === "organiser") {
          divData = {
              name: document.getElementById("name").value,
              email: document.getElementById("email").value,
              phone_num: document.getElementById("number").value,
              password: document.getElementById("organisation_password").value
          };
      } else if (loginType === "volunteer") {
          divData = {
              name: document.getElementById("volunteer_name").value,
              email: document.getElementById("volunteer_email").value,
              phone_num: document.getElementById("volunteer_number").value,
              state: document.getElementById("indian_state").value,
              city: document.getElementById("volunteer_city").value,
              password: document.getElementById("volunteer_password").value
          };
      }

      return JSON.stringify(divData);
  }

  // Function to show/hide fields based on the selected signup type
  function toggleFields() {
      var signupType = document.getElementById('signup_type').value;
      var organiserFields = document.getElementById('organiser_fields');
      var volunteerFields = document.getElementById('volunteer_fields');

      organiserFields.style.display = (signupType === 'organiser') ? 'block' : 'none';
      volunteerFields.style.display = (signupType === 'volunteer') ? 'block' : 'none';
  }

  // Add event listener to the signup type dropdown
  document.getElementById('signup_type').addEventListener('change', toggleFields);

  // Add event listener to the submit button
  document.getElementById('submitBtn').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the form data
      var loginType = document.getElementById("signup_type").value;
      var requestBody = updateData(loginType);

      // Define the URL for the signup endpoint based on the selected role
      var signupUrl = '/api/' + loginType + '/signup';

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
          localStorage.setItem('access_token', accessToken);

          // Save refresh token to session storage for 15 minutes
          sessionStorage.setItem('refresh_token', refreshToken);

          // Redirect to login page after successful signup
          window.location.href = '../access-account/login'; // Change '/login' to the actual login page URL
      })
      .catch(error => {
          // Handle errors here
          console.error('Error:', error);
      });
  });
});
