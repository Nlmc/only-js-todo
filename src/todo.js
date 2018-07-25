const input = document.getElementById('input');
const button = document.getElementById('button');
const todo = document.getElementById('todo-wrapper');
const wrapper = document.getElementById('todo-wrapper');

const apiCall = (url, method, body) => fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());

function showfield() {
  const btn = event.target;
  const field = btn.previousSibling;
  field.style.display = 'inline-block';
}

function remove(e) {
  const task = e.target.parentNode;
  let id = task.dataset.id;
  new Promise((resolve, reject) => {
    try {
      apiCall('/todo','delete', { id })
        .then((json) => {
          const id = json.id;
          resolve(display(task, id));
        });
      resolve(domRemove(task));
    } catch (e) {
      reject(e.message);
    }
});
}



function done() {
  const taskWrapper = this.parentNode;
  const task = taskWrapper.firstChild.innerHTML;
  const id = taskWrapper.dataset.id;
  let status = taskWrapper.dataset.done;
  if (status === 'true') {
    taskWrapper.style.backgroundColor = 'crimson';
    this.innerHTML = 'Done';
    taskWrapper.dataset.done = false;
    status = taskWrapper.dataset.done;
    apiCall('/todo', 'put', { id, value: task, done: status });
  } else if (status === 'false') {
    console.log(status);
    taskWrapper.style.backgroundColor = 'aquamarine';
    this.innerHTML = 'Undone';
    taskWrapper.dataset.done = true;
    status = taskWrapper.dataset.done;
    apiCall('/todo', 'put', { id, value: task, done: status });
  }
}


function edit() {
  const field = event.target;
  const newTask = field.value;
  const id = field.parentNode.dataset.id;
  const done = field.parentNode.dataset.done;
  console.log(`id : ${id}, newtask : ${newTask}`);
  if (event.keyCode === 13) {

    new Promise(((resolve, reject) => {
      try {
        apiCall('/todo', 'put', { value: newTask, id, done });
        resolve(field.value);
      } catch (e) {
        reject(e.message);
      }
    })).then((value) => {
      field.parentNode.firstChild.innerHTML = value;
    });
    field.style.display = 'none';
  }
}



const display = (value, id, status) => {
  const taskwrapper = document.createElement('li');
  const task = document.createElement('span');
  const newContent = document.createTextNode(value);
  const deleteButton = document.createElement('button');
  const doneButton = document.createElement('button');
  const editButton = document.createElement('button');
  const editField = document.createElement('input');

  deleteButton.addEventListener('click', remove);
  deleteButton.innerHTML = 'Delete';
  deleteButton.className = 'deleteButton';
  doneButton.addEventListener('click', done);
  doneButton.className = 'doneButton';
  editField.addEventListener('keypress', edit);
  editField.className = 'editfield';
  editField.style.display = 'none';
  editButton.addEventListener('click', showfield);
  editButton.innerHTML = 'Edit';
  editButton.className = 'editButton';

  task.appendChild(newContent);
  taskwrapper.className = 'task clearfix';
  taskwrapper.dataset.id = id;
  taskwrapper.dataset.done = status || 'false';
  status == 'true' ? taskwrapper.style.backgroundColor = 'aquamarine' : '';
  status == 'true' ? doneButton.innerHTML = 'Undone' : doneButton.innerHTML = 'Done';
  taskwrapper.appendChild(task);
  taskwrapper.appendChild(deleteButton);
  taskwrapper.appendChild(doneButton);
  taskwrapper.appendChild(editField);
  taskwrapper.appendChild(editButton);
  todo.insertBefore(taskwrapper, todo.firstChild);
  input.value = '';
};

input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13 && input.value !== '') {
    const task = input.value;
    // const prom = new Promise();
    new Promise((resolve, reject) => {
      try {
        apiCall('/todo', 'post', { value: task })
          .then((json) => {
            const id = json.id;
            resolve(display(task, id));
          });
      } catch (e) {
        reject(e.message);
      }
    });
  }
});

button.addEventListener('click', () => {
  display(input.value);
});

document.addEventListener('DOMContentLoaded', () => {
  apiCall('/todo', 'get')
    .then((json) => {
      console.log('json', json);
      for (let i = 0; i < json.length; i += 1) {
        display(json[i].title, json[i].id, json[i].done);
      }
    });
});

function domRemove(task) {
  wrapper.removeChild(task);
}
