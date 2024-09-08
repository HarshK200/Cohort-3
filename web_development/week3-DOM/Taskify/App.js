import CategoriesContainer from "./components/CategoriesContainer.js";
import Navbar from "./components/Navbar.js";

const App = (CATEGORIES, TODOS, reRender) => {
  const AppDiv = document.createElement("div");
  AppDiv.classList.add("app-div");

  // --------------- Append rest of the components here ---------------

  AppDiv.appendChild(Navbar());
  AppDiv.appendChild(CategoriesContainer(CATEGORIES, TODOS, reRender));

  // ------------------------------------------------------------------

  return AppDiv;
};

export default App;
