import React, { useState } from "react";
import AddTaskHOC from "../../Utills/addTaskHOC";
import useModifyTask from "../../Utills/useModifyTask";
import "./Updatetask.scss";

const Updatetask = ({ addTaskHandler, item }) => {
  const [active, setActive] = useState("details");
  const editTask = useModifyTask();
  const [createTask, setCreateTask] = useState({
    id: item?.id,
    taskTitle: item?.taskTitle,
    description: "",
    taskCategory: item?.taskCategory,
    time: item?.time,
    taskStatus: item?.taskStatus,
    file: "",
    message: item?.message,
  });

  const createTaskHandle = (e) => {
    const updatedTask = {
      ...createTask,
      [e.target.name || "taskCategory"]: e.target.value || e.target.textContent,
    };

    setCreateTask(updatedTask);
  };

  const handleUpdate = () => {
    const date = new Date(); // Get the current date
    const todayDate = date.toISOString().split("T")[0];
    const task = {
      ...createTask,
      message: [
        ...createTask?.message,
        { msg: "You Updated Task on", date: todayDate },
      ],
    };

    addTaskHandler();
    editTask("Edit", task);
  };

  return (
    <>
      <div className="bgTheme"></div>
      <div className="mobileTheme"></div>
      <div className="updateTask">
        <div className="top">
          <button onClick={addTaskHandler}>X</button>
        </div>
        <div
          className="mobileBtns"
          onClick={(e) => setActive(e.target.textContent.toLowerCase())}
        >
          <button className="mBtns">Details</button>
          <button className="mBtns">Activity</button>
        </div>
        <div className="center">
          {" "}
          <div className="leftContainer bigScreen">
            <AddTaskHOC TaskHandle={createTaskHandle} item={createTask} />
          </div>
          <div className="rightContainer bigScreen">
            <h1 className="updateTitle">Activity</h1>
            <div className="msgContainer">
              <div className="msgContainer">
                {createTask?.message.map((item) => (
                  <div className="message">
                    <span>{item?.msg || "message"}</span>
                    <span>{item?.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* //mobieView// */}
          {active === "details" ? (
            <div className="leftContainer mobilScreen">
              <AddTaskHOC TaskHandle={createTaskHandle} item={createTask} />
            </div>
          ) : (
            <div className="rightContainer mobilScreen">
              <h1 className="updateTitle">Activity</h1>
              <div className="msgContainer">
                {createTask?.message.map((item) => (
                  <div className="message">
                    <span>{item?.msg || "message"}</span>
                    <span>{item?.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bottom">
          <button className="btn cancel" onClick={addTaskHandler}>
            CANCEL
          </button>
          <button className="btn update" onClick={handleUpdate}>
            UPDATE
          </button>
        </div>
      </div>
    </>
  );
};

export default Updatetask;
