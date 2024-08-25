// The State
const TODOS = ["foo", "bar"];

function OuterContainer(todos) {
  const appName = document.createElement("h1");
  appName.classList.add("app-name");
  appName.innerText = "Simple Todo";
  const outerContainer = document.createElement("section");
  outerContainer.classList.add("outer-container");
  outerContainer.appendChild(appName);
  outerContainer.appendChild(InputField());
  outerContainer.appendChild(Todos(todos));
  return outerContainer;
}

function InputField() {
  const inputFieldContainer = document.createElement("section");
  inputFieldContainer.classList.add("input-field-container");

  const inputField = document.createElement("input");
  inputField.type = "text";

  const addButton = document.createElement("button");
  addButton.innerText = "Add Todo";
  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear Todo";

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-Container");
  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(clearButton);

  inputFieldContainer.appendChild(inputField);
  inputFieldContainer.appendChild(buttonContainer);

  return inputFieldContainer;
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
