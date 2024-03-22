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

  // Add event listener to the form submission
  document.getElementById('signupForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the form data
      var formData = new FormData(this);

      // Convert form data to JSON object
      var jsonObject = {};
      formData.forEach(function(value, key) {
          jsonObject[key] = value;
      });

      // Display the form data (you can send it to the server instead)
      console.log(jsonObject);
  });
});

