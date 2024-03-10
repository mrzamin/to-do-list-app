import { getFromLocalStorage, saveToLocalStorage } from "./screenController";

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

const createList = (name, icon) => {
  const list = List(name, icon);
  lists.push(list);
  saveToLocalStorage(lists);
};

const editListName = (listId, newName, icon) => {
  const list = getList(listId);
  list.name = newName;
  list.icon = icon;
  saveToLocalStorage(lists, listId);
};

const deleteList = (listId) => {
  const listIndex = getListIndex(listId);
  lists.splice(listIndex, 1);
  saveToLocalStorage(lists, listId);
};

const getList = (listId) => lists.find((list) => list.id === listId);

const getListIndex = (listId) => lists.findIndex((list) => list.id === listId);

export { lists, createList, editListName, deleteList, getList, getListIndex };
