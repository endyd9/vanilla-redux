import { configureStore, createSlice } from "@reduxjs/toolkit";

const loaclStore = [];
Object.keys(window.localStorage).forEach((key) => {
  loaclStore.push(JSON.parse(localStorage.getItem(key)));
});

const toDo = createSlice({
  name: "toDosReducer",
  initialState: loaclStore,
  reducers: {
    add: (state, action) => {
      state.unshift({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: toDo.reducer });

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

export const { add, remove } = toDo.actions;

export default store;
