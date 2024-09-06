import App from "./App.js";

// state
const CATEGORIES = {
  0: "To Do",
  1: "In Progress",
  2: "Completed",
  3: "On Hold",
};
const options = { year: "numeric", month: "short", day: "numeric" };
const TODOS = {
  0: {
    id: 1,
    title: "foo",
    content: "fdsklfhdslkhf",
    category: "To Do",
    urgency: "low",
    timestamp: new Date().toLocaleDateString("en-US", options),
  },
  1: {
    id: 2,
    title: "test",
    content: "adlkfjasklfj",
    category: "To Do",
    urgency: "high",
    timestamp: new Date().toLocaleDateString("en-US", options),
  },
  2: {
    id: 3,
    title: "test2",
    content: "adlkfjasklfj",
    category: "In Progress",
    urgency: "low",
    timestamp: new Date().toLocaleDateString("en-US", options),
  },
  3: {
    id: 4,
    title: "test3",
    content: "adlkfjasklfj",
    category: "On Hold",
    urgency: "low",
    timestamp: new Date().toLocaleDateString("en-US", options),
  },
};

function reRender() {
  render(App(CATEGORIES, TODOS, reRender));
}

function render(children) {
  const root = document.getElementById("root");
  root.querySelectorAll("*").forEach((item) => item.remove());

  root.appendChild(children);
}

render(App(CATEGORIES, TODOS, reRender));
