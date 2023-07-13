import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector(".todos");

const ADD = "ADD";
const DELETE = "DELETE";

const reducer = (state = [], action) => {
  const { id, toDo } = action;

  switch (action.type) {
    case ADD:
      return [{ id, toDo }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== +id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const addToDo = (toDo, id) => {
  store.dispatch({ type: ADD, toDo, id });
};

const deleteToDo = (event) => {
  const {
    target: {
      parentNode: { id },
    },
  } = event;

  store.dispatch({ type: DELETE, id });
};

const updateToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteToDo);
    li.innerText = todo.toDo;
    li.id = todo.id;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(updateToDos);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  const id = Date.now();
  input.value = "";
  addToDo(toDo, id);
};

form.addEventListener("submit", onSubmit);
