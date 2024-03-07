import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";
import screenController from "./screenController";

let lists = getFromLocalStorage() || [];

// const updateLists = () => {
//   if (!getFromLocalStorage) {
//     console.log("No lists in storage");
//     createList("My List", "defaultImg");
//     // saveToLocalStorage(lists);
//   }

// lists = JSON.parse(localStorage.getItem(localStorageKey));
// };

// const storeLists = () => {
//   localStorage.setItem(localStorageKey, JSON.stringify(lists));
// };

const List = (name, icon) => {
  let id = Date.now().toString();
  let tasks = [];
  let completed = [];
  return {
    id,
    name,
    icon,
    tasks,
    completed,
  };
};

const createList = (chosenName, chosenIcon) => {
  const newList = List(chosenName, chosenIcon);
  lists.push(newList);
  saveToLocalStorage(lists);
  return newList;
};

const editList = (listName, newListName, newIcon) => {
  const selectedList = getList(listName);
  selectedList.name = newListName;
  selectedList.icon = newIcon;
  saveToLocalStorage(lists);
};

const deleteList = (listId) => {
  const selectedListIndex = getListIndex(listId);
  lists.splice(selectedListIndex, 1);
  saveToLocalStorage(lists);
};

const getList = (listName) => lists.find((list) => list.name === listName);

const getListIndex = (listId) => lists.findIndex((list) => list.id === listId);

export { lists, createList, editList, deleteList, getList, getListIndex };
