const CategoriesContainer = (CATEGORIES, TODOS, reRender) => {
  const categoriesContainer = document.createElement("div");
  categoriesContainer.classList.add("categories-container");

  Object.keys(CATEGORIES).forEach((key) => {
    categoriesContainer.appendChild(Category(CATEGORIES[key], TODOS, reRender));
  });

  return categoriesContainer;
};

const Category = (category, TODOS, reRender) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category-div");

  const categoryTitle = document.createElement("h3");
  categoryTitle.textContent = category;

  const todosDiv = document.createElement("div");
  todosDiv.classList.add("todos-container");
  Object.keys(TODOS).forEach((key) => {
    if (TODOS[key].category == category)
      todosDiv.appendChild(Todo(TODOS[key], reRender, TODOS));
  });

  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("addTodoBtn");
  addTodoBtn.textContent = "Add Todo";

  addTodoBtn.onclick = () => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const uniqueId = getUniqueId();
    TODOS[uniqueId] = {
      id: uniqueId,
      title: "Untitled",
      content: ".... ",
      category: category,
      urgency: "none",
      timestamp: new Date().toLocaleDateString("en-US", options),
    };

    reRender();
  };

  categoryDiv.appendChild(categoryTitle);
  categoryDiv.appendChild(todosDiv);
  categoryDiv.appendChild(addTodoBtn);

  return categoryDiv;
};

function getUniqueId() {
  return Date.now().toString(36);
}

const Todo = (TODO, reRender, TODOS) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  todoDiv.draggable = true;

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const title = document.createElement("textarea");
  title.value = TODO.title;
  title.classList.add("todo-title");
  title.onchange = (e) => {
    TODO.title = e.target.value;
    reRender();
  };
  const content = document.createElement("textarea");
  content.value = TODO.content;
  content.classList.add("todo-content");
  content.onchange = (e) => {
    TODO.content = e.target.value;
    reRender();
  };

  textContainer.appendChild(title);
  textContainer.appendChild(content);

  const metaDataDiv = document.createElement("div");
  metaDataDiv.classList.add("meta-data-div");

  const timestamp = document.createElement("p");
  timestamp.textContent = TODO.timestamp;

  const urgency = document.createElement("h3");
  urgency.textContent = TODO.urgency;
  urgency.classList.add("urgency-label");
  if (TODO.urgency === "urgent") {
    urgency.style.backgroundColor = `#FF6B6B`;
  } else if (TODO.urgency == "medium") {
    urgency.style.backgroundColor = `#FFA235`;
  } else if (TODO.urgency === "low") {
    urgency.style.backgroundColor = `#0ECC5A`;
  } else {
    urgency.style.backgroundColor = `gray`;
  }

  metaDataDiv.appendChild(urgency);
  metaDataDiv.appendChild(timestamp);

  todoDiv.appendChild(textContainer);
  todoDiv.appendChild(metaDataDiv);

  return todoDiv;
};

export default CategoriesContainer;
