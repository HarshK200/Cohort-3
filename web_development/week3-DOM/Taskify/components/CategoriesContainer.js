const CategoriesContainer = (CATEGORIES, TODOS, reRender) => {
  const todosDiv = document.createElement("div");
  todosDiv.classList.add("todos-container");

  Object.keys(CATEGORIES).forEach((key) => {
    todosDiv.appendChild(Category(CATEGORIES[key], TODOS, reRender));
  });

  return todosDiv;
};

const Category = (title, TODOS, reRender) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category-div");

  const categoryTitle = document.createElement("h3");
  categoryTitle.textContent = title;



  categoryDiv.appendChild(categoryTitle);

  return categoryDiv;
};

const Todo = (TODO, reRender) => {};

export default CategoriesContainer;
