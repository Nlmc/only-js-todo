/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/todo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar input = document.getElementById('input');\nvar button = document.getElementById('button');\nvar todo = document.getElementById('todo-wrapper');\nvar wrapper = document.getElementById('todo-wrapper');\n\nvar apiCall = function apiCall(url, method, body) {\n  return fetch(url, {\n    method: method,\n    headers: {\n      'Content-type': 'application/json'\n    },\n    body: body\n  });\n};\n\nfunction showfield() {\n  console.log('oué');\n  var btn = event.target;\n  var field = btn.previousSibling;\n  field.style.display = 'inline-block';\n}\n\nfunction remove(e) {\n  console.log('fuck it');\n  var task = e.target.parentNode;\n  var id = task.dataset.id;\n  apiCall('/todo', 'delete', {\n    id: id\n  }).catch(function (err) {\n    console.log(err);\n  });\n  domRemove(task);\n}\n\nfunction done() {\n  var taskWrapper = this.parentNode;\n  var task = taskWrapper.firstChild.innerHTML;\n  var id = taskWrapper.dataset.id;\n  var status = taskWrapper.dataset.done;\n\n  if (status === 'true') {\n    taskWrapper.style.backgroundColor = 'crimson';\n    this.innerHTML = 'Done';\n    taskWrapper.dataset.done = false;\n    status = taskWrapper.dataset.done;\n    apiCall('/todo', 'put', {\n      id: id,\n      value: task,\n      done: status\n    });\n  } else if (status === 'false') {\n    console.log(status);\n    taskWrapper.style.backgroundColor = 'aquamarine';\n    this.innerHTML = 'Undone';\n    taskWrapper.dataset.done = true;\n    status = taskWrapper.dataset.done;\n    apiCall('/todo', 'put', {\n      id: id,\n      value: task,\n      done: status\n    });\n  }\n}\n\nfunction edit() {\n  var field = event.target;\n  var newTask = field.value;\n  var id = field.parentNode.dataset.id;\n  var done = field.parentNode.dataset.done;\n  console.log(\"id : \".concat(id, \", newtask : \").concat(newTask));\n\n  if (event.keyCode === 13) {\n    new Promise(function (resolve, reject) {\n      try {\n        apiCall('/todo', 'put', {\n          value: newTask,\n          id: id,\n          done: done\n        });\n        resolve(field.value);\n      } catch (e) {\n        reject(e.message);\n      }\n    }).then(function (value) {\n      field.parentNode.firstChild.innerHTML = value;\n    });\n    field.style.display = 'none';\n  }\n}\n\nvar display = function display(value, id, status) {\n  var taskwrapper = document.createElement('li');\n  var task = document.createElement('span');\n  var newContent = document.createTextNode(value);\n  var deleteButton = document.createElement('button');\n  var doneButton = document.createElement('button');\n  var editButton = document.createElement('button');\n  var editField = document.createElement('input');\n  deleteButton.addEventListener('click', remove);\n  deleteButton.innerHTML = 'Delete';\n  deleteButton.className = 'deleteButton';\n  doneButton.addEventListener('click', done);\n  doneButton.className = 'doneButton';\n  editField.addEventListener('keypress', edit);\n  editField.className = 'editfield';\n  editField.style.display = 'none';\n  editButton.addEventListener('click', showfield);\n  editButton.innerHTML = 'Edit';\n  editButton.className = 'editButton';\n  task.appendChild(newContent);\n  taskwrapper.className = 'task clearfix';\n  taskwrapper.dataset.id = id;\n  taskwrapper.dataset.done = status || 'false';\n  status === 'true' ? taskwrapper.style.backgroundColor = 'aquamarine' : '';\n  status === 'true' ? doneButton.innerHTML = 'Undone' : doneButton.innerHTML = 'Done';\n  taskwrapper.appendChild(task);\n  taskwrapper.appendChild(deleteButton);\n  taskwrapper.appendChild(doneButton);\n  taskwrapper.appendChild(editField);\n  taskwrapper.appendChild(editButton);\n  todo.insertBefore(taskwrapper, todo.firstChild);\n  input.value = '';\n};\n\ninput.addEventListener('keypress', function (event) {\n  if (event.keyCode === 13 && input.value !== '') {\n    var task = input.value;\n    apiCall('/todo', 'post', {\n      value: task\n    }).then(function (json) {\n      var id = json.id;\n      resolve(display(task, id));\n    });\n  }\n});\nbutton.addEventListener('click', function () {\n  display(input.value);\n});\ndocument.addEventListener('DOMContentLoaded', function () {\n  apiCall('/todo', 'get').then(res.json()).catch(function (err) {\n    console.log(err);\n  }).then(function (data) {\n    for (var i = 0; i < data.length; i += 1) {\n      display(data[i].title, data[i].id, data[i].done);\n    }\n  }).catch(function (err) {\n    console.log(err);\n  });\n});\n\nfunction domRemove(task) {\n  wrapper.removeChild(task);\n}\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ })

/******/ });