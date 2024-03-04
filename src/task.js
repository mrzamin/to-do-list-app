import * as listModule from "./list.js";

const Task = (name, description, date, priority) => {
  return {
    name,
    description,
    date,
    priority,
  };
};

const createTask = (list, taskName, description, date, priority) => {
  const chosenList = listModule.getList(list);
  const newTask = Task(taskName, description, date, priority);
  chosenList.tasks.push(newTask);
  return newTask;
};

const editTask = (
  list,
  taskName,
  newName,
  newDescription,
  newDate,
  newPriority
) => {
  const chosenList = listModule.getList(list);
  console.log(`Hello there ${chosenList.name}`);

  const chosenTask = getTask(`${chosenList.name}`, taskName);
  console.log(`Hello there ${chosenTask.name}`);
  chosenTask.name = newName;
  chosenTask.description = newDescription;
  chosenTask.date = newDate;
  chosenTask.priority = newPriority;

  let updatedTask = chosenTask;
  return updatedTask;
};

const deleteTask = (list, taskName) => {
  const selectedList = listModule.getList(list);
  const chosenTaskIndex = getTaskIndex(list, taskName);
  selectedList.tasks.splice(chosenTaskIndex, 1);
};

const markComplete = (list, taskName) => {
  const selectedList = listModule.getList(list);
  const chosenTask = getTask(list, taskName);
  const chosenTaskIndex = getTaskIndex(list, taskName);
  selectedList.completed.push(chosenTask);
  console.log(selectedList.completed);
  selectedList.tasks.splice(chosenTaskIndex, 1);
};

const getTask = (list, taskName) => {
  const selectedList = listModule.getList(list);
  //May need to create a new identifier for task.
  //Loop through the specified list obj, find the "tasks" key, find the task in the array.
  for (const key in selectedList) {
    if (key === "tasks") {
      const task = selectedList[key].find((task) => task.name === taskName);
      if (task) return task;
    }
  }
};

const getTaskIndex = (list, taskName) => {
  const selectedList = listModule.getList(list);
  //   console.log(selectedList);
  for (let key in selectedList) {
    if (key === "tasks") {
      const taskIndex = selectedList[key].findIndex(
        (task) => task.name === taskName
      );
      return taskIndex;
    }
  }
};

export {
  createTask,
  editTask,
  deleteTask,
  markComplete,
  getTask,
  getTaskIndex,
};
