import * as listModule from "./list";
import * as taskModule from "./task";
// import { saveToLocalStorage, getIdFromLocalStorage } from "./localStorage";

import addBtn from "./addBtn.svg";
import editBtn from "./editBtn.svg";
import deleteBtn from "./deleteBtn.svg";

const localStorageKey = "lists";
const localStorageIdKey = "listId";

function saveToLocalStorage(lists, selectedListId) {
  localStorage.setItem(localStorageKey, JSON.stringify(lists));
  localStorage.setItem(localStorageIdKey, JSON.stringify(selectedListId));
}

function getFromLocalStorage() {
  const data = localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey))
    : null;
  // return JSON.parse(localStorage.getItem(localStorageKey));
  return data;
}

function getIdFromLocalStorage() {
  const selectedListId = localStorage.getItem(localStorageIdKey);
  return selectedListId;
}

let selectedListId = getIdFromLocalStorage();

function screenController() {
  const lists = listModule.lists;
  const listContainer = document.querySelector(".list-container");
  const addListForm = document.querySelector(".list-form");
  const addListBtn = document.querySelector(".list-collection-add-btn");
  const listInput = document.querySelector(".list-input");
  const listForm = document.querySelector("#list-form");
  const overlay = document.querySelector("#overlay");
  const cancelBtn = document.querySelector(".list-cancel");
  const submitBtn = document.querySelector(".list-submit");

  const renderLists = () => {
    clearLists();
    lists.forEach((list) => {
      const listName = document.createElement("input");
      listName.value = list.name;
      listName.classList.add("list-name");
      listName.setAttribute("readonly", true);
      listName.dataset.listId = list.id;
      if (list.id === selectedListId) {
        listName.classList.add("selected-list");
      }

      const editListForm = document.createElement("form");
      editListForm.classList.add("edit-list-form");
      editListForm.appendChild(listName);

      const editListBtn = document.createElement("img");
      editListBtn.src = editBtn;
      editListBtn.dataset.btn = "edit";
      editListBtn.dataset.listId = list.id;

      const deleteListBtn = document.createElement("img");
      deleteListBtn.src = deleteBtn;
      deleteListBtn.dataset.btn = "delete";
      deleteListBtn.dataset.listId = list.id;

      const listElement = document.createElement("li");
      listElement.classList.add("list-element");
      listElement.appendChild(editListForm);
      listElement.appendChild(editListBtn);
      listElement.appendChild(deleteListBtn);

      listContainer.appendChild(listElement);
    });
  };

  //clears list collection from UI.
  const clearLists = () => {
    listContainer.innerHTML = "";
  };

  //Add event listener to add list form.
  addListForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = listInput.value;
    if (listName == null || listName === "") return;
    listModule.createList(listName, "defaultImg");
    listInput.value = "";
    renderLists();
    toggleFormDisplay();
  });

  function toggleFormDisplay() {
    if (listInput.style.visibility == "hidden") {
      listInput.style.visibility = "visible";
    } else {
      listInput.style.visibility = "hidden";
    }
  }

  //Add event listener to add list button.

  addListBtn.addEventListener("click", toggleFormDisplay);

  listContainer.addEventListener("click", selectElement);

  function selectElement(e) {
    selectedListId = e.target.dataset.listId;
    saveToLocalStorage(lists, selectedListId);
    if (e.target.tagName.toLowerCase() === "input") {
      renderLists();
    }
    if (e.target.dataset.btn == "edit") {
      openListModal(selectedListId);
    }

    if (e.target.dataset.btn == "delete") {
      listModule.deleteList(selectedListId);
      renderLists();
    }
  }

  cancelBtn.addEventListener("click", () => {
    const listModal = document.querySelector(".modal.active");
    closeModal(listModal);
  });

  listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listModal = document.querySelector(".modal.active");
    const listName = document.querySelector(".list-name-input");
    if (listName == null || listName == "") return;
    listModule.editListName(selectedListId, listName.value, "default");
    renderLists();
    closeModal(listModal);
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

  // function openModal(modal) {
  //   modal.classList.add("active");
  //   overlay.classList.add("active");
  // }

  function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  overlay.addEventListener("click", () => {
    const modal = document.querySelector(".modal.active");
    closeModal(modal);
  });

  function renderItems() {
    lists.forEach((item) => {
      let itemCard = document.createElement("div");
      itemCard.classList.add("item-card");

      let priorityIndicator = document.createElement("div");
      priorityIndicator.classList.add("priority-indicator");

      if (item.priority == 1) {
        priorityIndicator.classList.add("priority1-indicator");
      }
      if (item.priority == 2) {
        priorityIndicator.classList.add("priority2-indicator");
      }
      if (item.priority == 3) {
        priorityIndicator.classList.add("priority3-indicator");
      }

      let completeCheckbox = document.createElement("input");
      completeCheckbox.setAttribute("type", "checkbox");
      completeCheckbox.classList.add("complete-checkbox");

      let itemName = document.createElement("h3");
      itemName.textContent = item.name;

      let dueDate = document.createElement("h3");
      dueDate.textContent = item.date;
      dueDate.classList.add("date");

      let editItemBtn = document.createElement("button");
      editItemBtn.classList.add("edit-item-btn");

      let deleteItemBtn = document.createElement("button");
      deleteItemBtn.classList.add("delete-item-btn");

      itemCard.appendChild(priorityIndicator);
      itemCard.appendChild(completeCheckbox);
      itemCard.appendChild(itemTitle);
      itemCard.appendChild(dueDate);
      itemCard.appendChild(editItemBtn);
      itemCard.appendChild(deleteItemBtn);
    });
  }

  //Initial render.
  renderLists();
}

export { screenController, getFromLocalStorage, saveToLocalStorage };
