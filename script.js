// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  // Clear existing tasks
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;

    // Set class based on completion status
    if (task.completed) {
      li.classList.add("completed");
    }

    // Set class based on priority
    li.classList.add(`priority-${task.priority}`);

    // Create edit and delete buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTask(task));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task));

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName) {
    const task = {
      name: taskName,
      completed: false,
      priority: "low", // Default priority
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
  }
}

function editTask(task) {
  const newName = prompt("Edit task:", task.name);
  if (newName) {
    task.name = newName;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((t) => (t.name === task.name ? task : t));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(task) {
  if (confirm(`Are you sure you want to delete "${task.name}"?`)) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t.name !== task.name);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}
