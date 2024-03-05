let lists = [];
const localStorageKey = "lists";

const updateLists = () => {
  if (!localStorage.getItem(localStorageKey)) {
    createList("My List", "defaultImg");
    storeLists();
  }

  lists = JSON.parse(localStorage.getItem(localStorageKey));
};

const storeLists = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(lists));
};

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
  storeLists();
  return newList;
};

const editList = (listName, newListName, newIcon) => {
  const selectedList = getList(listName);
  selectedList.name = newListName;
  selectedList.icon = newIcon;
  storeLists();
};

const deleteList = (listName) => {
  const selectedListIndex = getListIndex(listName);
  lists.splice(selectedListIndex, 1);
  storeLists();
};

const getList = (listName) => lists.find((list) => list.name === listName);

const getListIndex = (listName) =>
  lists.findIndex((list) => list.name === listName);

export {
  storeLists,
  updateLists,
  createList,
  editList,
  deleteList,
  getList,
  getListIndex,
};
