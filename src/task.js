const Task = (name, description, date, priority, list) => {
  return {
    name,
    description,
    date,
    priority,
    list,

    set setName(newName) {
      this.name = newName;
    },

    set setDescription(newDescription) {
      this.description = newDescription;
    },

    set setDate(newDate) {
      this.date = newDate;
    },

    set setPriority(newPriority) {
      this.priority = newPriority;
    },

    set setList(newList) {
      this.name = newList;
    },
  };
};

let task1 = Task("Pick up Quentin", "dkdjd", "iddbdbd", "prppr", "Car");
