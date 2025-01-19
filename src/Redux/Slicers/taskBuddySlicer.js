import { createSlice } from "@reduxjs/toolkit";
import data from "../../libs/data.json";
import todo from "../../libs/Todo.json";
import complete from "../../libs/Completed.json";

const TaskBuddySlicer = createSlice({
  name: "taskBuddySlicer",
  initialState: {
    todo: [...todo],
    inProgess: [...data],
    completed: [...complete],
    multiHandler: [],
    id: 20,
    user: "",
  },
  reducers: {
    addItemtoTodo: (state, { payload }) => {
      state.todo.push({ id: ++state.id, ...payload });
    },
    addItemtoInProgress: (state, { payload }) => {
      state.inProgess.push({ id: ++state.id, ...payload });
    },
    addItemtoCompleted: (state, { payload }) => {
      state.completed.push({ id: ++state.id, ...payload });
    },
    addItemtomultiHandler: (state, { payload }) => {
      const status = state.multiHandler.find(
        (item) => item?.id === payload?.id
      );
      if (!status) state.multiHandler.push(payload);
      else {
        state.multiHandler = state.multiHandler.filter(
          (item) => item?.id !== payload?.id
        );
      }
    },

    updateItemtoTodo: (state, { payload }) => {
      state.todo = payload;
    },
    updateItemInProgress: (state, { payload }) => {
      state.inProgess = payload;
    },
    updateItemtoCompleted: (state, { payload }) => {
      state.completed = payload;
    },
    updateItemtoMultiHandler: (state, { payload }) => {
      state.multiHandler = [];
    },

    addUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const {
  addItemtoTodo,
  addItemtoInProgress,
  addItemtoCompleted,
  addItemtomultiHandler,
  updateItemtoTodo,
  updateItemInProgress,
  updateItemtoCompleted,
  updateItemtoMultiHandler,
  addUser,
} = TaskBuddySlicer.actions;
export default TaskBuddySlicer.reducer;
