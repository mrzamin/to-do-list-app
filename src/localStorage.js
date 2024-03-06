const localStorageKey = "lists";

function saveToLocalStorage(data) {
  return localStorage.setItem(localStorageKey, JSON.stringify(data));
}

function getFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  return data;
}

export { saveToLocalStorage, getFromLocalStorage };
