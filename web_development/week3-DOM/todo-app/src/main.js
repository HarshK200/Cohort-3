import "../styles/modern-normalize.css";
import "../styles/style.css";

// The State
const TODOS = ["foo", "bar"];

function OuterContainer(todos) {
  const appName = document.createElement("h1");
  appName.innerText = "Simple Todo";
  const outerContainer = document.createElement("section");
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
  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear Todo";

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(addButton);
  inputContainer.appendChild(clearButton);

  return inputContainer;
}

function Todos(todos) {
  function Todo({ key, value }) {
    const div = document.createElement("div");
    div.id = `todoitem-${key}`;
    div.classList.add(`todo-item`);
    const input = document.createElement("input");
    input.value = value;
    input.disabled = true;
    input.classList.add("input-field");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    div.appendChild(checkbox);
    div.appendChild(input);
    return div;
  }

  const todoContainer = document.createElement("section");
  todoContainer.classList.add("todo-container");
  todos.map((value, key) => {
    todoContainer.appendChild(Todo({ key, value }));
  });
  return todoContainer;
}

function render(component) {
  const root = document.getElementById("root");
  root.appendChild(component);
  console.log(root);
}

render(OuterContainer(TODOS));
