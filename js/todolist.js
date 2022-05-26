//Select Elements
let ulDom = document.querySelector("#list");
let taskInput = document.querySelector("#task");

loadItems();

function newElement() {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("list-item");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  //Complete click event
  newTodo.addEventListener("click", completeListItem);
  newTodo.innerText = taskInput.value;
  todoDiv.appendChild(newTodo);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.classList.add("btn-delete");
  //Delete Button Click Event
  deleteButton.addEventListener("click", deleteListItem);
  todoDiv.appendChild(deleteButton);
  //Check empty Value
  if (taskInput.value != "") {
    //Append to List
    ulDom.appendChild(todoDiv);
    //Add to Local Storage
    loadStorage(taskInput.value);
    //Clear taskInput Value
    taskInput.value = "";
    //Success Toast Message
    $(".success").toast("show");
  } else {
    $(".error").toast("show");
  }
}

function deleteListItem(e) {
  const item = e.target.parentElement;
  item.remove();
  dltStorage(e.target.previousElementSibling.innerText);
}

function completeListItem(e) {
  const item = e.target;
  item.classList.toggle("checked");
}

function loadStorage(text) {
  let str = JSON.parse(localStorage.getItem("todo"));
  let toDos;
  if (str == null) {
    toDos = [];
  } else {
    toDos = getStorage();
  }
  toDos.push(text);
  localStorage.setItem("todo", JSON.stringify(toDos));
}

function getStorage() {
  let toDo = JSON.parse(localStorage.getItem("todo"));
  return toDo;
}

function loadItems() {
  let toDo = getStorage();
  console.log(toDo);
  if (toDo != null) {
    let html;
    for (let i = 0; i < toDo.length; i++) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("list-item");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        //Complete click event
        newTodo.addEventListener("click", completeListItem);
        newTodo.innerText = toDo[i];
        todoDiv.appendChild(newTodo);
      
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.classList.add("btn-delete");
        //Delete Button Click Event
        deleteButton.addEventListener("click", deleteListItem);
        todoDiv.appendChild(deleteButton);
        ulDom.appendChild(todoDiv);
    }
  }
}

function dltStorage(text) {
  let toDo = getStorage();
  toDo.forEach((element, id) => {
    if (element === text) {
      toDo.splice(id, 1);
    }
  });
  localStorage.setItem("todo", JSON.stringify(toDo));
}
