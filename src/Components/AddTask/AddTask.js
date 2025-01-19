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
    let file = "";

    if (e.target.name === "file") {
      const uploadedFile = e?.target?.files[0];
      if (
        uploadedFile.type.startsWith("image") ||
        uploadedFile.type === "application/pdf"
      ) {
        file = URL.createObjectURL(uploadedFile); // Create image preview URL
      } else {
        file = null;
      }
    }

    const updatedTask = {
      ...createTask,
      [e.target.name || "taskCategory"]:
        e.target.value || file || e.target.textContent,
    };
    console.log(updatedTask);
    setCreateTask(updatedTask);
  };

  const handleCreateBtn = () => {
    const date = new Date(); // Get the current date
    const todayDate = date.toISOString().split("T")[0];
    const task = {
      ...createTask,
      message: [{ msg: "You Created Task on", date: todayDate }],
    };
    console.log(createTask);
    if (createTask?.taskStatus?.toLocaleLowerCase() === "to_do") {
      dispatch(addItemtoTodo(task));
    } else if (createTask?.taskStatus?.toLocaleLowerCase() === "in_progress") {
      dispatch(addItemtoInProgress(task));
    } else if (createTask?.taskStatus?.toLocaleLowerCase() === "completed") {
      dispatch(addItemtoCompleted(task));
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
          {createTask?.file && (
            // <iframe src={createTask?.file} title="PDF Preview" />
            <img src={createTask?.file} alt="img" />
          )}
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
