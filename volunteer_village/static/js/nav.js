//  // Simulated user data from the server (replace with actual data from server)
//  const userData = {
//     isLoggedIn: true,
//     firstName: "" // Leave empty initially
// };

// // Function to create a dropdown menu with logout button
// function createDropdownMenu() {
//     const dropdownMenu = document.createElement("div");
//     dropdownMenu.classList.add("dropdown-menu");

//     const logoutButton = document.createElement("button");
//     logoutButton.textContent = "Logout";
//     logoutButton.addEventListener("click", () => {
//         // Implement logout functionality here (e.g., clear session, redirect to login page)
//         alert("Logout functionality should be implemented here.");
//     });

//     dropdownMenu.appendChild(logoutButton);
//     return dropdownMenu;
// }

// // Function to update navbar based on user login status and data
// function updateNavbar(userData) {
//     const userLinksContainer = document.getElementById("userLinks");

//     if (userData.isLoggedIn) {
//         // Create a button with user's first name
//         const userButton = document.createElement("button");
//         userButton.textContent = userData.firstName || "User";
//         userButton.addEventListener("click", () => {
//             // Toggle dropdown menu on button click
//             const dropdownMenu = userButton.nextElementSibling;
//             dropdownMenu.classList.toggle("show");
//         });

//         // Append user button and dropdown menu to navbar
//         userLinksContainer.appendChild(userButton);
//         userLinksContainer.appendChild(createDropdownMenu());
//     } else {
//         // Create a login/signup button with href
//         const loginSignupButton = document.createElement("a");
//         loginSignupButton.textContent = "Login/Signup";
//         loginSignupButton.href = "/login"; // Replace with actual login URL
//         loginSignupButton.addEventListener("click", (event) => {
//             // Prevent default link behavior to handle login/signup action
//             event.preventDefault();
//             // Implement login/signup functionality here (e.g., open modal)
//             alert("Login/Signup functionality should be implemented here.");
//         });

//         // Append login/signup button to navbar
//         userLinksContainer.appendChild(loginSignupButton);
//     }
// }

// // Fetch user data from the server (replace with actual fetch logic)
// // For demonstration, setTimeout is used to simulate async fetch
// setTimeout(() => {
//     // Simulated data received from the server
//     const serverData = {
//         isLoggedIn: true,
//         firstName: "John" // Replace with actual data from server
//     };
    
//     // Update user data and navbar based on server response
//     Object.assign(userData, serverData);
//     updateNavbar(userData);
// }, 1000); // Simulating 1 second delay for fetch