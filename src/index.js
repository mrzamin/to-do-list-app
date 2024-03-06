import "./styles.css";
import * as listModule from "./list";
import * as taskModule from "./task";
import screenController from "./screenController";

// window.alert(window.location);

let groceryList = listModule.createList("Groceries", "shopping cart");

let familyList = listModule.createList("Family", "family");
listModule.updateLists();
screenController();

// let task1 = taskModule.createTask(
//   "Groceries",
//   "get apples",
//   "get apples from fresh thyme",
//   "2/6",
//   "high"
// );

// let task2 = taskModule.createTask(
//   "Groceries",
//   "Text Quentin",
//   "Text Q before end of day",
//   "2/6",
//   "high"
// );

// let completedTask = taskModule.markComplete("Groceries", "Text Quentin");
// let completedTask1 = taskModule.markComplete("Groceries", "get apples");

// console.log(groceryList);
