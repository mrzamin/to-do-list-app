import "./styles.css";
import * as listModule from "./list";
import * as taskModule from "./task";
import * as screenController from "./screenController";
import { renderHomepage } from "./homepage";

// window.alert(window.location);
// listModule.updateLists();
// let groceryList = listModule.createList("Groceries", "shopping cart");

// let familyList = listModule.createList("Family", "family");
// listModule.updateLists();

// renderHomepage();

// if (!selectedList == "none") {
//   screenController.screenController();
// } else {
//   renderHomepage();
// }
screenController.screenController();
