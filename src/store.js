import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: +id,
  };
};

const loaclStore = [];
const keys = Object.keys(window.localStorage);
for (const key in keys) {
  loaclStore.push(JSON.parse(localStorage.getItem(key)));
}

const reducer = (state = loaclStore, action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

const saveLocal = () => {
  const toDos = store.getState();
  localStorage.clear();
  toDos?.map((toDo, index) => {
    localStorage.setItem(
      index,
      JSON.stringify({ id: toDo.id, text: toDo.text })
    );
  });
};

store.subscribe(saveLocal);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
