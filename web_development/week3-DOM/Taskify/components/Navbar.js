const Navbar = () => {
  const navContainer = document.createElement("nav");
  navContainer.classList.add("navContainer");

  const title = document.createElement("h1");
  title.textContent = "Taskify";
  title.classList.add("title");

  navContainer.appendChild(title);

  return navContainer;
};

export default Navbar;
