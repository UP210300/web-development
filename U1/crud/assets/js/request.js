export async function getAllUsers() {
    const resp = await fetch("/crud/api/getUsers.php");
    const json = await resp.json();
  
    return json;
}

export async function getUserTasks(userId) {
    try {
        const response = await fetch(`/crud/api/getTasks.php?user_id=${userId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch user tasks");
        }

        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error(error.message);
        return []; // Devolver un arreglo vacío en caso de error
    }
}

export async function addTask(title, idUser) {
    const response = await fetch("/crud/api/createTask.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            idUser: idUser
        })
    });

    return response.json();
}


export async function deleteTask(taskId) {
    try {
        const response = await fetch(`/crud/api/deleteTask.php?task_id=${taskId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting task:", error);
        return { error: error.message };
    }
}

export async function getTaskById() {
    console.log('aaa')
}



