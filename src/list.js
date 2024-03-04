let lists = [];
console.log[lists];

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
  return newList;
};

const editList = (listName, newListName, newIcon) => {
  const selectedList = getList(listName);
  selectedList.name = newListName;
  selectedList.icon = newIcon;
};

const deleteList = (listName) => {
  const selectedListIndex = getListIndex(listName);
  lists.splice(selectedListIndex, 1);
};

const getList = (listName) => lists.find((list) => list.name === listName);

const getListIndex = (listName) =>
  lists.findIndex((list) => list.name === listName);

export { createList, editList, deleteList, getList, getListIndex };
