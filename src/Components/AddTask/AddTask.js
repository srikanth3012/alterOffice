"use client";
import React, { useState } from "react";
import "./AddTask.scss";
import { useDispatch } from "react-redux";
import {
  addItemtoCompleted,
  addItemtoInProgress,
  addItemtoTodo,
} from "../../Redux/Slicers/taskBuddySlicer";
import AddTaskHOC from "../../Utills/addTaskHOC";

const AddTask = ({ addTaskHandler }) => {
  const [createTask, setCreateTask] = useState({
    taskTitle: "",
    description: "",
    taskCategory: "",
    time: "",
    taskStatus: "",
    file: "",
  });

  const dispatch = useDispatch();

  const createTaskHandle = (e) => {
    const updatedTask = {
      ...createTask,
      [e.target.name || "taskCategory"]: e.target.value || e.target.textContent,
    };
    setCreateTask(updatedTask);
  };

  const handleCreateBtn = () => {
    console.log(createTask);
    if (createTask?.taskStatus === "TO_DO") {
      dispatch(addItemtoTodo(createTask));
    } else if (createTask?.taskStatus === "In_Progress") {
      dispatch(addItemtoInProgress(createTask));
    } else {
      dispatch(addItemtoCompleted(createTask));
    }
    addTaskHandler();
  };

  return (
    <>
      <div className="bgTheme"></div>
      <div className="mobileBgTheme"></div>
      <div className="addTaskContainer">
        <div className="top">
          <h1 className="title">Create Task</h1>
          <button className="closeBtn" onClick={addTaskHandler}>
            X
          </button>
        </div>
        <div className="middle">
          <AddTaskHOC TaskHandle={createTaskHandle} />
        </div>

        <div className="bottom">
          <button className="btn cancel" onClick={addTaskHandler}>
            CANCEL
          </button>
          <button className="btn create" onClick={handleCreateBtn}>
            CREATE
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTask;
