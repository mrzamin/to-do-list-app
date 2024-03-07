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
  const addTaskBtn = document.querySelector(".add-task-btn");
  const cancelBtn = document.querySelector(".cancel");
  const overlay = document.querySelector("#overlay");
  let selectedListId;
  let selectedList;

  addTaskBtn.addEventListener("click", () => {
    const modal = document.querySelector("#modal");
    openModal(modal);
  });

  cancelBtn.addEventListener("click", () => {
    const modal = document.querySelector(".modal.active");
    closeModal(modal);
  });

  function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  overlay.addEventListener("click", () => {
    const modal = document.querySelector(".modal.active");
    closeModal(modal);
  });
  // const updateLists = () => {
  //   if (!getFromLocalStorage) {
  //     console.log("No lists in storage");
  //     createList("My List", "defaultImg");
  //     // saveToLocalStorage(lists);
  //   }

  //Render tasks onto the page.
  const renderTasks = (listId) => {};

  //Render the lists onto the page.
  const renderLists = () => {
    clearLists();
    currentLists.forEach((list) => {
      const listElement = document.createElement("li");
      listElement.classList.add("list");

      // listElement.innerText = list.name;
      listContainerUL.appendChild(listElement);

      const form = document.createElement("form");
      form.classList.add("edit-form");

      const listName = document.createElement("input");
      listName.value = list.name;
      listName.setAttribute("readonly", true);
      listName.classList.add("list-name");
      listName.dataset.listId = list.id;

      form.appendChild(listName);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (listName.value == null || listName.value === "") {
          listName.value = list.name;
        } else {
          listModule.editList(list.name, listName.value, "defaultJPG");
          renderLists();
          toggleReadOnly(listName);
        }
      });

      const editIcon = document.createElement("img");
      editIcon.src = editBtn;
      editIcon.dataset.icon = "edit";
      editIcon.dataset.listId = list.id;

      const deleteIcon = document.createElement("img");
      deleteIcon.src = deleteBtn;
      deleteIcon.dataset.icon = "delete";
      deleteIcon.dataset.listId = list.id;

      listElement.appendChild(form);
      listElement.appendChild(editIcon);
      listElement.appendChild(deleteIcon);
    });
  };

  const clearLists = () => {
    listContainerUL.innerHTML = "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = input.value;
    if (listName == null || listName === "") return;
    listModule.createList(listName, "defaultImg");
    input.value = "";
    renderLists();
    toggleInput();
  });

  listContainerUL.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "input") {
      selectedListId = e.target.dataset.listId;
      selectedList = e.target;

      if (selectedList == null) {
        console.log("equals null");

        highlightList(selectedList);
        renderTasks(selectedListId);
      } else {
        unhighlightList(selectedList);
        highlightList(selectedList);
        renderTasks(selectedListId);
      }
    }

    if (e.target.dataset.icon == "edit") {
      const listName = e.target.previousElementSibling;
      const input = listName.firstElementChild;
      toggleReadOnly(input);
    }

    if (e.target.dataset.icon == "delete") {
      const selectedListId = e.target.dataset.listId;
      listModule.deleteList(selectedListId);
      renderLists();
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

  function toggleReadOnly(input) {
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
    } else {
      input.setAttribute("readonly", "readonly");
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
