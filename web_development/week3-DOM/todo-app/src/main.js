import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/utils.css";

// The State
let TODOS = [];
let focusedEleId = null;

function OuterContainer(todos) {
  const outerContainer = document.createElement("section");

  const appName = document.createElement("h1");
  appName.innerText = "Simple Todo";
  outerContainer.classList.add("outer-container");

  outerContainer.appendChild(appName);
  outerContainer.appendChild(Input());
  outerContainer.appendChild(Todos(todos));
  return outerContainer;
}

function Input() {
  const inputContainer = document.createElement("section");
  inputContainer.classList.add("input-container");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter todo....";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Todo";
  addButton.classList.add("btn", "add-btn");
  addButton.onclick = () => {
    TODOS.push({ value: inputField.value, isChecked: false, isEditing: false });
    saveTodoDataLocal();
    render();
  };

  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear Todo";
  clearButton.classList.add("btn", "clear-btn");
  clearButton.onclick = () => {
    TODOS.length = 0;
    saveTodoDataLocal();
    render();
  };

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(addButton);
  inputContainer.appendChild(clearButton);

  return inputContainer;
}

function Todos(todos) {
  function Todo({ index, item }) {
    const todoItem = document.createElement("div");
    todoItem.id = `todoitem-${index}`;
    todoItem.classList.add("todo-item");

    const input = document.createElement("input");
    input.value = item.value;
    input.disabled = !item.isEditing;
    input.classList.add("input-field");
    input.onchange = (e) => {
      item.value = e.target.value;
      saveTodoDataLocal();
    };

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    checkbox.checked = item.isChecked;
    input.style.textDecoration = item.isChecked ? "line-through 3px" : "none";
    checkbox.onclick = () => {
      item.isChecked = checkbox.checked;
      saveTodoDataLocal();
      render();
    };

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-icon");
    editIcon.onclick = () => {
      item.isEditing = true;
      focusedEleId = todoItem.id;
      saveTodoDataLocal();
      render();
    };

    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-solid", "fa-floppy-disk", "save-icon");
    saveIcon.onclick = () => {
      item.isEditing = false;
      focusedEleId = null;
      saveTodoDataLocal();
      render();
    };

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");
    deleteIcon.onclick = () => {
      TODOS.splice(index, 1);
      saveTodoDataLocal();
      render();
    };

    todoItem.appendChild(checkbox);
    todoItem.appendChild(input);
    item.isEditing
      ? todoItem.appendChild(saveIcon)
      : todoItem.appendChild(editIcon);
    todoItem.appendChild(deleteIcon);
    return todoItem;
  }

  const todoContainer = document.createElement("section");
  todoContainer.classList.add("todo-container");
  todos.map((item, index) => {
    todoContainer.appendChild(Todo({ index, item }));
  });
  return todoContainer;
}

function render() {
  getTodosLocal();
  const root = document.getElementById("root");
  // Clear previous elements
  root.querySelectorAll("*").forEach((ele) => ele.remove());
  // re-render the whole thing
  root.appendChild(OuterContainer(TODOS));
  // setting the cursor to focused element if any
  if (focusedEleId) {
    const focusedInputEle = document
      .querySelector(`#${focusedEleId}`)
      .querySelector(".input-field");
    focusedInputEle.focus();
  }
}

render(OuterContainer(TODOS));


function saveTodoDataLocal() {
  localStorage.setItem("todos", JSON.stringify(TODOS));
}

function getTodosLocal() {
  const todos = localStorage.getItem("todos");
  console.log(todos);
  if (todos) {
    TODOS = JSON.parse(todos);
  }
}
