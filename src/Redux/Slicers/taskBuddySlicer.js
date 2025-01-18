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
    id: 3,
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
      state.multiHandler.push(payload);
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
} = TaskBuddySlicer.actions;
export default TaskBuddySlicer.reducer;
