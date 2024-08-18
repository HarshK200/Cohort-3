const todo = [];
function addTodo() {
  const value = document.querySelector("#todo-input").value;
  todo.push(value);
  render(todo);
}

function render(toRender) {
  const todoContainer = document.querySelector(".todo-container");
  const oldTodos = document.querySelectorAll(".todo-element");
  oldTodos.forEach((oldTodo) => {
    todoContainer.removeChild(oldTodo);
  });

  toRender.forEach((value) => {
    const li = document.createElement("li");
    li.className = "todo-element";
    const span = document.createElement("span");
    span.innerHTML = value;
    const button = document.createElement("button");
    button.innerHTML = "Delete";
    button.onclick = () => {
      todoContainer.removeChild(li);
    };
    li.appendChild(span);
    li.appendChild(button);
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.appendChild(li);
  });
}
