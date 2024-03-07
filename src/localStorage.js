const localStorageKey = "lists";

function saveToLocalStorage(lists) {
  console.log("saved");
  localStorage.setItem(localStorageKey, JSON.stringify(lists));
}

function getFromLocalStorage() {
  console.log("fetched");
  const data = JSON.parse(localStorage.getItem(localStorageKey));
  return data;
}

export { saveToLocalStorage, getFromLocalStorage };
