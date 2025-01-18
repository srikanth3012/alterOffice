import { configureStore } from "@reduxjs/toolkit";
import TaskBuddySlicer from "./Slicers/taskBuddySlicer";

const Store = configureStore({
  reducer: {
    taskBuddySlicer: TaskBuddySlicer,
  },
});
export default Store;
