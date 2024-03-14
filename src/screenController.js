import * as listModule from "./list";
import * as taskModule from "./task";
// import { saveToLocalStorage, getIdFromLocalStorage } from "./localStorage";

import addBtn from "./addBtn.svg";
import editBtn from "./editBtn.svg";
import deleteBtn from "./deleteBtn.svg";
import plusBtn from "./plusBtn.svg";

const localStorageKey = "lists";
const localStorageIdKey = "listId";

function saveToLocalStorage(lists, selectedListId) {
  localStorage.setItem(localStorageKey, JSON.stringify(lists));
  localStorage.setItem(localStorageIdKey, JSON.stringify(selectedListId));
}

function getFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  // return JSON.parse(localStorage.getItem(localStorageKey));
  return data;
}

function getIdFromLocalStorage() {
  const selectedListId = JSON.parse(localStorage.getItem(localStorageIdKey));
  return selectedListId;
}

let selectedListId = "none";
let selectedList = "none";

let selectedTaskId = "none";

function screenController() {
  const lists = listModule.lists;
  saveToLocalStorage(lists, selectedListId);
  selectedListId = getIdFromLocalStorage();

  const sidebarTitle = document.querySelector(".sidebar-title");
  const listContainer = document.querySelector(".list-container");
  const addListForm = document.querySelector(".list-form");
  const addListBtn = document.querySelector(".plus-btn-container");
  const listInput = document.querySelector(".list-input");
  const listSpan = document.querySelector(".list-span");
  const listForm = document.querySelector("#list-form");
  const overlay = document.querySelector("#overlay");
  const cancelBtns = document.querySelectorAll(".cancel");
  const submitBtn = document.querySelector(".list-submit");
  const taskContainer = document.querySelector(".main-content");
  // const main = document.querySelector(".main");
  // const addItemBtn = document.querySelector(".add-item-container");
  const addItemForm = document.querySelector(".task-form");
  const taskTitleInput = document.querySelector(".task-title");
  const taskName = document.querySelector(".task-title");
  const taskDescr = document.querySelector(".task-description");
  const taskDate = document.querySelector(".task-date");
  const taskPriority = document.querySelector(".task-priority");

  sidebarTitle.addEventListener("click", renderHomepage);

  listInput.addEventListener("mouseout", toggleFormDisplay);

  function addItem(e) {
    e.preventDefault();
    if (selectedTaskId == "none") {
      if (taskName.value !== "") {
        taskModule.createTask(
          selectedListId,
          taskName.value,
          taskDescr.value,
          taskDate.value,
          taskPriority.value
        );
      }
    } else {
      console.log(`The seelcted task id is ${selectedTaskId}`);
      taskModule.editTask(
        selectedListId,
        selectedTaskId,
        taskName.value,
        taskDescr.value,
        taskDate.value,
        taskPriority.value
      );
    }
    saveToLocalStorage(lists, selectedListId);
    const taskModal = document.querySelector("#task-modal");
    closeModal(taskModal);
    renderTasks(selectedList);
    taskName.value = "";
    taskDescr.value = "";
    taskDate.value = "";
    taskPriority.value = "";
  }

  addItemForm.addEventListener("submit", (e) => {
    addItem(e);
  });

  const renderLists = () => {
    clearLists();

    lists.forEach((list) => {
      const listName = document.createElement("p");
      listName.innerHTML = list.name;
      listName.classList.add("list-name");
      listName.setAttribute("readonly", true);
      listName.dataset.listId = list.id;
      // console.log(selectedListId);
      if (list.id === selectedListId) {
        listName.classList.add("selected-list");
      }

      const editListBtn = document.createElement("img");
      editListBtn.src = editBtn;
      editListBtn.dataset.btn = "edit";
      editListBtn.classList.add("list-edit");

      editListBtn.dataset.listId = list.id;

      const deleteListBtn = document.createElement("img");
      deleteListBtn.src = deleteBtn;
      deleteListBtn.dataset.btn = "delete";
      deleteListBtn.dataset.listId = list.id;
      deleteListBtn.classList.add("list-delete");

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("list-btn-container");
      btnContainer.appendChild(editListBtn);
      btnContainer.appendChild(deleteListBtn);

      const listElement = document.createElement("li");
      listElement.classList.add("list-element");
      listElement.appendChild(listName);
      listElement.appendChild(btnContainer);

      listContainer.appendChild(listElement);
    });

    // const selectedList = listModule.getList(selectedListId);
    // renderTasks(selectedList);
  };

  //clears list collection from UI.
  const clearLists = () => {
    listContainer.innerHTML = "";
  };

  const clearTasks = () => {
    taskContainer.innerHTML = "";
  };

  //Add event listener to add list form.
  addListForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = listInput.value;
    if (listName == null || listName === "") return;
    listModule.createList(listName, "defaultImg");
    toggleFormDisplay();
    listInput.value = "";
    renderLists();
  });

  function toggleFormDisplay() {
    console.log("toggled activated");
    if (listInput.style.visibility == "hidden") {
      listInput.style.visibility = "visible";
      listSpan.style.visibility = "visible";
    } else {
      listInput.style.visibility = "hidden";
      listSpan.style.visibility = "hidden";
    }
  }

  //Add event listener to add list button.

  addListBtn.addEventListener("click", toggleFormDisplay);

  listContainer.addEventListener("click", selectElement);

  function selectElement(e) {
    selectedListId = e.target.dataset.listId;
    saveToLocalStorage(lists, selectedListId);
    if (e.target.tagName.toLowerCase() === "p") {
      renderLists();
      selectedList = listModule.getList(selectedListId);
      renderTasks(selectedList);
    }
    if (e.target.dataset.btn == "edit") {
      openListModal(selectedListId);
    }

    if (e.target.dataset.btn == "delete") {
      listModule.deleteList(selectedListId);
      renderLists();
    }
  }

  cancelBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(".modal.active");
      closeModal(modal);
    });
  });

  listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listModal = document.querySelector(".modal.active");
    const listName = document.querySelector(".list-name-input");
    if (listName == null || listName == "") return;
    listModule.editListName(selectedListId, listName.value, "default");
    renderLists();
    closeModal(listModal);
    toggleFormDisplay();
  });

  function openListModal(selectedListId) {
    const listModal = document.querySelector("#list-modal");
    console.log(listModal);
    const listName = document.querySelector(".list-name-input");
    const listTitle = document.querySelector(".list-title");
    const list = listModule.getList(selectedListId);
    listName.value = list.name;
    listTitle.innerHTML = list.name;
    listModal.classList.add("active");
    overlay.classList.add("active");
    renderLists();
  }

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

  function renderHomepage() {
    clearTasks();

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

    taskContainer.appendChild(homepageContainer);
  }

  function renderHeader(selectedList) {
    const header = document.createElement("div");
    header.classList.add("main-heading");

    const listTitle = document.createElement("h1");
    listTitle.innerHTML = selectedList.name;
    listTitle.classList.add("list-heading");

    const addItemContainer = document.createElement("div");
    addItemContainer.classList.add("add-item-container");

    addItemContainer.addEventListener("click", () => {
      selectedTaskId = "none";
      const taskModal = document.querySelector("#task-modal");
      openModal(taskModal);
    });

    const addItemh3 = document.createElement("h3");
    addItemh3.innerHTML = "Add item";

    const addItemImg = document.createElement("img");
    addItemImg.src = plusBtn;

    addItemContainer.appendChild(addItemh3);
    addItemContainer.appendChild(addItemImg);

    header.appendChild(listTitle);
    header.appendChild(addItemContainer);

    taskContainer.appendChild(header);
  }

  function renderTasks(selectedList) {
    clearTasks();

    renderHeader(selectedList);

    selectedList.tasks.forEach((task) => {
      let itemCard = document.createElement("div");
      itemCard.classList.add("item-card");
      // itemCard.dataset.taskId = task.id;

      let priorityIndicator = document.createElement("div");
      priorityIndicator.classList.add("priority-indicator");

      if (task.priority == "Low") {
        priorityIndicator.classList.add("priority-low");
      } else if (task.priority == "Medium") {
        priorityIndicator.classList.add("priority-medium");
      } else if (task.priority == "High") {
        priorityIndicator.classList.add("priority-high");
      } else {
        priorityIndicator.classList.add("priority-default");
      }

      let checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.dataset.taskId = task.id;
      checkbox.classList.add("checkbox");

      let checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add("checkbox-container");
      checkboxContainer.appendChild(checkbox);

      let itemName = document.createElement("h3");
      itemName.classList.add("item-name");
      itemName.textContent = task.name;

      let dueDate = document.createElement("h3");
      dueDate.textContent = task.date;
      dueDate.classList.add("date");

      let trashIcon = new Image();
      trashIcon.dataset.taskId = task.id;
      trashIcon.src = deleteBtn;

      let deleteItemBtn = document.createElement("div");
      deleteItemBtn.classList.add("delete-item-btn");
      deleteItemBtn.appendChild(trashIcon);
      deleteItemBtn.dataset.taskId = task.id;
      deleteItemBtn.dataset.btn = "delete";

      deleteItemBtn.addEventListener("click", (e) => {
        // let selectedTaskId = task.id;
        selectedTaskId = task.id;
        console.log(selectedTaskId);
        taskModule.deleteTask(selectedListId, selectedTaskId);
        // renderLists();
        renderTasks(selectedList);
      });

      let pencilIcon = new Image();
      pencilIcon.dataset.taskId = task.id;
      pencilIcon.src = editBtn;

      let editItemBtn = document.createElement("div");
      editItemBtn.classList.add("edit-item-btn");
      editItemBtn.appendChild(pencilIcon);
      editItemBtn.dataset.taskId = task.id;
      editItemBtn.dataset.btn = "edit";

      editItemBtn.addEventListener("click", () => {
        selectedTaskId = task.id;
        taskName.value = task.name;
        taskDescr.value = task.description;
        taskPriority.value = task.priority;
        taskDate.value = task.date;
        const taskModal = document.querySelector("#task-modal");
        openModal(taskModal);
      });

      itemCard.appendChild(priorityIndicator);
      itemCard.appendChild(checkboxContainer);
      itemCard.appendChild(itemName);
      itemCard.appendChild(dueDate);
      itemCard.appendChild(editItemBtn);
      itemCard.appendChild(deleteItemBtn);

      taskContainer.appendChild(itemCard);
    });
  }

  //Initial render.
  renderLists();
  renderHomepage();
  console.log(selectedTaskId);
  selectedList = listModule.getList(selectedListId);
  // renderTasks(selectedList);
}

export { screenController, getFromLocalStorage, saveToLocalStorage };
