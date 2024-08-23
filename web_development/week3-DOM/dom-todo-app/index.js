const todos = []; //state
function addTodo() {
  const value = document.querySelector("#todo-input").value;
  todos.push(value);
  for (let i = 0; i < todos.length; i++) {
    Todo(todos[i]);
  }
  render();
}

//component
function Todo(value) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.innerHTML = value;
  const button = document.createElement("button");
  button.innerHTML = "Delete";
  div.appendChild(span);
  div.appendChild(button);
  return div;
}

// Render function
function render(toRender) {
  const todoContainer = document.querySelector(".todo-container");
}
