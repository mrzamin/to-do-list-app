const List = (name, icon) => {
  return {
    name,
    icon,
    set setName(newName) {
      this.name = newName;
    },
  };
};

let list1 = List("groceries", "icon");
