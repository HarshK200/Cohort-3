import "../styles/modern-normalize.css";
import "../styles/style.css";

// The State
const TODOS = ["foo", "bar"];

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

  const addButton = document.createElement("button");
  addButton.innerText = "Add Todo";
  addButton.onclick = () => {
    TODOS.push(inputField.value);
    render();
  };

  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear Todo";
  clearButton.onclick = () => {
    TODOS.length = 0;
    render();
  };

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(addButton);
  inputContainer.appendChild(clearButton);

  return inputContainer;
}

function Todos(todos) {
  function Todo({ key, value }) {
    const todoItem = document.createElement("div");
    todoItem.id = `todoitem-${key}`;
    todoItem.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.onclick = () => {
      checkbox.checked
        ? (input.style.textDecoration = "line-through 3px")
        : (input.style.textDecoration = "none");
    };

    const input = document.createElement("input");
    input.value = value;
    input.disabled = true;
    input.classList.add("input-field");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");
    deleteIcon.onclick = () => {
      TODOS.splice(key, 1);
      render();
    };

    todoItem.appendChild(checkbox);
    todoItem.appendChild(input);
    todoItem.appendChild(deleteIcon);
    return todoItem;
  }

  const todoContainer = document.createElement("section");
  todoContainer.classList.add("todo-container");
  todos.map((value, key) => {
    todoContainer.appendChild(Todo({ key, value }));
  });
  return todoContainer;
}

function render() {
  const root = document.getElementById("root");
  // Clear previous elements
  root.querySelectorAll("*").forEach((ele) => ele.remove());
  // re-render the whole thing
  root.appendChild(OuterContainer(TODOS));
}

render(OuterContainer(TODOS));
