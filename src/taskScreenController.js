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
