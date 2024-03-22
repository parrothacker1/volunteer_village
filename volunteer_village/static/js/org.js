// let tasks = [];

// function addTask() {
//     const taskName = document.getElementById("taskName").value;
//     const taskDescription = document.getElementById("taskDescription").value;
//     const city = document.getElementById("city").value;
//     const startDate = document.getElementById("startDate").value;
//     const startTime = document.getElementById("startTime").value;
//     const endDate = document.getElementById("endDate").value;
//     const endTime = document.getElementById("endTime").value;
//     const requiredSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skill => skill.value);
    
//     if (taskName && taskDescription && city && startDate && startTime && endDate && endTime && requiredSkills.length > 0 && requiredSkills.length <= 3) {
//         const task = {
//             name: taskName,
//             description: taskDescription,
//             city: city,
//             startDate: startDate,
//             startTime: startTime,
//             endDate: endDate,
//             endTime: endTime,
//             skills: requiredSkills
//         };
        
//         tasks.push(task);
//         displayTasks();
//         document.getElementById("taskForm").reset();
//     } else {
//         alert("Please fill in all fields, select at least one skill, and ensure the number of selected skills is not more than 3.");
//     }
// }

// function displayTasks() {
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";

//     tasks.forEach((task, index) => {
//         const taskItem = document.createElement("div");
//         taskItem.classList.add("task");

//         // Create task details HTML
//         taskItem.innerHTML = `
//             <p><strong>${task.name}</strong></p>
//             <p>${task.description}</p>
//             <p>City: ${task.city}</p>
//             <p>Start Date: ${task.startDate}</p>
//             <p>Start Time: ${task.startTime}</p>
//             <p>End Date: ${task.endDate}</p>
//             <p>End Time: ${task.endTime}</p>
//             <p>Required Skills: ${task.skills.join(", ")}</p>
//             <button onclick="showVolunteers(${index})">Show Registered Volunteers</button>
//             <button onclick="editTask(${index})">Edit</button>
//             <button onclick="deleteTask(${index})">Delete</button>
//         `;

//         // Append task item to task list
//         taskList.appendChild(taskItem);
//     });
// }

// function deleteTask(index) {
//     tasks.splice(index, 1);
//     displayTasks();
// }

// function editTask(index) {
//     const task = tasks[index];
//     document.getElementById("taskName").value = task.name;
//     document.getElementById("taskDescription").value = task.description;
//     document.getElementById("city").value = task.city;
//     document.getElementById("startDate").value = task.startDate;
//     document.getElementById("startTime").value = task.startTime;
//     document.getElementById("endDate").value = task.endDate;
//     document.getElementById("endTime").value = task.endTime;
    
//     task.skills.forEach(skill => {
//         document.querySelector(`input[name="skills"][value="${skill}"]`).checked = true;
//     });
//     tasks.splice(index, 1);
//     displayTasks();
// }

// function showVolunteers(taskIndex) {
//     const task = tasks[taskIndex];
//     // Perform AJAX request to fetch registered volunteers for this task
//     // Display the result as required
//     console.log("Fetching registered volunteers for task:", task.name);
// }

// // Function to toggle between dark and light mode
// document.addEventListener("DOMContentLoaded", function() {
//     const themeSlider = document.getElementById("themeSlider");

//     // Event listener to detect changes in the slider
//     themeSlider.addEventListener("change", function() {
//         if (themeSlider.checked) {
//             // Dark mode
//             document.body.classList.add("dark-theme");
//             // Save theme preference to local storage
//             localStorage.setItem("theme", "dark");
//         } else {
//             // Light mode
//             document.body.classList.remove("dark-theme");
//             // Save theme preference to local storage
//             localStorage.setItem("theme", "light");
//         }
//     });

//     // Check theme preference from local storage
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//         // Set dark mode if preference is saved as dark
//         themeSlider.checked = true;
//         document.body.classList.add("dark-theme");
//     }
// });


let tasks = [];

function addTask() {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const city = document.getElementById("city").value;
    const address=document.getElementById("address").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;
    const requiredSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(skill => skill.value);
    
    if (taskName && taskDescription && city && startDate && startTime && endDate && endTime && requiredSkills.length > 0 && requiredSkills.length <= 3) {
        const task = {
            name: taskName,
            description: taskDescription,
            city: city,
            address: address,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            skills: requiredSkills
        };
        
        tasks.push(task);
        displayTasks();
        document.getElementById("taskForm").reset();
    } else {
        alert("Please fill in all fields, select at least one skill, and ensure the number of selected skills is not more than 3.");
    }
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");

        // Create task details HTML
        taskItem.innerHTML = `
            <div id="task_content"><p><strong>${task.name}</strong></p>
            <p>${task.description}</p>
            <p>City: ${task.city}</p>
            <p>Address: ${task.address}</p>
            <p>Start Date: ${task.startDate}</p>
            <p>Start Time: ${task.startTime}</p>
            <p>End Date: ${task.endDate}</p>
            <p>End Time: ${task.endTime}</p>
            <p>Required Skills: ${task.skills.join(", ")}</p></div>
            <div id="task-buttons">
            <button onclick="showVolunteers(${index})">Show Registered Volunteers</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button></div>
        `;

        // Append task item to task list
        taskList.appendChild(taskItem);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("city").value = task.city;
    document.getElementById("address").value=task.address;
    document.getElementById("startDate").value = task.startDate;
    document.getElementById("startTime").value = task.startTime;
    document.getElementById("endDate").value = task.endDate;
    document.getElementById("endTime").value = task.endTime;
    
    task.skills.forEach(skill => {
        document.querySelector(`input[name="skills"][value="${skill}"]`).checked = true;
    });
    tasks.splice(index, 1);
    displayTasks();
}

function showVolunteers(taskIndex) {
    const task = tasks[taskIndex];
    // Perform AJAX request to fetch registered volunteers for this task
    // Display the result as required
    console.log("Fetching registered volunteers for task:", task.name);
}

// Function to toggle between dark and light mode
document.addEventListener("DOMContentLoaded", function() {
  const themeSlider = document.getElementById("themeSlider");

  // Event listener to detect changes in the slider
  themeSlider.addEventListener("change", function() {
      if (themeSlider.checked) {
          // Dark mode
          document.body.classList.add("dark-theme");
          // Save theme preference to local storage
          localStorage.setItem("theme", "dark");
      } else {
          // Light mode
          document.body.classList.remove("dark-theme");
          // Save theme preference to local storage
          localStorage.setItem("theme", "light");
      }
  });

  // Check theme preference from local storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
      // Set dark mode if preference is saved as dark
      themeSlider.checked = true;
      document.body.classList.add("dark-theme");
  }
});


