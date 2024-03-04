import * as list from "./list.js";

const Task = (name, description, date, priority, list) => {
  return {
    name,
    description,
    date,
    priority,
    list,

    // set setName(newName) {
    //   this.name = newName;
    // },

    // set setDescription(newDescription) {
    //   this.description = newDescription;
    // },

    // set setDate(newDate) {
    //   this.date = newDate;
    // },

    // set setPriority(newPriority) {
    //   this.priority = newPriority;
    // },

    // set setList(newList) {
    //   this.name = newList;
    // },
  };
};

const createTask = (chosenList, taskName, description, date, priority) => {
  const chosenList = getList(chosenList);
  const newTask = Task(taskName, description, date, priority);
  chosenList.tasks.push(newTask);
};

let task1 = Task("Pick up Quentin", "dkdjd", "iddbdbd", "prppr", "Car");
