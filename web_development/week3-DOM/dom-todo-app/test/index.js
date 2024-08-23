const todoinput = document.querySelector(".todo-input");
let count = 0;
let todo = [];

function add() {
  if (todoinput.value.trim() == "") {
    alert("please enter a task to do proceed");
    return;
  }
  todo.push({ content: todoinput.value, completed: false, id: count });

  progress();
  render();
}
function deleteTask(val) {
  todo.splice(val, 1);
  progress();
  render();
}
function component(todo, index) {
  const newDiv = document.createElement("div");
  const newSpan = document.createElement("span");
  const del = document.createElement("button");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // checkbox.addEventListener("click", function () {
  //   markComplete(index);
  // });

  checkbox.setAttribute("onclick", `markComplete(${index})`);
  checkbox.checked = todo.completed;
  newSpan.style.textDecoration = todo.completed ? "line-through" : "";
  newDiv.append(checkbox);
  newDiv.append(newSpan);
  newDiv.append(del);
  newSpan.setAttribute("class", `span${index}`);
  //for css
  newDiv.setAttribute("class", `Div${index}`);

  newSpan.textContent = `${index + 1}.${todo.content}`;

  del.setAttribute("onclick", `deleteTask(${index})`);
  del.textContent = "Delete";
  todoinput.value = "";
  count++;
  return newDiv;
}
function markComplete(index) {
  todo[index].completed = !todo[index].completed;
  document.querySelector(".span" + index).classList.toggle("strike");
  progress();
}
function progress() {
  const completedtasks = todo.filter((task) => task.completed);
  document.querySelector(".bar").style.width = `${
    (completedtasks.length / todo.length) * 100
  }%`;
}

function render() {
  document.querySelector(".Todo-container").innerHTML = "";
  for (let i = 0; i < todo.length; i++) {
    const task = component(todo[i], i);
    document.querySelector(".Todo-container").append(task);
  }
}
