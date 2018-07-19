let todoState = [];
let input = document.getElementById('input');
let button = document.getElementById('button');
let todo = document.getElementById('todo-wrapper');
const wrapper = document.getElementById('todo-wrapper');

document.addEventListener("DOMContentLoaded",function(){
  const frr = apiCall('/todo', 'get')
    .then(json => {
      console.log('json' , json);
      for (let i = 0; i < json.length; i++) {
        console.log(json[i]);
        display(json[i].title, json[i].id, json[i].done);
      }
    });
});

input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13 && input.value != '') {
    let task = input.value;

    new Promise(function(resolve, reject) {
      try {
        apiCall('/todo', 'post', {value: task})
          .then( json => {
            const id = json.id;
            resolve(display(task, id));
          })

      } catch (e) {
          reject(e.message);
      }
    });

  }
});

button.addEventListener('click', () => {
  display(input.value);
});

let apiCall = (url, method, body) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
};


function remove (e) {
  let task = e.target.parentNode;
  let id = task.dataset.id;
  new Promise(function(resolve, reject) {
    try {
      apiCall('/todo','delete', {id})
        .then( json => {
          const id = json.id;
          resolve(display(task, id));
      });
      resolve(domRemove(task));
    } catch (e) {
        reject(e.message);
    }
  });
}

function domRemove (task) {
  wrapper.removeChild(task);
}

function done() {

  let taskWrapper = this.parentNode;
  let task = taskWrapper.firstChild.innerHTML;
  let color = taskWrapper.style.backgroundColor;
  let id = taskWrapper.dataset.id;
  let status = taskWrapper.dataset.done;
  // const status = 'true' === taskWrapper.dataset.status;
  if (status == 'true') {
      taskWrapper.style.backgroundColor = 'crimson';
      this.innerHTML = 'Done';
      taskWrapper.dataset.done = false;
      apiCall('/todo','put', {id, value: task, done : status});

  } else if (status == 'false') {
      console.log(status);
      taskWrapper.style.backgroundColor = 'aquamarine';
      this.innerHTML = 'Undone';
      taskWrapper.dataset.done = true;
      apiCall('/todo','put', {id, value: task, done : status});
  }
}

function showfield() {
  let btn = event.target;
  let field = btn.previousSibling;
  field.style.display = 'inline-block';
}

function edit() {
  let field = event.target;
  let newTask = field.value;
  let id = field.parentNode.dataset.id;
  let done = field.parentNode.dataset.done;
  console.log(`id : ${id}, newtask : ${newTask}`);
  if (event.keyCode == 13) {

    new Promise(function(resolve, reject) {
      try {
        apiCall('/todo', 'put', {value: newTask, id, done});
        resolve(field.value);
      } catch (e) {
        reject(e.message);
      }
    }).then((value) => {
        field.parentNode.firstChild.innerHTML = value;
    });
    field.style.display = 'none';
  }
}

let display = (value, id, status) => {
  let taskwrapper = document.createElement('li');
  let task = document.createElement('span');
  let newContent = document.createTextNode(value);
  let deleteButton = document.createElement('button');
  let doneButton = document.createElement('button');
  let editButton = document.createElement('button');
  let editField = document.createElement('input');

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
  taskwrapper.dataset.done = status ? status : 'false';
  status == 'true' ? taskwrapper.style.backgroundColor = 'aquamarine' : '' ;
  status == 'true' ? doneButton.innerHTML = 'Undone' : doneButton.innerHTML = 'Done';
  taskwrapper.appendChild(task);
  taskwrapper.appendChild(deleteButton);
  taskwrapper.appendChild(doneButton);
  taskwrapper.appendChild(editField);
  taskwrapper.appendChild(editButton);
  todo.insertBefore(taskwrapper, todo.firstChild);
  input.value = '';
}
