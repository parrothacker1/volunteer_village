    // Sample initial tasks with teams, addresses, and required skills
    let tasks = [
        { id: 1, team: "Education Team", task: "Organize food drive", address: "123 Main St, New York, NY", skills: ["communication", "organization"], volunteer: null },
        { id: 2, team: "Healthcare Team", task: "Educational program for underprivileged children", address: "456 Elm St, Los Angeles, CA", skills: ["teaching", "empathy"], volunteer: null },
        { id: 3, team: "Community Outreach Team", task: "Healthcare awareness campaign", address: "789 Oak St, Chicago, IL", skills: ["public speaking", "medical knowledge"], volunteer: null }
    ];

    // Function to display tasks for a specific city
    function displayTasksForCity(city) {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear previous tasks

        tasks.forEach(task => {
            if (task.address.includes(city)) {
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

                taskDiv.appendChild(taskDetails);

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
                taskDiv.appendChild(signupBtn);

                taskList.appendChild(taskDiv);
            }
        });
    }

    // Example: Simulate a volunteer from New York
    const volunteerCity = "New York";
    displayTasksForCity(volunteerCity);

    // Function to simulate signup for an activity
    function signupForActivity(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
            // Simulate checking if volunteer has required skills
            const volunteerSkills = ["communication", "organization"]; // Replace with actual volunteer skills
            const hasSkills = task.skills.every(skill => volunteerSkills.includes(skill));
            if (hasSkills) {
                // Simulate sending data to server (AJAX request or form submission)
                setTimeout(() => {
                    // On successful submission
                    task.volunteer = { name: "John Doe", email: "john@example.com" }; // Replace with actual volunteer data
                    displayTasksForCity(volunteerCity); // Update task list
                }, 1000); // Simulate server response time (1 second)
            } else {
                alert("You do not have the required skills for this task.");
            }
        }
    }

    // Example of adding new tasks (can be called when new tasks are added)
    function addTask(team, newTask, address, skills) {
        const newTaskId = tasks.length + 1; // Generate new task ID
        tasks.push({ id: newTaskId, team: team, task: newTask, address: address, skills: skills, volunteer: null });
        displayTasksForCity(volunteerCity); // Display tasks for the volunteer's city
    }

    // Example of adding new tasks (can be called when new tasks are added)
    addTask("Environment Team", "Environmental cleanup drive", "111 Pine St, New York, NY", ["physical stamina", "environmental awareness"]);
    addTask("Fundraising Team", "Fundraising event for disaster relief", "222 Maple St, Los Angeles, CA", ["communication", "organization"]);

    // Example: Simulate adding new tasks after a delay
    setTimeout(() => {
        addTask("Development Team", "Community development project", "333 Oak St, Chicago, IL", ["project management", "community engagement"]);
        addTask("Volunteer Team", "Volunteer training program", "444 Cedar St, Miami, FL", ["training", "leadership"]);
    }, 3000); // Add new tasks after 3 seconds (for demonstration)