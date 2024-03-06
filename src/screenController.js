import * as listModule from "./list";

const screenController = () => {
  const currentLists = listModule.lists;
  console.log(currentLists);
  const wrapper = document.querySelector(".wrapper");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main");
  const sidebarHeader = document.querySelector(".sidebar-header");
  const listContainer = document.querySelector(".list-container");
  const form = document.querySelector(".list-form");
  const input = document.querySelector(".list-input");
  const listContainerUL = document.querySelector(".list-container-ul");

  const updateLists = () => {
    clearLists();
    currentLists.forEach((list) => {
      const listElement = document.createElement("li");
      listElement.classList.add("list");
      listElement.innerText = `${list.name}`;
      listContainerUL.appendChild(listElement);
    });
  };

  const clearLists = () => {
    listContainerUL.innerHTML = "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted");
    const listName = input.value;
    if (listName == null || listName === "") return;
    listModule.createList(listName, "defaultImg");
    updateLists();
  });

  //Initial render:
  updateLists();
};

export default screenController;
// const listVariable = listModule.lists;

// const lists = lists;
// const wrapper = document.querySelector(".wrapper");
// const sidebar = document.querySelector(".sidebar");
// const main = document.querySelector(".main");
// const sidebarHeader = document.querySelector(".sidebar-header");
// const listContainer = document.querySelector(".list-container");

// const createUI = () => {
//   //Grab DOM elements.

//   sidebarHeader.innerHTML = "To-Do App";

//   //Create list contents in sidebar.

//   const listContainerHeading = document.createElement("div");
//   listContainerHeading.classList.add("list-container-heading");

//   const listContainerTitle = document.createElement("h3");
//   listContainerTitle.classList.add("list-container-title");
//   listContainerTitle.textContent = "My lists";
//   const listContainerIcon = new Image();
//   listContainerIcon.classList.add("add");
//   listContainerIcon.src = addBtn;

//   listContainerHeading.appendChild(listContainerTitle);
//   listContainerHeading.appendChild(listContainerIcon);

//   //Unordered list
//   const listContainerUL = document.createElement("ul");
//   listContainerUL.classList.add("sidebar-ul");

//   listContainer.appendChild(listContainerHeading);
//   listContainer.appendChild(listContainerUL);

//   listVariable.forEach((list) => {
//     const listElement = document.createElement("li");
//     // listElement.className.add("list");
//     listElement.innerText = `${list.name}`;
//     listContainerUL.appendChild(listElement);
//   });

//   //Input element.

//   const form = document.createElement("form");
//   const input = document.createElement("input");
//   const icon = document.createElement("img");
//   form.appendChild(input);
//   form.appendChild(icon);

//   listContainer.appendChild(form);

//   //add event listener to the form.
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const listName = input.value;

//     if (listName == null || listName === "") return;
//     clearElement(listContainer);
//     listModule.createList(listName, "defaultImg");
//     clearLists();
//   });
// };

// function clearLists() {}
// export default createUI;
