import * as listModule from "./list.js";
import * as taskModule from "./task.js";

let groceryList = listModule.createList("Groceries", "shopping cart");

// let familyList = listModule.createList("Family", "family");

let task1 = taskModule.createTask(
  "Groceries",
  "get apples",
  "get apples from fresh thyme",
  "2/6",
  "high"
);

let task2 = taskModule.createTask(
  "Groceries",
  "Text Quentin",
  "Text Q before end of day",
  "2/6",
  "high"
);

let editedTask = taskModule.editTask(
  "Groceries",
  "get apples",
  "get hemp",
  "get oranges from fresh thyme",
  "2/6",
  "high"
);

let getTask = taskModule.getTask("Groceries", "Text Quentin");
console.log(getTask);
