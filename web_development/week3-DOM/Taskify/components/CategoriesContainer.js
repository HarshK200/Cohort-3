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
      todosDiv.appendChild(Todo(TODOS[key], reRender));
  });
  Object.keys((key) => {
    todosDiv.appendChild(Todo(TODOS[key], reRender));
  });

  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("addTodoBtn");
  addTodoBtn.textContent = "Add Todo";
  addTodoBtn.onclick = () => {};

  categoryDiv.appendChild(categoryTitle);
  categoryDiv.appendChild(todosDiv);
  categoryDiv.appendChild(addTodoBtn);

  return categoryDiv;
};

const Todo = (TODO, reRender) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  todoDiv.draggable = true;

  const textContainer = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = TODO.title;
  const content = document.createElement("p");
  content.textContent = TODO.content;

  textContainer.appendChild(title);
  textContainer.appendChild(content);

  const timestamp = document.createElement("p");
  timestamp.textContent = TODO.timestamp;

  todoDiv.appendChild(textContainer);
  todoDiv.appendChild(timestamp);

  return todoDiv;
};

export default CategoriesContainer;
