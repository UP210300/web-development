// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
const showTasksButton = document.getElementById('show-tasks-btn');

let userData = [];
let tasksData = [];
let id;

const getAllUsers = async() =>{
  try {
    const res = await fetch('/U1/todo-app/data/usuarios.json')
    const data = await res.json()
    userData = data;

    userSelect.innerHTML = '';

    data.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.firstname; 
      userSelect.appendChild(option);
    });
  }catch (error) {
    console.log(error)
  }
}

const getAllTasks = async() =>{
  try {
    const res = await fetch('/U1/todo-app/data/tareas.json')
    const data = await res.json()
    tasksData = data;

  }catch (error) {
    console.log(error)
  }
}

const getUserId = () => {

  const select = document.getElementById('select-users');
  const selectedId = parseInt(select.value);

  id = selectedId;

}


const showUserInfo = (id) => {
  const userInfoContainer = document.getElementById('user-container');
 
  const selectedUser = userData.find(user => user.id === id);

  if (selectedUser) {
      const userFullname = document.getElementById('user-fullname');
      const userEmail = document.getElementById('user-email');

      userFullname.textContent = `${selectedUser.firstname} ${selectedUser.lastname}`;
      userEmail.textContent = selectedUser.email;
  } else {
      userInfoContainer.innerHTML = '<h3>Usuario no encontrado</h3>';
  }
}

showTasksButton.addEventListener('click', () => {
  const select = document.getElementById('select-users');
  const selectedId = parseInt(select.value);

  showUserTasks(selectedId);
});

const showUserTasks = (id) => {
  const userTaskContainer = document.getElementById('task-container');
  const userTasks = tasksData.filter(task => task.userId === id);

  if (userTasks.length > 0) {
    const ul = document.getElementById('tasks-list');
    ul.innerHTML = '';
    userTasks.forEach(task => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      span.textContent = task.title;
      li.appendChild(span);
      li.appendChild(checkbox);
      ul.appendChild(li);
    });
    userTaskContainer.appendChild(ul);
  } else {
    userTaskContainer.innerHTML = '<h3>Aún no tiene tareas</h3>';
  }
}

userSelect.addEventListener('change', () => {
  getUserId();
  showUserInfo(id);
  const ul = document.getElementById('tasks-list');
  ul.innerHTML= '';
});

window.addEventListener('load', () => {
  Promise.all([getAllUsers(), getAllTasks()])
    .then(() => {
      showUserInfo(1);
    })
    .catch(error => console.error(error));
});

