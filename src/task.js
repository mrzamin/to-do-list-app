import * as listModule from "./list.js";
import { saveToLocalStorage } from "./localStorage";

const Task = (listId, name, description, date, priority) => {
  let taskId = Date.now().toString();
  let complete = false;
  return {
    taskId,
    listId,
    name,
    description,
    date,
    priority,
    complete,
  };
};

const createTask = (listId, name, description, date, priority) => {
  const list = listModule.getList(listId);
  const task = Task(listId, name, description, date, priority);
  list.tasks.push(task);
};

const editTask = (
  listId,
  taskId,
  newName,
  newDescription,
  newDate,
  newPriority
) => {
  const list = listModule.getList(listId);
  const task = getTask(listId, taskId);

  task.name = newName;
  task.description = newDescription;
  task.date = newDate;
  task.priority = newPriority;
};

const deleteTask = (listId, taskId) => {
  const list = listModule.getList(listId);
  const taskIndex = getTaskIndex(listId, taskId);
  list.tasks.splice(taskIndex, 1);
};

const markComplete = (listId, taskId) => {
  const list = listModule.getList(list);
  const task = getTask(listId, taskId);
  const taskIndex = getTaskIndex(listId, taskId);
  list.completed.unshift(task);
  list.tasks.splice(taskIndex, 1);
};

const getTask = (listId, taskId) => {
  const list = listModule.getList(listId);
  for (const key in list) {
    if (key === "tasks") {
      const task = list[key].find((task) => task.taskId === taskId);
      if (task) return task;
    }
  }
};

const getTaskIndex = (listId, taskId) => {
  const list = listModule.getList(listId);
  for (let key in list) {
    if (key === "tasks") {
      const taskIndex = list[key].findIndex((task) => task.taskId === taskId);
      if (taskIndex) return taskIndex;
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
