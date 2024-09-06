import App from "./App.js";

// state
const CATEGORIES = {
  0: "To Do",
  1: "In Progress",
  2: "Completed",
  3: "On Hold",
};
const options = { year: "numeric", month: "short", day: "numeric" };
let TODOS = {};
if (localStorage.getItem("TODOS")) {
  TODOS = JSON.parse(localStorage.getItem("TODOS"));
}

function reRender() {
  localStorage.setItem("TODOS", JSON.stringify(TODOS));
  render(App(CATEGORIES, TODOS, reRender));
}

function render(children) {
  const root = document.getElementById("root");
  root.querySelectorAll("*").forEach((item) => item.remove());

  root.appendChild(children);
}

render(App(CATEGORIES, TODOS, reRender));
