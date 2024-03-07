import * as listModule from "./list";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";
import addBtn from "./addBtn.svg";
import editBtn from "./editBtn.svg";
import deleteBtn from "./deleteBtn.svg";

function screenController() {
  const currentLists = listModule.lists;
  console.log(currentLists);
  const wrapper = document.querySelector(".wrapper");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main");
  const sidebarHeader = document.querySelector(".sidebar-header");
  const listContainer = document.querySelector(".list-container");
  const listContainerIcon = document.querySelector(".list-container-icon");
  listContainerIcon.src = addBtn;
  const form = document.querySelector(".list-form");
  const input = document.querySelector(".list-input");
  input.style.visibility = "hidden";
  const listContainerUL = document.querySelector(".list-container-ul");
  let selectedListId;
  let selectedList;

  // const updateLists = () => {
  //   if (!getFromLocalStorage) {
  //     console.log("No lists in storage");
  //     createList("My List", "defaultImg");
  //     // saveToLocalStorage(lists);
  //   }

  //Render the lists onto the page.
  const renderLists = () => {
    clearLists();
    currentLists.forEach((list) => {
      const listElement = document.createElement("li");
      listElement.classList.add("list");
      listElement.dataset.listId = list.id;
      // listElement.innerText = list.name;
      listContainerUL.appendChild(listElement);

      const listName = document.createElement("p");
      listName.classList.add("list-name");
      listName.innerHTML = list.name;

      const editBtn = document.createElement("img");
      editBtn.src = editBtn;

      const deleteBtn = document.createElement("img");
      deleteBtn.src = deleteBtn;

      listElement.appendChild(listName);
      listElement.appendChild(editBtn);
      listElement.appendChild(deleteBtn);
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
    input.value = "";
    renderLists();
    toggleInput();
  });

  listContainerUL.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "li") {
      console.log("li clicked");
      if (selectedList == null) {
        console.log("equals null");
        selectedListId = e.target.dataset.listId;
        selectedList = e.target;
        highlightList(selectedList);
      } else {
        unhighlightList(selectedList);
        selectedListId = e.target.dataset.listId;
        selectedList = e.target;
        highlightList(selectedList);
      }
    }
  });

  listContainerIcon.addEventListener("click", (e) => {
    toggleInput();
  });

  function toggleInput() {
    if (input.style.visibility == "hidden") {
      input.style.visibility = "visible";
    } else {
      input.style.visibility = "hidden";
    }
  }

  function highlightList(list) {
    list.classList.add("selected-list");
  }

  function unhighlightList(list) {
    list.classList.remove("selected-list");
  }

  //Initial render:
  renderLists();
}

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
