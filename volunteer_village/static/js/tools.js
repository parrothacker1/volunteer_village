    let searchCriteria = {
        city: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        organization: "",
        selectedSkills: []
    };

    // Sample initial tasks with teams, addresses, and required skills
    let tasks = [
        { id: 1, team: "Education Team", task: "Organize food drive", address: "123 Main St, New York, NY", skills: ["communication", "organization"], volunteer: null, start_time: "2024-03-25", end_time: "2024-03-25" },
        { id: 2, team: "Healthcare Team", task: "Educational program for underprivileged children", address: "456 Elm St, Los Angeles, CA", skills: ["teaching", "empathy"], volunteer: null, start_time: "2024-03-26", end_time: "2024-03-26" },
        { id: 3, team: "Community Outreach Team", task: "Healthcare awareness campaign", address: "789 Oak St, Chicago, IL", skills: ["public speaking", "medical knowledge"], volunteer: null, start_time: "2024-03-27", end_time: "2024-03-27" }
    ];

    // Function to display tasks based on search criteria
    function searchTasks() {
        searchCriteria.city = document.getElementById("city").value.trim().toLowerCase();
        searchCriteria.startDate = document.getElementById("startDate").value;
        searchCriteria.startTime = document.getElementById("startTime").value;
        searchCriteria.endDate = document.getElementById("endDate").value;
        searchCriteria.endTime = document.getElementById("endTime").value;
        searchCriteria.organization = document.getElementById("organization").value.trim().toLowerCase();
        searchCriteria.selectedSkills = Array.from(document.querySelectorAll("#skills input:checked")).map(skill => skill.value);

        const filteredTasks = tasks.filter(task => {
            // Filter by city
            if (searchCriteria.city && !task.address.toLowerCase().includes(searchCriteria.city)) {
                return false;
            }
            // Filter by start date
            if (searchCriteria.startDate && task.start_time !== searchCriteria.startDate) {
                return false;
            }
            // Filter by start time
            if (searchCriteria.startTime && task.start_time !== searchCriteria.startTime) {
                return false;
            }
            // Filter by end date
            if (searchCriteria.endDate && task.end_time !== searchCriteria.endDate) {
                return false;
            }
            // Filter by end time
            if (searchCriteria.endTime && task.end_time !== searchCriteria.endTime) {
                return false;
            }
            // Filter by organization name
            if (searchCriteria.organization && !task.team.toLowerCase().includes(searchCriteria.organization)) {
                return false;
            }
            // Filter by skills
            if (searchCriteria.selectedSkills.length > 0 && !task.skills.some(skill => searchCriteria.selectedSkills.includes(skill))) {
                return false;
            }
            return true;
        });

        displayTasks(filteredTasks);
    }

    // Function to display tasks
    function displayTasks(tasks) {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear previous tasks
    
        tasks.forEach(task => {
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");
    
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
    
            const taskDetails = document.createElement("div");
            taskDetails.style.display = "flex";
            taskDetails.style.flexDirection = "column";
    
            const teamPara = document.createElement("p");
            teamPara.classList.add("team");
            teamPara.textContent = task.team;
            taskDetails.appendChild(teamPara);
    
            const taskPara = document.createElement("p");
            taskPara.textContent = task.task;
            taskDetails.appendChild(taskPara);
    
            const addressPara = document.createElement("p");
            addressPara.classList.add("address");
            addressPara.textContent = "Address: " + task.address;
            taskDetails.appendChild(addressPara);
    
            const skillsPara = document.createElement("p");
            skillsPara.classList.add("skills");
            skillsPara.textContent = "Skills required: " + task.skills.join(", ");
            taskDetails.appendChild(skillsPara);
    
            const timePara = document.createElement("p");
            timePara.classList.add("time");
            timePara.textContent = "Time: " + task.start_time + " to " + task.end_time;
            taskDetails.appendChild(timePara);
    
            taskDiv.appendChild(taskDetails);
            taskContainer.appendChild(taskDiv);
    
            const signupBtn = document.createElement("button");
            signupBtn.classList.add("signup-btn");
            if (task.volunteer) {
                signupBtn.textContent = "✓ Signed Up";
                signupBtn.classList.add("success");
                signupBtn.disabled = true;
            } else {
                signupBtn.textContent = "Sign Up for Activity";
                signupBtn.addEventListener("click", () => signupForActivity(task.id));
            }
            taskContainer.appendChild(signupBtn);
    
            taskList.appendChild(taskContainer);
        });
    }
    

    // Function to simulate signup for an activity
    function signupForActivity(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
            // Simulate sending data to server (AJAX request or form submission)
            setTimeout(() => {
                // On successful submission
                task.volunteer = { name: "John Doe", email: "john@example.com" }; // Replace with actual volunteer data
                displayTasks(tasks); // Update task list
            }, 1000); // Simulate server response time (1 second)
        }
    }

    // Initial display of tasks
    displayTasks(tasks);

    // Restore search criteria after signup
    function restoreSearchCriteria() {
        document.getElementById("city").value = searchCriteria.city;
        document.getElementById("startDate").value = searchCriteria.startDate;
        document.getElementById("startTime").value = searchCriteria.startTime;
        document.getElementById("endDate").value = searchCriteria.endDate;
        document.getElementById("endTime").value = searchCriteria.endTime;
        document.getElementById("organization").value = searchCriteria.organization;
        searchCriteria.selectedSkills.forEach(skill => {
            document.getElementById(skill).checked = true;
        });
    }

    // Prevent form submission on signup button click
    document.querySelectorAll(".signup-btn").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault(); // Prevent form submission
            signupForActivity(task.id);
        });
    });