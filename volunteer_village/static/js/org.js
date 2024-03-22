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
    function convertToString(dateInput,timeInput) {
        // Concatenate date and time values into a single string
        const dateTimeString = dateInput + 'T' + timeInput;
    
        // Create a Date object from the concatenated string
        const dateTimeObject = new Date(dateTimeString);
    
        // Convert the Date object to a desired string format
        // For example, using toISOString() to get a string in ISO 8601 format
        const dateString = dateTimeObject.toISOString();}
    
    if (taskName && taskDescription && city && startDate  && endDate && endTime && requiredSkills.length > 0 && requiredSkills.length <= 3) {
        const task = {
            name: taskName,
            description: taskDescription,
            city: city,
            address: address,
            startDate: convertToString(startDate,startTime),
            endDate:convertToString(endDate,endTime),
            skills: requiredSkills
        };
        // Make a POST request to the server
        fetch('/api/task'+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            return response.json();
        })
        .then(data => {
            tasks.push(data); // Assuming the server returns the added task
            displayTasks();
            document.getElementById("taskForm").reset();
        })
        .catch(error => {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again later.');
        });
    } else {
        alert("Please fill in all fields, select at least one skill, and ensure the number of selected skills is not more than 3.");
    }
}

const DateTimeConverter = {
  // Method to convert a string representing date and time into separate date and time components
  convertStringToDateAndTime: function(dateTimeString) {
    // Split the dateTimeString into date and time components
    const [datePart, timePart] = dateTimeString.split('T');

    // Create Date object from datePart
    const date = new Date(datePart);

    // Extract time components from timePart
    const [hours, minutes, seconds] = timePart.split(':');

    // Set time components to the Date object
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds || 0, 10)); // handle seconds if provided

    // Return object with date and time properties
    return {
      date: date,
      time: {
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10),
        seconds: parseInt(seconds || 0, 10)
      }
    };
  }
};

async function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    try {
        // Make a GET request to fetch tasks from the server
        const response = await fetch('/api/tasks');
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();

        tasksData.forEach(async (taskId) => {
            try {
                // Fetch individual task details
                const taskResponse = await fetch(`/api/task/${taskId}`);
                if (!taskResponse.ok) {
                    throw new Error('Failed to fetch task details');
                }
                const task = await taskResponse.json();

                const taskItem = document.createElement("div");
                taskItem.classList.add("task");

                // Create task details HTML
                taskItem.innerHTML = `
                    <div id="task_content"><p><strong>Name: ${task.name}</strong></p>
                    <p>Description: ${task.description}</p>
                    <p>City: ${task.city}</p>
                    <p>Address: ${task.address}</p>
                    <p>Start Date: ${DateTimeConverter.convertStringToDateAndTime(task.startDate).date}</p>
                    <p>Start Time: ${DateTimeConverter.convertStringToDateAndTime(task.startDate).time[hours]}:${DateTimeConverter.convertStringToDateAndTime(task.startDate).time[minutes]}+${DateTimeConverter.convertStringToDateAndTime(task.startDate).time[seconds]}</p>
                    <p>End Date: ${DateTimeConverter.convertStringToDateAndTime(task.endDate).date}</p>
                    <p>End Time:  ${DateTimeConverter.convertStringToDateAndTime(task.endDate).time[hours]}:${DateTimeConverter.convertStringToDateAndTime(task.endDate).time[minutes]}+${DateTimeConverter.convertStringToDateAndTime(task.endDate).time[seconds]}</p>
                    <p>Required Skills: ${task.skills.join(", ")}</p></div>
                    <div id="task-buttons">
                    <button onclick="showVolunteers(${taskId})">Show Registered Volunteers</button>
                    <button onclick="editTask(${taskId})">Edit</button>
                    <button onclick="deleteTask(${taskId})">Delete</button></div>
                `;

                // Append task item to task list
                taskList.appendChild(taskItem);
            } catch (error) {
                console.error('Error fetching task details:', error);
                // Handle error appropriately
            }
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle error appropriately
    }
}

async function deleteTask(taskId) {
    try {
        // Make a DELETE request to the server to delete the task
        const response = await fetch(`/api/task/${taskId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        // Remove the task from the local tasks array
        tasks = tasks.filter(task => task.id !== taskId);
        // Update the display after successful deletion
        displayTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
        // Handle error appropriately
    }
}

async function editTask(taskId) {
    try {
        // Fetch the task details from the server
        const response = await fetch(`/api/task/${taskId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch task details');
        }
        const task = await response.json();

        // Populate the form fields with the retrieved task details
        document.getElementById("taskName").value = task.name;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("city").value = task.city;
        document.getElementById("address").value = task.address;
        document.getElementById("startDate").value = task.startDate.split('T')[0]; // Extract date part
        document.getElementById("startTime").value = task.startDate.split('T')[1]; // Extract time part
        document.getElementById("endDate").value = task.endDate.split('T')[0]; // Extract date part
        document.getElementById("endTime").value = task.endDate.split('T')[1]; // Extract time part

        // Check the required skills checkboxes based on the task details
        task.skills.forEach(skill => {
            document.querySelector(`input[name="skills"][value="${skill}"]`).checked = true;
        });

        // Update the display if needed
        // displayTasks(); // Not sure if you want to call this here, remove if not needed
    } catch (error) {
        console.error('Error editing task:', error);
        // Handle error appropriately
    }
}

    function showVolunteers(taskIndex) {
        // Make a GET request to fetch task data
        fetch('/api/tasks')
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch task data');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(tasks => {
            // Find the task corresponding to the given task index
            const task = tasks[taskIndex];
            if (!task) {
                throw new Error('Task not found');
            }
    
            // Display registered volunteers for the task
            const registeredVolunteers = task.volunteers;
            if (registeredVolunteers.length === 0) {
                console.log('No volunteers registered for this task.');
            } else {
                console.log('Registered volunteers for task:', task.name);
                registeredVolunteers.forEach(volunteer => {
                    console.log('Volunteer:', volunteer.name);
                    // You can display more details about the volunteer as needed
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

/*function createDateTime() {
    const startDate = document.getElementById('startDate').value;
    const startTime = document.getElementById('startTime').value;
    const endDate = document.getElementById('endDate').value;
    const endTime = document.getElementById('endTime').value;

    // Concatenate date and time strings
    const startDateTimeString = startDate + 'T' + startTime;
    const endDateTimeString = endDate + 'T' + endTime;

    // Create Date objects from the concatenated strings
    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(endDateTimeString);

    // Output the Date objects (optional)
    console.log('Start Date:', startDateTime);
    console.log('End Date:', endDateTime);

    // Convert Date objects to strings (optional)
    const startDateTimeStringified = startDateTime.toString();
    const endDateTimeStringified = endDateTime.toString();

    console.log('Start Date String:', startDateTimeStringified);
    console.log('End Date String:', endDateTimeStringified);
  }*/