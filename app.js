const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTaskId = null;

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const assignee = document.getElementById("taskAssignee").value;
  const dueDate = document.getElementById("taskDueDate").value;

  if (editTaskId) {
    // Editar tarea existente
    tasks = tasks.map((task) =>
      task.id === editTaskId
        ? { ...task, title, assignee, dueDate }
        : task
    );
    editTaskId = null;
  } else {
    // Crear nueva tarea
    const newTask = {
      id: Date.now(),
      title,
      assignee,
      dueDate,
      completed: false,
    };
    tasks.push(newTask);
  }

  saveTasks();
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.title}</strong> - ${task.assignee || "Sin responsable"}
      <br>Fecha límite: ${task.dueDate || "No definida"}
      <br>
      <button onclick="toggleComplete(${task.id})">
        ${task.completed ? "Desmarcar" : "Completar"}
      </button>
      <button onclick="editTask(${task.id})">Editar</button>
      <button onclick="deleteTask(${task.id})">Eliminar</button>
    `;
    if (task.completed) {
      li.style.textDecoration = "line-through";
    }
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskAssignee").value = task.assignee;
    document.getElementById("taskDueDate").value = task.dueDate;
    editTaskId = id;
  }
}

// Render inicial
renderTasks();
