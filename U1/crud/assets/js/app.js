import { getAllUsers, getUserTasks, addTask, deleteTask, getTaskById } from "./request.js";

const listUsers = document.getElementById("users");
const tasksContainer = document.getElementById("tasks");

document.addEventListener("DOMContentLoaded", async () => {
    // Cargar la lista de usuarios al cargar el documento
    const users = await getAllUsers();
    let template = listUsers.innerHTML;
    for (const user of users) {
        template += `<option value="${user.id}">${user.fullname}</option>`;
    }
    listUsers.innerHTML = template;
});

listUsers.addEventListener("change", async () => {
    const selectedUserId = listUsers.value;
    if (selectedUserId) {
        try {
            const tasks = await getUserTasks(selectedUserId);
            renderTasks(tasks);
            removeTask(selectedUserId);
        } catch (error) {
            console.error("Error fetching user tasks:", error);
        }
    } else {
        console.error("User ID not provided");
    }
});


document.getElementById("form-task").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const selectedUserId = document.getElementById("users").value; 

    if (title && selectedUserId) {
        try {
            const result = await addTask(title, selectedUserId);
            if ('error' in result) {
                console.error("Error adding task:", result.error);
            } else {
                //console.log("Task added successfully!"); // Confirmar que la tarea se agregó correctamente
                const tasks = await getUserTasks(selectedUserId);
                //console.log("Tasks after addition:", tasks); 
                renderTasks(tasks);
                
                document.getElementById("title").value = "";
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    } else {
        console.error("Please fill out all fields");
    }
});

function renderTasks(tasks) {
    let tasksTemplate = "";
    for (const task of tasks) {
        tasksTemplate += `<tr>
                            <td>${task.id}</td>
                            <td>${task.fullname}</td>
                            <td>${task.title}</td>
                            <td>
                                <input type="checkbox" ${task.completed ? 'checked' : ''} disabled>
                            </td>
                            <td>
                                <button class="btn btn-secondary btn-sm update-task-button" data-task-id="${task.id}">
                                    <span>Update</span> <i class="nf nf-md-pencil"></i>
                                </button>
                                <button class="btn btn-danger btn-sm delete-task-button" data-task-id="${task.id}">
                                    <span>Delete</span> <i class="nf nf-cod-trash"></i>
                                </button>
                            </td>
                          </tr>`;
    }
    tasksContainer.innerHTML = tasksTemplate;
}

function removeTask(selectedUserId) {

    tasksContainer.addEventListener('click', async (event) => {
        const button = event.target.closest('.delete-task-button');
        if (button) {
            const taskId = button.getAttribute('data-task-id');
            try {
                const result = await deleteTask(taskId);
                if ('error' in result) {
                    console.error("Error deleting task:", result.error);
                } else {
                    console.log("Task deleted successfully!");
                    const tasks = await getUserTasks(selectedUserId);
                    renderTasks(tasks);
                }
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    });
}

// Escuchar el clic en los botones "Update"
tasksContainer.addEventListener('click', async (event) => {
    const button = event.target.closest('.update-task-button');
    if (button) {
        const taskId = button.getAttribute('data-task-id');
        try {
            // Obtener la tarea correspondiente al ID
            const task = await getTaskById(taskId);
            // Llenar los campos del formulario con la información de la tarea
            document.getElementById("title").value = task.title;
            document.getElementById("users").value = task.userId;
            document.getElementById("description").value = task.description;
            // Guardar el ID de la tarea en un atributo del formulario para usarlo al actualizar la tarea
            document.getElementById("form-task").setAttribute('data-task-id', taskId);
        } catch (error) {
            console.error("Error getting task:", error);
        }
    }
});



