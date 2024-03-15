const localStorageKey = "lists";
const localStorageIdKey = "listId";

function saveToLocalStorage(lists, selectedListId) {
  localStorage.setItem(localStorageKey, JSON.stringify(lists));
  localStorage.setItem(localStorageIdKey, JSON.stringify(selectedListId));
}

function getFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  return data;
}

function getIdFromLocalStorage() {
  const selectedListId = JSON.parse(localStorage.getItem(localStorageIdKey));
  return selectedListId;
}

export { saveToLocalStorage, getFromLocalStorage, getIdFromLocalStorage };
