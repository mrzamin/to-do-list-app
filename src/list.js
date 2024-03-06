import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";

let lists = [];

const updateLists = () => {
  if (!getFromLocalStorage) {
    createList("My List", "defaultImg");
    saveToLocalStorage(lists);
  }

  // lists = JSON.parse(localStorage.getItem(localStorageKey));
};

// const storeLists = () => {
//   localStorage.setItem(localStorageKey, JSON.stringify(lists));
// };

const List = (name, icon) => {
  let tasks = [];
  let completed = [];
  return {
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

const deleteList = (listName) => {
  const selectedListIndex = getListIndex(listName);
  lists.splice(selectedListIndex, 1);
  saveToLocalStorage(lists);
};

const getList = (listName) => lists.find((list) => list.name === listName);

const getListIndex = (listName) =>
  lists.findIndex((list) => list.name === listName);

export {
  lists,
  updateLists,
  createList,
  editList,
  deleteList,
  getList,
  getListIndex,
};
