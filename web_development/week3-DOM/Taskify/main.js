import App from "./App.js";

// state
const CATEGORIES = { 0: "To Do", 1: "In Progress", 2: "Completed", 3: "On Hold" };
const TODOS = [{ id: 1, title: "foo", content: "bar", category: "Todo" }];

function reRender() {
  render(App(CATEGORIES, TODOS, reRender));
}

function render(children) {
  const root = document.getElementById("root");
  root.querySelectorAll("*").forEach((item) => item.remove());

  root.appendChild(children);
}

render(App(CATEGORIES, TODOS, reRender));
