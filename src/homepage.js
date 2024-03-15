const main = document.querySelector(".main");

export function renderHomepage() {
  const homepageTitle = document.createElement("h1");
  homepageTitle.innerHTML = "To-Do App";
  homepageTitle.classList.add("homepage-title");

  const homepageDescr = document.createElement("p");
  homepageDescr.innerHTML =
    "Create a new list by clicking the + button or select an existing one to start adding your tasks.";
  homepageDescr.classList.add("homepage-descr");

  const homepageContainer = document.createElement("div");
  homepageContainer.classList.add("homepage-container");
  homepageContainer.appendChild(homepageTitle);
  homepageContainer.appendChild(homepageDescr);

  main.appendChild(homepageContainer);
}

export function clearHomepage() {
  main.innerHTML = "";
}
