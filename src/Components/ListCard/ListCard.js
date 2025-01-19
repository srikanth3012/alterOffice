import React, { useEffect, useState } from "react";
import "./ListCard.scss";
import Options from "../Options/Options";
import { useDispatch } from "react-redux";
import {
  addItemtoCompleted,
  addItemtoInProgress,
  addItemtomultiHandler,
  addItemtoTodo,
} from "../../Redux/Slicers/taskBuddySlicer";

const ListCard = ({ title, data }) => {
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [items, setItems] = useState(data);
  const [addTask, setAddTask] = useState(false);
  const [createTask, setCreateTask] = useState({
    id: data.length + 1,
    taskTitle: "",
    time: "",
    taskStatus: "",
    taskCategory: "",
  });
  const [check, setCheck] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDragStart = (id) => {
    setDraggedItemId(id);
  };

  const handleDrop = (id) => {
    const draggedIndex = items.findIndex((item) => item.id === draggedItemId);
    const droppedIndex = items.findIndex((item) => item.id === id);
    if (draggedIndex !== -1 && droppedIndex !== -1) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(droppedIndex, 0, draggedItem);
      setItems(updatedItems);
      setDraggedItemId(null);
    }
  };

  const toggleAddTask = () => setAddTask((prev) => !prev);

  const handleCreateTask = (e, item) => {
    const updatedTask = {
      ...createTask,
      [e.target.name || item]: e.target.value || e.target.textContent,
    };

    setCreateTask(updatedTask);
  };

  const handleCheckBox = (item) => {
    const updateditem = { ...item, section: title };

    let checkboxList;

    if (check[item?.id]) {
      checkboxList = { ...check, [item?.id]: false };
      setCheck(checkboxList);
    } else {
      checkboxList = check
        ? { ...check, [item?.id]: true }
        : { [item?.id]: true };

      setCheck(checkboxList);
    }

    dispatch(addItemtomultiHandler(updateditem));
  };

  const handleAdd = () => {
    if (createTask?.taskStatus === "TO_DO") {
      dispatch(addItemtoTodo(createTask));
    } else if (createTask?.taskStatus === "IN_PROGRESS") {
      dispatch(addItemtoInProgress(createTask));
    } else dispatch(addItemtoCompleted(createTask));
    setAddTask(false);
    setCreateTask({
      id: data.length + 1,
      taskTitle: "",
      time: "mm/dd/yyyy",
      taskStatus: "",
      taskCategory: "",
    });
  };

  return (
    <div className="listCard">
      {/* Title Section */}
      <div className={`${title} titleBox`}>
        <span>{title}</span>
        <img alt="toggle" src="chevron-down.svg" />
      </div>

      {/* Items Section */}
      <table>
        <tbody>
          <tr>
            <td colSpan="5">
              {title === "Todo" && (
                <div className="listAddTaskContainer">
                  <span className="listAddTaskButton" onClick={toggleAddTask}>
                    + ADD TASK
                  </span>
                  {addTask && (
                    <div className="addTaskForm">
                      <div className="formRowtitle">
                        <input
                          name="taskTitle"
                          type="text"
                          placeholder="Task title"
                          onChange={handleCreateTask}
                        />
                      </div>
                      <div className="formRow">
                        <input
                          name="time"
                          type="date"
                          onChange={handleCreateTask}
                        />
                      </div>
                      <div className="formRow">
                        <button className="dropdownToggle">+</button>

                        <div
                          className="dropdownOptions"
                          onClick={(e) => handleCreateTask(e, "taskStatus")}
                        >
                          <span
                            className={`${
                              createTask?.taskStatus === "TO_DO" && "active"
                            }`}
                          >
                            TO_DO
                          </span>
                          <span
                            className={`${
                              createTask?.taskStatus === "IN_PROGRESS" &&
                              "active"
                            }`}
                          >
                            IN_PROGRESS
                          </span>
                          <span
                            className={`${
                              createTask?.taskStatus === "COMPLETED" && "active"
                            }`}
                          >
                            COMPLETED
                          </span>
                        </div>
                      </div>
                      <div className="formRow">
                        <button className="dropdownToggle">+</button>

                        <div
                          name="taskCategory"
                          className="dropdownOptions"
                          onClick={(e) => handleCreateTask(e, "taskCategory")}
                        >
                          <span
                            className={`${
                              createTask?.taskCategory === "Work" && "active"
                            }`}
                          >
                            Work
                          </span>
                          <span
                            className={`${
                              createTask?.taskCategory === "Personal" &&
                              "active"
                            }`}
                          >
                            Personal
                          </span>
                        </div>
                      </div>
                      <div className="formActions">
                        <button className="btn add" onClick={handleAdd}>
                          Add
                        </button>
                        <button className="btn cancel" onClick={toggleAddTask}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </td>
          </tr>

          {items.length === 0 ? (
            <tr>
              <td colSpan="5" className="noTasks">
                No tasks in {title}.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                className="task"
              >
                <td className="taskTitle">
                  <div className="taskTitle">
                    <input
                      type="checkbox"
                      checked={Boolean(check[item?.id])}
                      id={`task-${item.id}`}
                      onClick={() => handleCheckBox(item)}
                    />
                    <img
                      className="dragIcon"
                      src="./drag_icon.png"
                      alt="drag"
                    />
                    <img
                      className={`${
                        title === "Complete" && "markGreen"
                      } markIcon`}
                      src="./checkmark.png"
                      alt="drag"
                    />
                    <label
                      className={title === "Complete" && "cross"}
                      htmlFor={`task-${item.id}`}
                    >
                      {item?.taskTitle}
                    </label>
                  </div>
                </td>
                <td>{item.time}</td>
                <td>
                  <span className="status">
                    {item.taskStatus?.toUpperCase()}
                  </span>
                </td>
                <td>{item.taskCategory?.toUpperCase()}</td>
                <td>
                  <Options section="listOptions" item={item} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCard;
